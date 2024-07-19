"use client";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Highlights from "@/components/Highlights";
import Model from "@/components/Model";
import Features from "@/components/Features";
import HowitWorks from "@/components/HowitWorks";

export default function Home() {
	return (
		<main className="bg-black relative" id="app">
			<Navbar />
			<Hero />
			<Highlights />
			<Model />
			<Features />
			<HowitWorks />
		</main>
	);
}
