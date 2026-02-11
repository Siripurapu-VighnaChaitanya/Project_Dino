import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Globe } from 'lucide-react';

declare global {
    interface Window {
        google: any;
        googleTranslateElementInit: () => void;
    }
}

export const Translation: React.FC = () => {
    const googleTranslateRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Prevent duplicate script injection
        if (document.querySelector('script[src*="translate.google.com"]')) {
            if (window.google && window.google.translate) {
                // If script is already there, just try to init if check needed, 
                // but usually the callback handles it. 
                // However, we need to ensure we don't render twice in the same container if it persists.
                return;
            }
        }

        const googleTranslateElementInit = () => {
            if (window.google && window.google.translate) {
                // Clear previous if any (though difficult with Google's extensive DOM manipulation)
                if (googleTranslateRef.current) {
                    googleTranslateRef.current.innerHTML = '';
                }

                new window.google.translate.TranslateElement(
                    {
                        pageLanguage: 'en',
                        includedLanguages: 'en,te,hi,ta', // Restricted languages
                        layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
                        autoDisplay: false,
                    },
                    googleTranslateRef.current
                );
            }
        };

        window.googleTranslateElementInit = googleTranslateElementInit;

        const script = document.createElement('script');
        script.src = '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
        script.async = true;
        document.body.appendChild(script);

        return () => {
            // Cleanup: remove script to prevent memory leaks/duplication on navigation? 
            // Actually removing the script might break functionality if navigating back.
            // Better to just clean the container on init.
            // document.body.removeChild(script); 
            // @ts-ignore
            delete window.googleTranslateElementInit;
        };
    }, []);

    return (
        <motion.div
            className="relative flex items-center bg-white/10 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/20 hover:bg-white/20 transition-colors group"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
        >
            <Globe className="w-4 h-4 text-volcanic-orange mr-2 animate-pulse group-hover:animate-spin-slow" />
            <div ref={googleTranslateRef} className="google-translate-container" />
        </motion.div>
    );
};
