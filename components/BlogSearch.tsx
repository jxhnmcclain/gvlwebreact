import React from 'react';
import { Search, Filter, X } from 'lucide-react';

interface BlogSearchProps {
    searchQuery: string;
    onSearchChange: (query: string) => void;
    selectedCategory: string;
    onCategoryChange: (category: string) => void;
    categories: string[];
    sortBy: 'newest' | 'oldest';
    onSortChange: (sort: 'newest' | 'oldest') => void;
    resultsCount: number;
}

const BlogSearch: React.FC<BlogSearchProps> = ({
    searchQuery,
    onSearchChange,
    selectedCategory,
    onCategoryChange,
    categories,
    sortBy,
    onSortChange,
    resultsCount,
}) => {
    const handleClearSearch = () => {
        onSearchChange('');
    };

    return (
        <div className="bg-zinc-950 border border-white/12 p-5 mb-12">
            <div className="flex flex-col lg:flex-row gap-4">
                {/* Search Input */}
                <div className="flex-1 relative">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30">
                        <Search className="w-5 h-5" />
                    </div>
                    <input
                        type="text"
                        placeholder="Buscar artículos por título, tema o palabra clave..."
                        value={searchQuery}
                        onChange={(e) => onSearchChange(e.target.value)}
                        className="w-full pl-12 pr-12 py-3 border border-white/12 bg-black text-white placeholder:text-white/25 focus:outline-none focus:border-gvl-yellow/60 transition-all duration-200"
                    />
                    {searchQuery && (
                        <button
                            onClick={handleClearSearch}
                            className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30 hover:text-white transition-colors duration-200"
                            aria-label="Limpiar búsqueda"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    )}
                </div>

                {/* Category Filter */}
                <div className="relative">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30 pointer-events-none">
                        <Filter className="w-5 h-5" />
                    </div>
                    <select
                        value={selectedCategory}
                        onChange={(e) => onCategoryChange(e.target.value)}
                        className="w-full lg:w-64 pl-12 pr-8 py-3 border border-white/12 focus:outline-none focus:border-gvl-yellow/60 transition-all duration-200 appearance-none bg-black text-white cursor-pointer"
                    >
                        <option value="all">Todas las Categorías</option>
                        {categories.map((category) => (
                            <option key={category} value={category}>
                                {category}
                            </option>
                        ))}
                    </select>
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30 pointer-events-none">
                        <svg
                            className="w-4 h-4"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M19 9l-7 7-7-7"
                            />
                        </svg>
                    </div>
                </div>

                {/* Sort Dropdown */}
                <div className="relative">
                    <select
                        value={sortBy}
                        onChange={(e) => onSortChange(e.target.value as 'newest' | 'oldest')}
                        className="w-full lg:w-48 px-4 py-3 border border-white/12 focus:outline-none focus:border-gvl-yellow/60 transition-all duration-200 appearance-none bg-black text-white cursor-pointer"
                    >
                        <option value="newest">Más Recientes</option>
                        <option value="oldest">Más Antiguos</option>
                    </select>
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30 pointer-events-none">
                        <svg
                            className="w-4 h-4"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M19 9l-7 7-7-7"
                            />
                        </svg>
                    </div>
                </div>
            </div>

            {/* Results Count */}
            <div className="mt-4 text-xs font-mono uppercase tracking-[0.18em] text-white/35">
                {searchQuery || selectedCategory !== 'all' ? (
                    <p>
                        Mostrando <span className="font-semibold text-gvl-yellow/80">{resultsCount}</span>{' '}
                        {resultsCount === 1 ? 'resultado' : 'resultados'}
                        {searchQuery && (
                            <>
                                {' '}
                                para "<span className="font-semibold">{searchQuery}</span>"
                            </>
                        )}
                        {selectedCategory !== 'all' && (
                            <>
                                {' '}
                                en <span className="font-semibold">{selectedCategory}</span>
                            </>
                        )}
                    </p>
                ) : (
                    <p>
                        Mostrando <span className="font-semibold text-gvl-yellow/80">{resultsCount}</span>{' '}
                        {resultsCount === 1 ? 'artículo' : 'artículos'}
                    </p>
                )}
            </div>

            {/* Active Filters */}
            {(searchQuery || selectedCategory !== 'all') && (
                <div className="mt-4 flex flex-wrap gap-2">
                    {searchQuery && (
                        <button
                            onClick={handleClearSearch}
                            className="inline-flex items-center gap-2 px-3 py-1 border border-white/12 text-white/60 text-sm hover:bg-white hover:text-black transition-colors duration-200"
                        >
                            <span>Búsqueda: "{searchQuery}"</span>
                            <X className="w-3.5 h-3.5" />
                        </button>
                    )}
                    {selectedCategory !== 'all' && (
                        <button
                            onClick={() => onCategoryChange('all')}
                            className="inline-flex items-center gap-2 px-3 py-1 border border-white/12 text-white/60 text-sm hover:bg-white hover:text-black transition-colors duration-200"
                        >
                            <span>Categoría: {selectedCategory}</span>
                            <X className="w-3.5 h-3.5" />
                        </button>
                    )}
                </div>
            )}
        </div>
    );
};

export default BlogSearch;
