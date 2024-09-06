import {motion} from "framer-motion";

export default function Contacts() {
    return (
        <div id="contacts" className="min-h-screen flex items-center justify-center bg-black">
            <motion.div
                initial={{opacity: 0, x: -100}}
                animate={{opacity: 1, x: 0}}
                transition={{duration: 0.5}}
            >
                <h2 className="text-4xl font-semibold text-white">Let's Connect!</h2>
                <p className="mt-4 text-xl text-white">
                    LinkedIn, Github, Email, Resume
                    Contact me!
                </p>
            </motion.div>
        </div>
    );
}
