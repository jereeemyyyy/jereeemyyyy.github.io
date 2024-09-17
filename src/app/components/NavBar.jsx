import React, { useState } from 'react';
import { useMotionValue } from "framer-motion";

export default function NavBar() {
    const y = useMotionValue(0);
    const [activeSection, setActiveSection] = useState('home');

    const scrollToSection = (id) => {
        const element = document.getElementById(id);
        if (element) {
            const top = element.getBoundingClientRect().top + window.pageYOffset;
            window.scrollTo({ top, behavior: 'smooth' });
            setActiveSection(id);
        }
    };

    const navItems = [
        { id: 'home', label: 'Home' },
        { id: 'about', label: 'About Me' },
        { id: 'projects', label: 'Projects' },
        { id: 'contacts', label: 'Contacts' },
    ];

    return (
        <nav className="fixed top-0 w-full bg-zinc-950 shadow-2xl z-50">
            <ul className="flex justify-end p-4">
                {navItems.map((item) => (
                    <li key={item.id}>
                        <a
                            onClick={() => scrollToSection(item.id)}
                            className={`text-white font-bold m-6 cursor-pointer hover:text-gray-400 transition-colors duration-200 ${
                                activeSection === item.id ? 'text-gray-400' : ''
                            }`}
                        >
                            {item.label}
                        </a>
                    </li>
                ))}
            </ul>
        </nav>
    );
}
