/**
 * Faculty. Source of truth for /teachers/ and the "taught by" strip on board
 * pages. `subjectKeys` must match the `subject` values used by the
 * subjectBoards content collection so board pages can find their teachers.
 */
export interface Teacher {
  slug: string;
  name: string;
  /** Display subject, e.g. 'Physics'. */
  subject: string;
  /** subjectBoards `subject` slugs this teacher covers (may be empty). */
  subjectKeys: string[];
  /** /subjects/<slug>/ pages to link to (may be empty). */
  subjectPages: string[];
  /** Years of classroom teaching. Omitted where not recorded. */
  years?: number;
  /** Schools and colleges previously taught at. */
  schools: string[];
  blurb: string;
  /** 640×640 headshot in /public/teachers/. */
  photo: string;
  group: 'sciences' | 'mathematics' | 'commerce' | 'humanities';
}

export const teacherGroups: { key: Teacher['group']; label: string; blurb: string }[] = [
  {
    key: 'sciences',
    label: 'Physics, Chemistry & Biology',
    blurb: 'Practical-aware science teaching, worked from the official specification and the past papers.',
  },
  {
    key: 'mathematics',
    label: 'Mathematics',
    blurb: 'Method marks, working shown line by line, and enough drilling that the exam feels familiar.',
  },
  {
    key: 'commerce',
    label: 'Accounting & Business',
    blurb: 'Format, terminology and application — the three places commerce candidates usually lose marks.',
  },
  {
    key: 'humanities',
    label: 'Languages & Humanities',
    blurb: 'Writing that reads well and answers that actually address the command word.',
  },
];

export const teachers: Teacher[] = [
  {
    slug: 'iftikhar-azeemi',
    name: 'Sir Iftikhar Azeemi',
    subject: 'Physics',
    subjectKeys: ['physics'],
    subjectPages: ['physics'],
    years: 30,
    schools: ['BTSC', 'SCIL', 'LAS', "Froebel's", 'SICAS', 'Garrison'],
    blurb: 'Three decades of making the laws of physics feel obvious.',
    photo: '/teachers/iftikhar-azeemi.jpg',
    group: 'sciences',
  },
  {
    slug: 'jawad-tariq',
    name: 'Sir Jawad Tariq',
    subject: 'Physics',
    subjectKeys: ['physics'],
    subjectPages: ['physics'],
    years: 11,
    schools: ['LGS JT', 'LGS Bahria Town', 'UCL', 'European School of Excellence', 'SICAS', 'Crescent', 'CornerStone'],
    blurb: 'Turns past-paper mechanics into patterns students can see coming.',
    photo: '/teachers/jawad-tariq.jpg',
    group: 'sciences',
  },
  {
    slug: 'hassan',
    name: 'Sir Hassan',
    subject: 'Physics',
    subjectKeys: ['physics'],
    subjectPages: ['physics'],
    years: 8,
    schools: ['Adabistan-e-Soophia High School', 'Lecole Mondiale'],
    blurb: 'Builds physics from first principles, then drills the exam technique.',
    photo: '/teachers/hassan.jpg',
    group: 'sciences',
  },
  {
    slug: 'nouman-ahmed',
    name: 'Sir Nouman Ahmed',
    subject: 'Chemistry',
    subjectKeys: ['chemistry'],
    subjectPages: ['chemistry'],
    years: 9,
    schools: ['Aitchison College', 'BISC', 'LGS', 'Nordic', "Froebel's", 'The City School', 'Kaizen', 'ESE'],
    blurb: 'Where reactions finally start making sense.',
    photo: '/teachers/nouman-ahmed.jpg',
    group: 'sciences',
  },
  {
    slug: 'hina-mogul',
    name: 'Dr Hina Mogul',
    subject: 'Biology',
    subjectKeys: ['biology'],
    subjectPages: ['biology'],
    years: 4,
    schools: ['De Montmorency College'],
    blurb: 'Brings every diagram in the textbook to life.',
    photo: '/teachers/hina-mogul.jpg',
    group: 'sciences',
  },
  {
    slug: 'ameer-hamza',
    name: 'Sir Ameer Hamza',
    subject: 'Biology',
    subjectKeys: ['biology'],
    subjectPages: ['biology'],
    years: 3,
    schools: ['University of Lahore'],
    blurb: 'Turns dense biology definitions into answers that score.',
    photo: '/teachers/ameer-hamza.jpg',
    group: 'sciences',
  },
  {
    slug: 'harris-zaman',
    name: 'Sir Harris Zaman',
    subject: 'Biology',
    subjectKeys: ['biology'],
    subjectPages: ['biology'],
    years: 9,
    schools: [],
    blurb: 'Structured biology teaching, built around exam technique.',
    photo: '/teachers/harris-zaman.jpg',
    group: 'sciences',
  },
  {
    slug: 'saad-zai',
    name: 'Sir Saad Zai',
    subject: 'Biology',
    subjectKeys: ['biology'],
    subjectPages: ['biology'],
    years: 12,
    schools: ['LGS JT', 'BDC', 'Bll', 'LGS Phase 5', 'Crescent', 'Kaizen', 'UCL', 'The City School'],
    blurb: 'Twelve years of making biology click before exam day.',
    photo: '/teachers/saad-zai.jpg',
    group: 'sciences',
  },
  {
    slug: 'arslan-tanvir',
    name: 'Sir Arslan Tanvir',
    subject: 'Mathematics',
    subjectKeys: ['mathematics'],
    subjectPages: ['mathematics'],
    years: 10,
    schools: ['BISC', 'CornerStone'],
    blurb: 'Turning “I can’t do maths” into “ask me anything”.',
    photo: '/teachers/arslan-tanvir.jpg',
    group: 'mathematics',
  },
  {
    slug: 'sajawal-zahid',
    name: 'Sir Sajawal Zahid',
    subject: 'Mathematics',
    subjectKeys: ['mathematics'],
    subjectPages: ['mathematics'],
    years: 5,
    schools: ["King's House School", 'Learners Academy', 'ESE'],
    blurb: 'Patient, step-by-step problem solving — no skipped lines.',
    photo: '/teachers/sajawal-zahid.jpg',
    group: 'mathematics',
  },
  {
    slug: 'muhammad-ghazali-siddiqui',
    name: 'Sir Muhammad Ghazali Siddiqui',
    subject: 'Mathematics',
    subjectKeys: ['mathematics'],
    subjectPages: ['mathematics'],
    years: 25,
    schools: ['BISC', 'Musab', 'Grand Charter School', 'LGS', 'Adabistan-e-Soophia'],
    blurb: 'A quarter-century of exam technique, distilled into every lesson.',
    photo: '/teachers/muhammad-ghazali-siddiqui.jpg',
    group: 'mathematics',
  },
  {
    slug: 'javaid-iqbal-sabri',
    name: 'Sir Javaid Iqbal Sabri',
    subject: 'Accounting',
    subjectKeys: ['accounting'],
    subjectPages: ['accounting'],
    years: 18,
    schools: ['BISC', 'SICAS', "Froebel's", 'ESE', 'Beaconhouse', 'LACAS', 'LGS', 'Roots', 'SKANS'],
    blurb: 'Balancing the books and building confidence.',
    photo: '/teachers/javaid-iqbal-sabri.jpg',
    group: 'commerce',
  },
  {
    slug: 'zain-ud-din-ahmed',
    name: 'Sir Zain Ud Din Ahmed',
    subject: 'Accounting',
    subjectKeys: ['accounting'],
    subjectPages: ['accounting'],
    years: 12,
    schools: ['LGS', 'LACAS', 'Beaconhouse', 'FWS'],
    blurb: 'Makes the layout second nature, so marks are never lost on format.',
    photo: '/teachers/zain-ud-din-ahmed.jpg',
    group: 'commerce',
  },
  {
    slug: 'asif-iqbal',
    name: 'Sir Asif Iqbal',
    subject: 'Business Studies',
    subjectKeys: ['business'],
    subjectPages: ['business'],
    years: 17,
    schools: ['LACAS JT', 'BCP ALJT', 'BCP Gulberg', 'The City School Ravi Campus', 'SICAS', 'BISC'],
    blurb: 'Connecting the syllabus to the real world of business.',
    photo: '/teachers/asif-iqbal.jpg',
    group: 'commerce',
  },
  {
    slug: 'salman-ahmad',
    name: 'Dr Salman Ahmad',
    subject: 'Economics',
    subjectKeys: ['economics'],
    subjectPages: ['economics'],
    years: 50,
    schools: ['GCU', 'LSE', 'Comsats', 'UCP'],
    blurb: 'Half a century of making markets and money make sense.',
    photo: '/teachers/salman-ahmad.jpg',
    group: 'commerce',
  },
  {
    slug: 'lubna-waseem',
    name: 'Miss Lubna Waseem',
    subject: 'English',
    subjectKeys: ['english-language'],
    subjectPages: ['english-language'],
    schools: [],
    blurb: 'Building writers, not just exam-passers.',
    photo: '/teachers/lubna-waseem.jpg',
    group: 'humanities',
  },
  {
    slug: 'farheen-zehra',
    name: 'Miss Farheen Zehra',
    subject: 'Urdu',
    subjectKeys: ['urdu-language'],
    subjectPages: ['urdu-language'],
    years: 20,
    schools: ['LACAS', 'Roots', 'The City School'],
    blurb: 'Keeping the beauty of Urdu alive in every class.',
    photo: '/teachers/farheen-zehra.jpg',
    group: 'humanities',
  },
  {
    slug: 'azam-siddique',
    name: 'Sir Azam Siddique',
    subject: 'Islamiat & Pakistan Studies',
    subjectKeys: [],
    subjectPages: ['islamiyat', 'pakistan-studies'],
    years: 25,
    schools: [
      'Aitchison College',
      'LGS',
      'Garrison',
      'Newlands',
      'Learning Alliance',
      'TNS',
      'ISL',
      'SICAS',
      'BTSC',
      'Crescent CornerStone',
    ],
    blurb: 'Teaching with depth, context and care.',
    photo: '/teachers/azam-siddique.jpg',
    group: 'humanities',
  },
  {
    slug: 'aizaz-raoof-ali',
    name: 'Sir Aizaz Raoof Ali',
    subject: 'Law',
    subjectKeys: ['law'],
    subjectPages: ['law'],
    years: 5,
    schools: ['Beaconhouse', 'Crescent', 'Bravian', 'Cornerstone'],
    blurb: 'Turning statutes and case law into arguments that hold up.',
    photo: '/teachers/aizaz-raoof-ali.jpg',
    group: 'humanities',
  },
];

/** Combined recorded classroom years across the faculty. */
export const combinedYears = teachers.reduce((n, t) => n + (t.years ?? 0), 0);

/** Teachers who cover a given subjectBoards subject slug. */
export function teachersForSubject(subject: string): Teacher[] {
  return teachers.filter((t) => t.subjectKeys.includes(subject));
}
