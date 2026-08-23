import React from 'react';
import { Link } from 'react-router-dom';
import { BlogMetadata, formatDate } from '../lib/blogUtils';

interface BlogCardProps {
    post: BlogMetadata;
}

const BlogCard: React.FC<BlogCardProps> = ({ post }) => {
    const category = post.category || 'Blog';
    const author = post.author || 'GVL';

    return (
        <Link
            to={`/blog/${post.slug}`}
            className="group block bg-zinc-950 h-full flex flex-col transition-colors duration-300 rounded-none overflow-hidden border border-white/12 hover:border-gvl-yellow/45"
        >
            <div className="px-6 pt-6 pb-4">
                <span className="inline-block px-3 py-1 border border-white/20 text-white/45 text-[10px] font-mono uppercase tracking-[0.24em]">
                    {category}
                </span>
            </div>

            <div className="px-6 pb-4 flex-grow">
                <h3 className="text-xl md:text-2xl font-black text-white leading-tight group-hover:text-gvl-yellow transition-colors duration-300">
                    {post.title}
                </h3>
            </div>

            <div className="relative h-44 w-full overflow-hidden border-y border-white/10 bg-black">
                {post.image ? (
                    <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-full object-cover opacity-55 grayscale contrast-125 transition-all duration-500 group-hover:opacity-85 group-hover:scale-105"
                    />
                ) : (
                    <div className="absolute inset-0 dither-bg">
                        <div className="w-full h-full flex items-center justify-center text-white/20">
                            <span className="text-6xl opacity-20 font-black">{category.charAt(0)}</span>
                        </div>
                    </div>
                )}
            </div>

            <div className="px-6 py-4 mt-auto flex items-center justify-between text-[10px] font-mono text-white/35 uppercase tracking-[0.22em]">
                <span>{formatDate(post.date)}</span>
                <span>BY {author.toUpperCase()}</span>
            </div>
        </Link>
    );
};

export default BlogCard;
