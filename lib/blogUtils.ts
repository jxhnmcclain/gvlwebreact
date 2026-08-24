import contentSnapshot from '../content/generated-content.json';

// Build-time content types. The browser never talks directly to Supabase.
export interface BlogPost {
    slug: string;
    title: string;
    date: string;
    author: string;
    description: string;
    excerpt: string;
    category: string;
    tags: string[];
    image: string;
    readTime: number;
    featured?: boolean;
    content: string;
}

export interface BlogMetadata {
    slug: string;
    title: string;
    date: string;
    author: string;
    description: string;
    excerpt: string;
    category: string;
    tags: string[];
    image: string;
    readTime: number;
    featured?: boolean;
}

/**
 * Get all blog posts with metadata and content
 */
export function getAllPosts(): BlogPost[] {
    return (contentSnapshot.posts as BlogPost[])
        .slice()
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

/**
 * Get all blog post metadata (without content for performance)
 */
export function getAllPostsMetadata(): BlogMetadata[] {
    return getAllPosts().map(({ content, ...metadata }) => metadata);
}

/**
 * Get a single blog post by slug
 */
export function getPostBySlug(slug: string): BlogPost | null {
    const posts = getAllPosts();
    return posts.find((post) => post.slug === slug) || null;
}

/**
 * Get featured post (latest post with featured: true, or just latest)
 */
export function getFeaturedPost(): BlogPost | null {
    const posts = getAllPosts();
    const featuredPost = posts.find((post) => post.featured);
    return featuredPost || posts[0] || null;
}

/**
 * Get posts by category
 */
export function getPostsByCategory(category: string): BlogMetadata[] {
    return getAllPostsMetadata().filter(
        (post) => post.category.toLowerCase() === category.toLowerCase()
    );
}

/**
 * Get all unique categories
 */
export function getAllCategories(): string[] {
    const posts = getAllPostsMetadata();
    const categories = new Set(posts.map((post) => post.category).filter(Boolean));
    return Array.from(categories).sort();
}

/**
 * Search posts by query (searches title, excerpt, tags)
 */
export function searchPosts(query: string): BlogMetadata[] {
    if (!query.trim()) return getAllPostsMetadata();

    const lowerQuery = query.toLowerCase();
    return getAllPostsMetadata().filter((post) => {
        const searchableText = `
      ${post.title} 
      ${post.excerpt} 
      ${post.tags.join(' ')} 
      ${post.category}
    `.toLowerCase();

        return searchableText.includes(lowerQuery);
    });
}

/**
 * Filter and search posts
 */
export function filterPosts(
    query: string = '',
    category: string = '',
    sortBy: 'newest' | 'oldest' = 'newest'
): BlogMetadata[] {
    let posts = getAllPostsMetadata();

    // Filter by category
    if (category && category !== 'all') {
        posts = posts.filter(
            (post) => post.category.toLowerCase() === category.toLowerCase()
        );
    }

    // Search by query
    if (query.trim()) {
        const lowerQuery = query.toLowerCase();
        posts = posts.filter((post) => {
            const searchableText = `
        ${post.title} 
        ${post.excerpt} 
        ${post.tags.join(' ')} 
        ${post.category}
      `.toLowerCase();

            return searchableText.includes(lowerQuery);
        });
    }

    // Sort
    if (sortBy === 'oldest') {
        posts = posts.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    } else {
        posts = posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    }

    return posts;
}

/**
 * Get related posts (same category, excluding current post)
 */
export function getRelatedPosts(slug: string, limit: number = 3): BlogMetadata[] {
    const currentPost = getPostBySlug(slug);
    if (!currentPost) return [];

    return getAllPostsMetadata()
        .filter((post) => post.slug !== slug && post.category === currentPost.category)
        .slice(0, limit);
}

/**
 * Format date for display
 */
export function formatDate(dateString: string): string {
    if (!dateString) return '';

    try {
        // Handle YYYY-MM-DD explicitly to avoid timezone issues
        const [year, month, day] = dateString.toString().split('-').map(Number);
        const date = new Date(year, month - 1, day);

        // Check if date is valid
        if (isNaN(date.getTime())) {
            return dateString;
        }

        return date.toLocaleDateString('es-ES', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    } catch (e) {
        return dateString;
    }
}

/**
 * Calculate estimated read time from content
 */
export function calculateReadTime(content: string): number {
    const wordsPerMinute = 200;
    const wordCount = content.trim().split(/\s+/).length;
    return Math.ceil(wordCount / wordsPerMinute);
}
