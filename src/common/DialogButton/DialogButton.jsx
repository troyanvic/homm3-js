import { memo } from "react";

// import styles
import styles from "./DialogButton.module.scss";

// import constants
import { BUTTON_TYPE_OK, STATE_ACTIVE, STATE_DISABLED, STATE_PRESSED } from "@constants";

// import hooks
import { useClickWithSound } from "@hooks/useClickWithSound.js";

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
const DialogButton = memo(function Button({ type = BUTTON_TYPE_OK, state = STATE_ACTIVE, onClick }) {
  const { handleMouseDown, handleClick } = useClickWithSound(onClick, 75, state);

  // Determine the CSS class name for the pressed state based on the state
  const pressedClass = state === STATE_PRESSED ? styles[`dialog-btn--${type}--pressed`] : "";

  // Construct the button's CSS class name based on type and state props
  const className = `${styles.dialogBtn} ${styles[`dialog-btn--${type}--${state}`]} ${pressedClass}`;

  // Render the button element
  return (
    <button
      className={className}
      type="button"
      onMouseDown={handleMouseDown}
      onClick={handleClick}
      aria-label={`${type} button`}
      disabled={state === STATE_DISABLED}
    />
  );
});

export default DialogButton;
