export type Speaker = {
  name: string;
  org: string;
  role?: string;
  title?: string;
  // Empty until the talk title is confirmed.
  talk?: string;
  talkType: "full" | "lightning" | "interviewer";
  profileUrl?: string;
  orgUrl?: string;
  logo?: string;
  image?: string;
  bio?: string;
  // Talk details shown on /talks. Supports Markdown links, lists, and images.
  abstract?: string;
};

// Most logos read well at h-4; these need a nudge up or down to match optically.
const logoHeights: Record<string, string> = {
  "huggingface.svg": "h-7",
  // Tall or heavy glyphs that hold their own below the default.
  "dash0.svg": "h-3",
  "haun.svg": "h-3",
  "peecai.svg": "h-3",
  "quiver.svg": "h-3",
  "vercel.svg": "h-3",
  "roboflow.svg": "h-5",
  "cloudflare.svg": "h-5",
  // Square marks and stacked lockups rather than single-line wordmarks, so
  // they need the most height for their type to stay legible.
  "evilmartians.svg": "h-8",
  "petsapp.svg": "h-8",
  "yld.svg": "h-10",
};
export const logoHeight = (logo: string) => logoHeights[logo] ?? "h-4";

// A speaker gets a card on /speakers and the landing page once their details
// have landed: a photo and a bio alongside the name. The rest exist so the
// schedule can reference them in the meantime.
export const hasCard = (speaker: Speaker) =>
  Boolean(speaker.image && speaker.bio);

// Speakers whose talk title is still unconfirmed appear as TBD on the
// schedule and are held back from /talks until there is a title to show.
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
    role: "Founder & CEO",
    org: "tldraw",
    talkType: "full",
    profileUrl: "https://x.com/steveruizok",
    orgUrl: "https://tldraw.dev/",
    logo: "tldraw.svg",
    image: "steve.png",
    bio: "Artist-turned-engineer. At tldraw he's building collaborative design tools that feel like magic and work like code. Previously create interfaces and content at Play and Framer. Likes CRDTs, canvas APIs, and prototyping ideas faster than light.",
  },
  {
    name: "Lukas Wirth",
    role: "Rust-analyzer Lead",
    org: "Zed",
    talk: "Post-Git Agentic Collaboration",
    talkType: "full",
    profileUrl: "https://github.com/veykril",
    orgUrl: "https://zed.dev",
    logo: "zed.svg",
    image: "lukas.png",
    bio: "Lukas Wirth leads the rust-analyzer team, shaping the official Rust language server he’s worked on since 2021. He joined Zed in August 2025 to help build the next-generation editor with a focus on collaboration, building on a background in safety-critical Rust toolchains and co-authoring the Ferrocene Language Specification.",
    abstract: "The more we work with AI agents, the more Git’s limits become our limits. Git preserves snapshots of code, not the conversations and intermediate decisions agents need to understand a project, forcing people to reconstruct that state whenever work changes hands. This talk demonstrates Delta, a native and web collaboration environment backed by DeltaDB, where fine-grained history keeps code and conversation together in shared multiplayer threads so humans and agents can inspect, continue and shape the same work.",
  },
  {
    name: "Matt Carey",
    role: "AI Engineer",
    org: "Cloudflare",
    talk: "Agents that Scale",
    talkType: "full",
    profileUrl: "https://x.com/mattzcarey",
    orgUrl: "https://cloudflare.com",
    logo: "cloudflare.svg",
    image: "matt.png",
    bio: "Matt Carey works on agents and MCP at Cloudflare. He built Cloudflare MCP server, Artifacts and he is a maintainer of MCP Typescript SDK.",
    abstract: `Build agents that scale up to everyone on the planet.

![Oprah Winfrey pointing to the audience with the words “You get an agent” above and below.](images/talks/you-get-an-agent.png)`,
  },
  {
    name: "Duarte Carmo",
    role: "Founder & AI Consultant",
    org: "Independent",
    talk: "The Hitchhiker’s Guide to European Portuguese LLMs",
    talkType: "full",
    profileUrl: "https://x.com/duarteocarmo",
    orgUrl: "https://duarteocarmo.com/",
    image: "duarte.png",
    bio: "Duarte is an AI technologist and consultant based in Copenhagen, working across ML/AI, data, and software. His background spans pharma, climate tech, and YC-backed startups.",
    abstract: `Large language models are eating the world. Frontier labs keep pushing the boundary, open-weights models are quickly closing the gap, Europe is — as always — stuck somewhere in the middle, and even Portugal has now released AMÁLIA, its own effort in the space.

But what does it actually take to build an LLM trained on European Portuguese data? Why would you? And where do you start when there is so little data? In this talk, I’ll walk through my work on European Portuguese LLMs: from building benchmarks, to finding and filtering data, to training models, and everything in between. We’ll probably leave with more questions than answers, but hopefully we’ll learn something along the way.`,
  },
  {
    name: "Diogo Mónica",
    role: "General Partner",
    org: "Anchorage, Haun Ventures",
    talkType: "full",
    profileUrl: "https://x.com/diogomonica",
    orgUrl: "https://www.haun.co/",
    logo: "haun.svg",
    image: "diogo.png",
    bio: "Diogo is a General Partner at Haun Ventures and co-founder of Anchorage Digital, the first federally chartered crypto-native bank in the US. He previously led security at Square and Docker, and holds a Ph.D. in computer science from Instituto Superior Técnico.",
  },
  {
    name: "Joan Rodriguez",
    role: "Co-founder, CEO & Chief Scientist",
    org: "QuiverAI",
    talk: "Design as visual code",
    talkType: "full",
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
    role: "Software Engineer, AI SDK",
    org: "Vercel",
    talk: "The Slopbowl-ification of Software",
    talkType: "full",
    profileUrl: "https://x.com/aayushkapoor_",
    orgUrl: "https://vercel.com",
    logo: "vercel.svg",
    image: "aayush.png",
    bio: "Aayush Kapoor is a software engineer at Vercel in New York, working on developer tools and the AI SDK library. He holds a Master's in Computer Science from Old Dominion University, with a background in AI systems and applied machine learning.",
    abstract: "AI has made writing code dramatically cheaper. We can add another feature, abstraction, integration or configuration option almost instantly. Software is beginning to resemble a slopbowl: you start with a base, keep adding ingredients and hope the result is better than the sum of its parts. But every addition changes the whole system. One bad ingredient can overwhelm the bowl, causing even individually reasonable features to turn useful software into an incoherent, bloated system. Taste becomes the differentiator. In this talk, we’ll examine the importance of strong foundations, the hidden cost of “just one more prompt bro” and why restraint and taste become more valuable as code gets cheaper.",
  },
  {
    name: "Sergio Paniego",
    role: "ML Engineer",
    org: "Hugging Face",
    talk: "Training a coding agent through a harness you did not write",
    talkType: "full",
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
    role: "Head of Product",
    org: "PromptLayer",
    talk: "From Vibes to Scorecards: Building Review Loops for Production AI",
    talkType: "full",
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
    role: "Founder",
    org: "Sperid Labs",
    talk: "Spatial AI and 3D World Models",
    talkType: "full",
    profileUrl: "https://x.com/chema_garabito",
    orgUrl: "https://speridlabs.com",
    logo: "speridlabs.svg",
    image: "chema.png",
    bio: "Chema Garabito is founder of Sperid Labs, a Spatial AI lab building foundation models for understanding, reconstructing, simulating, and generating the 3D world.",
    abstract: "We will explore Spatial AI and 3D World Models: systems that move beyond generating pixels to building coherent, persistent, and queryable representations of the physical world. We will cover the fundamental problem we aim to solve, the key technical challenges involved, and the applications this shift could unlock across robotics, simulation, media, gaming, and other real-world industries.",
  },
  {
    name: "Piotr Skalski",
    role: "Open Source Lead",
    org: "Roboflow",
    talk: "Computer Vision, Meet Sports",
    talkType: "full",
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
    role: "ML Engineer",
    org: "Loka",
    talk: "Foundation Models for Drug Discovery: From Hype to the Lab",
    talkType: "full",
    profileUrl: "https://www.linkedin.com/in/crscarpinteiro/",
    orgUrl: "https://www.loka.com",
    logo: "loka.svg",
    image: "cristiana.png",
    bio: "Cristiana Carpinteiro is a Machine Learning Engineering Lead based in Porto, with a background in Bioengineering from FEUP and a career entirely dedicated to the biotech field. She currently works at Loka, an AWS Premier Partner consultancy, developing AI for drug discovery and covering challenges that span molecule screening and optimization to model training on large-scale datasets. Previously, she worked at two startups, including one building technology to detect Alzheimer's disease from blood samples. Her experience sits at the intersection of science, technology, and innovation, bridging research and engineering teams to bring ML into real-world biotech applications.",
    abstract: "LLMs learned to read and write human language. Can the same architectures learn to read the language of biology, well enough to help scientists discover new drugs? At Loka, we've been helping clients answer this question by working with companies at every stage of the drug discovery pipeline. In this talk, we'll cover where foundation models can already help, what's still hype, and what gaps remain. We'll ground this in our own experience with Nurix, a biopharma company developing drugs for cancer and immune diseases, where we helped build a foundation model to screen their 5-billion-molecule library. This tool is used daily by scientists to help them decide which molecules move to the lab, and it has already identified molecules that actually bind to the targets of interest.",
  },
  {
    name: "Marcelo Lebre",
    role: "Co-founder & President",
    org: "Remote",
    talk: "Icarus, operational harness",
    talkType: "full",
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
    orgUrl: "https://olivegradient.com",
    talk: "Building AI people trust without giving away the product",
    talkType: "lightning",
    image: "afonso.png",
    bio: "Afonso Oliveira has spent 14 years figuring out how to make AI useful. He first applied this in research, earning a PhD with honors from Instituto Superior Técnico on neural networks for 5G resource allocation, then brought that rigor into product development. At Siemens, he turned scattered AI projects into a unified product that cut proof-of-concept delivery from a week to under an hour. At Mindmymind, he built cognitive profiling and self-reflection systems where ML, games, and LLMs meet mental health. Today he writes and consults on AI engineering through OliveGradient, while advising on and implementing AI solutions for a growing SME. Somewhere along the way he also co-founded a startup, earned awards at international hackathons, spoke at AI conferences and wrote a chapter in a book on AI published by ISCTE.",
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
    image: "alcides.png",
    bio: "Alcides Fonseca is an Associate Professor at the University of Lisbon, where he teaches Compilers, Functional Programming and Software Engineering. His research covers the intersection of artificial intelligence, programming languages and software engineering. In particular, he has been working on aeon, a programming language designed for program synthesis with logical guardrails. On the side, he has worked on and with several startups: Smash, Sentilant, Genomed and, currently, Dragonboat.",
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
    logo: "humanos.svg",
    image: "artur.png",
    bio: "Artur Goulão is co-founder and Chief AI Officer at Humanos, and the creator of VIA Protocol, an authorization and credential issuance layer for AI agents built on W3C Verifiable Credentials 2.0, in production across healthcare and insurance. A repeat founder, he previously co-founded Utrust (acquired) and Exclusible. His work focuses on runtime trust infrastructure: verifiable identity, delegated authority and cryptographic accountability for autonomous systems.",
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
    image: "bojan.png",
    bio: "Bojan Jakimovski is a Machine Learning and Applied Research Lead at Loka, an AWS Ambassador, 9x AWS Certified engineer, and College Professor at Brainster Next. He works at the intersection of applied GenAI, inference infrastructure, MLOps, and cloud-native AI systems, helping teams move models from experiments into production. He is active in open source and research, with interests spanning LLM pre-training and post-training, small language models, synthetic data generation, and distributed systems, and recent work on open-source model experiments and production deployments using AWS Trainium and Inferentia.",
    abstract: "Can an open model learn to investigate biological evidence, use scientific tools, and produce structured reasoning? To find out, we at Loka teamed up with Arcee and AWS and post-trained Arcee AI's Trinity Mini (a 26B-parameter mixture-of-experts LLM with 3B active parameters) into a biomedical AI scientist, using RLVR with GRPO across two RL environments. It worked. Over 21 controlled auto-research runs, held-out Drug Tool accuracy climbed from 70.8% to 81.2%, and BioReason accuracy reached 86.3%. In this session we'll show you how: optimizing the environment before the policy, designing rewards that expose the right failures, rejecting plausible ablations, and keeping every single run inspectable. Then we close the loop, pairing the trained model with an open-source agentic harness that makes a strong model stronger. Our thesis is simple. Science needs models we can inspect, adapt, evaluate, and improve, not black boxes we can only query.",
  },
  {
    name: "Boda Zhao",
    org: "YLD",
    talk: "Prevent supply chain attacks in coding agents",
    talkType: "lightning",
    profileUrl: "https://www.linkedin.com/in/boda-zhao/",
    orgUrl: "https://yld.com",
    logo: "yld.svg",
    image: "boda.png",
    bio: "Boda Zhao is a software engineer at YLD with over seven years of professional experience. He holds a Master’s in Computer Science from the University of York and is a frequent public speaker, passionate about demystifying modern software and bringing clarity and fresh perspectives to the developer community.",
    abstract: "Autonomous agents are accelerating development, but they also increase the risk of supply chain attacks. This talk outlines actionable strategies to secure coding agents and broader agentic workflows. Attendees will leave with a clear mental starting point to help their teams navigate this rapidly evolving threat landscape.",
  },
  {
    name: "Daniel Bukac",
    org: "Duvo",
    talk: "Screen-aware voice agents: a new interaction pattern",
    talkType: "lightning",
    profileUrl: "https://www.linkedin.com/in/daniel-bukac-9b45a5279",
    orgUrl: "https://www.duvo.ai",
    logo: "duvo.svg",
    image: "daniel.png",
    bio: "I was the second engineer to join Duvo AI, where I led our browsing and computer-use work before taking on Duvo Clarity - a process mapping engine that helps companies understand how they actually operate before they try to automate it.",
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
    logo: "cloudflare.svg",
    image: "harshil.png",
    bio: "Harshil Agrawal is a Senior Developer Educator at Cloudflare, where he helps developers build with data, storage, and AI technologies. Based in Berlin, he has spent six years in developer relations creating practical education, building production applications, and speaking about web development, AI agents, and developer platforms.",
    abstract: "Containers have become the default for running AI-generated code, but for interactive apps, the cold start tax kills you. PromptMotion, my AI video generation app waited seconds for a container to spin up before a user could see a preview. The cost of keeping containers warm was unsustainable. The architecture — Durable Objects, networking, lifecycle management — was more complex than the app itself. This talk covers my migration from containers to V8 isolates (Dynamic Workers). Sub-millisecond cold starts, lower cost, faster previews. But the move wasn't free: I lost the file system, had to rethink how skills and tools work inside an isolate, and rebuilt the previewing, rendering, and download pipeline from scratch. I'll show what broke, what I used to replace the file system, how Artifacts solved versioning, and what I'd do differently if I started over.",
  },
  {
    name: "Jack Fitzsimons",
    org: "Oblivious",
    orgUrl: "https://www.oblivious.com",
    logo: "oblivious.svg",
    talk: "The PR is the Eval",
    talkType: "lightning",
    profileUrl: "https://www.linkedin.com/in/jack-f-300810122/",
    image: "jack.png",
    bio: "Jack Fitzsimons is a founder and researcher whose work spans statistical machine learning, foundation-model systems and trustworthy AI. He holds a DPhil in Machine Learning from Oxford, where he researched scalable kernel methods, Bayesian learning, algorithmic fairness and quantum machine learning. He has applied AI at NASA JPL, ElectroRoute and Disperse, and co-founded Oblivious. Today, he focuses on building more capable and reliable LLM systems and the infrastructure and safeguards needed to deploy AI securely, privately and fairly.",
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
    logo: "evilmartians.svg",
    image: "nina.png",
    bio: "Frontend Engineer at Evil Martians, a product development consultancy. I'm driven by turning ideas into easy-to-use products and articles, and I love speaking publicly — lately, more and more about security. As cyber attacks grow in frequency and scale, I've become deeply invested in what we, as developers, can actually do to prevent them.",
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
    logo: "peecai.svg",
    image: "oguz.png",
    bio: "Oğuz is a senior data scientist at Peec AI, where he builds advanced data-driven systems for AI Search Visibility Analytics. He has a background in Computer Science, Natural Language Processing, and Data Engineering/Analytics.",
    abstract: `Most prompt engineering is a person staring at outputs and editing by hand. This talk shows how to automate that judgment instead. A small model generates outputs, a set of reward models score each one and explain its failures in natural language, and a heavy optimizer rewrites the meta-prompt from that feedback history. The loop repeats until rewards converge, and the result ships as a static prompt, so production pays no extra latency or cost.

The interesting part is where it goes wrong. I will walk through a production failure at Peec AI, where we run this loop to generate brand-tracking queries across many clients, languages, and markets. I will show how the optimizer can be working perfectly and still produce bad outputs when the reward is underspecified.

The takeaway for builders: reward design is the real engineering work, natural-language failure explanations are a far better signal than aggregate scores, and an expensive model earns its keep as an offline evaluator amortized over every future call.`,
  },
  {
    name: "Prince Canuma",
    org: "Neywa Labs",
    talkType: "full",
    profileUrl: "https://www.linkedin.com/in/prince-canuma/",
    orgUrl: "https://neywalabs.ai",
    logo: "neywalabs.svg",
    image: "prince.png",
    bio: "Prince Canuma is the Founder & CEO of Neywa Labs, building the inference layer for multimodal AI on Apple Silicon, and Nativ, a native macOS app for running AI models locally. He’s the creator of mlx-vlm and mlx-audio — open-source libraries with millions of downloads and partnerships with Google DeepMind, Hugging Face, Liquid AI, Cohere, and more.",
  },
  {
    name: "Simão Nogueira",
    org: "Noticed",
    talk: "Evals as the code factory",
    talkType: "lightning",
    profileUrl: "https://www.linkedin.com/in/policarponogueira/",
    orgUrl: "https://www.noticed.so",
    logo: "noticed.png",
    image: "simao.png",
    bio: "Simão is a co-founder of noticed, building AI models for professional relationships, and an experienced technical AI and engineering leader. A designer turned developer turned founder, he holds a bachelor’s degree in design and a master’s degree in business from Católica Lisbon School of Business and Economics. His master’s thesis on European startup accelerator design won Católica Lisbon’s Best Master Thesis Award. He led AI at Talent Protocol, where he built a scoring system used by organisations like Coinbase to distribute $600K+ in incentives to software developers. Simão also co-founded Input/Reach, an AI knowledge-management startup, and Web3Grad, which helped hundreds of candidates move into web3 careers. He led company-wide GenAI adoption strategy at Critical Software.",
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
    logo: "petsapp.svg",
    image: "thom.png",
    bio: "Thom is co-founder and CEO of PetsApp, helping millions of pets access care through hundreds of veterinary clinics. He received the Royal College of Veterinary Surgeons Impact Award in 2024 for his contributions to innovation in veterinary medicine. Having trained as a vet and zoologist at Cambridge University, he recently became interested in the behavioral ecology of AI systems. That work led him to develop Focal Prompt, an open-source toolkit for investigating how AI agents allocate attention across complex prompts and how to identify context that helps, distracts, or gets ignored.",
    abstract: `You've tried bribes. You've tried threats. YOUR ENTIRE PROMPT IS IN ALL CAPS AT THIS POINT. And yet, even with these highly sophisticated prompt engineering techniques, your agent still won't listen to you, or your users.

I've been there... PetsApp runs AI copilots across veterinary clinics, handling client communication, triage workflows, and operational support for millions of pets.

As these systems evolved larger context windows, more tools, and longer memory, I fully expected reliability to improve. But somehow our agent still repeatedly offered dog owners appointments at a cat-only clinic.

The instruction was right there in the prompt for all to see. But it had clearly lost behavioral dominance against competing context. We started calling this instruction drift: the tendency for important business and safety constraints to lose influence inside long-context agentic systems.

In this session we'll tear apart our naive prompt architecture in realtime, and demo the system built to investigate and mitigate the problem. We’ll decompose prompts into competing foci, run prompt ablation tests, measure instruction adherence, and iteratively reshape prompts to improve reliability.

The core operational insight: increasing context size often decreases instruction adherence unless attention is actively controlled.`,
  },
  {
    name: "Vitalii Ratushnyi",
    role: "Lead Research Engineer",
    org: "Harmix.AI",
    talk: "Agentic Memory in a nutshell: Do’s and Don’ts",
    talkType: "lightning",
    profileUrl: "https://www.linkedin.com/in/v-ratyshnyi/",
    orgUrl: "https://www.harmix.ai/",
    image: "vitalii.png",
    bio: "Lead Research Engineer @ Harmix.AI working on long-term memory for Agents (1-10B tokens inputs), ex-Quant, currently in Madrid.",
    abstract: `Context windows are barely working beyond 400k, and the context we work over across several days  easilty overcome 10-50M tokens. The community has no consensus over what memory looks like for long-running agents, with options ranging from classic vector stores as RAGs to file-based LLM wikis and beyond (Agentic RAG/SIRA). In this lightning talk I'll compress two years of research and production experience into how to organize scalable memory and share recipes that work.`,
  },
  {
    name: "Yomi Eluwande",
    org: "Dash0",
    talk: "Red teaming AI performance ideas: what survived measurement",
    talkType: "lightning",
    profileUrl: "https://www.linkedin.com/in/eluwandeyomi/",
    orgUrl: "https://www.dash0.com",
    logo: "dash0.svg",
    image: "yomi.png",
    bio: "Yomi Eluwande is a Senior Product Engineer at Dash0. He builds observability products and developer tools, with a focus on data visualization and frontend performance. He enjoys turning performance hypotheses into measurable changes.",
    abstract: `AI agents produce plenty of performance ideas. Deciding which are worth shipping is a separate problem.

Our product uses a hand-written Canvas flamegraph renderer that was already heavily optimized. We ran 43 agent passes and collected 66 proposed optimizations. Microbenchmarks reduced the list to eight candidates. Live product measurements reduced it to one PR with two changes.

The first change merged two render passes and used a cached character-width table for label fitting. The second copied layout values into flat Float64Array data. This removed repeated Arrow reads and numeric conversions from each repaint.

Normal renders moved from about 21 ms to 6 ms. Inverted renders moved from about 44 ms to 8 ms. This lightning talk shows how the two changes work, and why measurement rejected the more obvious ideas.`,
  },
  {
    name: "David Gomes",
    org: "SpaceXAI",
    talkType: "interviewer",
    profileUrl: "https://x.com/davidgomes",
    orgUrl: "https://x.ai",
    logo: "spacexai.svg",
    image: "david.png",
    bio: "Currently member of technical staff at SpaceXAI. Former member of technical staff at Cursor and at Databricks via Neon's acquisition. Software generalist with a competitive programming spine. Started coding before high school, sharpened edge cases on the IOI stage, and built an algorithmic toolkit deep in data structures and performance hacks.",
  },
];

// The card grids on the landing page and /speakers. Only speakers whose photo
// and bio have landed get a card; the rest exist for the schedule until then.
// Full sessions lead, the lightning talks follow and interviewers close, and
// since the sort is stable each group keeps the order it has in the list above.
const cardOrder: Record<Speaker["talkType"], number> = {
  full: 0,
  lightning: 1,
  interviewer: 2,
};

export const cardSpeakers = speakers
  .filter(hasCard)
  .sort((a, b) => cardOrder[a.talkType] - cardOrder[b.talkType]);
