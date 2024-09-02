'use client';
import { useEffect, useState } from 'react';
import { motion, useMotionValue } from 'framer-motion';

export default function Home() {
    const y = useMotionValue(0);

    const scrollToSection = (id) => {
        const element = document.getElementById(id);
        if (element) {
            const top = element.getBoundingClientRect().top + window.pageYOffset;
            window.scrollTo({ top, behavior: 'smooth' });
        }
    };

    return (
        <div>
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

            <div id="home" className="min-h-screen flex items-center justify-center bg-black">
                <motion.div
                    initial={{opacity: 0, y: -50}}
                    animate={{opacity: 1, y: 0}}
                    transition={{duration: 0.5}}
                >
                    <h1 className="text-5xl font-bold text-white">Welcome to My Website</h1>
                    <p className="text-2xl text-white">
                        Hi. I am Jeremy, an aspiring Software engineer
                    </p>
                </motion.div>
            </div>

            {/* Separator */}
            <hr className="border-t-4 border-white mx-auto rounded-2xl w-3/4 my-10"/>

            <div id="about" className="min-h-screen flex items-center justify-center bg-black">
                <motion.div
                    initial={{opacity: 0, x: -100}}
                    animate={{opacity: 1, x: 0}}
                    transition={{duration: 0.5}}
                >
                    <h2 className="text-4xl font-semibold text-white">About Me</h2>
                    <p className="mt-4 text-xl text-white">
                        I am Jeremy, a Computer Science Undergraduate from the National University of Singapore.
                        I am a passionate developer...
                    </p>
                </motion.div>
            </div>

            {/* Separator */}
            <hr className="border-t-4 border-white mx-auto rounded-2xl w-3/4 my-10"/>

            <div id="projects" className="min-h-screen flex items-center justify-center bg-black">
                <motion.div
                    initial={{opacity: 0, y: 50}}
                    animate={{opacity: 1, y: 0}}
                    transition={{duration: 0.5}}
                >
                    <h2 className="text-4xl font-semibold text-white mt-14">My Projects</h2>
                    <p className="my-4 text-xl text-white">Here are some of my recent works...</p>

                    <div className="flex justify-around bg-gray-700">
                        <div className="rounded-2xl bg-white w-96 h-52 flex justify-center items-center m-14">
                            <p className="text-black">Project #1</p>
                        </div>

                        <p className="m-5 mt-12 bg-gray-400"> Some description of Project #1</p>
                    </div>


                    <div className="flex justify-around bg-gray-700 mt-10">
                        <p className="m-5 mt-12 bg-gray-400"> Some description of Project #2</p>

                        <div className="rounded-2xl bg-white w-96 h-52 flex justify-center items-center m-14">
                            <p className="text-black">Project #2</p>
                        </div>
                    </div>

                    <div className="flex justify-around bg-gray-700 mt-10">
                        <div className="rounded-2xl bg-white w-96 h-52 flex justify-center items-center m-14">
                            <p className="text-black">Project #3</p>
                        </div>

                        <p className="m-5 mt-12 bg-gray-400"> Some description of Project #3</p>
                    </div>
                </motion.div>
            </div>

            {/* Separator */}
            <hr className="border-t-4 border-white mx-auto rounded-2xl w-3/4 my-10"/>

            <div id="contacts" className="min-h-screen flex items-center justify-center bg-black">
                <motion.div
                    initial={{opacity: 0, x: -100}}
                    animate={{opacity: 1, x: 0}}
                    transition={{duration: 0.5}}
                >
                    <h2 className="text-4xl font-semibold text-white">My contacts</h2>
                    <p className="mt-4 text-xl text-white">
                        LinkedIn, Github, Email, Resume
                        Contact me!
                    </p>
                </motion.div>
            </div>


        </div>
    );
}
