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

export function course(opts: { name: string; description: string; url: string }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: opts.name,
    description: opts.description,
    url: opts.url,
    provider: {
      '@type': 'EducationalOrganization',
      name: site.name,
      url: site.domain,
    },
  };
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
