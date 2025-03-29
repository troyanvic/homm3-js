import { memo } from "react";

// import styles
import styles from "./DialogButton.module.scss";

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
const DialogButton = memo(function Button({ type = BUTTON_TYPE_OK, state = STATE_ACTIVE, onClick }) {
  // Add handler that checks if button is disabled
  const handleClick = (e) => {
    if (state === STATE_DISABLED) return;
    onClick && onClick(e);
  };

  const buttonClassName = `${styles.dialogBtn} ${styles[`dialog-btn--${type}--${state}`]}`;

  return <button className={buttonClassName} type="button" onClick={handleClick} />;
});

export default DialogButton;
