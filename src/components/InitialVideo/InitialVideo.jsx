import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

// import styles
import styles from "./InitialVideo.module.scss";

// import videos
import video3DO from "@videos/3DO-logo.webm";
import videoNWC from "@videos/NWC-logo.webm";

// import selectors
import { selectMusicVolume } from "@slices/systemOptionsSlice.js";

// import actions
import { showMainMenu } from "@slices/homeScreenSlice.js";

export default function InitialVideo() {
  const [currentVideo, setCurrentVideo] = useState(video3DO);
  const videoRef = useRef(null);
  const dispatch = useDispatch();

  // Get the global state from Redux store
  const musicVolume = useSelector(selectMusicVolume);

  useEffect(() => {
    const handleVideoEnded = () => {
      if (currentVideo === video3DO) {
        setCurrentVideo(videoNWC);
      }

      if (currentVideo === videoNWC) {
        dispatch(showMainMenu(true));
      }
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
