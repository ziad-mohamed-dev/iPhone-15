"use client";
import ModelView from "./ModelView";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/all";
import { useEffect, useRef, useState } from "react";
import { yellowImg } from "@/utils";
import { models, sizes } from "@/constants";
import { Canvas } from "@react-three/fiber";
import { View } from "@react-three/drei";

function Model() {
	const [size, setSize] = useState("small");
	const [model, setModel] = useState({
		title: "iPhone 15 Pro in Natural Titanium",
		color: ["#8F8A81", "#FFE789", "#6F6C64"],
		img: yellowImg,
	});
	const [eventSource, setEventSource] = useState("");

	// camera control for the model view
	const cameraControlSmall = useRef();
	const cameraControlLarge = useRef();

	// get event source for the canvas
	useEffect(() => {
		setEventSource(document.getElementById("app"));
	}, []);

	useGSAP(() => {
		gsap.registerPlugin(ScrollTrigger);
		gsap.to("#heading", {
			y: 0,
			opacity: 1,
			scrollTrigger: "#heading",
		});
	}, []);

	// reset phone postion
	useGSAP(() => {
		if (cameraControlLarge.current && cameraControlSmall.current) {
			if (size === "small") {
				cameraControlLarge.current.setAzimuthalAngle(0);
				cameraControlLarge.current.setPolarAngle(1.5707963267948966);
				gsap.to("#CanvasDiv1", {
					translateX: "0%",
					duration: 2,
					ease: "power2.inOut",
				});
				gsap.to("#CanvasDiv2", {
					translateX: "100%",
					duration: 2,
					ease: "power2.inOut",
				});
			} else if (size === "large") {
				cameraControlSmall.current.setAzimuthalAngle(0);
				cameraControlSmall.current.setPolarAngle(1.5707963267948966);
				gsap.to("#CanvasDiv1", {
					translateX: "-100%",
					duration: 2,
					ease: "power2.inOut",
				});
				gsap.to("#CanvasDiv2", {
					translateX: "0%",
					duration: 2,
					ease: "power2.inOut",
				});
			}
		}
	}, [size]);

	return (
		<section className="common-padding">
			<div className="screen-max-width">
				<h1 id="heading" className="section-heading">
					Take a closer look
				</h1>
				<div className="flex flex-col items-center mt-5">
					<div className="w-full h-[75vh] md:h-[90vh] overflow-hidden relative">
						<div
							id={`CanvasDiv1`}
							className="w-full h-full absolute top-0 right-0"
						>
							<ModelView
								index={1}
								controlRef={cameraControlSmall}
								item={model}
								size={size}
							/>
						</div>
						<div
							id={`CanvasDiv2`}
							className="w-full h-full absolute top-0 right-0 translate-x-[100%]"
						>
							<ModelView
								index={2}
								controlRef={cameraControlLarge}
								item={model}
								size={size}
							/>
						</div>
						<Canvas
							style={{
								position: "fixed",
								top: "0",
								right: "0",
								width: "100%",
								height: "100%",
							}}
							eventSource={eventSource}
						>
							<View.Port />
						</Canvas>
					</div>
					<div className="mx-auto w-full">
						<p className="text-center text-sm font-light mb-5">
							{model.title}
						</p>
						<div className="flex-center">
							<ul className="color-container">
								{models.map((item, i) => (
									<li
										key={i}
										className="w-6 h-6 rounded-full mx-2 cursor-pointer"
										style={{
											backgroundColor: item.color[0],
										}}
										onClick={() => {
											setModel(item);
										}}
									></li>
								))}
							</ul>
							<button className="size-btn-container">
								{sizes.map(({ label, value }) => (
									<span
										key={label}
										className="size-btn"
										style={{
											backgroundColor:
												size === value
													? "white"
													: "transparent",
											color:
												size === value
													? "black"
													: "white",
										}}
										onClick={() => {
											setSize(value);
										}}
									>
										{label}
									</span>
								))}
							</button>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}

export default Model;
