import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import type { Dinosaur } from '../data/dinos';
import { ArrowRight } from 'lucide-react';

interface DinoCardProps {
    dino: Dinosaur;
    index: number;
}

export const DinoCard: React.FC<DinoCardProps> = ({ dino, index }) => {
    const [imgError, setImgError] = useState(false);

    // Fallback image based on dinosaur type
    const getFallbackImage = () => {
        const color = dino.type === 'Carnivore' ? 'e74c3c' : dino.type === 'Herbivore' ? '27ae60' : 'f39c12';
        return `https://placehold.co/600x400/${color}/ffffff?text=${encodeURIComponent(dino.name)}`;
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className="group relative h-[400px] w-full perspective-1000"
        >
            <Link to={`/dino/${dino.id}`}>
                <motion.div
                    whileHover={{
                        scale: 1.02,
                        rotateX: 5,
                        rotateY: 5,
                        boxShadow: "0 20px 50px -12px rgba(207, 69, 32, 0.3)"
                    }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    className="relative h-full w-full rounded-2xl overflow-hidden bg-obsidian-shard border border-white/10"
                >
                    {/* Background Image */}
                    <div className="absolute inset-0">
                        <img
                            src={imgError ? getFallbackImage() : dino.image}
                            alt={dino.name}
                            onError={() => setImgError(true)}
                            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/40 to-transparent opacity-80 group-hover:opacity-60 transition-opacity duration-300" />
                    </div>

                    {/* Content */}
                    <div className="absolute inset-0 p-6 flex flex-col justify-end">
                        <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                            <span className="inline-block px-3 py-1 mb-2 text-xs font-bold tracking-wider uppercase bg-volcanic-orange/90 text-white rounded-full">
                                {dino.type}
                            </span>
                            <h3 className="text-3xl font-display font-bold text-white mb-1 group-hover:text-volcanic-orange transition-colors">
                                {dino.name}
                            </h3>
                            <p className="text-ash-light text-sm line-clamp-2 mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-75">
                                {dino.description}
                            </p>

                            <div className="flex items-center gap-2 text-volcanic-orange text-sm font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
                                Explore <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </div>
                        </div>
                    </div>
                </motion.div>
            </Link>
        </motion.div>
    );
};
