import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";


export function animateWithGsap(target, animationProps, scrollProps) {
  gsap.registerPlugin(ScrollTrigger);
	gsap.to(target, {
		...animationProps,
		scrollTrigger: {
			trigger: target,
			toggleActions: "restart reverse restart reverse",
			start: "top 85%",
			...scrollProps,
		},
	});
}
