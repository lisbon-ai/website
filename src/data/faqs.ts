export type Faq = { q: string; a: string; aHtml?: string };

export const faqs: Faq[] = [
  {
    q: "What are the dates of the conference?",
    a: "Lisbon AI 2026 takes place September 23–24, 2026.",
  },
  {
    q: "Where is the conference being held?",
    a: "The 2026 edition of LisbonAI will be at the Center for the Unknown at Fundação Champalimaud in Lisbon. The name couldn't be more appropriate, in the current times.",
  },
  {
    q: "Who can attend?",
    a: "Engineers, researchers, and builders shipping AI in production. Tickets are limited to around 400 attendees.",
  },
  {
    q: "Will talks be recorded?",
    a: "Yes, most talks are recorded and shared after the event.",
  },
  {
    q: "Can I volunteer?",
    a: "Yes, you can. If you're interested in volunteering submit your application.",
    aHtml:
      'Yes, you can. If you\'re interested in volunteering <a href="https://resisted-geranium-f4e.notion.site/3d4b0dd5c34f804c9a74ebad36f7efeb" target="_blank" rel="noopener noreferrer" class="underline hover:text-cream">submit your application</a>.',
  },
  {
    q: "Who is organizing this?",
    a: "Lisbon AI is organized by a small team of engineers and operators from around Portugal.",
  },
];
