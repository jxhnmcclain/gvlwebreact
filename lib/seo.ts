/**
 * SEO utilities for meta tags, Open Graph, and structured data
 */

export interface SEOMetadata {
    title: string;
    description: string;
    canonical?: string;
    ogType?: 'website' | 'article';
    ogImage?: string;
    ogUrl?: string;
    articlePublishedTime?: string;
    articleAuthor?: string;
    articleTags?: string[];
    twitterCard?: 'summary' | 'summary_large_image';
}

/**
 * Generate JSON-LD structured data for blog post
 */
export function generateBlogPostStructuredData(post: {
    title: string;
    description: string;
    date: string;
    author: string;
    image: string;
    url: string;
}) {
    return {
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        headline: post.title,
        description: post.description,
        image: post.image,
        datePublished: post.date,
        dateModified: post.date,
        author: {
            '@type': 'Person',
            name: post.author,
        },
        publisher: {
            '@type': 'Organization',
            name: 'Growth Video Lab',
            logo: {
                '@type': 'ImageObject',
                url: 'https://growthvideolab.com/logo.png',
            },
        },
        mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': post.url,
        },
    };
}

/**
 * Generate JSON-LD structured data for organization
 */
export function generateOrganizationStructuredData() {
    return {
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: 'Growth Video Lab',
        url: 'https://growthvideolab.com',
        logo: 'https://growthvideolab.com/logo.png',
        image: 'https://growthvideolab.com/og-image.jpg',
        description: 'Agencia especializada en producción de video, branding y estrategia de contenido digital',
        sameAs: [
            'https://www.instagram.com/growthvideolab',
        ],
    };
}

/**
 * Generate breadcrumb structured data
 */
export function generateBreadcrumbStructuredData(items: { name: string; url: string }[]) {
    return {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: items.map((item, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            name: item.name,
            item: item.url,
        })),
    };
}

/**
 * Inject structured data into page
 */
export function injectStructuredData(data: any) {
    if (typeof document === 'undefined') return;

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(data);
    document.head.appendChild(script);

    return () => {
        document.head.removeChild(script);
    };
}

/**
 * Set meta tags for SEO
 */
export function setMetaTags(metadata: SEOMetadata) {
    if (typeof document === 'undefined') return;

    // Title
    document.title = metadata.title;

    // Description
    setMetaTag('description', metadata.description);

    // Canonical
    if (metadata.canonical) {
        setLinkTag('canonical', metadata.canonical);
    }

    // Open Graph
    setMetaTag('og:title', metadata.title, 'property');
    setMetaTag('name', metadata.title);
    setMetaTag('og:description', metadata.description, 'property');
    setMetaTag('og:type', metadata.ogType || 'website', 'property');

    if (metadata.ogImage) {
        setMetaTag('og:image', metadata.ogImage, 'property');
    }

    if (metadata.ogUrl) {
        setMetaTag('og:url', metadata.ogUrl, 'property');
    }

    // Article-specific tags
    if (metadata.ogType === 'article') {
        if (metadata.articlePublishedTime) {
            setMetaTag('article:published_time', metadata.articlePublishedTime, 'property');
        }
        if (metadata.articleAuthor) {
            setMetaTag('article:author', metadata.articleAuthor, 'property');
        }
        if (metadata.articleTags) {
            metadata.articleTags.forEach((tag) => {
                setMetaTag('article:tag', tag, 'property');
            });
        }
    }

    // Twitter Card
    setMetaTag('twitter:card', metadata.twitterCard || 'summary_large_image');
    setMetaTag('twitter:title', metadata.title);
    setMetaTag('twitter:description', metadata.description);

    if (metadata.ogImage) {
        setMetaTag('twitter:image', metadata.ogImage);
    }
}

/**
 * Helper to set or update a meta tag
 */
function setMetaTag(name: string, content: string, attribute: 'name' | 'property' = 'name') {
    if (typeof document === 'undefined') return;

    let element = document.querySelector(`meta[${attribute}="${name}"]`);

    if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attribute, name);
        document.head.appendChild(element);
    }

    element.setAttribute('content', content);
}

/**
 * Helper to set or update a link tag
 */
function setLinkTag(rel: string, href: string) {
    if (typeof document === 'undefined') return;

    let element = document.querySelector(`link[rel="${rel}"]`);

    if (!element) {
        element = document.createElement('link');
        element.setAttribute('rel', rel);
        document.head.appendChild(element);
    }

    element.setAttribute('href', href);
}

/**
 * Generate SEO-friendly URL slug
 */
export function generateSlug(text: string): string {
    return text
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '') // Remove accents
        .replace(/[^a-z0-9\s-]/g, '') // Remove special characters
        .trim()
        .replace(/\s+/g, '-') // Replace spaces with hyphens
        .replace(/-+/g, '-'); // Remove duplicate hyphens
}
