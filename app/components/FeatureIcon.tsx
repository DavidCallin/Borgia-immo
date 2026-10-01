// Icônes des caractéristiques : tracés simples (24×24, trait), choisis d'après le texte
// de la caractéristique, en français comme en anglais.
const ICONS: Record<string, string[]> = {
  air: ["M12 3v18", "M4.2 7.5l15.6 9", "M19.8 7.5l-15.6 9"],
  wifi: ["M2 8.8a15 15 0 0 1 20 0", "M5.5 12.2a10 10 0 0 1 13 0", "M9 15.6a5 5 0 0 1 6 0", "M12 19.2h.01"],
  tv: ["M4 4h16a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z", "M8 21h8", "M12 17v4"],
  kitchen: ["M6 3v7", "M9 3v7", "M6 10a1.5 1.5 0 0 0 3 0", "M7.5 11.5V21", "M17 21V3c-2.5 1.5-3 5-3 9h3"],
  security: ["M12 3 4 6v6c0 4.5 3.2 7.5 8 9 4.8-1.5 8-4.5 8-9V6z"],
  parking: ["M6 4h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z", "M9.5 16V8h3.5a2.5 2.5 0 0 1 0 5H9.5"],
  bath: ["M4 12h16v3a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4z", "M6 12V6.5a2 2 0 0 1 3.4-1.4", "M7 19l-1 2", "M17 19l1 2"],
  power: ["M13 2 4 14h7l-1 8 9-12h-7z"],
  washer: ["M6 2h12a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2z", "M12 18a4 4 0 1 0 0-8 4 4 0 0 0 0 8z", "M7.5 5.5h.01", "M11 5.5h.01"],
  iron: ["M3 18h18", "M3 18c0-5 4-9 9-9h6a3 3 0 0 1 3 3v6", "M8 14h8"],
  clean: ["M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8z", "M19 15l.8 2.2L22 18l-2.2.8L19 21l-.8-2.2L16 18l2.2-.8z"],
  wine: ["M7 3h10v5a5 5 0 0 1-10 0z", "M12 13v8", "M8 21h8"],
  shirt: ["M8 3 3 6l2 4 3-1v12h8V9l3 1 2-4-5-3a4 4 0 0 1-8 0z"],
  game: ["M6 7h12a4 4 0 0 1 4 4v3a4 4 0 0 1-4 4h-1.5L14 16h-4l-2.5 2H6a4 4 0 0 1-4-4v-3a4 4 0 0 1 4-4z", "M7 11v3", "M5.5 12.5h3", "M16 11.5h.01", "M18 13.5h.01"],
  terrace: ["M3 11l9-7 9 7", "M5 10v10h14V10", "M10 20v-6h4v6"],
  waves: ["M2 10c2.5 0 2.5-2 5-2s2.5 2 5 2 2.5-2 5-2 2.5 2 5 2", "M2 16c2.5 0 2.5-2 5-2s2.5 2 5 2 2.5-2 5-2 2.5 2 5 2"],
  stairs: ["M4 20h4v-4h4v-4h4V8h4"],
  shower: ["M4 21V7a4 4 0 0 1 4-4h5", "M13 7h7", "M14.5 11v1", "M17.5 11v1", "M13 15v1", "M16 15v1", "M19 15v1"],
  table: ["M3 9h18", "M6 9v11", "M18 9v11", "M9 9v4h6V9"],
  bed: ["M3 18V6", "M3 14h18v4", "M21 18v-5a3 3 0 0 0-3-3h-7v4", "M7 11.5h.01"],
  sofa: ["M4 12V9a3 3 0 0 1 3-3h10a3 3 0 0 1 3 3v3", "M3 12a2 2 0 0 1 2 2v3h14v-3a2 2 0 0 1 2-2", "M6 20v-3", "M18 20v-3"],
  check: ["M5 12.5 9.5 17 19 7.5"],
};

// L'ordre compte : la première règle qui correspond l'emporte
// (ex. « Télévision au salon » = télé, pas salon).
const RULES: [keyof typeof ICONS, RegExp][] = [
  ["air", /climatis|air.?condition/],
  ["wifi", /wi-?fi|internet|fibre|fiber/],
  ["tv", /\btv\b|télé|canal|netflix/],
  ["kitchen", /cuisine|kitchen/],
  ["security", /gardiennage|sécurité|security/],
  ["parking", /parking/],
  ["bath", /jacuzzi|baignoire|bathtub/],
  ["power", /groupe|generator/],
  ["washer", /laver|washing|sèche|dryer/],
  ["iron", /repasser|\biron\b/],
  ["clean", /ménage|entretien|cleaning|housekeeping/],
  ["wine", /\bbar\b|cave|wine/],
  ["shirt", /dressing|walk-in/],
  ["game", /jeux|play area/],
  ["terrace", /terrasse|terrace|balcon|balcony/],
  ["waves", /\bvue\b|\bview\b|océan|ocean|\bmer\b|\bsea\b|plage|beach/],
  ["stairs", /étage|floor/],
  ["shower", /douche|toilet|\bwc\b|bathroom/],
  ["table", /table/],
  ["bed", /draps|linen|chambre|bedroom|\blit\b|spacious room/],
  ["sofa", /salon|living/],
];

export function iconKey(text: string): string {
  const s = text.toLowerCase();
  return RULES.find(([, re]) => re.test(s))?.[0] ?? "check";
}

export default function FeatureIcon({ text }: { text: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {ICONS[iconKey(text)].map((d) => (
        <path key={d} d={d} />
      ))}
    </svg>
  );
}