/** Posts retired in the 7 Aug 2026 blog consolidation.
 *
 *  These are the 2-14 June 2026 WordPress imports: ~800 words each of generic
 *  filler, including five near-duplicate AQA pieces. Under 2026 AEO rules they
 *  dilute topical authority rather than build it, so they are excluded from the
 *  build and 301'd to the matching programme page in public/_redirects.
 *
 *  The source files are kept in src/content/blog/ so the copy is recoverable.
 *  Once these redirects have settled in Search Console they can be deleted
 *  outright — the filter below will simply have nothing left to match.
 */
export const retiredPosts = new Set([
  // -> /aqa-online-tuition-classes-in-pakistan/
  '10-myths-about-aqa-online-tuition-in-pakistan',
  'aqa-online-tuition-in-pakistan-over-traditional-schooling',
  'aqa-online-tuition-the-best-way-to-pass-your-aqa-exams',
  'how-to-prepare-for-the-aqa-exam-in-pakistan',
  'the-power-of-aqa-online-tuition-how-to-outshine-your-peers-and-crush-your-exams',
  // -> /edexcel-online-tuition-classes-in-pakistan/
  'edexcel-online-tuition-in-pakistan-the-future-of-learning',
  'transform-your-study-habits-edexcel-online-tuitions-game-changing-techniques',
  // -> /igcse-online-tuition-classes-in-pakistan/
  '10-influential-tips-to-improve-your-igcse-online-tuition-scores',
  '10-key-reasons-why-you-should-consider-igcse-online-tuition-in-pakistan',
  '4-reasons-why-you-should-study-igcse-online-in-pakistan',
  '8-benefits-of-igcse-online-tuition-in-pakistan-during-covid-19',
  '8-ways-to-score-well-in-igcse-online-tuition-in-pakistan',
  'igcse-online-classes-a-gateway-to-global-education',
  'igcse-online-tuition-in-pakistan-11-effective-tips-to-boost-your-success',
  'take-igcse-online-tuition-in-pakistan-and-improve-your-grades-at-high-school-or-university',
  'why-igcse-online-tuitions-in-pakistan-is-the-best-for-your-child',
  // -> /a-level-online-tuition-classes-in-pakistan/
  '11-reasons-a-level-tuition-in-pakistan-instead-of-home-school-system',
  '7-reasons-to-get-your-a-levels-online-classes-in-pakistan',
  'a-comprehensive-guide-to-leveling-up-your-studies-with-a-level-online-tuition',
  'a-level-online-tuition-in-pakistan-the-best-tactics-for-online-learning',
  'embarking-on-your-online-a-level-journey-a-comprehensive-guide',
  'how-can-a-level-online-classes-in-pakistan-help-you-succeed-in-the-future',
  'how-to-get-started-with-a-level-online-classes-in-pakistan',
  'online-a-level-tuition-your-path-to-academic-excellence',
  'top-reasons-to-choose-a-level-online-classes-in-pakistan',
  'why-is-a-level-online-tuition-in-pakistan-a-good-option-for-your-future-career',
  'why-taking-your-a-level-online-classes-in-pakistan-is-better-than-regular-school',
  'why-you-should-think-about-taking-a-level-online-classes-in-pakistan',
  // -> /subjects/law/
  'revolutionizing-legal-education-the-benefits-of-taking-law-online-classes',
  'top-7-legal-subjects-covered-in-law-online-classes-in-pakistan',
  // -> /subjects/economics/
  '10-economics-online-courses-that-will-pay-dividends',
  // -> /
  'eight-proven-advices-to-boost-your-online-classroom-performance',
  'get-online-tuition-in-pakistan-for-hassle-free-learning',
  'how-online-tuition-in-pakistan-can-improve-your-grades',
  'online-tuition-in-pakistan-for-and-against',
]);

/** True when a post should be built and listed. */
export const isPublished = (id: string, draft: boolean) => !draft && !retiredPosts.has(id);
