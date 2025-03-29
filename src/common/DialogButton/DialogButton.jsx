import { memo } from "react";
import PropTypes from "prop-types";

// import styles
import styles from "./DialogButton.module.scss";

// import constants
import { BUTTON_TYPE_OK, STATE_ACTIVE } from "@constants";

/**
 * DialogButton is a functional component for rendering styled buttons used in dialog interactions.
 *
 * Props:
 * - `type` (string, required): Determines the type of the button, which can be "ok" or "cancel".
 * - `state` (string, required): Represents the current state of the button, which can be "active", or "disabled".
 * - `onClick` (function, optional): Callback function to handle the button's click event.
 *
 * The button's appearance is dynamically set based on the `type` and `state` props using CSS class names.
 */
const DialogButton = memo(function Button({ type = BUTTON_TYPE_OK, state = STATE_ACTIVE, onClick }) {
  const buttonClassName = `${styles.dialogBtn} ${styles[`dialog-btn--${type}--${state}`]}`;

  return <button className={buttonClassName} type="button" onClick={onClick} />;
});

DialogButton.propTypes = {
  type: PropTypes.string.isRequired,
  state: PropTypes.string.isRequired,
  onClick: PropTypes.func,
};

export default DialogButton;
