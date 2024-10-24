"use client";
import React, { useEffect, useRef } from "react";
import Hls from "hls.js";
import "@/styles/videoplayer.css";

const VideoPlayer = ({ streamingLink, subtitlesLink }) => {
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;

    if (streamingLink) {
      if (Hls.isSupported()) {
        const hls = new Hls();
        hls.loadSource(streamingLink);
        hls.attachMedia(video);
        hls.on(Hls.Events.MANIFEST_PARSED, () => {
          video.play();
        });
      } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
        video.src = streamingLink;
      }
    }
  }, [streamingLink]);


  return (
    <div className="video-container relative flex flex-col items-center shadow-md rounded-lg p-4 w-full mx-auto">
      <video
        ref={videoRef}
        controls
        className="w-full h-auto max-h-[calc(100vh-100px)] rounded-lg shadow-lg"
      >
        {/* Add track element for subtitles */}
        {subtitlesLink && (
          <track
            kind="subtitles"
            src={subtitlesLink}
            srcLang="en" // Change to the appropriate language code
            label="English" // Change label as needed
            default // Uncomment if you want it to show by default
          />
        )}
      </video>
      
    </div>
  );
};

export default VideoPlayer;
