import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Translation } from './Translation';
import { Menu, X, Search, Hexagon } from 'lucide-react';
import clsx from 'clsx';

export const Navbar: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: 'Home', path: '/' },
        { name: 'Explore', path: '/explore' },
        { name: 'Identify', path: '/identify' },
    ];

    return (
        <nav
            className={clsx(
                'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
                scrolled ? 'bg-obsidian/80 backdrop-blur-md py-4 border-b border-white/5' : 'bg-transparent py-6'
            )}
        >
            <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
                {/* Logo */}
                <Link to="/" className="flex items-center gap-2 group">
                    <div className="relative w-10 h-10 flex items-center justify-center">
                        <Hexagon className="w-10 h-10 text-volcanic-orange fill-volcanic-magma/20 rotate-90 transition-transform duration-700 group-hover:rotate-180" strokeWidth={1.5} />
                        <span className="absolute text-xl font-bold text-white">D</span>
                    </div>
                    <span className="text-2xl font-display font-bold text-white tracking-widest uppercase">
                        Dino<span className="text-volcanic-orange">Scope</span>
                    </span>
                </Link>

                {/* Desktop Nav */}
                <div className="hidden md:flex items-center gap-8">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            to={link.path}
                            className={clsx(
                                'text-sm font-medium tracking-wider uppercase transition-colors relative group',
                                location.pathname === link.path ? 'text-volcanic-orange' : 'text-ash-light hover:text-white'
                            )}
                        >
                            {link.name}
                            <span className={clsx(
                                "absolute -bottom-1 left-0 w-full h-0.5 bg-volcanic-orange transform origin-left transition-transform duration-300",
                                location.pathname === link.path ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                            )} />
                        </Link>
                    ))}

                    <Translation />
                    <button className="p-2 text-ash-light hover:text-volcanic-orange transition-colors">
                        <Search className="w-5 h-5" />
                    </button>
                </div>

                {/* Mobile Menu Button */}
                <button
                    className="md:hidden text-white p-2"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {isOpen ? <X /> : <Menu />}
                </button>
            </div>

            {/* Mobile Nav */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden bg-obsidian border-b border-white/10"
                    >
                        <div className="flex flex-col p-6 gap-4">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    to={link.path}
                                    className="text-lg font-medium text-ash-light hover:text-volcanic-orange"
                                    onClick={() => setIsOpen(false)}
                                >
                                    {link.name}
                                </Link>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};
