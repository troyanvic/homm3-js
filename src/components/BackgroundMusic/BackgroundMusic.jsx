import { memo, useEffect, useRef } from "react";
import { useSelector } from "react-redux";

// import selectors
import { selectMusicVolume } from "@slices/systemOptionsSlice.js";

// import music
import mainTheme from "@sounds/main-theme.mp3";

/**
 * `BackgroundMusic` is a React memoized functional component designed to play background music
 * with customizable volume and looping capabilities. It utilizes React Redux to fetch the
 * global `musicVolume` state and adjusts the audio volume dynamically based on its changes.
 *
 * Features:
 * - Preloads the audio for faster playback.
 * - Automatically starts playing on mount.
 * - Dynamically updates the volume based on Redux state.
 * - Stops playback when the component unmounts.
 *
 * Props:
 * - `src` (string): The source URL of the audio file to play. Defaults to `mainTheme`.
 *
 * Example Usage:
 * ```jsx
 * <BackgroundMusic src="path/to/audio-file.mp3" />
 * ```
 */
const BackgroundMusic = memo(function Music({ src = mainTheme }) {
  // Get the global music volume from Redux state
  const musicVolume = useSelector(selectMusicVolume);

  // Create a reference to the audio element
  const audioRef = useRef(null);

  useEffect(() => {
    // Skip playing if the volume is 0 (muted)
    if (musicVolume === 0) return;

    const audio = audioRef.current;

    if (!audio) return;

    // Flag to track whether the component is still mounted
    let isMounted = true;

    audio.preload = "auto"; // Preload the audio for faster playback
    audio.currentTime = 0; // Reset the audio's current time to the beginning

    if (isMounted) {
      // Attempt to play the audio when the component is mounted
      audio.play().catch((err) => {
        if (isMounted && err.name !== "AbortError") {
          console.error("Audio playback error:", err);
        }
      });
    }

    // Cleanup function to pause the audio when the component is unmounted
    return () => {
      isMounted = false;
      audio.pause();
    };
  }, [src]); // Trigger when the `src` prop changes

  useEffect(() => {
    // Update the audio volume whenever the Redux `musicVolume` changes
    if (audioRef.current) {
      audioRef.current.volume = musicVolume;
    }
  }, [musicVolume]);

  // Render the audio element
  return <audio className="background-music" ref={audioRef} src={src} loop={true} />;
});

export default BackgroundMusic;
