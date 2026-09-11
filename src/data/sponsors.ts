export type Sponsor = {
  name: string;
  url?: string;
  logo?: string; // filename in public/images/sponsors
  logoClass?: string; // optional Tailwind height override, defaults to "h-8"
};

export type SponsorTier = {
  label: string;
  sponsors: Sponsor[];
  gridClass?: string; // Tailwind grid-cols override for this tier's logo grid
  cols?: number; // logos per row; a short last row stretches to fill the width
  panelClass?: string; // optional background/border treatment for the tier panel
};

// Logos are added per tier once confirmed — leave `sponsors` empty to show a
// "coming soon" placeholder for that tier.
export const sponsorTiers: SponsorTier[] = [
  {
    label: "Platinum",
    gridClass: "grid-cols-1",
    panelClass: "border-t border-x border-white/10",
    sponsors: [
      { name: "Cloudflare", url: "https://www.cloudflare.com", logo: "cloudflare.svg" },
    ],
  },
  {
    label: "Gold",
    // Four logos as 2 x 2. The nth-child rule drops the right border on the
    // second column so it doesn't double up against the panel's own border-x.
    gridClass: "grid-cols-2 [&>*:nth-child(2n)]:border-r-0",
    panelClass: "border-x border-white/10",
    sponsors: [
      { name: "AWS", url: "https://aws.amazon.com/", logo: "aws.png", logoClass: "h-6" },
      { name: "DoiT", url: "https://www.doit.com", logo: "doit.png", logoClass: "h-4" },
      { name: "Humanos", url: "https://www.humanos.tech", logo: "humanos.svg", logoClass: "h-5" },
      { name: "CNCA", url: "https://bsc-aifactory.eu", logo: "cnca.svg", logoClass: "h-9" },
    ],
  },
  {
    label: "Silver",
    gridClass: "grid-cols-3",
    panelClass: "border-x border-white/10",
    sponsors: [
      { name: "YLD", url: "https://yld.com", logo: "yld.svg", logoClass: "h-10" },
      { name: "Supabase", url: "https://supabase.com", logo: "supabase.svg" },
      { name: "Duvo AI", url: "https://www.duvo.ai", logo: "duvo-ai.svg", logoClass: "h-6" },
    ],
  },
  {
    label: "Community",
    // Three logos per row, laid out on a six-unit track so a short last row
    // can stretch across the full width rather than trail off into blanks.
    gridClass: "grid-cols-6",
    cols: 3,
    panelClass: "border-x border-white/10",
    sponsors: [
      { name: "tldraw", url: "https://tldraw.dev/", logo: "tldraw.svg", logoClass: "h-4" },
      { name: "Zed", url: "https://zed.dev", logo: "zed.svg", logoClass: "h-4" },
      { name: "Loka", url: "https://www.loka.com", logo: "loka.svg", logoClass: "h-4" },
      { name: "Sperid Labs", url: "https://speridlabs.com", logo: "sperid-labs.svg", logoClass: "h-4" },
      { name: "Neywa Labs", url: "https://neywalabs.ai", logo: "neywa-labs.svg", logoClass: "h-3.5" },
      { name: "QuiverAI", url: "https://quiver.ai/", logo: "quiver.svg", logoClass: "h-3.5" },
      { name: "Augusta Labs", url: "https://www.augustalabs.ai", logo: "augusta-labs.svg", logoClass: "h-5" },
      { name: "Todoist", url: "https://www.todoist.com", logo: "todoist.svg", logoClass: "h-5" },
      { name: "Clevia", url: "https://www.clevia.ai", logo: "clevia.svg", logoClass: "h-4" },
      { name: "Laika Ventures", url: "https://www.laikaventures.co", logo: "laika-ventures.svg", logoClass: "h-3" },
      { name: "Kfund", url: "https://kfund.vc", logo: "kfund.svg", logoClass: "h-4" },
      { name: "Superagent", url: "https://superagent.sh", logo: "superagent.svg", logoClass: "h-4" },
      { name: "Capital Factory", url: "https://www.capitalfactory.com", logo: "capital-factory.svg", logoClass: "h-4" },
    ],
  },
];
