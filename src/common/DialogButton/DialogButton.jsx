import { memo, useRef, useEffect } from "react";

// import styles
import styles from "./DialogButton.module.scss";

// import sound effects
import buttonClickSound from "@sounds/button-click.ogg";

// import constants
import { BUTTON_TYPE_OK, STATE_ACTIVE, STATE_DISABLED } from "@constants";

/**
 * DialogButton is a functional component for rendering styled buttons used in dialog interactions.
 *
 * Props:
 * - `type` (string, required): Determines the type of the button, which can be "ok" or "cancel".
 * - `state` (string, required): Represents the current state of the button, which can be "active" or "disabled".
 * - `onClick` (function, optional): Callback function to handle the button's click event.
 *
 * The button's appearance is dynamically set based on the `type` and `state` props using CSS class names.
 */
// TODO: Resolve a problem with calling an audio effect as many times as the component mounted
const DialogButton = memo(function Button({ type = BUTTON_TYPE_OK, state = STATE_ACTIVE, onClick }) {
  // Create references
  const audioRef = useRef(new Audio(buttonClickSound));
  const timeoutRef = useRef(null);

  useEffect(() => {
    const audio = audioRef.current;

    // Preload the audio for faster playback
    audio.preload = "auto";

    // Pause the audio on component unmount
    return () => audio.pause();
  }, []);

  // Play sound on mouse down if the button is not disabled
  const handleMouseDown = () => {
    if (state === STATE_DISABLED) return;

    const audio = audioRef.current;

    // Reset the audio and play it
    audio.currentTime = 0;
    audio.play();
  };

  // Handle click event, ensuring the button is not disabled
  const handleClick = (e) => {
    if (state === STATE_DISABLED) return;

    // Clear the timer if it exists
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    // Execute the onClick callback if provided
    timeoutRef.current = setTimeout(() => onClick && onClick(e), 75);
  };

  // Construct the button's CSS class based on type and state props
  const buttonClassName = `${styles.dialogBtn} ${styles[`dialog-btn--${type}--${state}`]}`;

  // Render the button element
  return <button className={buttonClassName} type="button" onMouseDown={handleMouseDown} onClick={handleClick} />;
});

export default DialogButton;
