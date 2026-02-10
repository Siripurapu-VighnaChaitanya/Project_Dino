import React from 'react';
import { Hero } from '../components/Hero';
import { DinoCard } from '../components/DinoCard';
import { dinosaurs } from '../data/dinos';
import { motion } from 'framer-motion';

export const Home: React.FC = () => {
    return (
        <div className="bg-obsidian min-h-screen">
            <Hero />

            <section className="py-24 px-6 max-w-7xl mx-auto relative z-20">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="flex items-end justify-between mb-16"
                >
                    <div>
                        <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-2">
                            Featured <span className="text-volcanic-orange">Species</span>
                        </h2>
                        <div className="h-1 w-20 bg-volcanic-orange" />
                    </div>
                    <p className="hidden md:block text-ash max-w-md text-right">
                        Discover the most fascinating creatures from the Triassic, Jurassic, and Cretaceous periods.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {dinosaurs.map((dino, index) => (
                        <DinoCard key={dino.id} dino={dino} index={index} />
                    ))}
                </div>
            </section>
        </div>
    );
};
