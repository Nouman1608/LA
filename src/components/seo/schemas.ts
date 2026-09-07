/**
 * JSON-LD builders. Each returns a plain object rendered by <JsonLd />.
 * Ported from the JSON-LD authored in the Claude Design prototypes.
 */
import { site } from '../../data/site';

export function educationalOrganization(opts?: {
  /** Only pass this on pages that actually display the reviews/rating —
   *  Google's guidelines treat review markup on pages without visible
   *  review content as spam, so the sitewide HomeLayout call must stay
   *  bare and only /results/ opts in. */
  aggregateRating?: { ratingValue: number; reviewCount: number; bestRating?: number };
  reviews?: {
    author: string;
    reviewBody: string;
    ratingValue: number;
    datePublished?: string;
  }[];
}) {
  const org: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': ['EducationalOrganization', 'LocalBusiness', 'Organization'],
    '@id': `${site.domain}/#organization`,
    name: site.name,
    alternateName: 'Learners Academy Online Tuition',
    description: site.description,
    url: site.domain,
    logo: {
      '@type': 'ImageObject',
      url: `${site.domain}/apple-touch-icon.png`,
      caption: site.name,
    },
    image: `${site.domain}/og/og-default.jpg`,
    telephone: site.contact.phone,
    priceRange: '₨ 3,500 – ₨ 24,000 per month',
    email: site.contact.email,
    foundingDate: String(site.founded),
    address: {
      '@type': 'PostalAddress',
      streetAddress: site.address.street,
      addressLocality: site.address.locality,
      addressRegion: site.address.region,
      postalCode: site.address.postalCode,
      addressCountry: site.address.country,
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: site.geo.lat,
      longitude: site.geo.lng,
    },
    sameAs: [site.social.facebook, site.social.instagram],
  };

  if (opts?.aggregateRating) {
    org.aggregateRating = {
      '@type': 'AggregateRating',
      ratingValue: opts.aggregateRating.ratingValue,
      reviewCount: opts.aggregateRating.reviewCount,
      bestRating: opts.aggregateRating.bestRating ?? 5,
    };
  }

  if (opts?.reviews?.length) {
    org.review = opts.reviews.map((r) => ({
      '@type': 'Review',
      author: { '@type': 'Person', name: r.author },
      reviewBody: r.reviewBody,
      reviewRating: {
        '@type': 'Rating',
        ratingValue: r.ratingValue,
        bestRating: 5,
      },
      ...(r.datePublished ? { datePublished: r.datePublished } : {}),
    }));
  }

  return org;
}

export function course(opts: {
  name: string;
  description: string;
  url: string;
  /** e.g. "Cambridge IGCSE Mathematics (0580)" — only pass this when the page
   *  covers one specific board+level combination, not a general subject hub. */
  educationalCredentialAwarded?: string;
  /** Monthly per-subject fees. priceCurrency must be an ISO 4217 code (e.g. "PKR"). */
  offers?: { price: string; priceCurrency: string; category?: string }[];
  hasCourseInstance?: { courseMode?: string; courseWorkload?: string }[];
}) {
  const c: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'Course',
    '@id': `${opts.url}#course`,
    name: opts.name,
    description: opts.description,
    url: opts.url,
    inLanguage: 'en',
    // Reference the sitewide Organization node instead of duplicating it, so
    // engines resolve one connected entity graph rather than disconnected
    // fragments (see educationalOrganization() above for the canonical node).
    provider: { '@id': `${site.domain}/#organization` },
  };

  if (opts.educationalCredentialAwarded) {
    c.educationalCredentialAwarded = opts.educationalCredentialAwarded;
  }

  if (opts.offers?.length) {
    c.offers = opts.offers.map((o) => ({
      '@type': 'Offer',
      price: o.price,
      priceCurrency: o.priceCurrency,
      category: o.category ?? 'Paid',
      availability: 'https://schema.org/InStock',
      url: opts.url,
    }));
  }

  if (opts.hasCourseInstance?.length) {
    c.hasCourseInstance = opts.hasCourseInstance.map((ci) => ({
      '@type': 'CourseInstance',
      courseMode: ci.courseMode ?? 'Online',
      ...(ci.courseWorkload ? { courseWorkload: ci.courseWorkload } : {}),
    }));
  }

  return c;
}

export function blogPosting(opts: {
  title: string;
  description: string;
  url: string;
  datePublished: string;
  dateModified?: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: opts.title,
    description: opts.description,
    url: opts.url,
    mainEntityOfPage: opts.url,
    datePublished: opts.datePublished,
    dateModified: opts.dateModified ?? opts.datePublished,
    author: { '@type': 'Organization', name: site.name, url: site.domain },
    publisher: {
      '@type': 'Organization',
      name: site.name,
      logo: { '@type': 'ImageObject', url: `${site.domain}/apple-touch-icon.png` },
    },
  };
}

export function faqPage(items: { q: string; a: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((it) => ({
      '@type': 'Question',
      name: it.q,
      acceptedAnswer: { '@type': 'Answer', text: it.a },
    })),
  };
}

export function breadcrumbList(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((it, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: it.name,
      item: it.url,
    })),
  };
}
