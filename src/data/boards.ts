export interface Board {
  name: string;
  tag: string;
  blurb: string;
  levels: string[];
}

export const boards: Board[] = [
  {
    name: 'Cambridge',
    tag: 'CAIE',
    blurb: 'The most widely-followed international syllabus, with full IGCSE and A Level coverage.',
    levels: ['IGCSE', 'A Level'],
  },
  {
    name: 'Edexcel',
    tag: 'Pearson',
    blurb: 'IAL and IGCSE Edexcel specifications taught to the latest mark schemes.',
    levels: ['IGCSE', 'A Level'],
  },
  {
    name: 'AQA',
    tag: 'UK Board',
    blurb: 'AQA IGCSE and A Level subjects with examiner-focused exam technique.',
    levels: ['IGCSE', 'A Level'],
  },
];
