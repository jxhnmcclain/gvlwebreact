import React from 'react';
import { Link } from 'react-router-dom';
import BlogCard from './BlogCard';
import { getAllPostsMetadata } from '../lib/blogUtils';
import { ArrowRight } from 'lucide-react';

const RecentPosts: React.FC = () => {
    // Get latest 3 posts
    const posts = getAllPostsMetadata().slice(0, 3);

    if (posts.length === 0) return null;

    return (
        <section className="py-24 bg-white px-6 md:px-12">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
                    <div>
                        <span className="text-gvl-orange font-bold tracking-wider uppercase mb-2 block">
                            Nuetro Blog
                        </span>
                        <h2 className="text-4xl md:text-5xl font-black tracking-tight text-gvl-charcoal">
                            Últimas Novedades
                        </h2>
                    </div>

                    <Link
                        to="/blog"
                        className="group flex items-center gap-2 font-bold text-gvl-charcoal hover:text-gvl-orange transition-colors"
                    >
                        Ver todos los artículos
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {posts.map((post) => (
                        <div key={post.slug} className="h-full">
                            <BlogCard post={post} />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default RecentPosts;
