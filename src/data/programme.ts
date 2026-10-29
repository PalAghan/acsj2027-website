// Programme data. Add confirmed sessions to the `sessions` arrays; the page renders them automatically.
// Nothing here is confirmed yet, so every day is empty.
// Path to the downloadable programme once confirmed, e.g. '/downloads/ACSJ2027-programme.pdf' (file goes in public/downloads/)
export const programmePdf: string | null = null;
export type Session = { time: string; title: string; type?: string; location?: string; speakers?: string[] };
export const programme: { n: number; date: string; sessions: Session[] }[] = [
  { n: 1, date: '26 April 2027', sessions: [] },
  { n: 2, date: '27 April 2027', sessions: [] },
  { n: 3, date: '28 April 2027', sessions: [] },
];
