// Per-board editorial content for the board index pages
// (/a-levels/cambridge/, /igcse/edexcel/, /o-levels/cambridge/ …).
//
// These pages were previously ~186 words — a heading, a link list and a price
// box — and Google reported them as "Crawled – currently not indexed".
// Each combination now carries its own explanation of how that board actually
// works, which is the thing a parent is trying to find out.
//
// Key is `${levelSlug}|${board}`.

export interface BoardIntro {
  /** Short lead sentence shown under the "How <board> <level> works" heading. */
  lead: string;
  /** Body paragraphs. Plain strings — no markup. */
  paragraphs: string[];
  faqs: { q: string; a: string }[];
}

export const boardIntros: Record<string, BoardIntro> = {
  'a-levels|cambridge': {
    lead: 'Cambridge International A Level is the route most Pakistani schools follow, and its defining feature is that it can be taken in two stages.',
    paragraphs: [
      'Students normally sit AS Level at the end of the first year and A2 at the end of the second, with the AS marks carried forward into the final grade. That staged structure is the main reason families choose Cambridge: it spreads the pressure across two years and gives an honest reading of where the grade is heading while there is still a year left to move it.',
      'In the sciences, Cambridge examines practical work directly. Chemistry, Physics and Biology each include a supervised practical paper sat at the exam centre, plus a written paper built around planning, analysis and evaluation. Those papers are worth roughly a quarter of the qualification between them, and they reward a specific skill — designing an experiment and judging data on paper — that is very teachable and very often left until too late.',
      'Every course on this page is taught from the current Cambridge specification for that syllabus code, with past-paper work from the first term rather than the last. Classes are live and capped small, homework is set and marked weekly, and you get the recording afterwards.',
    ],
    faqs: [
      { q: 'Can my child sit AS in the first year and A2 in the second?', a: 'Yes, and most of our families do. AS marks are banked and carried forward into the full A Level grade. It spreads the workload, and an AS result gives you a genuine mid-course reading of the final grade rather than a guess. Some students sit everything at the end instead — both routes are valid and your school will usually have a preference.' },
      { q: 'How are the science practicals examined?', a: 'At A Level, Cambridge sciences include a supervised practical test taken at the exam centre and a separate written paper on planning, analysis and evaluation. Both are examined by Cambridge rather than assessed by a teacher. We drill the recurring practical formats and the way marks are awarded for readings, precision and reasoning, using real past papers.' },
      { q: 'Is Cambridge A Level accepted for Pakistani universities?', a: 'Yes. Cambridge A Levels are converted through IBCC equivalence for admission to Pakistani universities, and are accepted directly by universities in the UK, Gulf, North America and beyond. The usual pre-medical combination is Chemistry and Biology with Physics or Maths; engineering routes take Maths, Physics and Chemistry.' },
    ],
  },

  'a-levels|edexcel': {
    lead: 'Edexcel International A Level is the modular option — and for a certain kind of student, that changes everything.',
    paragraphs: [
      'Most Edexcel IAL subjects are built from six units, sat in stages rather than all at the end. Units 1 to 3 form the International AS and can be banked at the end of the first year; units 4 to 6 complete the full A Level. Marks carry forward, and a unit that goes badly can be retaken without putting the rest of the qualification back on the table. Compared with a linear board, where two years of work meet a single exam season, it is a fundamentally different risk profile.',
      'The sciences are examined entirely by written paper. Practical skills sit in their own dedicated written units rather than a laboratory test or a teacher-assessed endorsement, so there is no lab logbook to maintain over two years. For private candidates in Pakistan, and for students whose school laboratory cannot support a full A Level practical programme, that removes an obstacle which on other boards can be genuinely hard to solve.',
      'Every course here is taught from the current Edexcel specification, unit by unit, with mock papers timed to the actual unit structure so a weak unit is caught before it is sat rather than after.',
    ],
    faqs: [
      { q: 'Can individual units be resat?', a: 'Yes — that is the main advantage of the modular structure. Units are sat in stages, marks carry forward, and a weak unit can be retaken without re-sitting the rest of the qualification. It is the reason families who have been caught out once by a bad exam week often move to Edexcel.' },
      { q: 'Is there a practical endorsement to complete?', a: 'No. Edexcel International A Level sciences are 100% examined by written paper, with practical skills assessed in dedicated written units. There is no separately reported endorsement and no teacher assessment, which makes it the simplest route for private candidates and for students without full laboratory access.' },
      { q: 'How does Edexcel compare with Cambridge or AQA?', a: 'Cambridge is staged AS/A2 and examines science practicals in a supervised laboratory test. AQA is fully linear with a separately reported practical endorsement. Edexcel is modular with unit resits and no endorsement. Universities treat all three identically, so choose on structure and circumstances rather than reputation.' },
    ],
  },

  'a-levels|aqa': {
    lead: 'AQA A Level is fully linear: every paper is sat at the end of the two years, with nothing banked along the way.',
    paragraphs: [
      'There are no modular resits and no AS marks carried forward. Everything a student has learned since the first week of Year 12 has to be available to them in one exam season. That single fact should shape how the course is taught, and usually does not — taught topic by topic and revised in a panic each spring, AQA punishes students severely.',
      'We teach it as a connected subject instead, deliberately dragging earlier material back into later work so that by exam season a question drawing on two topics at once is routine rather than a shock. In most AQA subjects the final paper is explicitly synoptic: it can pull from anywhere in the specification, which means there is no topic list to revise for it — the syllabus is the topic list.',
      'One thing worth knowing early if your child is a private candidate: AQA sciences carry a separate practical endorsement, assessed by teachers across at least twelve practical sessions and reported alongside the grade rather than counted in it. It does not change the A Level grade, but UK universities often expect a pass for laboratory-science degrees, and it cannot be arranged retrospectively. Ask your exam centre about it at the start of the course, not in the final term.',
    ],
    faqs: [
      { q: 'Can AQA units be resat individually?', a: 'No — AQA A Level is fully linear. All papers are sat at the end of the course and nothing is banked along the way. If a modular structure with unit resits would suit your child better, Edexcel International A Level offers exactly that, and we teach it too.' },
      { q: 'What is the practical endorsement, and does my child need it?', a: 'It is a separate pass/fail assessment of practical skills in the sciences, judged by teachers across at least twelve occasions of practical work and reported alongside the A Level grade rather than counted in it. A student can be awarded an A* without it. However, UK universities often expect a pass for laboratory-science degrees, so private candidates aiming at medicine, pharmacy or engineering should confirm endorsement provision with their exam centre at the start of the course.' },
      { q: 'Why is the final paper harder than the others?', a: 'Because it is synoptic — it can draw on any content in the specification and leans heavily on applying ideas in unfamiliar contexts. Students who have learned the subject as a set of separate modules struggle to move between them at speed. We interleave topics from the first term so that by spring this is routine.' },
    ],
  },

  'igcse|cambridge': {
    lead: 'Cambridge IGCSE is the most widely followed international qualification at this stage — and the single most consequential thing about it is the tier your child is entered for.',
    paragraphs: [
      'Many Cambridge IGCSE subjects split candidates into Core and Extended. It is a grade ceiling, not a difficulty setting: entered for Core, the highest grade available is a C no matter how well the papers go; entered for Extended, the full A* to G range is open. That decision is usually made by the school, often earlier than families expect, and it quietly determines what your child can walk away with. If they are aiming at A Level sciences and have been placed on Core, it is worth raising promptly — entries can normally still be amended.',
      'The sciences add a practical component that every candidate sits, but centres choose the form: either a supervised laboratory test or a written Alternative to Practical, both carrying the same weight. For students learning online the written alternative is usually what their centre offers, and it rewards something specific — reading an experiment critically rather than performing one. Spotting the uncontrolled variable, reading a scale correctly, explaining why a result is anomalous rather than just noting that it is.',
      'Several Cambridge syllabuses were restructured for 2026, so it is worth checking that your child’s notes and past-paper practice match the current version. Every course here is taught from the current specification document.',
    ],
    faqs: [
      { q: 'What is the difference between Core and Extended?', a: 'The tier sets the grades available before the exam is written. Core covers grades C to G; Extended covers A* to G and includes additional content. A student entered for Core cannot be awarded a B however well they perform. Most students aiming at A Level sciences should be on Extended, and we assess which route fits within the first fortnight of classes.' },
      { q: 'Does my child need a school laboratory?', a: 'Not necessarily. Every science candidate sits a practical component, but centres choose between a supervised laboratory test and a written Alternative to Practical, both worth the same. Most students learning with us online are entered for the written alternative, which tests understanding of method and data rather than lab technique. We drill it with past papers.' },
      { q: 'Is IGCSE the same as O Level for IBCC equivalence?', a: 'They are treated as equivalent. IGCSE offers Core and Extended tiers; Cambridge O Level has a single tier for all candidates. Which one your child takes is decided by their school, and we prepare students for both.' },
    ],
  },

  'igcse|edexcel': {
    lead: 'Edexcel International GCSE is examined entirely by written paper — no coursework, and in the sciences no practical exam at all.',
    paragraphs: [
      'Cambridge students sit either a laboratory test or a written Alternative to Practical. Edexcel students sit neither. Experimental skills are examined inside the written papers instead: a question hands your child a method and a table of results and asks them to find the flaw, plot the data, or explain the anomaly. Nothing is assessed by a teacher and nothing needs a school laboratory.',
      'For a Pakistani family that suits two situations especially well. If your child is a private candidate, or at a school whose laboratory provision is thin, the problem disappears. And because Edexcel runs both a January and a June series, a student who wants to sit early, retake, or split subjects across two sittings has options that a single annual sitting does not offer.',
      'Edexcel also has a distinct examining habit worth preparing for: it likes to place familiar material in an unfamiliar setting. The underlying content is the content your child already knows, but students who have only memorised worked examples freeze when it arrives dressed as something new. A good deal of our teaching is about making the reasoning solid enough that the disguise does not matter.',
    ],
    faqs: [
      { q: 'Is there a practical exam?', a: 'No. Edexcel International GCSE sciences are assessed entirely by written paper, with no laboratory test, no Alternative to Practical and no coursework. Experimental skills are examined inside those papers — interpreting a method, spotting an uncontrolled variable, judging whether a result is reliable.' },
      { q: 'When can my child sit the exams?', a: 'Edexcel runs both a January and a June series. That gives real flexibility for sitting early, retaking without waiting a full year, or splitting subjects across two sittings. Confirm which series your exam centre actually offers before planning around it.' },
      { q: 'Is Edexcel International GCSE easier than Cambridge IGCSE?', a: 'Not easier — differently shaped. Cambridge splits many subjects into Core and Extended tiers and adds a practical component; Edexcel generally has neither, so candidates sit the same papers with the full grade range open. Universities and IBCC treat them as equivalent. In practice your school decides, and we teach both.' },
    ],
  },

  'igcse|aqa': {
    lead: 'One thing to be straight about first: AQA does not publish a separate IGCSE. What AQA schools teach at this stage is the UK GCSE specification, and that is what we teach.',
    paragraphs: [
      'IBCC treats it as IGCSE-equivalent, and if your child’s school says "AQA", the UK GCSE syllabus codes are what they mean. With that settled, the most important thing about AQA at this level is the tier.',
      'Both papers in a subject are sat at one tier or the other, and the tier decides the grades available before your child writes a word. Foundation awards grades 1 to 5. Higher awards 4 to 9, with an allowed grade 3 for a near miss. There is no route from a Foundation entry to a grade 6. That matters more for Pakistani families than it does in the UK: a student heading for A Level sciences, or for an IBCC equivalence that will sit alongside a medical or engineering application, needs the top of the range open to them. Schools sometimes enter borderline students at Foundation to protect a pass — defensible for the school, often wrong for the child. Ask early which tier your child is on, because entries can usually still be changed.',
      'AQA sciences specify a set of required practicals which are examined in writing rather than performed in the exam. Your child is asked what the method was, why a step was included and what could have gone wrong — which is genuinely good news for students learning online, because the marks depend on understanding the investigations rather than on how well-equipped a laboratory is.',
    ],
    faqs: [
      { q: 'Is there an AQA IGCSE?', a: 'Not as such. AQA does not publish an IGCSE syllabus — what AQA schools teach at this stage is the UK GCSE specification, and IBCC treats it as IGCSE-equivalent. If your child’s school says "AQA", that is the syllabus they mean.' },
      { q: 'What is the difference between Foundation and Higher tier?', a: 'The tier sets the grades available before the exam is written. Foundation awards grades 1 to 5; Higher awards 4 to 9, with an allowed grade 3 for a student who narrowly misses. A child entered at Foundation cannot be awarded a 6 however well they perform. If they are heading for A Level sciences, Higher needs to be the target — and entries can usually still be changed if you raise it early.' },
      { q: 'Do the required practicals need a school laboratory?', a: 'Not for the exam. AQA specifies a set of required practicals and examines them in writing — students are asked about the method, the results and the sources of error, never asked to perform an experiment in the exam hall. We work through each investigation in class using real past-paper questions.' },
    ],
  },

  'o-levels|cambridge': {
    lead: 'Cambridge O Level is the route most Pakistani schools enter students for, and it differs from IGCSE in one practical way: there are no tiers.',
    paragraphs: [
      'Every candidate sits the same papers with the full grade range open, so there is no Core/Extended entry decision to get wrong and no grade ceiling set before the exam. For a lot of families that is one less thing to manage, and it is the main structural difference from the IGCSE route.',
      'In the sciences, O Level includes a practical component that centres take either as a supervised laboratory test or as the written Alternative to Practical, both carrying the same weight. Many candidates, including private candidates, take the written alternative. It rewards apparatus knowledge, careful readings, uncertainty and graph work rather than lab technique — all of which we train directly from past papers.',
      'O Level and IGCSE are treated as equivalent by IBCC and by universities, so the choice is your school’s rather than a judgement about difficulty. What matters more is the transition: an O Level grade is the first real signal of whether A Level sciences will be manageable, and we teach with that next step explicitly in view.',
    ],
    faqs: [
      { q: 'Is O Level harder or easier than IGCSE?', a: 'Neither — they are different routes to an equivalent qualification. The practical difference is tiering: IGCSE splits many subjects into Core and Extended, while O Level has a single tier so every candidate can reach the top grades. IBCC and universities treat them the same, and your school decides which one your child sits.' },
      { q: 'Does O Level need a school laboratory?', a: 'Not necessarily. Centres enter candidates for either a practical test or the written Alternative to Practical, both worth the same. Many candidates, including private candidates, take the written route. We train the skills both papers reward — apparatus, readings, uncertainties and graph work — using real past papers.' },
      { q: 'Will O Level prepare my child for A Level?', a: 'That is exactly how we teach it. O Level lays the groundwork for A Level sciences, and the habits that matter most — precise definitions, structured explanation, reliable calculation — are the same ones examiners reward two years later. Building them now makes the A Level step markedly easier.' },
    ],
  },
};
