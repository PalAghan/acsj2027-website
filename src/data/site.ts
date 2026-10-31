// Single source of truth. Edit here; every page updates.
// Anything marked TBC is a placeholder awaiting client confirmation.
export const site = {
  shortName: 'ACSJ 2027',
  title: '6th African Conference of Science Journalists',
  theme: 'Frontlines of Resilience: Science, AI, and the Future of African Reporting', // from banner; subject to final confirmation
  dates: '26 – 28 April 2027',
  location: 'Nairobi, Kenya',
  venue: null as string | null,        // TBC
  contactEmail: null as string | null, // TBC
  phone: null as string | null,        // TBC
  domain: 'meshascience.org',
  organiser: 'MESHA',
  organiserFull: 'Media for Environment, Science, Health and Agriculture',
  registerHref: '/registration',       // points to the Registration page; swap for an external form later if needed
  socials: [
    { label: 'X', href: 'https://x.com/MeshaScience' },
    { label: 'Facebook', href: 'https://www.facebook.com/MESHASci/' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/mesha-journalists-179368199/' },
    { label: 'YouTube', href: 'https://www.youtube.com/channel/UCcEZb2kATHVRn_dEWPT0IgA' },
  ],
  // Conference stories are read from this WordPress category (WordPress dashboard > Posts > Categories > slug).
  news: { wpSite: 'https://meshascience.org', categorySlug: 'acsj-2027', perPage: 6 },
  nav: [
    { label: 'Home', href: '/' }, { label: 'About', href: '/about' },
    { label: 'Speakers', href: '/speakers' }, { label: 'Programme', href: '/programme' },
    { label: 'Registration', href: '/registration' }, { label: 'Venue & Travel', href: '/venue-travel' },
    { label: 'News', href: '/news' }, { label: 'Partners', href: '/partners' },
    { label: 'Contact', href: '/contact' },
  ],
};

// DRAFT copy taken from the mockup. Needs client approval.
export const whyAttend = [
  'Learn from leading experts and practitioners',
  'Build valuable networks and collaborations',
  'Gain practical skills and tools for impactful reporting',
  'Be part of Africa’s science story',
];
export const highlights = [
  { title: 'Inspiring Sessions', text: 'Thought-provoking discussions on science, media and impact.' },
  { title: 'Networking Opportunities', text: 'Connect with peers, experts and partners across Africa.' },
  { title: 'Skills Workshops', text: 'Practical training for better science reporting.' },
  { title: 'Innovative Solutions', text: 'Explore real-world stories and grassroots impact.' },
];
export const days = [
  { n: 1, date: '26 April 2027' }, { n: 2, date: '27 April 2027' }, { n: 3, date: '28 April 2027' },
];
