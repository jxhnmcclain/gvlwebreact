// Blog post metadata and content types
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

// Blog post imports - we'll import all markdown files statically
const blogPosts = import.meta.glob('/content/blog/*.md', { as: 'raw', eager: true });

/**
 * Parse frontmatter and content from markdown string
 */
function parseFrontmatter(markdown: string): { metadata: any; content: string } {
    const frontmatterRegex = /^---\s*[\r\n]+([\s\S]*?)[\r\n]+---\s*[\r\n]+([\s\S]*)$/;
    const match = markdown.match(frontmatterRegex);

    if (!match) {
        return { metadata: {}, content: markdown };
    }

    const frontmatterText = match[1];
    const content = match[2];

    // Parse YAML-like frontmatter
    const metadata: any = {};
    frontmatterText.split(/[\r\n]+/).forEach((line) => {
        const colonIndex = line.indexOf(':');
        if (colonIndex === -1) return;

        const key = line.substring(0, colonIndex).trim();
        let value: any = line.substring(colonIndex + 1).trim();

        // Remove quotes
        if ((value.startsWith('"') && value.endsWith('"')) ||
            (value.startsWith("'") && value.endsWith("'"))) {
            value = value.slice(1, -1);
        }

        // Parse arrays
        if (value.startsWith('[') && value.endsWith(']')) {
            value = value
                .slice(1, -1)
                .split(',')
                .map((item) => item.trim().replace(/^["']|["']$/g, ''));
        }

        // Parse booleans
        if (value === 'true') value = true;
        if (value === 'false') value = false;

        // Parse numbers
        if (!isNaN(Number(value)) && value !== '') {
            value = Number(value);
        }

        metadata[key] = value;
    });

    return { metadata, content };
}

/**
 * Get slug from file path
 */
function getSlugFromPath(path: string): string {
    const fileName = path.split('/').pop() || '';
    return fileName.replace('.md', '');
}

/**
 * Get all blog posts with metadata and content
 */
export function getAllPosts(): BlogPost[] {
    const posts: BlogPost[] = [];

    Object.entries(blogPosts).forEach(([path, markdown]) => {
        const slug = getSlugFromPath(path);
        const { metadata, content } = parseFrontmatter(markdown as string);

        posts.push({
            slug,
            content,
            ...metadata,
            tags: Array.isArray(metadata.tags) ? metadata.tags : [],
            readTime: metadata.readTime || calculateReadTime(content),
        } as BlogPost);
    });

    // Sort by date (newest first)
    return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
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
