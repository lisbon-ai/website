export type Speaker = {
  name: string;
  org: string;
  // `published` speakers get a card on /speakers and the landing page. The rest
  // exist so the schedule can reference them before their details are ready.
  published?: boolean;
  role?: string;
  title?: string;
  // Empty until the talk title is confirmed.
  talk?: string;
  // Unset means a full session.
  talkType?: "lightning";
  profileUrl?: string;
  orgUrl?: string;
  logo?: string;
  image?: string;
  bio?: string;
  // Talk abstract. Not rendered anywhere yet.
  abstract?: string;
};

// Most logos read well at h-4; these wordmarks need a nudge to match optically.
const logoHeights: Record<string, string> = {
  "huggingface.svg": "h-7",
  "roboflow.svg": "h-5",
};
export const logoHeight = (logo: string) => logoHeights[logo] ?? "h-4";

// Speakers whose talk title is still unconfirmed are held back from the
// schedule and /talks until there is a title to show.
export const hasTalk = (name: string) =>
  speakers.some((speaker) => speaker.name === name && speaker.talk);

// Anchor for a speaker's entry on /talks. The schedule links each talk title
// there, so the id and the href have to come from the same place.
export const talkAnchor = (name: string) =>
  name
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

export const speakers: Speaker[] = [
  {
    name: "Steve Ruiz",
    published: true,
    role: "Founder & CEO",
    org: "tldraw",
    profileUrl: "https://x.com/steveruizok",
    orgUrl: "https://tldraw.dev/",
    logo: "tldraw.svg",
    image: "steve.png",
    bio: "Artist-turned-engineer. At tldraw he's building collaborative design tools that feel like magic and work like code. Previously create interfaces and content at Play and Framer. Likes CRDTs, canvas APIs, and prototyping ideas faster than light.",
  },
  {
    name: "Lukas Wirth",
    published: true,
    role: "Rust-analyzer Lead",
    org: "Zed",
    profileUrl: "https://github.com/veykril",
    orgUrl: "https://zed.dev",
    logo: "zed.svg",
    image: "lukas.png",
    bio: "Lukas Wirth leads the rust-analyzer team, shaping the official Rust language server he’s worked on since 2021. He joined Zed in August 2025 to help build the next-generation editor with a focus on collaboration, building on a background in safety-critical Rust toolchains and co-authoring the Ferrocene Language Specification.",
  },
  // Off the speakers and landing-page lists; Lukas Wirth took the Zed card.
  {
    name: "Ben Brandt",
    role: "Staff Engineer",
    org: "Zed Industries",
    profileUrl: "https://x.com/benjaminbrandt",
    orgUrl: "https://zed.dev",
    logo: "zed.svg",
    image: "ben.png",
    bio: "Ben Brandt works at Zed, helping shape how engineers collaborate with AI and with each other. He is also a Lead Maintainer of the Agent Client Protocol, an open standard for interoperability between editors and coding agents.",
  },
  {
    name: "Matt Carey",
    published: true,
    role: "AI Engineer",
    org: "Cloudflare",
    profileUrl: "https://x.com/mattzcarey",
    orgUrl: "https://cloudflare.com",
    logo: "cloudflare.svg",
    image: "matt.png",
    bio: "Matt Carey works on agents and MCP at Cloudflare. He built Cloudflare MCP server, Artifacts and he is a maintainer of MCP Typescript SDK.",
  },
  {
    name: "Duarte Carmo",
    published: true,
    role: "Founder & AI Consultant",
    org: "Independent",
    talk: "The Hitchhiker’s Guide to European Portuguese LLMs",
    profileUrl: "https://x.com/duarteocarmo",
    orgUrl: "https://duarteocarmo.com/",
    image: "duarte.png",
    bio: "Duarte is an AI technologist and consultant based in Copenhagen, working across ML/AI, data, and software. His background spans pharma, climate tech, and YC-backed startups.",
    abstract: `Large language models are eating the world. Frontier labs keep pushing the boundary, open-weights models are quickly closing the gap, Europe is — as always — stuck somewhere in the middle, and even Portugal has now released AMÁLIA, its own effort in the space.

But what does it actually take to build an LLM trained on European Portuguese data? Why would you? And where do you start when there is so little data? In this talk, I’ll walk through my work on European Portuguese LLMs: from building benchmarks, to finding and filtering data, to training models, and everything in between. We’ll probably leave with more questions than answers, but hopefully we’ll learn something along the way.`,
  },
  {
    name: "Diogo Mónica",
    published: true,
    role: "General Partner",
    org: "Anchorage, Haun Ventures",
    profileUrl: "https://x.com/diogomonica",
    orgUrl: "https://www.haun.co/",
    logo: "haun.svg",
    image: "diogo.png",
    bio: "Diogo is a General Partner at Haun Ventures and co-founder of Anchorage Digital, the first federally chartered crypto-native bank in the US. He previously led security at Square and Docker, and holds a Ph.D. in computer science from Instituto Superior Técnico.",
  },
  {
    name: "Joan Rodriguez",
    published: true,
    role: "Co-founder, CEO & Chief Scientist",
    org: "QuiverAI",
    talk: "Design as visual code",
    profileUrl: "https://x.com/joanrod_ai",
    orgUrl: "https://quiver.ai/",
    logo: "quiver.svg",
    image: "joan.png",
    bio: "Joan Rodriguez is CEO and founder of QuiverAI, building AI models that create and edit vector graphics for professional design. He holds a PhD from Mila and previously created StarVector, the research seed for QuiverAI. QuiverAI has raised $8.3M and operates out of San Francisco with a 15-person global team.",
    abstract: `AI can generate beautiful images. But design is more than an image: it
has structure and intent. At QuiverAI, we train models to generate
design as visual code, SVGs that can be rendered, inspected, and
edited. This talk follows our path from early research in SVG code
generation to production models: why we chose code over pixels, why
scale alone was not enough, and how rendering feedback let the model
learn from the visual consequences of its own code. An output can look
right and still fail as a design asset. That gap defines the frontier
of AI for design.`,
  },
  {
    name: "Aayush Kapoor",
    published: true,
    role: "Software Engineer, AI SDK",
    org: "Vercel",
    talk: "The Slopbowl-ification of Software",
    profileUrl: "https://x.com/aayushkapoor_",
    orgUrl: "https://vercel.com",
    logo: "vercel.svg",
    image: "aayush.png",
    bio: "Aayush Kapoor is a software engineer at Vercel in New York, working on developer tools and the AI SDK library. He holds a Master's in Computer Science from Old Dominion University, with a background in AI systems and applied machine learning.",
    abstract: "AI has made writing code dramatically cheaper. We can add another feature, abstraction, integration or configuration option almost instantly. Software is beginning to resemble a slopbowl: you start with a base, keep adding ingredients and hope the result is better than the sum of its parts. But every addition changes the whole system. One bad ingredient can overwhelm the bowl, causing even individually reasonable features to turn useful software into an incoherent, bloated system. Taste becomes the differentiator. In this talk, we’ll examine the importance of strong foundations, the hidden cost of “just one more prompt bro” and why restraint and taste become more valuable as code gets cheaper.",
  },
  {
    name: "Sergio Paniego",
    published: true,
    role: "ML Engineer",
    org: "Hugging Face",
    talk: "Training a coding agent through a harness you did not write",
    profileUrl: "https://www.linkedin.com/in/sergio-paniego-blanco/",
    orgUrl: "https://huggingface.co",
    logo: "huggingface.svg",
    image: "sergio.png",
    bio: "Sergio is a Machine Learning Engineer at Hugging Face focused on developer advocacy, where he works on post-training and RL environments as a developer of TRL and OpenEnv. He holds a PhD in artificial intelligence and has contributed to open source for over a decade, including more than eight years in Google Summer of Code as a developer and mentor.",
    abstract: `An agent is a model plus a harness, and the harness is the part that calls the model, handles its tool calls and decides when to stop. Most of the ones doing real work were built by someone else, which makes them awkward to train, because the usual reinforcement learning setup assumes the trainer drives every step and here the harness already does.

This talk is a walkthrough of the other way round. We take an off-the-shelf open source coding agent, leave its code untouched, and run it in a sandbox with a proxy in front of the model, so every call it makes is recorded together with the token ids and logprobs the trainer needs. Those recordings become the training samples, the result of the task becomes the reward, and the async GRPO path in TRL updates the weights of the model the agent was calling. The environment side is OpenEnv, so the same setup takes any harness`,
  },
  {
    name: "Will Burstein",
    published: true,
    role: "Head of Product",
    org: "PromptLayer",
    talk: "From Vibes to Scorecards: Building Review Loops for Production AI",
    profileUrl: "https://linkedin.com/in/willburstein",
    orgUrl: "https://www.promptlayer.com",
    logo: "promptlayer.png",
    image: "will.png",
    bio: "Will Burstein is Head of Product at PromptLayer, where he works with teams building production LLM applications. His work focuses on practical evaluation, review, and release workflows that help product and engineering teams move from ad hoc prompt iteration to repeatable quality loops. He speaks about AI evals, scorecards, and how teams make reliable product decisions around probabilistic systems.",
    abstract: `Most AI teams start quality review the same way: a few handpicked traces, a spreadsheet, and a debate over whether the output “feels right.” That breaks down quickly once an AI feature has real users, edge cases, workflow context, cost pressure, and multiple stakeholders. This talk takes apart a practical scorecard loop for production LLM apps: collecting representative traces, defining flexible criteria, layering human review with LLM-as-judge evaluators, and using the results to make release decisions. I’ll focus on what breaks in practice: brittle rubrics, evaluator drift, overfitting to demo examples, missing domain-expert input, and scorecards that become too engineering-centric for product teams to trust. The goal is to show the system and the tradeoffs, not pitch a product.

Takeaways:
- How to move from ad hoc trace review to a reusable evaluation loop
- How to design scorecards across product, engineering, and domain-expert review
- Where LLM-as-judge helps, where it fails, and how to calibrate it
- How to use eval results for release decisions instead of dashboard theater`,
  },
  {
    name: "Chema Garabito",
    published: true,
    role: "Founder",
    org: "Sperid Labs",
    talk: "Spatial AI and 3D World Models",
    profileUrl: "https://x.com/chema_garabito",
    orgUrl: "https://speridlabs.com",
    logo: "speridlabs.svg",
    image: "chema.png",
    bio: "Chema Garabito is founder of Sperid Labs, a Spatial AI lab building foundation models for understanding, reconstructing, simulating, and generating the 3D world.",
    abstract: "We will explore Spatial AI and 3D World Models: systems that move beyond generating pixels to building coherent, persistent, and queryable representations of the physical world. We will cover the fundamental problem we aim to solve, the key technical challenges involved, and the applications this shift could unlock across robotics, simulation, media, gaming, and other real-world industries.",
  },
  {
    name: "Piotr Skalski",
    published: true,
    role: "Open Source Lead",
    org: "Roboflow",
    talk: "Computer Vision, Meet Sports",
    profileUrl: "https://x.com/skalskip92",
    orgUrl: "https://roboflow.com",
    logo: "roboflow.svg",
    image: "piotr.png",
    bio: "Piotr Skalski is Open Source Lead at Roboflow with nearly nine years in computer vision. He has built open-source projects totaling over 80,000 GitHub stars and has produced more than 40 blog posts plus over 60 YouTube videos on key models. His work includes sports applications such as Football AI and Basketball AI. He is also passionate about vision-language models.",
    abstract: `What does it take to turn raw game footage into a full sports analytics dashboard? More than you’d think.

This talk walks through the complete computer vision pipeline I built for basketball and football, from detecting players and tracking them through occlusions, to reading jersey numbers, mapping positions onto a 2D court, and computing real-time stats. Every model is open-source, and every step solves one problem while creating the next one.`,
  },
  {
    name: "Cristiana Carpinteiro",
    published: true,
    role: "ML Engineer",
    org: "Loka",
    talk: "Foundation Models for Drug Discovery: From Hype to the Lab",
    profileUrl: "https://www.linkedin.com/in/crscarpinteiro/",
    orgUrl: "https://www.loka.com",
    logo: "loka.svg",
    image: "cristiana.png",
    bio: "Cristiana Carpinteiro is a Machine Learning Engineering Lead based in Porto, with a background in Bioengineering from FEUP and a career entirely dedicated to the biotech field. She currently works at Loka, an AWS Premier Partner consultancy, developing AI for drug discovery and covering challenges that span molecule screening and optimization to model training on large-scale datasets. Previously, she worked at two startups, including one building technology to detect Alzheimer's disease from blood samples. Her experience sits at the intersection of science, technology, and innovation, bridging research and engineering teams to bring ML into real-world biotech applications.",
    abstract: "LLMs learned to read and write human language. Can the same architectures learn to read the language of biology, well enough to help scientists discover new drugs? At Loka, we've been helping clients answer this question by working with companies at every stage of the drug discovery pipeline. In this talk, we'll cover where foundation models can already help, what's still hype, and what gaps remain. We'll ground this in our own experience with Nurix, a biopharma company developing drugs for cancer and immune diseases, where we helped build a foundation model to screen their 5-billion-molecule library. This tool is used daily by scientists to help them decide which molecules move to the lab, and it has already identified molecules that actually bind to the targets of interest.",
  },
  {
    name: "Marcelo Lebre",
    published: true,
    role: "Co-founder & President",
    org: "Remote",
    talk: "Icarus, operational harness",
    profileUrl: "https://x.com/marcelolebre",
    orgUrl: "https://remote.com",
    logo: "remote.svg",
    image: "marcelo.png",
    bio: "Marcelo is the co-founder and President of Remote. Marcelo was previously VP of Engineering at Unbabel and has held several CTO positions. He frequently speaks at events about leadership and managing remote teams. Marcelo is also a startup advisor and mentor to entrepreneurs. He is a passionate engineer, proud dad, and sci-fi nerd.",
    abstract: "At Remote we're building Icarus: a harness that runs a personal agent on your own machine, all day, alongside you. It watches how you actually work — the decisions that get made in threads, the context that only lives in your head, the sequence of steps you've repeated forty times without calling it a process. It turns that into a knowledge graph, identifies the repetitive work, and automates it. What each agent learns gets federated into a shared org-wide graph, so the same problem doesn't get solved twenty times.",
  },

  // Announced in the schedule; card details still to come.
  {
    name: "Afonso Oliveira",
    org: "OliveGradient",
    talk: "Building AI people trust without giving away the product",
    talkType: "lightning",
    image: "afonso.png",
    abstract: `AI products are increasingly asking users for their most sensitive data: private thoughts, health information, personal journals, and conversations they would never have anywhere else. That creates an uncomfortable trade-off.

Keep the data on the user’s device, and privacy improves... but now the AI model and the entire inference pipeline have to run where an attacker can inspect them. Keep the computation in the cloud, and the company can protect its IP... but users have to trust someone else with their most private data.

Confidential computing seems to offer a way out: run the AI inside a protected environment that neither the cloud provider nor the user can inspect. But hardware isolation alone doesn’t solve the trust problem. Users need a way to verify that their data stays inside that protected environment, while companies need to keep parts of their implementation secret.

This talk explores the engineering problem of making both possible at once.

Using an AI journaling application as a case study, we’ll walk through the architecture, the security boundaries, the trade-offs, the code, and the cloud infrastructure behind it.

The goal isn’t another introduction to confidential computing. It’s a practical look at what it takes to build an AI product where the user can trust what happens to their data without the company having to give away how the product works.`,
  },
  {
    name: "Alcides Fonseca",
    org: "U. Lisbon, DragonBoat",
    talk: "Guardrailing your Agents with Types and Logic",
    talkType: "lightning",
    profileUrl: "https://www.linkedin.com/in/alcidesfonseca/",
    orgUrl: "https://www.ulisboa.pt/en",
    abstract: `LLMs can generate plans of action, usually as bash, python, AppleScript or other untyped programs. These plans can be wrong from the beginning, but you will have to execute them until you find out, possibly hours later.

I have built aeon, a programming language that features Liquid and Linear Types that reject during compilation programs that logically do not make sense. If your program has a bug in the last line, it will not start executing. These bugs are not necessarily about using an integer where you expect a boolean, but conceptual. You will not read from a file handle after you closed it. You will not train a NaiveBayes classifier on imbalanced data. You will not test your model on previously seen data. You will not start your drone without loading the flight plan first. 

In this talk, I will show how to use [aeon](https://github.com/alcides/aeon) to design a DSL for your domain, and how to avoid conceptual bugs in your agents planning.`,
  },
  {
    name: "Artur Goulão",
    org: "Humanos",
    talk: "Runtime Trust for AI: Building the Network That Verifies Autonomous Systems",
    talkType: "lightning",
    profileUrl: "https://linkedin.com/in/arturgoulaoferreira",
    orgUrl: "https://www.humanos.tech",
    image: "artur.png",
    abstract: `AI agents are beginning to operate autonomously across finance, healthcare and enterprise software, but every critical action still depends on a simple question:

Can this AI be trusted before it acts?

In this talk we'll demonstrate the Runtime Trust Network, a new trust infrastructure that allows any system to independently verify AI identity, delegated authority, runtime controls and execution proofs through a single API before an AI action takes place. Under the hood, agents and their human principals are first-class identities (DIDs), and delegated authority flows between them as verifiable credential mandates: W3C Verifiable Credentials 2.0, selectively disclosable via SD-JWT, scoped, revocable and ephemeral, with permanent accountability.

Rather than presenting another governance framework, we'll show the system live: how trust events are recorded as signed receipts into a cryptographically verifiable chain, how they become independently verifiable by anyone from public keys alone with no consensus layer required, how applications consume them through the Runtime Trust API, and how these runtime trust signals enable entirely new products.

As a concrete example, we'll demonstrate how AI insurers can build real-time underwriting models using live operational evidence (receipt chains, mandate histories and enforcement records) instead of static questionnaires and historical claims data, allowing policies to evolve continuously as AI systems operate.

The session is a technical walkthrough of the architecture, APIs and runtime verification flow behind the Runtime Trust Network, with a live end-to-end demo: an agent is verified against the network, executes a delegated payment under a scoped mandate, attempts to exceed it, is deterministically blocked, and the resulting receipt chain is independently verified.`,
  },
  {
    name: "Bojan Jakimovski",
    org: "Loka",
    talk: "Teaching an Open Model to do Science",
    talkType: "lightning",
    profileUrl: "https://www.linkedin.com/in/bojan-jakimovski/",
    orgUrl: "https://www.loka.com",
    abstract: "Can an open model learn to investigate biological evidence, use scientific tools, and produce structured reasoning? To find out, we at Loka teamed up with Arcee and AWS and post-trained Arcee AI's Trinity Mini (a 26B-parameter mixture-of-experts LLM with 3B active parameters) into a biomedical AI scientist, using RLVR with GRPO across two RL environments. It worked. Over 21 controlled auto-research runs, held-out Drug Tool accuracy climbed from 70.8% to 81.2%, and BioReason accuracy reached 86.3%. In this session we'll show you how: optimizing the environment before the policy, designing rewards that expose the right failures, rejecting plausible ablations, and keeping every single run inspectable. Then we close the loop, pairing the trained model with an open-source agentic harness that makes a strong model stronger. Our thesis is simple. Science needs models we can inspect, adapt, evaluate, and improve, not black boxes we can only query.",
  },
  {
    name: "Boda Zhao",
    org: "YLD",
    talk: "Prevent supply chain attacks in coding agents",
    talkType: "lightning",
    profileUrl: "https://www.linkedin.com/in/boda-zhao/",
    orgUrl: "https://yld.com",
    image: "boda.png",
    abstract: "Autonomous agents are accelerating development, but they also increase the risk of supply chain attacks. This talk outlines actionable strategies to secure coding agents and broader agentic workflows. Attendees will leave with a clear mental starting point to help their teams navigate this rapidly evolving threat landscape.",
  },
  {
    name: "Daniel Bukac",
    org: "Duvo",
    talk: "Screen-aware voice agents: a new interaction pattern",
    talkType: "lightning",
    profileUrl: "https://www.linkedin.com/in/daniel-bukac-9b45a5279",
    orgUrl: "https://www.duvo.ai",
    image: "daniel.png",
    abstract: `A third mode of HCI: not typing at a chatbot, not screen-sharing with a person — a real-time voice agent that watches your screen as you work. Built for Clarity. What makes it work:

Two agents, split by job — a fast realtime voice model owns the conversation and its sub-second latencyA smarter model runs silently behind it — Claude reads the transcript + screenshots every few seconds and keeps the canonical state; the voice agent pulls it on demandWatching a screen cheaply — 5 fps capture, drop any frame that changed <10%, so a static screen costs zero vision tokensAlignment is just a wall clock — frames named by timestamp, no semantic matching; survives dropped frames and blips`,
  },
  {
    name: "Harshil Agrawal",
    org: "Cloudflare",
    talk: "Ditching Containers for Computer",
    talkType: "lightning",
    profileUrl: "https://www.linkedin.com/in/harshil1712/",
    orgUrl: "https://www.cloudflare.com",
    image: "harshil.png",
    abstract: "Containers have become the default for running AI-generated code, but for interactive apps, the cold start tax kills you. PromptMotion, my AI video generation app waited seconds for a container to spin up before a user could see a preview. The cost of keeping containers warm was unsustainable. The architecture — Durable Objects, networking, lifecycle management — was more complex than the app itself. This talk covers my migration from containers to V8 isolates (Dynamic Workers). Sub-millisecond cold starts, lower cost, faster previews. But the move wasn't free: I lost the file system, had to rethink how skills and tools work inside an isolate, and rebuilt the previewing, rendering, and download pipeline from scratch. I'll show what broke, what I used to replace the file system, how Artifacts solved versioning, and what I'd do differently if I started over.",
  },
  {
    name: "Jack Fitzsimons",
    org: "Oblivious",
    talk: "The PR is the Eval",
    talkType: "lightning",
    profileUrl: "https://www.linkedin.com/in/jack-f-300810122/",
    image: "jack.png",
    abstract: `Most coding agents are evaluated at the moment they answer. Software teams discover whether an answer was useful much later: a test fails, a reviewer requests changes, the pull request stalls, or the code ships. This talk shows how to turn those delayed signals into a continuous evaluation system. We instrument AI conversations, tool calls, diffs, commits, CI runs, review comments, and merge outcomes, then join them into one trace from prompt to production.

Using a working implementation, I’ll walk through the event model, correlation logic, and queries that separate accepted work from rework and repeated failure. I’ll show the hard parts: carrying trace context across unrelated tools, distinguishing flaky CI from agent errors, protecting developer privacy, and avoiding vanity metrics. Finally, we’ll turn recurring corrections into human-approved candidate skills and test whether they improve first-pass CI, review rounds, and time-to-merge.

Attendees will leave with a product-agnostic blueprint for outcome-based evaluation of coding agents.`,
  },
  {
    name: "Luis Monteiro",
    org: "Pixelmatters",
    talk: "Design is over",
    talkType: "lightning",
    orgUrl: "https://www.pixelmatters.com",
    abstract: "If AI begins with a prompt, does creativity still begin with a canvas? As AI reshapes the way we create, this talk explores the evolving relationship between the two — and asks why the canvas still matters in a world where almost anything can be generated.",
  },
  {
    name: "Nina Torgunakova",
    org: "Evil Martians",
    talk: "Trust nothing, ship safely: surviving the supply chain attack era",
    talkType: "lightning",
    profileUrl: "https://www.linkedin.com/in/nina-torgunakova/",
    orgUrl: "https://evilmartians.com",
    image: "nina.png",
    abstract: `Supply chain attacks are no longer a theoretical threat — they are a daily reality. npm packages, including some of the most widely used libraries in the ecosystem, have been weaponized to compromise thousands of developers and their users at once. New incidents surface every day, each one larger than the last, and no project is out of reach.

Every breach gets its post-mortem. But by the time you read it, the next attack is already being planned.

This talk is about getting ahead of it. I'll walk through two real dependency updates, live, using Multiocular — the open-source tool we built at Evil Martians for reviewing dependency changes: one harmless, one carrying a malicious change. You'll see what actually separates them once you stop trusting the version number and start looking at the diff. By the end, you'll know how to ask the one question that actually matters about everything you depend on: why do I trust this?`,
  },
  {
    name: "Oğuz Gültepe",
    org: "Peec AI",
    talk: "Prompt Learning: Distilling Expensive Reasoning Into Fast Production Prompts",
    talkType: "lightning",
    profileUrl: "https://www.linkedin.com/in/oguzgultepe/",
    orgUrl: "https://peec.ai",
    image: "oguz.png",
    abstract: `Most prompt engineering is a person staring at outputs and editing by hand. This talk shows how to automate that judgment instead. A small model generates outputs, a set of reward models score each one and explain its failures in natural language, and a heavy optimizer rewrites the meta-prompt from that feedback history. The loop repeats until rewards converge, and the result ships as a static prompt, so production pays no extra latency or cost.

The interesting part is where it goes wrong. I will walk through a production failure at Peec AI, where we run this loop to generate brand-tracking queries across many clients, languages, and markets. I will show how the optimizer can be working perfectly and still produce bad outputs when the reward is underspecified.

The takeaway for builders: reward design is the real engineering work, natural-language failure explanations are a far better signal than aggregate scores, and an expensive model earns its keep as an offline evaluator amortized over every future call.`,
  },
  {
    name: "Prince Canuma",
    org: "Neywa Labs",
    profileUrl: "https://www.linkedin.com/in/prince-canuma/",
    orgUrl: "https://neywalabs.ai",
    image: "prince.png",
  },
  {
    name: "Simão Nogueira",
    org: "Noticed",
    talk: "Evals as the code factory",
    talkType: "lightning",
    profileUrl: "https://www.linkedin.com/in/policarponogueira/",
    orgUrl: "https://www.noticed.so",
    image: "simao.png",
    abstract: `There’s 8 coding agents running in parallel on my machine at all times, each in its own git worktree. At night I hand each agent a wider goal to pursue alone, then steer the outcome over coffee the next morning. That’s billions of tokens per month. No team can review the performance of that much output. Mine certainly can’t.

When your team’s small or your output outpaces your QA, linters, evals and “intelligent” CI can inherit the job code reviewers used to do. The catch is that the agent doing the work is also the agent evaluating it, and when a model is asked to make a number go up, lowering the threshold can look reasonable from where it stands.

That means at noticed, evals have to be impossible to game, whether they’re testing query efficiency or design system adherence. The clearest example: one of noticed’s core AI models does identity matching — deciding whether two accounts belong to the same human. Merging two different people is a failure we can’t accept. The eval has to make that failure visible, while independently and correctly guiding the agent’s work to improve the model.

I’ll showcase three of our open-source skills that enforce this discipline — including one that made our ClickHouse queries 5.6x faster — show how we use them in our agent workflows, and cover the last-mile work that still requires human input.`,
  },
  {
    name: "Thom Jenkins",
    org: "PetsApp",
    talk: "Your Agent Is Ignoring You: Fixing Instruction Drift in Production AI",
    talkType: "lightning",
    profileUrl: "https://www.linkedin.com/in/thomjenkins/",
    orgUrl: "https://petsapp.com",
    image: "thom.png",
    abstract: `You've tried bribes. You've tried threats. YOUR ENTIRE PROMPT IS IN ALL CAPS AT THIS POINT. And yet, even with these highly sophisticated prompt engineering techniques, your agent still won't listen to you, or your users.

I've been there... PetsApp runs AI copilots across veterinary clinics, handling client communication, triage workflows, and operational support for millions of pets.

As these systems evolved larger context windows, more tools, and longer memory, I fully expected reliability to improve. But somehow our agent still repeatedly offered dog owners appointments at a cat-only clinic.

The instruction was right there in the prompt for all to see. But it had clearly lost behavioral dominance against competing context. We started calling this instruction drift: the tendency for important business and safety constraints to lose influence inside long-context agentic systems.

In this session we'll tear apart our naive prompt architecture in realtime, and demo the system built to investigate and mitigate the problem. We’ll decompose prompts into competing foci, run prompt ablation tests, measure instruction adherence, and iteratively reshape prompts to improve reliability.

The core operational insight: increasing context size often decreases instruction adherence unless attention is actively controlled.`,
  },
  {
    name: "Yomi Eluwande",
    org: "Dash0",
    talk: "Red teaming AI performance ideas: what survived measurement",
    talkType: "lightning",
    profileUrl: "https://www.linkedin.com/in/eluwandeyomi/",
    orgUrl: "https://www.dash0.com",
    image: "yomi.png",
    abstract: `AI agents produce plenty of performance ideas. Deciding which are worth shipping is a separate problem.

Our product uses a hand-written Canvas flamegraph renderer that was already heavily optimized. We ran 43 agent passes and collected 66 proposed optimizations. Microbenchmarks reduced the list to eight candidates. Live product measurements reduced it to one PR with two changes.

The first change merged two render passes and used a cached character-width table for label fitting. The second copied layout values into flat Float64Array data. This removed repeated Arrow reads and numeric conversions from each repaint.

Normal renders moved from about 21 ms to 6 ms. Inverted renders moved from about 44 ms to 8 ms. This lightning talk shows how the two changes work, and why measurement rejected the more obvious ideas.`,
  },
];
