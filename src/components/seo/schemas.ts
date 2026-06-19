/**
 * JSON-LD builders. Each returns a plain object rendered by <JsonLd />.
 * Ported from the JSON-LD authored in the Claude Design prototypes.
 */
import { site } from '../../data/site';

export function educationalOrganization() {
  return {
    '@context': 'https://schema.org',
    '@type': 'EducationalOrganization',
    name: site.name,
    alternateName: 'Learners Academy Online Tuition',
    description: site.description,
    url: site.domain,
    logo: `${site.domain}/favicon.svg`,
    telephone: site.contact.phone,
    email: site.contact.email,
    foundingDate: String(site.founded),
    address: {
      '@type': 'PostalAddress',
      addressLocality: site.location,
      addressCountry: site.country,
    },
    sameAs: [site.social.facebook, site.social.instagram],
  };
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
      logo: { '@type': 'ImageObject', url: `${site.domain}/favicon.svg` },
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
