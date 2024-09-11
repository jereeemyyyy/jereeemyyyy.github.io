import {motion} from "framer-motion";
import {SocialIcon} from "react-social-icons";

export default function Contacts() {
    return (
        <div id="contacts" className="min-h-screen flex items-center justify-center">
            <motion.div
                initial={{opacity: 0, x: -100}}
                animate={{opacity: 1, x: 0}}
                transition={{duration: 0.5}}
            >
                <h2 className="text-4xl font-semibold text-white mb-10 text-left">Let&apos;s Connect!</h2>
                    <div
                        className="justify-around px-8 py-4 flex flex-wrap gap-6 mt-4 bg-zinc-900 rounded-3xl max-w-md shadow-2xl">
                        <div className="flex flex-col items-center">
                            <SocialIcon url={"https://www.linkedin.com/in/jeremy-sim-0669b427a/"}/>
                        </div>
                        <div className="flex flex-col items-center">
                            <SocialIcon url={"https://github.com/jereeemyyyy"}/>
                        </div>
                        <div className="flex flex-col items-center">
                            <SocialIcon url={"https://www.instagram.com/jereeemyyyy/"}/>
                        </div>
                    </div>
            </motion.div>
        </div>
    );
}
