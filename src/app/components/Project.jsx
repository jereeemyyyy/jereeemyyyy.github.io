import { motion } from "framer-motion";
import { SocialIcon } from "react-social-icons";
import StackIcon from "tech-stack-icons";
import Image from "next/image";
import projectsData from "../utils/ProjectsData";


export default function Project() {
    return (
        <div id="projects" className="min-h-screen flex items-center justify-center mb-28 mt-24">
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <h2 className="text-4xl font-semibold text-white mt-20">My Projects</h2>
                <p className="my-4 text-xl text-white">Here are some of my recent works...</p>

                {/* Projects list */}
                {projectsData.map((project, index) => (
                    <motion.div
                        key={index}
                        whileHover={{ scale: 1.05 }}
                        className="flex justify-around bg-zinc-950 max-w-4xl rounded-2xl mt-10 shadow-2xl"
                    >
                        <div className="w-3/5 items-center">
                            <div className="rounded-2xl bg-white w-96 h-52 flex justify-center items-center m-8">
                                {project.imageSrc ? (
                                    <Image
                                        src={project.imageSrc}
                                        alt={`${project.title} Screenshot`}
                                        width={800}
                                        height={500}
                                        className="object-cover w-full h-full rounded-2xl"
                                    />
                                ) : (
                                    <p className="text-black">No Image Available!</p>
                                )}
                            </div>

                            <div className="flex mx-14 -mt-2 mb-6 bg-zinc-900 rounded-2xl px-6 py-2 justify-items-start shadow-2xl">
                                {project.techStack.map((tech, techIndex) => (
                                    <StackIcon
                                        key={techIndex}
                                        name={tech}
                                        className="my-1 mx-4 w-10 h-10 rounded-xl bg-white"
                                    />
                                ))}
                            </div>
                        </div>

                        {/* Project details */}
                        <div className="bg-zinc-950 w-full max-w-sm rounded-2xl -ml-4 mr-4 relative">
                            <p className="p-4 text-center font-bold text-2xl mt-4 rounded-2xl">{project.title}</p>
                            <p className="p-4 bg-zinc-900 rounded-2xl">{project.description}</p>
                            <motion.div
                                whileHover={{ scale: 1.2 }}
                                className="flex justify-end absolute bottom-4 right-4">
                                <SocialIcon url={project.githubUrl} />
                            </motion.div>
                        </div>
                    </motion.div>
                ))}
            </motion.div>
        </div>
    );
}
