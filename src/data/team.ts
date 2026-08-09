export interface TeamMember {
  name: string;
  role: string;
  /** Fallback shown when no photo is available. */
  initials: string;
  /** 640×640 headshot in /public/teachers/. Optional. */
  photo?: string;
}

export const team: TeamMember[] = [
  { name: 'Hina Mughal', role: 'Managing Director', initials: 'HM', photo: '/teachers/hina-mogul.jpg' },
  { name: 'Nouman Ahmed', role: 'Principal', initials: 'NA', photo: '/teachers/nouman-ahmed.jpg' },
  {
    name: 'Javed Iqbal Sabri',
    role: 'CFO',
    initials: 'JS',
    photo: '/teachers/javaid-iqbal-sabri.jpg',
  },
  { name: 'Junaid Khalid', role: 'CTO', initials: 'JK' },
  { name: 'Asif Iqbal', role: 'Marketing Head', initials: 'AI', photo: '/teachers/asif-iqbal.jpg' },
];
