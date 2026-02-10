import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ChevronLeft, ChevronRight, Ruler, Weight, Clock } from 'lucide-react';
import { dinosaurs } from '../data/dinos';

export const DinoDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    // Default to first dino if id not found (or handle 404)
    const dino = dinosaurs.find(d => d.id === id);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    if (!dino) return <div className="p-20 text-center text-white">Dinosaur not found. <Link to="/" className="text-volcanic-orange">Return Home</Link></div>;

    const nextImage = () => {
        setCurrentImageIndex((prev) => (prev + 1) % dino.images.length);
    };

    const prevImage = () => {
        setCurrentImageIndex((prev) => (prev - 1 + dino.images.length) % dino.images.length);
    };

    // Auto slideshow
    useEffect(() => {
        const interval = setInterval(nextImage, 3000);
        return () => clearInterval(interval);
    }, [dino.images.length]);

    return (
        <div className="bg-obsidian min-h-screen pt-20">
            <div className="max-w-7xl mx-auto px-6 py-10">
                <Link to="/" className="inline-flex items-center text-ash-light hover:text-volcanic-orange transition-colors mb-6 group">
                    <ArrowLeft className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" />
                    Back to Expedition
                </Link>

                {/* Hero Section */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="relative rounded-3xl overflow-hidden shadow-2xl shadow-volcanic-orange/10 aspect-video lg:aspect-square"
                    >
                        <AnimatePresence mode="wait">
                            <motion.img
                                key={currentImageIndex}
                                src={dino.images[currentImageIndex]}
                                initial={{ opacity: 0, scale: 1.1 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.5 }}
                                className="w-full h-full object-cover absolute inset-0"
                                alt={`${dino.name} view ${currentImageIndex}`}
                            />
                        </AnimatePresence>

                        <div className="absolute inset-0 bg-gradient-to-t from-obsidian/60 to-transparent pointer-events-none" />

                        {/* Controls */}
                        <div className="absolute bottom-4 right-4 flex gap-2">
                            <button onClick={prevImage} className="p-2 bg-obsidian/50 backdrop-blur text-white rounded-full hover:bg-volcanic-orange transition-colors">
                                <ChevronLeft className="w-6 h-6" />
                            </button>
                            <button onClick={nextImage} className="p-2 bg-obsidian/50 backdrop-blur text-white rounded-full hover:bg-volcanic-orange transition-colors">
                                <ChevronRight className="w-6 h-6" />
                            </button>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                        className="flex flex-col justify-center"
                    >
                        <span className="text-volcanic-orange font-bold tracking-widest uppercase mb-2">
                            {dino.era} Period
                        </span>
                        <h1 className="text-5xl md:text-7xl font-display font-bold text-white mb-6">
                            {dino.name}
                        </h1>
                        <p className="text-xl text-ash-light leading-relaxed mb-8">
                            {dino.longDescription}
                        </p>

                        {/* Stats Grid */}
                        <div className="grid grid-cols-2 gap-6">
                            <div className="p-4 bg-white/5 rounded-xl border border-white/10 hover:border-volcanic-orange/50 transition-colors">
                                <div className="flex items-center gap-3 mb-2 text-volcanic-orange">
                                    <Ruler className="w-6 h-6" />
                                    <span className="font-bold uppercase text-xs tracking-wider">Length</span>
                                </div>
                                <span className="text-2xl font-display text-white">12-13 m</span>
                            </div>
                            <div className="p-4 bg-white/5 rounded-xl border border-white/10 hover:border-volcanic-orange/50 transition-colors">
                                <div className="flex items-center gap-3 mb-2 text-volcanic-orange">
                                    <Weight className="w-6 h-6" />
                                    <span className="font-bold uppercase text-xs tracking-wider">Weight</span>
                                </div>
                                <span className="text-2xl font-display text-white">8,000 kg</span>
                            </div>
                            <div className="p-4 bg-white/5 rounded-xl border border-white/10 hover:border-volcanic-orange/50 transition-colors">
                                <div className="flex items-center gap-3 mb-2 text-volcanic-orange">
                                    <Clock className="w-6 h-6" />
                                    <span className="font-bold uppercase text-xs tracking-wider">Lived</span>
                                </div>
                                <span className="text-2xl font-display text-white">66-68 MYA</span>
                            </div>
                            <div className="p-4 bg-white/5 rounded-xl border border-white/10 hover:border-volcanic-orange/50 transition-colors">
                                <div className="flex items-center gap-3 mb-2 text-volcanic-orange">
                                    {/* Icon for Diet */}
                                    <span className="font-bold uppercase text-xs tracking-wider">Diet</span>
                                </div>
                                <span className="text-2xl font-display text-white">{dino.type}</span>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};
