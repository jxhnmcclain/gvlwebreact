import React, { useState, useEffect } from 'react';
import BlogHero from '../components/BlogHero';
import BlogSearch from '../components/BlogSearch';
import BlogCard from '../components/BlogCard';
import {
    getFeaturedPost,
    filterPosts,
    getAllCategories,
    BlogMetadata,
} from '../lib/blogUtils';
import { setMetaTags, SITE_URL } from '../lib/seo';

const Blog: React.FC = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [sortBy, setSortBy] = useState<'newest' | 'oldest'>('newest');
    const [filteredPosts, setFilteredPosts] = useState<BlogMetadata[]>([]);

    const featuredPost = getFeaturedPost();
    const categories = getAllCategories();

    // Update filtered posts when filters change
    useEffect(() => {
        const posts = filterPosts(searchQuery, selectedCategory, sortBy);
        setFilteredPosts(posts);
    }, [searchQuery, selectedCategory, sortBy]);

    // Set SEO meta tags
    useEffect(() => {
        setMetaTags({
            title: 'Blog - Growth Video Lab | Marketing Digital, Video y Branding',
            description:
                'Descubre estrategias de video marketing, branding, redes sociales y contenido digital. Guías prácticas y tips para hacer crecer tu negocio online.',
            canonical: `${SITE_URL}/blog`,
            ogType: 'website',
            ogUrl: `${SITE_URL}/blog`,
            ogImage: '/og-blog.jpg',
        });
    }, []);

    return (
        <div className="min-h-screen bg-[#050505] text-white">
            {/* Hero Section with Featured Post */}
            {/* Header Section */}
            <BlogHero />

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-6 md:px-12 py-12">
                {/* Search and Filter Bar */}
                <BlogSearch
                    searchQuery={searchQuery}
                    onSearchChange={setSearchQuery}
                    selectedCategory={selectedCategory}
                    onCategoryChange={setSelectedCategory}
                    categories={categories}
                    sortBy={sortBy}
                    onSortChange={setSortBy}
                    resultsCount={filteredPosts.length}
                />

                {/* Blog Posts Grid */}
                {filteredPosts.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredPosts.map((post) => (
                            <BlogCard key={post.slug} post={post} />
                        ))}
                    </div>
                ) : (
                    /* No Results */
                    <div className="text-center py-20 border border-white/10 bg-zinc-950">
                        <div className="inline-flex items-center justify-center w-20 h-20 border border-white/10 mb-6">
                            <svg
                                className="w-10 h-10 text-white/30"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                />
                            </svg>
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-3">
                            No encontramos resultados
                        </h3>
                        <p className="text-white/45 mb-6">
                            Intenta con otros términos de búsqueda o categorías
                        </p>
                        <button
                            onClick={() => {
                                setSearchQuery('');
                                setSelectedCategory('all');
                            }}
                            className="px-6 py-3 border border-white/20 text-white/70 font-mono text-xs uppercase tracking-[0.2em] hover:bg-white hover:text-black transition-colors duration-200"
                        >
                            Limpiar Filtros
                        </button>
                    </div>
                )}
            </div>

            {/* CTA Section */}
            <section className="bg-black py-16 px-6 border-t border-white/10">
                <div className="max-w-4xl mx-auto text-center text-white">
                    <h2 className="text-3xl md:text-4xl font-black mb-4 tracking-tight">
                        Si una nota abre una puerta.
                    </h2>
                    <p className="text-lg mb-8 text-white/45">
                        escribenos.
                    </p>
                    <a
                        href="/contacto"
                        className="inline-block px-8 py-4 border border-white/20 text-white/70 font-mono text-xs uppercase tracking-[0.22em] hover:bg-white hover:text-black transition-colors"
                    >
                        abrir conversacion
                    </a>
                </div>
            </section>
        </div>
    );
};

export default Blog;
