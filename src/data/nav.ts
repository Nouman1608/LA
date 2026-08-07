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
  { label: 'Oct/Nov 2026 Retakes', href: '/november-2026-retakes/' },
  { label: 'Aitchison Test Prep', href: '/aitchison-test/' },
  { label: 'Cadet College Prep', href: '/cadet-colleges-test/' },
  { label: 'Saudi Arabia Tuition', href: '/igcse-tuition/saudi-arabia/' },
  { label: 'Dubai & UAE Tuition', href: '/igcse-tuition/dubai/' },
  { label: 'Qatar Tuition', href: '/igcse-tuition/qatar/' },
  { label: 'Kuwait Tuition', href: '/igcse-tuition/kuwait/' },
  { label: 'UK Tuition', href: '/igcse-tuition/uk/' },
  { label: 'Pakistani Expats Hub', href: '/pakistani-expats/' },
];
