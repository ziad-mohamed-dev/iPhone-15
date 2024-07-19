"use client";
import { heroVideo, smallHeroVideo } from "@/utils";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useEffect, useRef, useState } from "react";
import Loader from "./Loader";

function Hero() {
  const [videoSrc, setVideoSrc] = useState();
  const [loaded, setLoaded] = useState(false);
  const ref = useRef();

  function handelVideoSrcSet() {
    if (innerWidth < 640) {
      setVideoSrc(smallHeroVideo);
    } else {
      setVideoSrc(heroVideo);
    }
  }

  useEffect(() => {
    ref.current.src === "" && handelVideoSrcSet();
    window.addEventListener("resize", handelVideoSrcSet);
    return () => {
      window.removeEventListener("resize", handelVideoSrcSet);
    };
  }, [videoSrc]);

  useGSAP(() => {
    if (loaded) {
      gsap.to(".hero-title", {
        opacity: 1,
        delay: 2,
      });
      gsap.to("#cta", {
        y: -50,
        opacity: 1,
        delay: 2,
      });
    }
  }, [loaded]);

  return (
    <section className="w-full nav-height bg-black relative">
      {!loaded && (
        <div className="bg-black fixed top-0 left-0 w-full h-[100dvh] flex-center z-50">
          <Loader width={100} height={100} />
        </div>
      )}
      <div className="h-5/6 w-full flex-center flex-col">
        <p className="hero-title">iPhone 15 Pro</p>
        <div className="md:w-10/12 w-9/12">
          <video
            ref={ref}
            src={videoSrc}
            className="pointer-events-none"
            autoPlay
            muted
            playsInline={true}
            onLoadedData={() => {
              setLoaded(true);
            }}
          ></video>
        </div>
      </div>
      <div
        id="cta"
        className="flex flex-col items-center opacity-0 translate-y-20"
      >
        <a href="#highlights" className="btn">
          Buy
        </a>
        <p className="font-normal text-xl">From $199/month or $999</p>
      </div>
    </section>
  );
}

export default Hero;
