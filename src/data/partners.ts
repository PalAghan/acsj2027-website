// Add confirmed partners here. Logos go in public/images/partners/ (SVG or PNG with transparent background).
// `category` is optional (e.g. 'Organiser', 'Supporting partners'); partners with the same category are grouped.
export type Partner = { name: string; logo: string; url?: string; category?: string };
export const partners: Partner[] = [];
