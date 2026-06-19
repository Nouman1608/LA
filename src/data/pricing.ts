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
  { key: 'eu', label: 'Europe', currency: '€', igcse: '70', alevel: '90' },
];
