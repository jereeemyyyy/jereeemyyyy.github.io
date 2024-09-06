import {motion} from "framer-motion";
import StackIcon from "tech-stack-icons";

export default function AboutMe() {
    return (
        <div id="about" className="min-h-screen flex items-center justify-center bg-black">
            <motion.div
                initial={{opacity: 0, x: -100}}
                animate={{opacity: 1, x: 0}}
                transition={{duration: 0.5}}
            >
                <h2 className="text-4xl font-semibold text-white">About Me</h2>
                <p className="mt-4 text-xl text-white max-w-4xl bg-gray-400">
                    I am Jeremy, a Computer Science Undergraduate from the National University of Singapore.
                    I am a passionate developer...
                </p>

                <div className="mt-20">
                    <h3 className="text-2xl font-semibold text-white mt-4">Tech Stack:</h3>
                    {/* Tech stack icons */}
                    <div
                        className="justify-center px-8 py-4 flex flex-wrap gap-6 mt-4 bg-gray-900 rounded-3xl max-w-2xl">
                        <div className="flex flex-col items-center">
                            <StackIcon name="java" className="m-2 p-1 w-14 h-14 rounded-xl bg-white"/>
                        </div>
                        <div className="flex flex-col items-center">
                            <StackIcon name="reactjs" className="m-2 p-1 w-14 h-14 rounded-xl bg-white"/>
                        </div>
                        <div className="flex flex-col items-center">
                            <StackIcon name="supabase" className="m-2 p-1 w-14 h-14 rounded-xl bg-white"/>
                        </div>
                        <div className="flex flex-col items-center">
                            <StackIcon name="postgresql" className="m-2 p-1 w-14 h-14 rounded-xl bg-white"/>
                        </div>
                        <div className="flex flex-col items-center">
                            <StackIcon name="github" className="m-2 p-1 w-14 h-14 rounded-xl bg-white"/>
                        </div>

                        <div className="flex flex-col items-center">
                            <StackIcon name="tailwindcss" className="m-2 p-1 w-14 h-14 rounded-xl bg-white"/>
                        </div>

                        <div className="flex flex-col items-center">
                            <StackIcon name="" className="m-2 p-1 w-14 h-14 rounded-xl bg-white"/>
                        </div>
                    </div>
                </div>

            </motion.div>
        </div>
    );

}
