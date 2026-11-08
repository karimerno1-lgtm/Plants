import { TOOLS_DATA } from '../data/tools';
import { PLANTS_DATA } from '../data/plants';
import { GUIDES_DATA } from '../data/guides';

export interface SeoMetadata {
  title: string;
  description: string;
  canonicalUrl: string;
  ogImage?: string;
  ogType?: 'website' | 'article';
  keywords?: string;
  jsonLd?: Record<string, unknown>;
}

const BASE_URL = 'https://plants.wdbloog.com';
const DEFAULT_IMAGE = `${BASE_URL}/pwa-512x512.png`;

export function resolvePageSeo(path: string): SeoMetadata {
  const cleanPath = path.replace(/\/$/, '') || '/';

  // 1. Homepage
  if (cleanPath === '/') {
    return {
      title: 'PlantCare Lab – Smart Plant Care Tools, Calculators & Guides',
      description: 'Science-backed indoor plant watering calculators, foot-candle light finder, chunky aroid soil recipes, symptom checker, and complete houseplant database.',
      canonicalUrl: `${BASE_URL}/`,
      ogType: 'website',
      ogImage: DEFAULT_IMAGE,
      keywords: 'plant care calculators, houseplant watering calculator, indoor plant light meter, chunky aroid soil mix, symptom checker, monstera care, pothos care',
      jsonLd: {
        '@context': 'https://schema.org',
        '@graph': [
          {
            '@type': 'Organization',
            '@id': `${BASE_URL}/#organization`,
            'name': 'PlantCare Lab',
            'url': BASE_URL,
            'logo': DEFAULT_IMAGE,
            'sameAs': ['https://twitter.com/plantcarelab'],
            'description': 'Independent botanical laboratory creating evidence-based indoor plant care tools and calculators.'
          },
          {
            '@type': 'WebSite',
            '@id': `${BASE_URL}/#website`,
            'url': BASE_URL,
            'name': 'PlantCare Lab',
            'publisher': { '@id': `${BASE_URL}/#organization` },
            'potentialAction': {
              '@type': 'SearchAction',
              'target': `${BASE_URL}/?q={search_term_string}`,
              'query-input': 'required name=search_term_string'
            }
          }
        ]
      }
    };
  }

  // 2. Tools Hub
  if (cleanPath === '/tools') {
    return {
      title: 'Indoor Plant Care Calculators Suite – PlantCare Lab',
      description: 'Explore 8 scientific botanical calculators: watering intervals, window foot-candles, pot size upgrades, aroid soil recipes, and symptom diagnostics.',
      canonicalUrl: `${BASE_URL}/tools`,
      ogType: 'website',
      ogImage: DEFAULT_IMAGE,
      keywords: 'plant calculators, indoor plant care tools, watering calculator, soil mix calculator, light meter, plant symptom checker',
      jsonLd: {
        '@context': 'https://schema.org',
        '@type': 'CollectionPage',
        'name': 'PlantCare Lab Calculator Suite',
        'url': `${BASE_URL}/tools`,
        'description': 'Interactive precision tools for indoor houseplant watering, lighting, substrate, and diagnostic care.'
      }
    };
  }

  // 3. Tool Detail
  if (cleanPath.startsWith('/tools/')) {
    const slug = cleanPath.replace('/tools/', '');
    const tool = TOOLS_DATA.find(t => t.slug === slug);
    if (tool) {
      return {
        title: `${tool.name} – Precision Botanical Tool | PlantCare Lab`,
        description: `${tool.tagline}. ${tool.description}`,
        canonicalUrl: `${BASE_URL}/tools/${tool.slug}`,
        ogType: 'website',
        ogImage: DEFAULT_IMAGE,
        keywords: `${tool.shortTitle.toLowerCase()}, plant calculator, ${tool.category.toLowerCase()}, houseplant care tool`,
        jsonLd: {
          '@context': 'https://schema.org',
          '@type': 'WebApplication',
          'name': tool.name,
          'applicationCategory': 'UtilitiesApplication',
          'operatingSystem': 'All',
          'url': `${BASE_URL}/tools/${tool.slug}`,
          'description': tool.description,
          'offers': {
            '@type': 'Offer',
            'price': '0',
            'priceCurrency': 'USD'
          },
          'breadcrumb': {
            '@type': 'BreadcrumbList',
            'itemListElement': [
              { '@type': 'ListItem', 'position': 1, 'name': 'Home', 'item': BASE_URL },
              { '@type': 'ListItem', 'position': 2, 'name': 'Tools', 'item': `${BASE_URL}/tools` },
              { '@type': 'ListItem', 'position': 3, 'name': tool.name, 'item': `${BASE_URL}/tools/${tool.slug}` }
            ]
          }
        }
      };
    }
  }

  // 4. Plants Hub
  if (cleanPath === '/plants') {
    return {
      title: 'Indoor Houseplant Library & Species Profiles – PlantCare Lab',
      description: 'Searchable database of popular indoor plants: Monstera, Pothos, Snake Plant, ZZ Plant, Calathea, Peace Lily with light, watering, and pet toxicity data.',
      canonicalUrl: `${BASE_URL}/plants`,
      ogType: 'website',
      ogImage: DEFAULT_IMAGE,
      keywords: 'indoor plant library, houseplant encyclopedia, pet safe houseplants, easy indoor plants, monstera deliciosa, snake plant, pothos',
      jsonLd: {
        '@context': 'https://schema.org',
        '@type': 'CollectionPage',
        'name': 'PlantCare Lab Plant Library',
        'url': `${BASE_URL}/plants`,
        'description': 'Horticultural dossiers for indoor tropical and succulent houseplants.'
      }
    };
  }

  // 5. Plant Detail
  if (cleanPath.startsWith('/plants/')) {
    const slug = cleanPath.replace('/plants/', '');
    const plant = PLANTS_DATA.find(p => p.slug === slug);
    if (plant) {
      return {
        title: `${plant.name} (${plant.botanicalName}) Care Guide & Specs – PlantCare Lab`,
        description: `Complete horticultural guide for ${plant.name}: light (${plant.light.footCandles}), watering thresholds, ASPCA pet toxicity, soil recipe, and propagation steps.`,
        canonicalUrl: `${BASE_URL}/plants/${plant.slug}`,
        ogType: 'article',
        ogImage: plant.imageUrl,
        keywords: `${plant.name.toLowerCase()}, ${plant.botanicalName.toLowerCase()}, ${plant.name.toLowerCase()} care, pet toxicity, indoor ${plant.category.toLowerCase()}`,
        jsonLd: {
          '@context': 'https://schema.org',
          '@type': 'ItemPage',
          'name': `${plant.name} Growing Guide`,
          'url': `${BASE_URL}/plants/${plant.slug}`,
          'description': plant.summary,
          'image': plant.imageUrl,
          'breadcrumb': {
            '@type': 'BreadcrumbList',
            'itemListElement': [
              { '@type': 'ListItem', 'position': 1, 'name': 'Home', 'item': BASE_URL },
              { '@type': 'ListItem', 'position': 2, 'name': 'Plant Library', 'item': `${BASE_URL}/plants` },
              { '@type': 'ListItem', 'position': 3, 'name': plant.name, 'item': `${BASE_URL}/plants/${plant.slug}` }
            ]
          }
        }
      };
    }
  }

  // 6. Guides Hub
  if (cleanPath === '/guides') {
    return {
      title: 'Evidence-Based Indoor Plant Care Guides – PlantCare Lab',
      description: 'In-depth horticultural guides on houseplant watering physics, foot-candle light calculation, chunky aroid soil recipes, and root rot treatment.',
      canonicalUrl: `${BASE_URL}/guides`,
      ogType: 'website',
      ogImage: DEFAULT_IMAGE,
      keywords: 'plant care guides, houseplant articles, watering guide, light guide, chunky soil recipe, root rot treatment',
      jsonLd: {
        '@context': 'https://schema.org',
        '@type': 'CollectionPage',
        'name': 'PlantCare Lab Editorial Guides',
        'url': `${BASE_URL}/guides`
      }
    };
  }

  // 7. Guide Detail
  if (cleanPath.startsWith('/guides/')) {
    const slug = cleanPath.replace('/guides/', '');
    const guide = GUIDES_DATA.find(g => g.slug === slug);
    if (guide) {
      return {
        title: `${guide.seoTitle} | PlantCare Lab`,
        description: guide.metaDescription,
        canonicalUrl: `${BASE_URL}/guides/${guide.slug}`,
        ogType: 'article',
        ogImage: guide.heroImage,
        keywords: `${guide.category.toLowerCase()}, ${guide.title.toLowerCase()}, indoor plant care, botany`,
        jsonLd: {
          '@context': 'https://schema.org',
          '@graph': [
            {
              '@type': 'Article',
              'headline': guide.title,
              'description': guide.metaDescription,
              'image': guide.heroImage,
              'datePublished': guide.publishedDate,
              'dateModified': guide.updatedDate,
              'author': {
                '@type': 'Person',
                'name': guide.author.name,
                'jobTitle': guide.author.role
              },
              'publisher': {
                '@type': 'Organization',
                'name': 'PlantCare Lab',
                'url': BASE_URL,
                'logo': DEFAULT_IMAGE
              },
              'mainEntityOfPage': {
                '@type': 'WebPage',
                '@id': `${BASE_URL}/guides/${guide.slug}`
              }
            },
            {
              '@type': 'FAQPage',
              'mainEntity': guide.faqs.map(f => ({
                '@type': 'Question',
                'name': f.q,
                'acceptedAnswer': {
                  '@type': 'Answer',
                  'text': f.a
                }
              }))
            },
            {
              '@type': 'BreadcrumbList',
              'itemListElement': [
                { '@type': 'ListItem', 'position': 1, 'name': 'Home', 'item': BASE_URL },
                { '@type': 'ListItem', 'position': 2, 'name': 'Guides', 'item': `${BASE_URL}/guides` },
                { '@type': 'ListItem', 'position': 3, 'name': guide.title, 'item': `${BASE_URL}/guides/${guide.slug}` }
              ]
            }
          ]
        }
      };
    }
  }

  // 8. Legal & Standard Pages
  const staticTitles: Record<string, { title: string; description: string }> = {
    '/about': {
      title: 'About PlantCare Lab – Botanical Science & Horticultural Standards',
      description: 'Learn about PlantCare Lab mission, our team of indoor agronomists, peer-reviewed botanical formulas, and editorial independence.'
    },
    '/contact': {
      title: 'Contact the Botanical Desk – PlantCare Lab',
      description: 'Get in touch with the PlantCare Lab team for inquiries, formula feedback, partnerships, or plant diagnostic questions.'
    },
    '/privacy-policy': {
      title: 'Privacy Policy & Google AdSense Disclosures – PlantCare Lab',
      description: 'Privacy policy for PlantCare Lab detailing minimal data collection, Google AdSense cookies, GDPR, and CCPA user rights.'
    },
    '/terms': {
      title: 'Terms of Service – PlantCare Lab',
      description: 'Terms of service and acceptable use governing the PlantCare Lab web application and scientific calculators.'
    },
    '/disclaimer': {
      title: 'Horticultural & Veterinary Disclaimer – PlantCare Lab',
      description: 'Important horticultural and veterinary advisories regarding soil moisture testing and ASPCA pet toxicity.'
    },
    '/cookie-policy': {
      title: 'Cookie Policy & Consent Choices – PlantCare Lab',
      description: 'Detailed information regarding essential technical cookies and Google AdSense advertising cookies.'
    },
    '/offline': {
      title: 'Offline Mode – PlantCare Lab',
      description: 'You are currently offline. Access cached botanical calculators and previously viewed guides.'
    }
  };

  if (staticTitles[cleanPath]) {
    return {
      title: `${staticTitles[cleanPath].title} | PlantCare Lab`,
      description: staticTitles[cleanPath].description,
      canonicalUrl: `${BASE_URL}${cleanPath}`,
      ogType: 'website',
      ogImage: DEFAULT_IMAGE
    };
  }

  // Default
  return {
    title: 'PlantCare Lab – Smart Plant Care Tools & Guides',
    description: 'Science-backed indoor plant watering calculators, light diagnostic tools, soil mix recipes, and comprehensive care guides.',
    canonicalUrl: `${BASE_URL}${cleanPath}`,
    ogType: 'website',
    ogImage: DEFAULT_IMAGE
  };
}

export function applySeoMetadata(seo: SeoMetadata) {
  if (typeof document === 'undefined') return;

  // Title
  document.title = seo.title;

  // Helper for meta tags
  const setMeta = (attrName: string, attrVal: string, content: string) => {
    let el = document.querySelector(`meta[${attrName}="${attrVal}"]`);
    if (!el) {
      el = document.createElement('meta');
      el.setAttribute(attrName, attrVal);
      document.head.appendChild(el);
    }
    el.setAttribute('content', content);
  };

  // Standard Meta
  setMeta('name', 'description', seo.description);
  if (seo.keywords) setMeta('name', 'keywords', seo.keywords);

  // Canonical
  let canonicalEl = document.querySelector('link[rel="canonical"]');
  if (!canonicalEl) {
    canonicalEl = document.createElement('link');
    canonicalEl.setAttribute('rel', 'canonical');
    document.head.appendChild(canonicalEl);
  }
  canonicalEl.setAttribute('href', seo.canonicalUrl);

  // Open Graph
  setMeta('property', 'og:title', seo.title);
  setMeta('property', 'og:description', seo.description);
  setMeta('property', 'og:url', seo.canonicalUrl);
  setMeta('property', 'og:type', seo.ogType || 'website');
  setMeta('property', 'og:image', seo.ogImage || `${BASE_URL}/pwa-512x512.png`);
  setMeta('property', 'og:site_name', 'PlantCare Lab');

  // Twitter Card
  setMeta('name', 'twitter:card', 'summary_large_image');
  setMeta('name', 'twitter:title', seo.title);
  setMeta('name', 'twitter:description', seo.description);
  setMeta('name', 'twitter:image', seo.ogImage || `${BASE_URL}/pwa-512x512.png`);

  // Dynamic Schema.org JSON-LD injection
  if (seo.jsonLd) {
    let scriptEl = document.getElementById('dynamic-page-schema') as HTMLScriptElement | null;
    if (!scriptEl) {
      scriptEl = document.createElement('script');
      scriptEl.id = 'dynamic-page-schema';
      scriptEl.type = 'application/ld+json';
      document.head.appendChild(scriptEl);
    }
    scriptEl.textContent = JSON.stringify(seo.jsonLd);
  }
}
