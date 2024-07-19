"use client";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Highlights from "@/components/Highlights";
import Model from "@/components/Model";
import Features from "@/components/Features";
import { useEffect, useState } from "react";
import Loader from "@/components/Loader";

export default function Home() {
	const [loaded, setLoaded] = useState(false);
	useEffect(() => {
		function handelWindowLoad() {
			setLoaded(true);
		}
		window.addEventListener("load", handelWindowLoad);
		return () => {
			window.removeEventListener("load", handelWindowLoad);
		};
	}, []);

	return (
		<main className="bg-black" id="app">
			{loaded ? (
				<>
					<Navbar />
					<Hero />
					<Highlights />
					<Model />
					<Features />
				</>
			) : (
				<div className="flex-center h-[100dvh]">
					<Loader width={100} height={100} />
				</div>
			)}
		</main>
	);
}
