/** Footer navigation. NOTE: the site header builds its own nav in
 *  components/layout/Header.astro (it needs the dynamic board dropdowns) —
 *  `headerNav` below is kept only as the canonical top-level link list. */
export interface NavLink {
  label: string;
  href: string;
}

export const headerNav: NavLink[] = [
  { label: 'About', href: '/about/' },
  { label: 'Boards', href: '/#boards' },
  { label: 'Subjects', href: '/subjects/' },
  { label: 'Teachers', href: '/teachers/' },
  { label: 'Pricing', href: '/pricing/' },
  { label: 'Blog', href: '/blog/' },
];

export const footerExplore: NavLink[] = [
  { label: 'About', href: '/about/' },
  { label: 'Subjects', href: '/subjects/' },
  { label: 'Teachers', href: '/teachers/' },
  { label: 'Results & Reviews', href: '/results/' },
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
  { label: 'O Level Tuition Lahore', href: '/o-level-tuition-lahore/' },
  { label: 'Aitchison Test Prep', href: '/aitchison-test/' },
  { label: 'Cadet College Prep', href: '/cadet-colleges-test/' },
  { label: 'Saudi Arabia Tuition', href: '/igcse-tuition/saudi-arabia/' },
  { label: 'Dubai & UAE Tuition', href: '/igcse-tuition/dubai/' },
  { label: 'Qatar Tuition', href: '/igcse-tuition/qatar/' },
  { label: 'Kuwait Tuition', href: '/igcse-tuition/kuwait/' },
  { label: 'Bahrain Tuition', href: '/igcse-tuition/bahrain/' },
  { label: 'Oman Tuition', href: '/igcse-tuition/oman/' },
  { label: 'UK Tuition', href: '/igcse-tuition/uk/' },
  { label: 'Pakistani Expats Hub', href: '/pakistani-expats/' },
];
