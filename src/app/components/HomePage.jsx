import {motion} from "framer-motion";

export default function HomePage() {
    return (
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
    );
}
