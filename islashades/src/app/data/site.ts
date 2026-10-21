// Edited through the CMS: Settings → Contact & business details.
import raw from '../../../content/site.json';

const digits = (s: string) => s.replace(/\D/g, '');

export const SITE_URL = 'https://islashadespr.com';

export const site = {
  ...raw,
  phoneHref: raw.phoneE164 ? `tel:${raw.phoneE164}` : raw.phone ? `tel:${digits(raw.phone)}` : '',
  whatsapp: raw.whatsapp ? digits(raw.whatsapp) : null,
  establishedYear: raw.establishedYear || null,
};
