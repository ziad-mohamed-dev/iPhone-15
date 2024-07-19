import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Highlights from "@/components/Highlights";
import Model from "@/components/Model";
import Features from "@/components/Features";
import { Suspense } from "react";

export default function Home() {
	return (
		<main className="bg-black" id="app">
			<Suspense fallback={<div>loading...</div>}>
				<Navbar />
				<Hero />
				<Highlights />
				<Model />
				<Features />
			</Suspense>
		</main>
	);
}
