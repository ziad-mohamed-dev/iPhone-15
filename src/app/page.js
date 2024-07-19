"use client";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Highlights from "@/components/Highlights";
import Model from "@/components/Model";
import Features from "@/components/Features";
import { useEffect, useState } from "react";
import Loader from "@/components/Loader";

export default function Home() {
	const [loaded, setloaded] = useState(false);
	useEffect(() => {
		document.getElementsByTagName("video")[0].onloadeddata = () => {
			setloaded(true);
		};
	}, []);
	return (
		<main className="bg-black relative" id="app">
			{!loaded && (
				<div className="bg-black w-[100vw] h-[100dvh] flex-center absolute top-0 left-0 z-50">
					<Loader width={100} height={100} />
				</div>
			)}
			<Navbar />
			<Hero />
			<Highlights />
			<Model />
			<Features />
		</main>
	);
}
