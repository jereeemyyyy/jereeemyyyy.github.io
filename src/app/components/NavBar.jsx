import {useMotionValue} from "framer-motion";


export default function NavBar() {

    const y = useMotionValue(0);

    const scrollToSection = (id) => {
        const element = document.getElementById(id);
        if (element) {
            const top = element.getBoundingClientRect().top + window.pageYOffset;
            window.scrollTo({ top, behavior: 'smooth' });
        }
    };

    return (
        <nav className="fixed top-0 w-full bg-zinc-950 shadow-2xl z-50">
            <ul className="flex justify-end p-4">
                <li>
                    <a onClick={() => scrollToSection('home')}
                       className="text-white font-bold m-6 cursor-pointer">Home</a>
                </li>
                <li>
                    <a onClick={() => scrollToSection('about')} className="text-white font-bold m-6 cursor-pointer">About
                        Me</a>
                </li>
                <li>
                    <a onClick={() => scrollToSection('projects')}
                       className="text-white font-bold m-6 cursor-pointer">Projects</a>
                </li>
                <li>
                    <a onClick={() => scrollToSection('contacts')}
                       className="text-white font-bold m-6 cursor-pointer">Contacts</a>
                </li>
            </ul>
        </nav>
    );
}
