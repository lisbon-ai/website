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
    logo: "promptlayer.svg",
    image: "will.png",
    bio: "Will Burstein is Head of Product at PromptLayer, where he works with teams building production LLM applications. His work focuses on practical evaluation, review, and release workflows that help product and engineering teams move from ad hoc prompt iteration to repeatable quality loops. He speaks about AI evals, scorecards, and how teams make reliable product decisions around probabilistic systems.",
  },
];
