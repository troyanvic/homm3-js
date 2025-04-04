import { memo, useEffect } from "react";

// import styles
import styles from "./DialogButton.module.scss";

// import sound effects
import buttonClickSound from "@sounds/button-click.ogg";

// import constants
import { BUTTON_TYPE_OK, STATE_ACTIVE, STATE_DISABLED } from "@constants";

// import hooks
import { useSoundEffect } from "@hooks/useSoundEffect";
import { useDelayedClick } from "@hooks/useDelayedClick";

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
  const { playSound } = useSoundEffect(buttonClickSound);

  /*useEffect(() => {
    const audio = audioRef.current;

    if (!audio) return;

    // Preload the audio for faster playback
    audio.preload = "auto";

    // Set the system audio volume
    audio.volume = effectsVolume;

    // Pause the audio on component unmount
    return () => audio.pause();
  }, []);*/

  // Use the custom hook to handle the delayed click
  const handleDelayedClick = useDelayedClick(onClick, 75, state);

  // Play sound on mouse down if the button is not disabled
  const handleMouseDown = () => {
    if (state === STATE_DISABLED) return;

    playSound();
  };

  // Construct the button's CSS class based on type and state props
  const buttonClassName = `${styles.dialogBtn} ${styles[`dialog-btn--${type}--${state}`]}`;

  // Render the button element
  return (
    <button className={buttonClassName} type="button" onMouseDown={handleMouseDown} onClick={handleDelayedClick} />
  );
});

export default DialogButton;
