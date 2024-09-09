import {motion} from "framer-motion";
import {SocialIcon} from "react-social-icons";
import StackIcon from "tech-stack-icons";

export default function Project() {
    return (
        <div id="projects" className="min-h-screen flex items-center justify-center bg-black">
            <motion.div
                initial={{opacity: 0, y: 50}}
                animate={{opacity: 1, y: 0}}
                transition={{duration: 0.5}}
            >
                {/*First project card*/}
                <h2 className="text-4xl font-semibold text-white mt-14">My Projects</h2>
                <p className="my-4 text-xl text-white">Here are some of my recent works...</p>

                <div className="flex justify-around bg-zinc-950 max-w-4xl rounded-2xl">
                    <div className=" w-3/5 items-center">
                        <div className="rounded-2xl bg-white w-96 h-52 flex justify-center items-center m-8">
                            <p className="text-black">Project #1</p>
                        </div>

                        <div className="flex mx-14 -mt-2 mb-6 bg-zinc-900 rounded-2xl px-6 py-4 justify-around">
                            <div className="flex items-center">
                                <StackIcon name="reactjs" className="my-1 mx-2 p-1 w-10 h-10 rounded-xl bg-white"/>
                            </div>
                            <div className="flex items-center">
                                <StackIcon name="supabase" className="my-1 mx-2  w-10 h-10 rounded-xl bg-white"/>
                            </div>
                            <div className="flex flex-col">
                                <StackIcon name="github" className="my-1 mx-2 w-10 h-10 rounded-xl bg-white"/>
                            </div>

                            <div className="flex flex-col">
                                <StackIcon name="tailwindcss" className="my-1 mx-2 w-10 h-10 rounded-xl bg-white"/>
                            </div>
                        </div>
                    </div>

                    <div className="bg-zinc-950 w-full max-w-sm rounded-2xl -ml-4 mr-4">
                        <p className="p-4 text-center font-bold text-2xl mt-4 rounded-2xl"> SaveLah </p>
                        <p className="p-4  bg-zinc-900 rounded-2xl">
                            A simple financial tracker app that streamlines the process of tracking your expenses by
                            providing real time updates of your transactions.
                        </p>
                        <div className="mt-16 mx-2 flex justify-end">
                            <SocialIcon url={"https://github.com/jereeemyyyy/savelah-project"}/>
                        </div>
                    </div>

                </div>

                {/*Second project card*/}
                <div className="flex justify-around bg-zinc-950 max-w-4xl rounded-2xl mt-10">
                    <div className=" w-3/5 items-center">
                        <div className="rounded-2xl bg-white w-96 h-52 flex justify-center items-center m-8">
                            <p className="text-black">Project #2</p>
                        </div>

                        <div className="flex mx-14 -mt-2 mb-6 bg-zinc-900 rounded-2xl px-6 py-4 justify-start">
                            <div className="flex items-center">
                                <StackIcon name="reactjs" className="my-1 mx-2 p-1 w-10 h-10 rounded-xl bg-white"/>
                            </div>
                            <div className="flex flex-col">
                                <StackIcon name="github" className="my-1 mx-2 w-10 h-10 rounded-xl bg-white"/>
                            </div>
                        </div>
                    </div>

                    <div className="bg-zinc-950 w-full max-w-sm rounded-2xl -ml-4 mr-4">
                        <p className="p-4 text-center font-bold text-2xl mt-4 rounded-2xl"> CryptoPalace </p>
                        <p className="p-4  bg-zinc-900 rounded-2xl">
                            A website that tracks the prices of all the cryptocurrencies and provided relevant
                            information about the currencies. The CoinGecko API was used in this project to
                            retrieve real time data of the cryptocurrencies.
                        </p>
                        <div className="mt-16 mx-2 flex justify-end">
                            <SocialIcon url={"https://github.com/jereeemyyyy/cryptopalace"}/>
                        </div>
                    </div>
                </div>

                {/*Third project card*/}
                <div className="flex justify-around bg-zinc-950 max-w-4xl rounded-2xl mt-10">
                    <div className=" w-3/5 items-center">
                        <div className="rounded-2xl bg-white w-96 h-52 flex justify-center items-center m-8">
                            <p className="text-black">Project #3</p>
                        </div>

                        <div className="flex mx-14 -mt-2 mb-6 bg-zinc-900 rounded-2xl px-6 py-4 justify-around">
                            <div className="flex items-center">
                                <StackIcon name="reactjs" className="my-1 mx-2 p-1 w-10 h-10 rounded-xl bg-white"/>
                            </div>
                            <div className="flex items-center">
                                <StackIcon name="postgresql" className="my-1 mx-2  w-10 h-10 rounded-xl bg-white"/>
                            </div>
                            <div className="flex flex-col">
                                <StackIcon name="github" className="my-1 mx-2 w-10 h-10 rounded-xl bg-white"/>
                            </div>
                            <div className="flex flex-col">
                                <StackIcon name="go" className="my-1 mx-2 w-10 h-10 rounded-xl bg-white"/>
                            </div>
                        </div>
                    </div>

                    <div className="bg-zinc-950 w-full max-w-sm rounded-2xl -ml-4 mr-4">
                        <p className="p-4 text-center font-bold text-2xl mt-4 rounded-2xl"> Simple Web Forum </p>
                        <p className="p-4  bg-zinc-900 rounded-2xl">
                            A simple web forum page that contains basic CRUD functionalities, that allows user
                            to create, remove, update and delete posts. My first ever project!
                        </p>
                        <div className="mt-16 mx-2 flex justify-end">
                            <SocialIcon url={"https://github.com/jereeemyyyy/savelah-project"}/>
                        </div>
                    </div>

                </div>
            </motion.div>
        </div>
    );
}
