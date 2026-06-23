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
    orgUrl: "https://zed.dev",
    image: "ben.png",
  },
  {
    name: "Matt Carey",
    role: "Agents & MCP",
    org: "Cloudflare",
    orgUrl: "https://cloudflare.com",
    image: "matt.png",
  },
  {
    name: "Duarte Carmo",
    role: "Consultant",
    org: "Independent",
    orgUrl: "https://duarteocarmo.com/",
    image: "duarte.png",
  },
  {
    name: "Diogo Mónica",
    role: "Founder",
    org: "Anchorage, Haun Ventures",
    orgUrl: "https://www.haun.co/",
    image: "diogo.png",
  },
  {
    name: "Joan Rodriguez",
    role: "CEO & Chief Scientist",
    org: "QuiverAI",
    image: "joan.png",
  },
];
