import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeSlug from 'rehype-slug';
import {
    getPostBySlug,
    getRelatedPosts,
    formatDate,
    BlogMetadata,
} from '../lib/blogUtils';
import {
    setMetaTags,
    generateBlogPostStructuredData,
    generateBreadcrumbStructuredData,
    injectStructuredData,
    SITE_URL,
} from '../lib/seo';
import { Calendar, Clock, ArrowLeft, Share2, Tag } from 'lucide-react';
import BlogCard from '../components/BlogCard';
import NotFoundPage from './NotFoundPage';

const BlogPost: React.FC = () => {
    const { slug } = useParams<{ slug: string }>();
    const post = slug ? getPostBySlug(slug) : null;
    const relatedPosts = slug ? getRelatedPosts(slug, 3) : [];

    // Set SEO meta tags and structured data
    useEffect(() => {
        if (!post) return;

        const currentUrl = `${SITE_URL}/blog/${post.slug}`;

        // Set meta tags
        setMetaTags({
            title: `${post.title} | Growth Video Lab Blog`,
            description: post.description,
            canonical: currentUrl,
            ogType: 'article',
            ogUrl: currentUrl,
            ogImage: post.image,
            articlePublishedTime: post.date,
            articleAuthor: post.author,
            articleTags: post.tags,
            twitterCard: 'summary_large_image',
        });

        // Inject structured data
        const blogPostData = generateBlogPostStructuredData({
            title: post.title,
            description: post.description,
            date: post.date,
            author: post.author,
            image: post.image,
            url: currentUrl,
        });

        const breadcrumbData = generateBreadcrumbStructuredData([
            { name: 'Inicio', url: SITE_URL },
            { name: 'Blog', url: `${SITE_URL}/blog` },
            { name: post.title, url: currentUrl },
        ]);

        const cleanup1 = injectStructuredData(blogPostData);
        const cleanup2 = injectStructuredData(breadcrumbData);

        return () => {
            cleanup1?.();
            cleanup2?.();
        };
    }, [post]);

    // Handle share functionality
    const handleShare = async () => {
        if (navigator.share && post) {
            try {
                await navigator.share({
                    title: post.title,
                    text: post.excerpt,
                    url: window.location.href,
                });
            } catch (error) {
                console.log('Error sharing:', error);
            }
        } else {
            // Fallback: copy to clipboard
            navigator.clipboard.writeText(window.location.href);
            alert('¡Enlace copiado al portapapeles!');
        }
    };

    // Unknown slugs render the site's 404 experience instead of masking the error.
    if (!post) {
        return <NotFoundPage />;
    }

    return (
        <div className="min-h-screen bg-[#050505] text-white pt-32">
            {/* Breadcrumb Navigation */}
            <nav className="bg-transparent">
                <div className="max-w-4xl mx-auto px-6 py-4">
                    <div className="flex items-center gap-2 text-sm text-white/45">
                        <Link to="/" className="hover:text-gvl-orange transition-colors duration-200">
                            Inicio
                        </Link>
                        <span>/</span>
                        <Link to="/blog" className="hover:text-gvl-orange transition-colors duration-200">
                            Blog
                        </Link>
                        <span>/</span>
                        <span className="text-white/75 font-semibold line-clamp-1">{post.title}</span>
                    </div>
                </div>
            </nav>

            {/* Article Header */}
            <article className="max-w-4xl mx-auto px-6 py-12">
                {/* Back Button */}
                <Link
                    to="/blog"
                    className="inline-flex items-center gap-2 text-gvl-yellow hover:text-white font-semibold mb-8 group transition-colors duration-200"
                >
                    <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform duration-200" />
                    <span>Volver al Blog</span>
                </Link>

                {/* Category Badge */}
                <div className="mb-6">
                    <span className="inline-flex items-center gap-1 px-4 py-2 border border-white/15 text-gvl-yellow text-sm font-mono uppercase tracking-[0.16em]">
                        <Tag className="w-4 h-4" />
                        {post.category}
                    </span>
                </div>

                {/* Title */}
                <h1 className="text-4xl md:text-5xl font-black text-white mb-6 leading-tight">
                    {post.title}
                </h1>

                {/* Excerpt */}
                <p className="text-xl text-white/55 mb-8 leading-relaxed">{post.excerpt}</p>

                {/* Meta Info */}
                <div className="flex flex-wrap items-center gap-6 pb-8 mb-8 border-b border-white/15">
                    <div className="flex items-center gap-2 text-white/45">
                        <Calendar className="w-5 h-5" />
                        <span>{formatDate(post.date)}</span>
                    </div>
                    <div className="flex items-center gap-2 text-white/45">
                        <Clock className="w-5 h-5" />
                        <span>{post.readTime} min de lectura</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                        <span>Por {post.author}</span>
                    </div>
                    <button
                        onClick={handleShare}
                        className="ml-auto flex items-center gap-2 px-4 py-2 border border-white/15 hover:bg-white hover:text-black text-white/65 transition-colors duration-200"
                        aria-label="Compartir artículo"
                    >
                        <Share2 className="w-4 h-4" />
                        <span className="hidden sm:inline">Compartir</span>
                    </button>
                </div>

                {/* Featured Image */}
                {post.image && (
                    <div className="mb-12 rounded-2xl overflow-hidden shadow-2xl">
                        <img
                            src={post.image}
                            alt={post.title}
                            className="w-full h-auto object-cover max-h-[500px]"
                        />
                    </div>
                )}

                {/* Article Content */}
                <div className="prose prose-lg max-w-none text-white/70">
                    <ReactMarkdown
                        remarkPlugins={[remarkGfm]}
                        rehypePlugins={[rehypeSlug]}
                        components={{
                            // Custom heading styles
                            h1: ({ children }) => (
                                <h1 className="text-4xl font-bold text-white mt-12 mb-6 leading-tight">
                                    {children}
                                </h1>
                            ),
                            h2: ({ children }) => (
                                <h2 className="text-3xl font-bold text-white mt-10 mb-4 leading-tight">
                                    {children}
                                </h2>
                            ),
                            h3: ({ children }) => (
                                <h3 className="text-2xl font-bold text-white mt-8 mb-3 leading-tight">
                                    {children}
                                </h3>
                            ),
                            // Custom paragraph styles
                            p: ({ children }) => (
                                <p className="text-white/70 leading-relaxed mb-6">{children}</p>
                            ),
                            // Custom link styles
                            a: ({ href, children }) => (
                                <a
                                    href={href}
                                    className="text-gvl-yellow hover:text-white underline font-semibold transition-colors duration-200"
                                    target={href?.startsWith('http') ? '_blank' : undefined}
                                    rel={href?.startsWith('http') ? 'noopener noreferrer' : undefined}
                                >
                                    {children}
                                </a>
                            ),
                            // Custom list styles
                            ul: ({ children }) => (
                                <ul className="list-disc list-inside space-y-2 mb-6 text-white/70">{children}</ul>
                            ),
                            ol: ({ children }) => (
                                <ol className="list-decimal list-inside space-y-2 mb-6 text-white/70">
                                    {children}
                                </ol>
                            ),
                            // Custom blockquote styles
                            blockquote: ({ children }) => (
                                <blockquote className="border-l-4 border-gvl-yellow bg-white/[0.03] pl-6 py-4 my-8 italic text-white/65">
                                    {children}
                                </blockquote>
                            ),
                            // Custom code styles
                            code: ({ className, children }) => {
                                const isInline = !className;
                                return isInline ? (
                                    <code className="bg-white/10 text-gvl-yellow px-2 py-1 text-sm font-mono">
                                        {children}
                                    </code>
                                ) : (
                                    <code className="block bg-gvl-charcoal text-gray-100 p-4 rounded-lg overflow-x-auto text-sm font-mono my-6">
                                        {children}
                                    </code>
                                );
                            },
                            // Custom strong/bold styles
                            strong: ({ children }) => (
                                <strong className="font-bold text-white">{children}</strong>
                            ),
                        }}
                    >
                        {post.content}
                    </ReactMarkdown>
                </div>

                {/* Tags */}
                {post.tags.length > 0 && (
                    <div className="mt-12 pt-8 border-t border-white/15">
                        <h3 className="text-sm font-semibold text-white/45 mb-3">Etiquetas:</h3>
                        <div className="flex flex-wrap gap-2">
                            {post.tags.map((tag) => (
                                <span
                                    key={tag}
                                    className="px-3 py-1 border border-white/15 text-white/55 text-sm hover:bg-white hover:text-black transition-colors duration-200"
                                >
                                    #{tag}
                                </span>
                            ))}
                        </div>
                    </div>
                )}

                {/* Author Bio */}
                <div className="mt-12 p-6 border border-white/15 bg-white/[0.03]">
                    <h3 className="text-lg font-bold text-white mb-2">Sobre el Autor</h3>
                    <p className="text-white/65 leading-relaxed">
                        <strong>Growth Video Lab</strong> es una agencia especializada en producción de video,
                        branding y estrategia de contenido digital. Ayudamos a empresas y creadores a crecer a
                        través de contenido audiovisual que conecta y convierte.
                    </p>
                </div>

                {/* CTA */}
                <div className="mt-12 p-8 border border-white/15 bg-white/[0.03] text-white text-center">
                    <h3 className="text-2xl font-bold mb-3">¿Te Gustó Este Artículo?</h3>
                    <p className="text-lg mb-6 opacity-90">
                        Aplicamos estas estrategias para nuestros clientes. Hablemos de cómo podemos ayudarte.
                    </p>
                    <a
                        href="/contacto"
                        className="inline-block px-8 py-4 bg-white text-black font-bold hover:bg-gvl-yellow transition-all duration-300"
                    >
                        Agenda una Consultoría Gratuita
                    </a>
                </div>
            </article>

            {/* Related Posts */}
            {relatedPosts.length > 0 && (
                <section className="bg-[#090909] py-16 px-6 border-t border-white/10">
                    <div className="max-w-7xl mx-auto">
                        <h2 className="text-3xl font-bold text-white mb-8">Artículos Relacionados</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {relatedPosts.map((relatedPost) => (
                                <BlogCard key={relatedPost.slug} post={relatedPost} />
                            ))}
                        </div>
                    </div>
                </section>
            )}
        </div>
    );
};

export default BlogPost;
