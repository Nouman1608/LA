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
