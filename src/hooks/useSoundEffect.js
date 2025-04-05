import { useRef, useCallback } from "react";
import { useSelector } from "react-redux";
import { selectEffectsVolume } from "@slices/systemOptionsSlice.js";

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

  // Create a reference to an Audio object initialized with the provided sound file
  const audioRef = useRef(new Audio(soundFile));

  // Function to play the sound effect
  const playSound = useCallback(() => {
    const audio = audioRef.current; // Access the current Audio object from the reference

    if (!audio) return; // Exit if the Audio object is not available

    // Ensure the audio is preloaded and ready to play
    audio.preload = "auto";

    // Reset the audio position to the beginning
    audio.currentTime = 0;

    // Set the audio volume based on the Redux state
    audio.volume = effectsVolume;

    // Play the sound
    audio.play();
  }, [effectsVolume]);

  return { playSound };
}
