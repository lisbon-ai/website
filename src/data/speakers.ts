export type Speaker = {
  name: string;
  role: string;
  org: string;
  profileUrl?: string;
  orgUrl?: string;
  image?: string;
};

export const speakers: Speaker[] = [
  {
    name: "Steve Ruiz",
    role: "Founder",
    org: "TLDraw",
    profileUrl: "https://x.com/steveruizok",
    orgUrl: "https://tldraw.dev/",
    image: "steve.png",
  },
  {
    name: "Ben Brandt",
    role: "Creator of ACP",
    org: "Zed Industries",
    profileUrl: "https://x.com/benjaminbrandt",
    orgUrl: "https://zed.dev",
    image: "ben.png",
  },
  {
    name: "Matt Carey",
    role: "Agents & MCP",
    org: "Cloudflare",
    profileUrl: "https://x.com/mattzcarey",
    orgUrl: "https://cloudflare.com",
    image: "matt.png",
  },
  {
    name: "Duarte Carmo",
    role: "Consultant",
    org: "Independent",
    profileUrl: "https://x.com/duarteocarmo",
    orgUrl: "https://duarteocarmo.com/",
    image: "duarte.png",
  },
  {
    name: "Diogo Mónica",
    role: "Founder",
    org: "Anchorage, Haun Ventures",
    profileUrl: "https://x.com/diogomonica",
    orgUrl: "https://www.haun.co/",
    image: "diogo.png",
  },
  {
    name: "Joan Rodriguez",
    role: "CEO & Chief Scientist",
    org: "QuiverAI",
    profileUrl: "https://x.com/joanrod_ai",
    image: "joan.png",
  },
];
