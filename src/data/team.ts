export interface TeamMember {
  name: string;
  role: string;
  initials: string;
}

export const team: TeamMember[] = [
  { name: 'Hina Mughal', role: 'Managing Director', initials: 'HM' },
  { name: 'Nouman Ahmed', role: 'Principal', initials: 'NA' },
  { name: 'Awais ul Haq', role: 'Vice Principal', initials: 'AH' },
  { name: 'Javed Iqbal Sabri', role: 'CFO', initials: 'JS' },
  { name: 'Junaid Khalid', role: 'CTO', initials: 'JK' },
  { name: 'Asif Iqbal', role: 'Marketing Head', initials: 'AI' },
];
