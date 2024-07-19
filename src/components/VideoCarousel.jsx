"use client";
import Image from "next/image";
import { pauseImg, playImg, replayImg } from "@/utils";
import { hightlightsSlides } from "@/constants";
import { useEffect, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";

function VideoCarousel() {
  const videosRef = useRef([]);
  const videoDivsRef = useRef([]);
  const videoSpansRef = useRef([]);
  const [videoState, setVideoState] = useState({
    videoId: 0,
    isPaused: true,
    isLastVideo: false,
  });
  // Play Or Pause The Video
  useEffect(() => {
    if (videosRef.current.length !== 0) {
      if (!videoState.isPaused) {
        videosRef.current[videoState.videoId].play();
      } else if (videoState.isPaused) {
        videosRef.current[videoState.videoId].pause();
      }
    }
  }, [videoState.videoId, videoState.isPaused]);
  // Animate Video Start And Move Slider
  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);
    gsap.to("#video", {
      onStart: () => {
        setVideoState((pre) => ({
          ...pre,
          isPaused: false,
        }));
      },
      scrollTrigger: {
        trigger: "#video",
      },
    });
    gsap.to("#slider", {
      translateX: `${-100 * videoState.videoId}%`,
    });
  }, [videoState.videoId]);

  // handel the prgoress bar
  useGSAP(() => {
    const progress = gsap.to(videoSpansRef.current[videoState.videoId], {
      onStart: () => {
        gsap.to(videoDivsRef.current[videoState.videoId], {
          width: "10vw",
        });
        gsap.to(videoSpansRef.current[videoState.videoId], {
          backgroundColor: "white",
        });
      },
      onUpdate: () => {
        gsap.to(videoSpansRef.current[videoState.videoId], {
          width: `${
            (videosRef.current[videoState.videoId]?.currentTime /
              hightlightsSlides[videoState.videoId]?.videoDuration) *
            100
          }%`,
        });
      },
      onComplete: () => {
        gsap.to(videoDivsRef.current[videoState.videoId], {
          width: "12px",
        });
        gsap.to(videoSpansRef.current[videoState.videoId], {
          width: `0%`,
          backgroundColor: "transparent",
        });
      },
    });
    function updateProgress() {
      progress.progress(
        videosRef.current[videoState.videoId]?.currentTime /
          hightlightsSlides[videoState.videoId]?.videoDuration
      );
    }
    gsap.ticker.remove(updateProgress);
    gsap.ticker.add(updateProgress);
  }, [videoState.videoId]);

  function handelVideoProcess(type, i) {
    switch (type) {
      case "play":
        setVideoState((pre) => ({ ...pre, isPaused: false }));
        break;

      case "pause":
        setVideoState((pre) => ({ ...pre, isPaused: true }));
        break;

      case "video-end":
        setVideoState((pre) => ({ ...pre, videoId: i + 1 }));
        break;

      case "last-video":
        setVideoState((pre) => ({ ...pre, isLastVideo: true }));
        break;

      case "restart":
        setVideoState((pre) => ({
          ...pre,
          isLastVideo: false,
          videoId: 0,
        }));
        break;

      default:
        break;
    }
  }

  return (
    <>
      <div className="flex items-center">
        {hightlightsSlides.map((list, i) => (
          <div key={i} id="slider" className="sm:pr-20 pr-10">
            <div className="video-carousel_container">
              <div className="w-full h-full flex-center rounded-3xl overflow-hidden bg-black">
                <video
                  src={list.video}
                  id="video"
                  playsInline={true}
                  muted
                  preload="auto"
                  ref={(el) => {
                    videosRef.current[i] = el;
                  }}
                  onEnded={() => {
                    hightlightsSlides.length - 1 !== i
                      ? handelVideoProcess("video-end", i)
                      : handelVideoProcess("last-video", i);
                  }}
                ></video>
              </div>
              <div className="absolute top-12 left-[5%] z-10">
                {list.textLists.map((text, i) => (
                  <p key={i} className="md:text-2xl text-xl font-medium">
                    {text}
                  </p>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="relative flex-center mt-10">
        <div className="flex-center py-5 px-7 bg-gray-300 backdrop-blur rounded-full">
          {hightlightsSlides.map((_, i) => (
            <div
              ref={(el) => {
                videoDivsRef.current[i] = el;
              }}
              key={i}
              className="mx-2 w-3 h-3 bg-gray-200 rounded-full relative"
            >
              <span
                className="absolute h-full rounded-full"
                ref={(el) => {
                  videoSpansRef.current[i] = el;
                }}
              ></span>
            </div>
          ))}
        </div>
        <button
          className="control-btn"
          onClick={() => {
            videoState.isLastVideo
              ? handelVideoProcess("restart")
              : videoState.isPaused
              ? handelVideoProcess("play")
              : handelVideoProcess("pause");
          }}
        >
          <Image
            src={
              videoState.isLastVideo
                ? replayImg
                : videoState.isPaused
                ? playImg
                : pauseImg
            }
            alt={
              videoState.isLastVideo
                ? "replay"
                : videoState.isPaused
                ? "play"
                : "pause"
            }
            width={15}
            height={15}
          />
        </button>
      </div>
    </>
  );
}

export default VideoCarousel;
