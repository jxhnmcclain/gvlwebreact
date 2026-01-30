import React from 'react';
import { Link } from 'react-router-dom';
import { BlogMetadata, formatDate } from '../lib/blogUtils';
import { Calendar, Clock, Tag } from 'lucide-react';

interface BlogCardProps {
    post: BlogMetadata;
}

const BlogCard: React.FC<BlogCardProps> = ({ post }) => {
    const category = post.category || 'Blog';
    const author = post.author || 'GVL';

    return (
        <Link
            to={`/blog/${post.slug}`}
            className="group block bg-white h-full flex flex-col hover:shadow-lg transition-shadow duration-300 rounded-lg overflow-hidden border border-transparent hover:border-gray-100"
        >
            {/* Category Pill */}
            <div className="px-6 pt-6 pb-4">
                <span className="inline-block px-4 py-1 rounded-full border border-gvl-orange text-gvl-orange text-xs font-bold uppercase tracking-wide">
                    {category}
                </span>
            </div>

            {/* Title */}
            <div className="px-6 pb-4 flex-grow">
                <h3 className="text-xl md:text-2xl font-bold text-black leading-tight group-hover:text-gvl-orange transition-colors duration-300">
                    {post.title}
                </h3>
            </div>

            {/* Featured Image */}
            <div className="relative h-48 w-full overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-200">
                    {/* Placeholder for actual image */}
                    <div className="w-full h-full flex items-center justify-center text-gray-300">
                        <span className="text-6xl opacity-20 font-black">{category.charAt(0)}</span>
                    </div>
                </div>
            </div>

            {/* Meta Footer */}
            <div className="px-6 py-4 border-t border-gray-100 mt-auto flex items-center justify-between text-xs font-semibold text-gray-500 uppercase tracking-wider">
                <span>{formatDate(post.date)}</span>
                <span className="text-black">BY {author.toUpperCase()}</span>
            </div>
        </Link>
    );
};

export default BlogCard;
