// Registration details. Nothing is confirmed yet. Fill in as MESHA decides; the page updates automatically.
// status: 'soon' (default) | 'open' | 'closed'. When 'open', set registerUrl to the registration form/system link.
export const registration = {
  status: 'soon' as 'soon' | 'open' | 'closed',
  opensOn: null as string | null,   // e.g. '1 February 2027'
  closesOn: null as string | null,
  registerUrl: null as string | null,
  // Fees are plain text so currency and wording stay under MESHA's control, e.g. { name: 'Journalist', fee: 'KES 5,000', description: '...' }
  categories: [] as { name: string; fee: string; description?: string }[],
  paymentOptions: [] as string[],
  included: [] as string[],
};
