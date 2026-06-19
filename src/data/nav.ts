/** Header + footer navigation. Anchors point at homepage sections;
 *  full standalone routes exist for about/pricing/contact/subjects. */
export interface NavLink {
  label: string;
  href: string;
}

export const headerNav: NavLink[] = [
  { label: 'About', href: '/about/' },
  { label: 'Boards', href: '/#boards' },
  { label: 'Subjects', href: '/subjects/' },
  { label: 'Team', href: '/#team' },
  { label: 'Pricing', href: '/pricing/' },
];

export const footerExplore: NavLink[] = [
  { label: 'About', href: '/about/' },
  { label: 'Subjects', href: '/subjects/' },
  { label: 'Pricing', href: '/pricing/' },
  { label: 'Blog', href: '/blog/' },
  { label: 'Free Trial', href: '/contact/' },
];

/** Curriculum & test-prep landing pages — kept internally linked so they aren't orphaned. */
export const footerPrograms: NavLink[] = [
  { label: 'A Level Tuition', href: '/a-level-online-tuition-classes-in-pakistan/' },
  { label: 'IGCSE / O Level Tuition', href: '/igcse-online-tuition-classes-in-pakistan/' },
  { label: 'Edexcel Tuition', href: '/edexcel-online-tuition-classes-in-pakistan/' },
  { label: 'AQA Tuition', href: '/aqa-online-tuition-classes-in-pakistan/' },
  { label: 'Aitchison Test Prep', href: '/aitchison-test/' },
  { label: 'Cadet College Prep', href: '/cadet-colleges-test/' },
];
