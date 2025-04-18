import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";

// import styles
import styles from "./InitialVideo.module.scss";

// import videos
import video3DO from "@videos/3DO-logo.webm";
import videoNWC from "@videos/NWC-logo.webm";

// import selectors and actions
import { selectMusicVolume } from "@slices/systemOptionsSlice.js";

export default function InitialVideo() {
  const [currentVideo, setCurrentVideo] = useState(video3DO);
  const videoRef = useRef(null);

  // Get the global state from Redux store
  const musicVolume = useSelector(selectMusicVolume);

  useEffect(() => {
    const handleVideoEnded = () => {
      if (currentVideo === video3DO) {
        setCurrentVideo(videoNWC);
      }

      // TODO: add changing the layout to Main menu when 2nd video ends
    };

    if (videoRef.current) {
      videoRef.current.addEventListener("ended", handleVideoEnded);
    }

    return () => {
      if (videoRef.current) {
        videoRef.current.removeEventListener("ended", handleVideoEnded);
      }
    };
  }, [currentVideo]);

  // TODO: add keyboard handler to skip the video

  return (
    <div className={styles.initialVideoContainer}>
      <video ref={videoRef} className={styles.initialVideoPlayer} autoPlay muted={musicVolume === 0} key={currentVideo}>
        <source src={currentVideo} type="video/webm" />
      </video>
    </div>
  );
}
