import { spawn } from "node:child_process";
import { access, mkdtemp, readFile, rm } from "node:fs/promises";
import { constants } from "node:fs";
import { tmpdir } from "node:os";
import { delimiter, join } from "node:path";
import { setTimeout as delay } from "node:timers/promises";

// Each test run owns its browser, debugging port and disposable profile.
export async function openBrowserPage(url) {
  const executable = await findChrome();
  const profile = await mkdtemp(join(tmpdir(), "lisbon-ai-test-"));
  const browser = spawn(executable, [
    "--headless=new", "--enable-automation", "--no-first-run", "--no-default-browser-check",
    "--remote-debugging-port=0", `--user-data-dir=${profile}`,
    "--use-angle=swiftshader", "--enable-unsafe-swiftshader", "about:blank",
  ], { stdio: ["ignore", "ignore", "pipe"] });
  let startupError, stderr = "", socket;
  const exited = new Promise(resolve => {
    browser.once("close", resolve);
    browser.once("error", error => { startupError = error; resolve(); });
  });
  browser.stderr.on("data", data => { stderr = (stderr + data).slice(-20000); });
  const pending = new Map(), events = [];
  let sequence = 0;
  try {
    const debug = await endpoint();
    const response = await fetch(`${debug}/json/new?${encodeURIComponent(url)}`, { method: "PUT", signal: AbortSignal.timeout(20000) });
    if (!response.ok) throw new Error(`Cannot create a Chrome page: HTTP ${response.status}`);
    const target = await response.json();
    socket = new WebSocket(target.webSocketDebuggerUrl);
    socket.addEventListener("message", ({ data }) => {
      const message = JSON.parse(data);
      if (message.method) { events.push(message); return; }
      const request = pending.get(message.id);
      if (!request) return;
      pending.delete(message.id); clearTimeout(request.timeout);
      if (message.error) request.reject(new Error(message.error.message));
      else request.resolve(message.result);
    });
    await new Promise((resolve, reject) => {
      const timeout = setTimeout(() => reject(new Error("Chrome WebSocket connection timed out")), 20000);
      socket.addEventListener("open", () => { clearTimeout(timeout); resolve(); }, { once: true });
      socket.addEventListener("error", error => { clearTimeout(timeout); reject(error); }, { once: true });
    });
    return { command, evaluate, waitFor, close, events };
  } catch (error) {
    await close(); throw error;
  }

  function command(method, params = {}) {
    return new Promise((resolve, reject) => {
      const id = ++sequence;
      const timeout = setTimeout(() => { pending.delete(id); reject(new Error(`CDP timeout: ${method}`)); }, 20000);
      pending.set(id, { resolve, reject, timeout });
      socket.send(JSON.stringify({ id, method, params }));
    });
  }
  async function evaluate(fn, argument) {
    const result = await command("Runtime.evaluate", { expression: `(${fn.toString()})(${JSON.stringify(argument)})`, awaitPromise: true, returnByValue: true });
    if (result.exceptionDetails) throw new Error(result.exceptionDetails.exception?.description ?? "Browser evaluation failed.");
    return result.result.value;
  }
  async function waitFor(expression) {
    for (let attempt = 0; attempt < 100; attempt++) {
      const exception = events.find(event => event.method === "Runtime.exceptionThrown");
      if (exception) throw new Error(exception.params.exceptionDetails.exception?.description ?? "Browser exception");
      const result = await command("Runtime.evaluate", { expression });
      if (result.result.value) return;
      await delay(100);
    }
    throw new Error(`Browser condition timed out: ${expression}`);
  }
  async function close() {
    socket?.close();
    for (const request of pending.values()) {
      clearTimeout(request.timeout); request.reject(new Error("Browser closed"));
    }
    pending.clear();
    const force = setTimeout(() => browser.kill("SIGKILL"), 3000);
    try { browser.kill(); await exited; }
    finally { clearTimeout(force); await rm(profile, { recursive: true, force: true }); }
  }
  async function endpoint() {
    for (let attempt = 0; attempt < 200; attempt++) {
      if (startupError) throw startupError;
      if (browser.exitCode !== null || browser.signalCode !== null) throw new Error(`Chrome exited during startup.\n${stderr}`);
      try {
        const [port] = (await readFile(join(profile, "DevToolsActivePort"), "utf8")).split("\n");
        if (/^\d+$/.test(port)) return `http://127.0.0.1:${port}`;
      } catch (error) { if (error.code !== "ENOENT") throw error; }
      await delay(100);
    }
    throw new Error(`Chrome startup timed out.\n${stderr}`);
  }
}

async function findChrome() {
  if (process.env.CHROME_PATH) return process.env.CHROME_PATH;
  const candidates = [
    "/Applications/Chromium.app/Contents/MacOS/Chromium",
    "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
    ...(process.env.PATH ?? "").split(delimiter).flatMap(path => ["google-chrome", "chromium", "chromium-browser"].map(name => join(path, name))),
  ];
  for (const path of candidates) {
    try { await access(path, constants.X_OK); return path; } catch {}
  }
  throw new Error("Install Chrome or Chromium, or set CHROME_PATH to its executable.");
}
