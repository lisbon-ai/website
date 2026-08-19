export type Speaker = {
  name: string;
  role: string;
  title: string;
  org: string;
  profileUrl?: string;
  orgUrl?: string;
  logo?: string;
  image?: string;
  bio?: string;
};

// Most logos read well at h-4; these wordmarks need a nudge to match optically.
const logoHeights: Record<string, string> = {
  "huggingface.svg": "h-7",
  "roboflow.svg": "h-5",
};
export const logoHeight = (logo: string) => logoHeights[logo] ?? "h-4";

export const speakers: Speaker[] = [
  {
    name: "Steve Ruiz",
    role: "Founder & CEO",
    org: "tldraw",
    profileUrl: "https://x.com/steveruizok",
    orgUrl: "https://tldraw.dev/",
    logo: "tldraw.svg",
    image: "steve.png",
    bio: "Artist-turned-engineer. At tldraw he's building collaborative design tools that feel like magic and work like code. Previously create interfaces and content at Play and Framer. Likes CRDTs, canvas APIs, and prototyping ideas faster than light.",
  },
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
    role: "Founder & AI Consultant",
    org: "Independent",
    profileUrl: "https://x.com/duarteocarmo",
    orgUrl: "https://duarteocarmo.com/",
    image: "duarte.png",
    bio: "Duarte is an AI technologist and consultant based in Copenhagen, working across ML/AI, data, and software. His background spans pharma, climate tech, and YC-backed startups.",
  },
  {
    name: "Diogo Mónica",
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
    role: "Co-founder, CEO & Chief Scientist",
    org: "QuiverAI",
    profileUrl: "https://x.com/joanrod_ai",
    orgUrl: "https://quiver.ai/",
    logo: "quiver.svg",
    image: "joan.png",
    bio: "Joan Rodriguez is CEO and founder of QuiverAI, building AI models that create and edit vector graphics for professional design. He holds a PhD from Mila and previously created StarVector, the research seed for QuiverAI. QuiverAI has raised $8.3M and operates out of San Francisco with a 15-person global team.",
  },
  {
    name: "Aayush Kapoor",
    role: "Software Engineer, AI SDK",
    org: "Vercel",
    profileUrl: "https://x.com/aayushkapoor",
    orgUrl: "https://vercel.com",
    logo: "vercel.svg",
    image: "aayush.png",
    bio: "Aayush Kapoor is a software engineer at Vercel in New York, working on developer tools and the AI SDK library. He holds a Master's in Computer Science from Old Dominion University, with a background in AI systems and applied machine learning.",
  },
  {
    name: "Sergio Paniego",
    role: "ML Engineer",
    org: "Hugging Face",
    profileUrl: "https://x.com/SergioPaniego",
    orgUrl: "https://huggingface.co",
    logo: "huggingface.svg",
    image: "sergio.png",
    bio: "Sergio is a Machine Learning Engineer at Hugging Face focused on developer advocacy, where he works on post-training and RL environments as a developer of TRL and OpenEnv. He holds a PhD in artificial intelligence and has contributed to open source for over a decade, including more than eight years in Google Summer of Code as a developer and mentor.",
  },
  {
    name: "Will Burstein",
    role: "Head of Product",
    org: "PromptLayer",
    profileUrl: "https://linkedin.com/in/willburstein",
    orgUrl: "https://www.promptlayer.com",
    logo: "promptlayer.png",
    image: "will.png",
    bio: "Will Burstein is Head of Product at PromptLayer, where he works with teams building production LLM applications. His work focuses on practical evaluation, review, and release workflows that help product and engineering teams move from ad hoc prompt iteration to repeatable quality loops. He speaks about AI evals, scorecards, and how teams make reliable product decisions around probabilistic systems.",
  },
  {
    name: "Chema Garabito",
    role: "Founder",
    org: "Sperid Labs",
    profileUrl: "https://x.com/chema_garabito",
    orgUrl: "https://speridlabs.com",
    logo: "speridlabs.svg",
    image: "chema.png",
    bio: "Chema Garabito is founder of Sperid Labs, a Spatial AI lab building foundation models for understanding, reconstructing, simulating, and generating the 3D world.",
  },
  {
    name: "Piotr Skalski",
    role: "Open Source Lead",
    org: "Roboflow",
    profileUrl: "https://x.com/skalskip92",
    orgUrl: "https://roboflow.com",
    logo: "roboflow.svg",
    image: "piotr.png",
    bio: "Piotr Skalski is Open Source Lead at Roboflow with nearly nine years in computer vision. He has built open-source projects totaling over 80,000 GitHub stars and has produced more than 40 blog posts plus over 60 YouTube videos on key models. His work includes sports applications such as Football AI and Basketball AI. He is also passionate about vision-language models.",
  },
  {
    name: "Cristiana Carpinteiro",
    role: "ML Engineer",
    org: "Loka",
    profileUrl: "https://www.linkedin.com/in/crscarpinteiro/",
    orgUrl: "https://www.loka.com",
    logo: "loka.svg",
    image: "cristiana.png",
    bio: "Cristiana Carpinteiro is a bioengineer turned ML engineer at Loka, working on AI-driven drug discovery with models for molecular generation, property prediction, and interaction analysis. Her work spans deep learning, distributed computing, and scalable data pipelines built to handle DNA-encoded libraries with billions of molecules, using PyTorch and MLOps on AWS to optimize training and deployment. She enjoys bridging the gap between scientists and engineers in multidisciplinary teams.",
  },
];
