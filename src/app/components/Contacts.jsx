import {motion} from "framer-motion";
import {SocialIcon} from "react-social-icons";

export default function Contacts() {
    return (
        <>
            <div id="contacts" className="py-60 flex items-center justify-center mt-24">
                <motion.div
                    initial={{opacity: 0, x: -100}}
                    animate={{opacity: 1, x: 0}}
                    transition={{duration: 0.5}}
                >
                    <h2 className="text-4xl font-semibold text-white mb-10 text-left">Let&apos;s Connect!</h2>
                        <div
                            className="justify-around px-8 py-4 flex flex-wrap gap-6 mt-4 bg-zinc-900 rounded-3xl max-w-md shadow-2xl">
                            <div className="flex flex-col items-center">
                                <SocialIcon url={"https://www.linkedin.com/in/jeremysimwenze/"}/>
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

            
            <footer className="bg-zinc-950 text-white py-6 mt-16 shadow-lg rounded-3xl">
                <div className="container mx-auto flex flex-col md:flex-row justify-between items-center px-6">
        
                    <p className="text-sm text-gray-400">&copy; {new Date().getFullYear()} Jeremy Sim. All rights reserved.</p>

                    <div className="flex space-x-4">
                        <SocialIcon url="https://www.linkedin.com/in/jeremysimwenze/" bgColor="transparent" fgColor="#FFFFFF" style={{ width: 60, height: 60 }} />
                        <SocialIcon url="https://github.com/jereeemyyyy" bgColor="transparent" fgColor="#FFFFFF" style={{ width: 60, height: 60 }} />
                        <SocialIcon url="https://www.instagram.com/jereeemyyyy/" bgColor="transparent" fgColor="#FFFFFF" style={{ width: 60, height: 60 }} />
                    </div>
                </div>
            </footer>
        </>
    );
}
