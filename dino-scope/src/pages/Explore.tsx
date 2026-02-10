import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search } from 'lucide-react';
import { DinoCard } from '../components/DinoCard';
import { dinosaurs } from '../data/dinos';

export const Explore: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [filterType, setFilterType] = useState<'All' | 'Carnivore' | 'Herbivore' | 'Omnivore'>('All');

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 12;

    const filteredDinos = dinosaurs.filter(dino => {
        const matchesSearch = dino.name.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesFilter = filterType === 'All' || dino.type === filterType;
        return matchesSearch && matchesFilter;
    });

    const totalPages = Math.ceil(filteredDinos.length / itemsPerPage);
    const displayedDinos = filteredDinos.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    // Reset page when filter changes
    useEffect(() => {
        setCurrentPage(1);
    }, [searchTerm, filterType]);

    return (
        <div className="bg-obsidian min-h-screen pt-24 px-6 pb-20">
            <div className="max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-12 text-center"
                >
                    <h1 className="text-5xl font-display font-bold text-white mb-4">Explore the Era</h1>
                    <p className="text-ash-light max-w-2xl mx-auto">
                        Search our comprehensive database of prehistoric life. Filter by diet or era to find exactly what you're looking for.
                    </p>
                </motion.div>

                {/* Search & Filter Bar */}
                <div className="flex flex-col md:flex-row gap-4 mb-12 items-center justify-between bg-white/5 p-4 rounded-2xl border border-white/10 backdrop-blur-sm">
                    <div className="relative flex-1 w-full">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-ash-light w-5 h-5" />
                        <input
                            type="text"
                            placeholder="Search dinosaurs..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full bg-obsidian-shard border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white placeholder:text-ash-dark focus:outline-none focus:border-volcanic-orange transition-colors"
                        />
                    </div>

                    <div className="flex gap-2 w-full md:w-auto overflow-x-auto pb-2 md:pb-0">
                        {['All', 'Carnivore', 'Herbivore', 'Omnivore'].map((type) => (
                            <button
                                key={type}
                                onClick={() => setFilterType(type as any)}
                                className={`px-6 py-3 rounded-xl font-bold uppercase text-sm tracking-wide transition-all whitespace-nowrap ${filterType === type
                                    ? 'bg-volcanic-orange text-white shadow-lg shadow-volcanic-orange/20'
                                    : 'bg-obsidian-shard text-ash-light hover:text-white hover:bg-white/10'
                                    }`}
                            >
                                {type}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {displayedDinos.map((dino, index) => (
                        <DinoCard key={dino.id} dino={dino} index={index} />
                    ))}
                    {filteredDinos.length === 0 && (
                        <div className="col-span-full text-center py-20 text-ash-dark">
                            <p className="text-xl">No dinosaurs found matching your criteria.</p>
                        </div>
                    )}
                </div>

                {/* Pagination Controls */}
                {totalPages > 1 && (
                    <div className="flex justify-center mt-12 gap-2">
                        <button
                            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                            disabled={currentPage === 1}
                            className="px-4 py-2 rounded-lg bg-obsidian-shard border border-white/10 text-white disabled:opacity-50 hover:bg-white/10 transition-colors"
                        >
                            Previous
                        </button>
                        <span className="px-4 py-2 text-ash-light">
                            Page {currentPage} of {totalPages}
                        </span>
                        <button
                            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                            disabled={currentPage === totalPages}
                            className="px-4 py-2 rounded-lg bg-obsidian-shard border border-white/10 text-white disabled:opacity-50 hover:bg-white/10 transition-colors"
                        >
                            Next
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};
