import { motion } from "framer-motion";

export default function HomePage() {
    return (
        <div id="home" className="min-h-screen flex items-center justify-center bg-black">
            <motion.div
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-center"
            >
                <div className="flex justify-center mb-6">
                    <div className="w-96 h-96 rounded-full overflow-hidden border-4 border-white">
                        <img
                            src="/me.png"
                            alt="Jeremy"
                            className="w-full h-full object-cover"
                        />
                    </div>

                    <div className="mt-6 ml-8 flex flex-col items-center justify-center">
                        <h1 className="text-6xl font-bold text-white self-start">Hello. I am Jeremy! </h1>
                        <p className="mt-6 text-xl text-white self-start max-w-xl">
                            an aspiring Full Stack Software engineer who is passionate about building softwares
                            to make the world a better place!
                        </p>
                    </div>

                </div>

            </motion.div>
        </div>
    );
}
