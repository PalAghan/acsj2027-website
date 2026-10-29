// Fill these in once confirmed by MESHA. Anything left null/empty shows "To be announced" / "coming soon".
export const venue = {
  name: null as string | null,
  address: null as string | null,
  mapUrl: null as string | null, // e.g. a Google Maps share link
};
// Each card renders its `items` as a list when provided; otherwise a "coming soon" message.
export const travelInfo: { title: string; blurb: string; items: string[] }[] = [
  { title: 'Getting to Nairobi', blurb: 'Flights and arrival information.', items: [] },
  { title: 'Getting around', blurb: 'Transport to and from the venue.', items: [] },
  { title: 'Accommodation', blurb: 'Recommended hotels and booking details.', items: [] },
  { title: 'Entry requirements', blurb: 'Visa and travel document guidance.', items: [] },
];
