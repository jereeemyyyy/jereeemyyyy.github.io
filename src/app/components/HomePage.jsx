import { motion } from "framer-motion";
import Image from "next/image";
import { useTypewriter, Cursor } from 'react-simple-typewriter';

export default function HomePage() {

    const [text] = useTypewriter({
        words: ['I am Jeremy.'],
        loop: {},
        deleteSpeed: 70,
        typeSpeed: 120
    });

    return (
        <>
            <section id="home" className="min-h-screen flex items-center justify-center">
                <motion.div
                    initial={{ opacity: 0, y: -50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-center"
                >
                    <div className="flex justify-center mb-6">
                        <div className="w-96 h-96 rounded-full overflow-hidden border-4 border-white">
                            <Image
                                width={5000}
                                height={5000}
                                src="/me.png"
                                alt="Jeremy"
                                className="w-full h-full object-cover"
                            />
                        </div>

                        <div className="mt-6 ml-8 flex flex-col items-center justify-center">
                            <h1 className="-mr-44 text-6xl font-bold text-white text-left w-[800px]">
                                <div className="mb-2">Hello <span className="-ml-5">👋🏻</span></div>
                                <div>
                                    <span className="text-8xl">{text}</span><Cursor/>
                                </div>
                            </h1>
                            <p className="-ml-10 mt-6 text-xl text-white self-center text-left  max-w-xl">
                                an aspiring Full Stack Software engineer who is passionate about building software
                                to make the world a better place!
                            </p>
                        </div>
                    </div>

                </motion.div>
            </section>
            {/* Separator */}
            <hr className="border-t-4 border-white mx-auto rounded-2xl w-3/4 my-10"/>
        </>
    );
}
