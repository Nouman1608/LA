/**
 * Single source of truth for site-wide constants.
 * Imported across components — keep contact/brand details here only.
 */
export const site = {
  name: 'Learners Academy',
  tagline: 'Online O & A Level Tuition',
  /** Canonical host — kept as .com.pk to preserve existing SEO. */
  domain: 'https://learnersacademy.com.pk',
  founded: 2016,
  location: 'Bahria Town, Lahore',
  country: 'PK',
  /** Structured postal address — used in JSON-LD (matches the WordPress LocalBusiness data). */
  address: {
    street: '63 Commercial, Umer Block, Main Boulevard, Bahria Town',
    locality: 'Lahore',
    region: 'Punjab',
    postalCode: '53720',
    country: 'Pakistan',
  },
  /** Approximate campus coordinates for LocalBusiness/Place schema. */
  geo: { lat: '31.3862971869072', lng: '74.1955190661404' },
  description:
    'Online tutoring portal providing a Virtual Learning Environment for IGCSE, O & A Level (Cambridge CAIE, Edexcel, AQA) and SAT students. Based in Bahria Town, Lahore since 2016.',
  contact: {
    phone: '+92 323 9149918',
    phoneHref: 'tel:+923239149918',
    email: 'nouman.ahmed@learnersacademy.pk',
    whatsapp: '923239149918',
  },
  social: {
    facebook: 'https://www.facebook.com/Learnersacademy.com.pk',
    instagram: 'https://www.instagram.com/learnersacademy.com.pk/',
  },
  pricing: {
    discounts: [
      { strong: '20% off', rest: 'on 3 or more subjects' },
      { strong: '10% off', rest: 'for up to 2 siblings' },
    ],
  },
} as const;

/**
 * Junior Campus — on-campus after-school classes for Grade 2–8.
 * Separate building from the main academy, so it keeps its own address, hours and fees.
 */
export const juniorCampus = {
  name: 'Learners Academy – Junior Campus',
  grades: 'Grade 2 to Grade 8',
  address: {
    street: '70 Commercial, Umer Block, Maj. Aziz Bhatti Ave E, Sector B, Bahria Town',
    locality: 'Lahore',
    region: 'Punjab',
    postalCode: '54000',
    country: 'Pakistan',
  },
  mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Learners+Academy+-+Junior+Campus+Bahria+Town+Lahore',
  hours: { days: 'Monday to Friday', open: '14:00', close: '21:00', label: '2:00 PM – 9:00 PM' },
  fee: { perSubject: 15000, label: '₨15,000', multiDiscount: '20% off when you take 2 or more subjects' },
  subjects: ['Maths', 'English', 'Science', 'Urdu'],
} as const;

/** Pre-built WhatsApp deep link with a default message. */
export function whatsappLink(message = "Hi! I'd like to ask about classes at Learners Academy."): string {
  return `https://wa.me/${site.contact.whatsapp}?text=${encodeURIComponent(message)}`;
}

export type Site = typeof site;
