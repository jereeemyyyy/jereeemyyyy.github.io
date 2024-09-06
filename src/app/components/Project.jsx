import {motion} from "framer-motion";

export default function Project() {
    return (
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
    );
}
