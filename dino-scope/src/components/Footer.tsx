import React, { useState } from 'react';
import { Hexagon, Send } from 'lucide-react';

export const Footer: React.FC = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitted(true);
        // Simulate API call
        setTimeout(() => {
            setSubmitted(false);
            setEmail('');
            setMessage('');
            alert("Feedback received! Thank you for helping us map the prehistoric world.");
        }, 2000);
    };

    return (
        <footer className="bg-obsidian border-t border-white/10 pt-20 pb-10">
            <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
                {/* Brand */}
                <div>
                    <div className="flex items-center gap-2 mb-6">
                        <Hexagon className="w-8 h-8 text-volcanic-orange fill-volcanic-magma/20 rotate-90" strokeWidth={1.5} />
                        <span className="text-xl font-display font-bold text-white tracking-widest uppercase">
                            Dino<span className="text-volcanic-orange">Scope</span>
                        </span>
                    </div>
                    <p className="text-ash-dark text-sm leading-relaxed">
                        A premium digital museum dedicated to the giants of the Mesozoic era.
                        Experience prehistoric life primarily through advanced interactive visualization.
                    </p>
                </div>

                {/* Links */}
                <div>
                    <h4 className="text-white font-bold uppercase tracking-widest mb-6">Exploration</h4>
                    <ul className="space-y-4 text-ash-light text-sm">
                        <li><a href="/" className="hover:text-volcanic-orange transition-colors">Home Base</a></li>
                        <li><a href="/explore" className="hover:text-volcanic-orange transition-colors">Dinosaur Database</a></li>
                        <li><a href="/identify" className="hover:text-volcanic-orange transition-colors">Specimen Identification</a></li>
                        <li><a href="#" className="hover:text-volcanic-orange transition-colors">Timeline</a></li>
                    </ul>
                </div>

                {/* Contact Form */}
                <div className="lg:col-span-2">
                    <h4 className="text-white font-bold uppercase tracking-widest mb-6">Paleontology Support</h4>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <input
                                type="email"
                                placeholder="Explorer Email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-ash-dark focus:border-volcanic-orange focus:outline-none transition-colors"
                            />
                            <input
                                type="text"
                                placeholder="Topic / Dinosaur Name"
                                className="bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-ash-dark focus:border-volcanic-orange focus:outline-none transition-colors"
                            />
                        </div>
                        <textarea
                            placeholder="Share your discovery or feedback..."
                            required
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            rows={3}
                            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-ash-dark focus:border-volcanic-orange focus:outline-none transition-colors resize-none"
                        />
                        <button
                            type="submit"
                            className="px-6 py-3 bg-white/10 hover:bg-volcanic-orange text-white font-bold uppercase tracking-widest rounded-lg transition-all flex items-center gap-2 group"
                        >
                            {submitted ? 'Transmission Sent' : 'Send Feedback'}
                            {!submitted && <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />}
                        </button>
                    </form>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-6 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center text-xs text-ash-dark uppercase tracking-widest">
                <p>&copy; 2026 DinoScope Research. All rights reserved.</p>
                <div className="flex gap-6 mt-4 md:mt-0">
                    <a href="#" className="hover:text-white transition-colors">Privacy</a>
                    <a href="#" className="hover:text-white transition-colors">Terms</a>
                    <a href="#" className="hover:text-white transition-colors">Credits</a>
                </div>
            </div>
        </footer>
    );
};
