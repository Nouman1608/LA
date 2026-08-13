export interface PricingRegion {
  key: string;
  label: string;
  currency: string;
  igcse: string;
  alevel: string;
}

/** Per-subject, per-month fees by region. First entry is the default. */
export const regions: PricingRegion[] = [
  { key: 'pk', label: 'Pakistan', currency: '₨', igcse: '19,000', alevel: '24,000' },
  { key: 'sa', label: 'Saudi', currency: 'SAR', igcse: '270', alevel: '330' },
  { key: 'ae', label: 'UAE', currency: 'AED', igcse: '270', alevel: '330' },
  { key: 'qa', label: 'Qatar', currency: 'QAR', igcse: '270', alevel: '330' },
  { key: 'kw', label: 'Kuwait', currency: 'KWD', igcse: '22.500', alevel: '27.500' },
  { key: 'bh', label: 'Bahrain', currency: 'BHD', igcse: '27.500', alevel: '33.500' },
  { key: 'om', label: 'Oman', currency: 'OMR', igcse: '28.000', alevel: '34.000' },
  { key: 'uk', label: 'UK', currency: '£', igcse: '60', alevel: '75' },
  { key: 'eu', label: 'Europe', currency: '€', igcse: '70', alevel: '90' },
];
