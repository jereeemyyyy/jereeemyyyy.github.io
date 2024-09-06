'use client';
import { motion } from 'framer-motion';
import NavBar from "@/app/components/NavBar";
import HomePage from "@/app/components/HomePage";
import AboutMe from "@/app/components/AboutMe";
import Project from "@/app/components/Project";
import Contacts from "@/app/components/Contacts";

export default function Home() {

    return (
        <div>
            <NavBar/>
            <HomePage/>
            {/* Separator */}
            <hr className="border-t-4 border-white mx-auto rounded-2xl w-3/4 my-10"/>
            <AboutMe/>
            {/* Separator */}
            <hr className="border-t-4 border-white mx-auto rounded-2xl w-3/4 my-10"/>
            <Project/>
            {/* Separator */}
            <hr className="border-t-4 border-white mx-auto rounded-2xl w-3/4 my-10"/>
            <Contacts/>
        </div>
    );
}
