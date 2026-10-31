// Field tours, as supplied by MESHA. Dates, days, logistics and sign-up are still to be confirmed.
export type FieldTour = { name: string; location?: string; description: string };
export const fieldTours: FieldTour[] = [
  { name: 'African Plant Research and Conservation Centre', location: 'Karen, Nairobi', description: 'An environmental conservation organisation dedicated to conserving threatened indigenous tree species.' },
  { name: 'Vertical Lake', location: 'Rongai', description: 'A fish farm showcasing an innovative model for fish farming in Kenya.' },
  { name: 'Palora Dragon Farm', location: 'Isinya, Kajiado County', description: 'An 11-acre dragon fruit farm featuring more than 40 varieties of dragon fruit.' },
  { name: 'Embryo Plus (Sirima Cattle Quarantine Centre)', location: 'Ol Pejeta Conservancy, Nanyuki', description: 'Participants will learn about assisted reproductive technologies (ART) and their application in livestock breeding.' },
  { name: 'JKUAT', description: 'Jomo Kenyatta University of Agriculture and Technology is stepping up efforts to promote alternative sources of food and livestock feed, such as snails and crickets.' },
  { name: 'KEMRI', description: 'The Kenya Medical Research Institute, for health research.' },
  { name: 'KALRO', description: 'The Kenya Agricultural and Livestock Research Organization, for agriculture research.' },
  { name: 'Mega Gas', description: 'A company that turns used plastics into cooking gas.' },
];
