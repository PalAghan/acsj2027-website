// Add confirmed speakers here; the Speakers page renders them automatically.
// Photos go in public/images/speakers/ and are referenced as '/images/speakers/name.jpg'.
export type Speaker = { name: string; role?: string; affiliation?: string; country?: string; photo?: string; bio?: string };
export const speakers: Speaker[] = [];
