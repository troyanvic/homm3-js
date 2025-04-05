import { useRef, useCallback } from "react";
import { useSelector } from "react-redux";

// import slices
import { selectEffectsVolume } from "@slices/systemOptionsSlice.js";

// import utils
import { getAudio } from "@utils/audioCache";

/**
 * Custom hook to play a sound effect with adjustable volume.
 *
 * @param {string} soundFile - The path or URL to the sound file to be played.
 * @returns {Object} An object containing the `playSound` function to trigger the sound effect.
 *
 * Usage:
 * const { playSound } = useSoundEffect("path/to/sound.mp3");
 * playSound(); // Plays the sound effect with the configured volume.
 */
export function useSoundEffect(soundFile) {
  // Retrieve the current effects volume from the Redux store using a selector
  const effectsVolume = useSelector(selectEffectsVolume);

  // Store a reference to the sound file path for later use
  const soundFileRef = useRef(soundFile);

  // Update the reference if the sound file changes
  if (soundFileRef.current !== soundFile) {
    soundFileRef.current = soundFile;
  }

  // Function to play the sound effect
  const playSound = useCallback(() => {
    // Skip playing if the volume is 0 (muted)
    if (effectsVolume === 0) return;

    // Get the Audio object from the cache
    const audio = getAudio(soundFileRef.current);

    audio.preload = "auto"; // Ensure the audio is preloaded and ready to play
    audio.currentTime = 0; // Reset the audio position to the beginning
    audio.volume = effectsVolume; // Set the audio volume based on the Redux state
    audio.play(); // Play the sound
  }, [effectsVolume]);

  return { playSound };
}
