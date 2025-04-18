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
  const musicVolume = useSelector(selectMusicVolume);
  const videoRef = useRef(null);
  const dispatch = useDispatch();

  /**
   * Handles video transitions between 3DO and NWC logos.
   * When the first video ends, it plays the second one.
   * After both videos finish, it shows the main menu.
   */
  useEffect(() => {
    const { current } = videoRef;

    /**
     * Handles the video end event by either switching to the next video
     * or showing the main menu when all videos are finished.
     */
    const handleVideoEnded = () => {
      if (currentVideo === video3DO) {
        setCurrentVideo(videoNWC);
      }

      if (currentVideo === videoNWC) {
        dispatch(showMainMenu(true));
      }
    };

    // Set up the video end event listener and clean it up on unmount or when the video changes
    if (current) {
      current.addEventListener("ended", handleVideoEnded);
    }

    return () => {
      if (current) {
        current.removeEventListener("ended", handleVideoEnded);
      }
    };
  }, [currentVideo]);

  /**
   * Adds a keyboard event listener to allow skipping the intro videos.
   * When any key is pressed, it immediately shows the main menu.
   */
  useEffect(() => {
    const handleKeyPress = () => {
      dispatch(showMainMenu(true));
    };

    window.addEventListener("keydown", handleKeyPress);

    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [dispatch]);

  return (
    <div className={styles.initialVideoContainer}>
      <video ref={videoRef} className={styles.initialVideoPlayer} autoPlay muted={musicVolume === 0} key={currentVideo}>
        <source src={currentVideo} type="video/webm" />
      </video>
    </div>
  );
}
