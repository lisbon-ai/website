export type Speaker = {
	name: string;
	role: string;
	org: string;
	topic: string;
	profileUrl?: string;
	orgUrl?: string;
};

export const speakers: Speaker[] = [
	{
		name: "Steve Ruiz",
		role: "Founder",
		org: "TLDraw",
		topic: "MC",
		profileUrl: "https://x.com/steveruizok",
		orgUrl: "https://tldraw.dev/",
	},
	{ name: "More", role: "Growth & Eng", org: "soon", topic: "" },
];
