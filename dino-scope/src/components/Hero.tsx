import React, { useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { dinosaurs } from '../data/dinos';

export const Hero: React.FC = () => {
    const { scrollY } = useScroll();
    const y1 = useTransform(scrollY, [0, 500], [0, 200]);
    const opacity = useTransform(scrollY, [0, 300], [1, 0]);

    // Simple animation loop for hero background
    const [frameIndex, setFrameIndex] = useState(0);
    const heroDino = dinosaurs.find(d => d.id === 'tyrannosaurus') || dinosaurs[0];
    const frames = heroDino.images;

    useEffect(() => {
        const interval = setInterval(() => {
            setFrameIndex(prev => (prev + 1) % frames.length);
        }, 80); // 12.5 fps
        return () => clearInterval(interval);
    }, [frames]);

    return (
        <div className="relative h-screen w-full overflow-hidden bg-obsidian">
            {/* Background Animation */}
            <motion.div
                style={{ y: y1 }}
                className="absolute inset-0 z-0"
            >
                <div className="relative h-full w-full">
                    {/* We preload images or just show current frame. 
               For production, we might want a canvas or video, 
               but img keying works for moderate frame counts. */}
                    <img
                        src={frames[frameIndex]}
                        alt="Hero"
                        className="h-full w-full object-cover opacity-60"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-obsidian/20 to-obsidian" />
                    <div className="absolute inset-0 bg-gradient-to-r from-obsidian/80 via-transparent to-obsidian/80" />
                </div>
            </motion.div>

            {/* Content */}
            <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1, delay: 0.2 }}
                >
                    <h2 className="text-volcanic-orange tracking-[0.2em] font-bold uppercase mb-4 text-sm md:text-base">
                        Prehistoric Exploration
                    </h2>
                    <h1 className="text-6xl md:text-8xl lg:text-9xl font-display font-black text-white uppercase tracking-tighter mb-6 relative">
                        <span className="relative z-10">DinoScope</span>
                        <span className="absolute left-1 top-1 text-transparent bg-clip-text bg-gradient-to-b from-white/10 to-transparent -z-10 blur-sm">
                            DinoScope
                        </span>
                    </h1>
                    <p className="max-w-2xl mx-auto text-ash-light text-lg md:text-xl font-light leading-relaxed mb-10">
                        Journey through time and witness the giants of the past.
                        Experience the Mesozoic era like never before with interactive models and deep learning identification.
                    </p>

                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-8 py-4 bg-volcanic-orange text-white font-bold uppercase tracking-widest rounded-full hover:bg-volcanic-magma transition-colors shadow-lg shadow-volcanic-orange/20"
                    >
                        Start Expedition
                    </motion.button>
                </motion.div>
            </div>

            {/* Scroll Indicator */}
            <motion.div
                style={{ opacity }}
                className="absolute bottom-10 left-1/2 -translate-x-1/2 text-ash-light flex flex-col items-center gap-2"
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
            >
                <span className="text-xs uppercase tracking-widest">Scroll to Explore</span>
                <ChevronDown className="w-6 h-6" />
            </motion.div>
        </div>
    );
};
