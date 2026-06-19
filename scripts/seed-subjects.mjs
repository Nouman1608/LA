/**
 * One-off seeder for the 22 scaffold subject pages.
 * Chemistry is authored by hand (full copy); these are valid scaffolds
 * (real topics + facts + a tailored intro) to mature over time.
 * Run: node scripts/seed-subjects.mjs
 */
import { writeFileSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT = join(__dirname, '..', 'src', 'content', 'subjects');

const STD = { levels: ['IGCSE', 'A Level'], boards: ['CAIE', 'Edexcel', 'AQA'], eyebrow: 'IGCSE & A Level · Cambridge · Edexcel · AQA' };
const CAIE = { levels: ['O Level', 'IGCSE'], boards: ['CAIE'], eyebrow: 'O Level & IGCSE · Cambridge (CAIE)' };

/** @type {Array<{slug:string,name:string,title?:string,hook:string,sub:string,topics:string[],order:number} & Partial<typeof STD>>} */
const subjects = [
  { slug: 'physics', name: 'Physics', hook: 'reward students who can picture the mechanism behind the maths', sub: 'Live, examiner-focused Physics tuition that turns formulae into intuition — mechanics to nuclear, fully covered.', topics: ['Forces & motion', 'Energy & work', 'Waves & sound', 'Light & optics', 'Electricity & circuits', 'Magnetism & induction', 'Thermal physics', 'Atomic & nuclear', 'Particle physics', 'Practical & paper skills'], order: 2, ...STD },
  { slug: 'biology', name: 'Biology', hook: 'reward students who connect structure to function', sub: 'Live Biology classes that make dense content stick — from cells and enzymes to ecosystems and human physiology.', topics: ['Cell biology', 'Biological molecules', 'Enzymes', 'Transport systems', 'Genetics & inheritance', 'Evolution & natural selection', 'Ecology & ecosystems', 'Human physiology', 'Coordination & response', 'Practical & paper skills'], order: 3, ...STD },
  { slug: 'mathematics', name: 'Mathematics', hook: 'reward students who practise until method becomes instinct', sub: 'Step-by-step Maths tuition that builds fluency and exam speed — algebra and calculus to vectors and probability.', topics: ['Number & algebra', 'Functions & graphs', 'Coordinate geometry', 'Trigonometry', 'Sequences & series', 'Differentiation', 'Integration', 'Vectors', 'Probability', 'Exam technique'], order: 4, ...STD },
  { slug: 'statistics', name: 'Statistics', hook: 'reward students who can read a dataset and defend a conclusion', sub: 'Applied Statistics tuition covering distributions, hypothesis testing and interpretation with constant past-paper practice.', topics: ['Data presentation', 'Measures of location & spread', 'Probability', 'Probability distributions', 'The normal distribution', 'Correlation & regression', 'Hypothesis testing', 'Sampling', 'Interpreting results', 'Exam technique'], order: 5, ...STD },
  { slug: 'computer-science', name: 'Computer Science', hook: 'reward students who can both reason about systems and write working code', sub: 'Computer Science tuition spanning theory and programming — architecture and networks through algorithms and databases.', topics: ['Data representation', 'Computer architecture', 'Networks & the internet', 'Algorithms', 'Programming fundamentals', 'Data structures', 'Databases & SQL', 'Boolean logic', 'Security & ethics', 'Practical & project skills'], order: 6, ...STD },
  { slug: 'english-language', name: 'English Language', hook: 'reward students who write with purpose, control and precision', sub: 'English Language tuition that sharpens reading, summary and writing skills against the mark scheme.', topics: ['Reading comprehension', 'Directed writing', 'Descriptive writing', 'Narrative writing', 'Summary skills', 'Language analysis', 'Tone & register', 'Grammar & accuracy', 'Coursework', 'Exam technique'], order: 7, ...STD },
  { slug: 'english-literature', name: 'English Literature', hook: 'reward students who can argue an interpretation with evidence', sub: 'Literature tuition that builds confident analysis of poetry, prose and drama — including unseen texts.', topics: ['Poetry analysis', 'Prose & the novel', 'Drama & Shakespeare', 'Unseen texts', 'Theme & character', 'Context & meaning', 'Comparative essays', 'Quotation & evidence', 'Critical writing', 'Exam technique'], order: 8, ...STD },
  { slug: 'business', name: 'Business', hook: 'reward students who can apply theory to a real case', sub: 'Business Studies tuition covering marketing, operations, finance and people with strong case-study technique.', topics: ['Business activity', 'Marketing', 'Operations management', 'Finance & accounts', 'People in business', 'Business organisation', 'Market research', 'Decision making', 'Case study skills', 'Exam technique'], order: 9, ...STD },
  { slug: 'economics', name: 'Economics', hook: 'reward students who can model a market and read the data', sub: 'Economics tuition from demand and supply to the macroeconomy — with data-response and essay practice.', topics: ['Basic economic problem', 'Demand & supply', 'Price mechanism', 'Market failure', 'The macroeconomy', 'Money & banking', 'International trade', 'Economic development', 'Data response', 'Exam technique'], order: 10, ...STD },
  { slug: 'accounting', name: 'Accounting', hook: 'reward students who keep the books balanced and the logic clear', sub: 'Accounting tuition from double-entry foundations to financial statements and ratio analysis.', topics: ['The accounting equation', 'Double-entry bookkeeping', 'Ledgers & trial balance', 'Financial statements', 'Depreciation & adjustments', 'Control accounts', 'Partnerships & companies', 'Ratio analysis', 'Cash flow', 'Exam technique'], order: 11, ...STD },
  { slug: 'commerce', name: 'Commerce', hook: 'reward students who understand how trade actually moves', sub: 'Commerce tuition covering trade, banking, insurance and the services that support business.', topics: ['Trade & commerce', 'Home & foreign trade', 'Documents of trade', 'Consumer protection', 'Transport & warehousing', 'Banking', 'Insurance', 'Advertising', 'Communication', 'Exam technique'], order: 12, ...STD },
  { slug: 'sociology', name: 'Sociology', hook: 'reward students who can weigh theory against evidence', sub: 'Sociology tuition across family, education, stratification and crime — with strong method and evaluation skills.', topics: ['Sociological methods', 'Family', 'Education', 'Social stratification', 'Crime & deviance', 'Culture & identity', 'Socialisation', 'Research design', 'Theories', 'Exam technique'], order: 13, ...STD },
  { slug: 'psychology', name: 'Psychology', hook: 'reward students who can evaluate a study, not just recall it', sub: 'Psychology tuition covering the core approaches, key studies and research methods with exam-focused evaluation.', topics: ['Approaches in psychology', 'Memory', 'Attachment', 'Social influence', 'Psychopathology', 'Research methods', 'Biopsychology', 'Cognitive psychology', 'Studies & evaluation', 'Exam technique'], order: 14, ...STD },
  { slug: 'law', name: 'Law', hook: 'reward students who can apply a rule to the facts', sub: 'Law tuition across the legal system, criminal law, tort and contract — with case analysis and structured answers.', topics: ['The English legal system', 'Sources of law', 'Criminal law', 'Law of tort', 'Contract law', 'Human rights', 'Legal personnel', 'Courts & procedure', 'Case analysis', 'Exam technique'], order: 15, ...STD },
  { slug: 'geography', name: 'Geography', hook: 'reward students who connect physical processes to human impact', sub: 'Geography tuition spanning physical and human topics, map skills and fieldwork with strong exam technique.', topics: ['Rivers & coasts', 'Tectonic hazards', 'Weather & climate', 'Ecosystems', 'Population & settlement', 'Urbanisation', 'Economic development', 'Resource management', 'Fieldwork & skills', 'Exam technique'], order: 16, ...STD },
  { slug: 'world-history', name: 'World History', hook: 'reward students who can build an argument from sources', sub: 'History tuition across the 20th-century world — source analysis and essay technique that examiners reward.', topics: ['The 20th-century world', 'Causes of WWI', 'The interwar years', 'WWII & its aftermath', 'The Cold War', 'Decolonisation', 'Modern conflicts', 'Source analysis', 'Essay skills', 'Exam technique'], order: 17, ...STD },
  { slug: 'global-perspectives', name: 'Global Perspectives', hook: 'reward students who research, reason and reflect independently', sub: 'Global Perspectives tuition that develops critical thinking, research and the team project and written report.', topics: ['Independent research', 'Critical thinking', 'Evaluating evidence', 'Perspectives & argument', 'Global issues', 'Team project', 'Written report', 'Reflection', 'Referencing', 'Coursework skills'], order: 18, ...STD },
  { slug: 'pakistan-studies', name: 'Pakistan Studies', hook: 'reward students who link history and geography to the present', sub: 'Pakistan Studies tuition covering history, the Pakistan Movement and geography with source-skill practice.', topics: ['History of Pakistan', 'The Pakistan Movement', 'Government & politics', 'Geography of Pakistan', 'Climate & agriculture', 'Natural resources', 'Industry & trade', 'Population', 'Source skills', 'Exam technique'], order: 19, ...CAIE },
  { slug: 'islamiyat', name: 'Islamiyat', hook: 'reward students who can analyse and apply the sources', sub: 'Islamiyat tuition covering the Quran, Seerah, the Rightly Guided Caliphs and the articles and pillars of faith.', topics: ['The Holy Quran', 'Life of the Prophet ﷺ', 'The Rightly Guided Caliphs', 'Articles of faith', 'Pillars of Islam', 'Hadith literature', 'Islamic history', 'Application & analysis', 'Source passages', 'Exam technique'], order: 20, ...CAIE },
  { slug: 'environmental-management', name: 'Environmental Management', hook: "reward students who understand the Earth's systems as a whole", sub: "Environmental Management tuition across the Earth's systems, resources, pollution and sustainability.", topics: ["The Earth's systems", 'Atmosphere & climate', 'Hydrosphere & water', 'Lithosphere & soils', 'Biosphere & ecosystems', 'Energy resources', 'Agriculture & food', 'Pollution management', 'Sustainability', 'Exam technique'], order: 21, ...CAIE },
  { slug: 'urdu-language', name: 'Urdu Language', hook: 'reward students who write Urdu with fluency and structure', sub: 'Urdu Language tuition covering comprehension, composition, grammar (قواعد) and exam writing skills.', topics: ['Reading comprehension (Urdu)', 'Composition & essay', 'Letter & application writing', 'Summary skills', 'Grammar (قواعد)', 'Idioms & proverbs', 'Translation', 'Vocabulary', 'Handwriting & presentation', 'Exam technique'], order: 22, ...CAIE },
  { slug: 'urdu-literature', name: 'Urdu Literature', hook: 'reward students who can appreciate poetry and prose critically', sub: 'Urdu Literature tuition across classical poetry, prose and drama with critical appreciation and essay skills.', topics: ['Classical poetry (نظم/غزل)', 'Prose & short stories', 'Drama', 'Literary devices', 'Famous poets & writers', 'Theme & context', 'Critical appreciation', 'Quotation & analysis', 'Essay writing', 'Exam technique'], order: 23, ...CAIE },
];

const yamlList = (arr) => arr.map((t) => `  - ${JSON.stringify(t)}`).join('\n');

let written = 0;
for (const s of subjects) {
  const title = s.title ?? `${s.name} online classes`;
  const fm = [
    '---',
    `name: ${JSON.stringify(s.name)}`,
    `title: ${JSON.stringify(title)}`,
    `eyebrow: ${JSON.stringify(s.eyebrow)}`,
    `subcopy: ${JSON.stringify(s.sub)}`,
    `levels: [${s.levels.join(', ')}]`,
    `boards: [${s.boards.join(', ')}]`,
    'topics:',
    yamlList(s.topics),
    `order: ${s.order}`,
    `seo:`,
    `  title: ${JSON.stringify(`${s.name} Online Classes for ${s.levels.join(' & ')} | Learners Academy`)}`,
    `  description: ${JSON.stringify(`Live online ${s.name} classes for ${s.levels.join(' and ')} (${s.boards.join(', ')}). Examiner-focused tuition, past papers and progress reports. Book a free ${s.name} demo class.`)}`,
    '---',
    '',
    `${s.name} ${s.hook.replace(/^reward /, 'rewards ')}. Our live, examiner-focused classes pair clear teaching with constant past-paper practice, so technique becomes second nature.`,
    '',
    'Every student gets a personalised plan, regular progress reports, and a recording of each live class to revisit before exams — and the pace adapts to the learner.',
    '',
  ].join('\n');

  const file = join(OUT, `${s.slug}.mdx`);
  // Never clobber the hand-authored chemistry page (not in this list anyway).
  if (s.slug === 'chemistry' && existsSync(file)) {
    console.log('skip (authored): chemistry.mdx');
    continue;
  }
  writeFileSync(file, fm, 'utf8');
  written++;
}
console.log(`Seeded ${written} subject scaffolds.`);
