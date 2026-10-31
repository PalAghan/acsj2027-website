// Conference topics, as supplied by MESHA. Sessions, speakers and times are still to be confirmed.
// `lead` holds the organisation or person suggested for each topic. It stays HIDDEN on the site until
// MESHA confirms it can be published: set showLeads to true below.
export const showLeads = false;
export type Topic = { title: string; description?: string; lead?: string };
export const topics: Topic[] = [
  { title: 'One Health and the interconnected crises facing Africa', description: 'Connecting human health, animal health, agriculture and the environment.', lead: 'Margaret Karembu / Dr. Victor Yamo' },
  { title: 'Rethinking science journalism in Africa: moving science from research institutions to communities', description: 'How journalists can move beyond reporting problems to investigate what works, for whom, under what conditions, and at what cost.', lead: 'CGIAR' },
  { title: 'The green transition: who wins and who pays?', description: 'How to scrutinise renewable energy, critical minerals, carbon markets, nature-based solutions and the trade-offs between economic development and environmental protection.', lead: 'Power Shift Africa' },
  { title: 'Climate change as a health emergency', description: 'Reporting the health costs of a warming Africa, for example mental health.', lead: 'APHRC' },
  { title: 'From outbreaks to preparedness: are African health systems ready for the next epidemic?', lead: 'AMREF' },
  { title: 'Reporting science in the age of misinformation and artificial intelligence' },
  { title: 'Gene editing, synthetic biology and the next frontier of African science', description: 'How journalists can report emerging technologies, potential benefits, uncertainties and ethical concerns.', lead: 'AATF / AUDA-NEPAD' },
  { title: 'Precision medicine', lead: 'Damaris Matoke, KEMRI' },
  { title: 'The future of vector-borne disease control', description: 'How changing environments, insecticide resistance and new interventions are affecting disease prevention.', lead: 'Dr. Willy Tonui, AGBC' },
  { title: 'Indigenous crops and neglected African foods', description: 'Can science unlock their potential?', lead: 'The Alliance' },
];
