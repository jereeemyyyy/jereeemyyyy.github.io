import {motion} from "framer-motion";

export default function AboutMe() {
    return (
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
    );

}
