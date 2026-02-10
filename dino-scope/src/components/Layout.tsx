import React from 'react';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { Outlet } from 'react-router-dom';

export const Layout: React.FC = () => {
    return (
        <div className="min-h-screen bg-obsidian text-ash-light font-sans selection:bg-volcanic-orange selection:text-white flex flex-col">
            <Navbar />
            <main className="relative z-10 flex-grow">
                <Outlet />
            </main>
            <Footer />

            {/* Global Texture */}
            <div className="fixed inset-0 pointer-events-none z-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]" />
        </div>
    );
};
