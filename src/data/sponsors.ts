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
  panelClass?: string; // optional background/border treatment for the tier panel
};

// Logos are added per tier once confirmed — leave `sponsors` empty to show a
// "coming soon" placeholder for that tier.
export const sponsorTiers: SponsorTier[] = [
  // {
  //   label: "Platinum",
  //   gridClass: "grid-cols-1",
  //   panelClass: "border-t border-x border-white/10",
  //   sponsors: [
  //     { name: "Cloudflare", url: "https://cloudflare.com", logo: "cloudflare.svg" },
  //   ],
  // },
  {
    label: "Gold",
    gridClass: "grid-cols-2",
    panelClass: "border-t border-x border-white/10",
    sponsors: [
      { name: "DoiT", url: "https://www.doit.com", logo: "doit.png", logoClass: "h-4" },
      { name: "Humanos", url: "https://www.humanos.tech", logo: "humanos.svg", logoClass: "h-5" },
    ],
  },
  {
    label: "Silver",
    gridClass: "grid-cols-2",
    panelClass: "border-x border-white/10",
    sponsors: [
      { name: "YLD", url: "https://www.yld.io", logo: "yld.svg", logoClass: "h-10" },
      { name: "Supabase", url: "https://supabase.com", logo: "supabase.svg" },
    ],
  },
  {
    label: "Community",
    // Two rows of two. The nth-child rule drops the right border on the last
    // column so it doesn't double up against the panel's own border-x.
    gridClass: "grid-cols-2 [&>*:nth-child(2n)]:border-r-0",
    panelClass: "border-x border-white/10",
    sponsors: [
      { name: "tldraw", url: "https://tldraw.dev/", logo: "tldraw.svg", logoClass: "h-4" },
      { name: "Zed", url: "https://zed.dev", logo: "zed.svg", logoClass: "h-4" },
      { name: "Loka", url: "https://www.loka.com", logo: "loka.svg", logoClass: "h-4" },
      { name: "Sperid Labs", url: "https://speridlabs.com", logo: "sperid-labs.svg", logoClass: "h-4" },
    ],
  },
];
