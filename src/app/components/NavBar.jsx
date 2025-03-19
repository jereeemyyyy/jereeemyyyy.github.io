import React, { useState, useEffect } from 'react';
import { useMotionValue } from "framer-motion";

export default function NavBar() {
    const y = useMotionValue(0);
    const [activeSection, setActiveSection] = useState('home');

    const scrollToSection = (id) => {
        const element = document.getElementById(id);
        const navbar = document.querySelector('nav');
        if (element && navbar) {
            const navbarHeight = navbar.offsetHeight;
            const top = element.getBoundingClientRect().top + window.pageYOffset - navbarHeight;
            window.scrollTo({ top, behavior: 'smooth' });
            setActiveSection(id);
        }
    };

    // Function to update active section based on scroll position
    useEffect(() => {
        const handleScroll = () => {
            const sections = document.querySelectorAll("section"); // Ensure each section has a <section> tag
            let currentSection = "home";

            sections.forEach((section) => {
                const rect = section.getBoundingClientRect();
                if (rect.top <= 150 && rect.bottom >= 150) {
                    currentSection = section.id;
                }
            });

            setActiveSection(currentSection);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const navItems = [
        { id: 'home', label: 'Home' },
        { id: 'about', label: 'About Me' },
        { id: 'projects', label: 'Projects' },
        { id: 'contacts', label: 'Contacts' },
    ];

    return (
        <header className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 w-full">
            <nav className="bg-zinc-950 shadow-2xl z-50 rounded-full flex justify-center max-w-2xl mx-auto px-6 py-3 items-center">
                <ul className="flex space-x-12 items-center py-2">
                    {navItems.map((item) => (
                        <li key={item.id}>
                            <a
                                onClick={() => scrollToSection(item.id)}
                                className={`text-white font-bold cursor-pointer hover:text-gray-400 transition-colors duration-200 py-2 px-4 rounded-2xl ${
                                    activeSection === item.id ? 'text-gray-400 bg-gray-800 py-2 px-4 shadow-xl' : ''
                                }`}
                            >
                                {item.label}
                            </a>
                        </li>
                    ))}
                </ul>
            </nav>
        </header>
    );
}
