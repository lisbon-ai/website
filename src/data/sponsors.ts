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
  {
    label: "Gold",
    gridClass: "grid-cols-1",
    panelClass: "border-t border-x border-white/10",
    sponsors: [
      { name: "Cloudflare", url: "https://cloudflare.com", logo: "cloudflare.svg" },
    ],
  },
  {
    label: "Silver",
    gridClass: "grid-cols-2 sm:grid-cols-3",
    panelClass: "border-x border-white/10",
    sponsors: [
      { name: "YLD", url: "https://www.yld.io", logo: "yld.svg", logoClass: "h-10" },
      { name: "Supabase", url: "https://supabase.com", logo: "supabase.svg" },
      { name: "DoiT", url: "https://www.doit.com", logo: "doit.png", logoClass: "h-4" },
    ],
  },
];
