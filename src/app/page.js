'use client';
import NavBar from "@/app/components/NavBar";
import HomePage from "@/app/components/HomePage";
import AboutMe from "@/app/components/AboutMe";
import Project from "@/app/components/Project";
import Contacts from "@/app/components/Contacts";

export default function Home() {

    return (
            <div className="bg-custom-gradient from-black via-gray-950 to-gray-750 min-h-screen">
                <NavBar/>
                <HomePage/>
                <AboutMe/>
                <Project/>
                <Contacts/>
            </div>
    );
}
