import { memo, useState } from "react";

// import styles
import styles from "./Dialog.module.scss";

// import constants
import {
  BUTTON_TYPE_OK,
  BUTTON_TYPE_CANCEL,
  STATE_ACTIVE,
  STATE_DISABLED,
  KEY_ENTER,
  KEY_ESCAPE,
  STATE_PRESSED,
} from "@constants";

// import hooks
import { useKeypress } from "@hooks/useKeypress.js";
import { useClickWithSound } from "@hooks/useClickWithSound.js";

// import components
import DialogButton from "@common/DialogButton/DialogButton.jsx";

/**
 * Dialog Component
 *
 * A functional component that renders a customizable modal dialog. It displays a message and optional
 * buttons for confirming or canceling an action. The appearance, behavior, and accessibility of the
 * dialog are controlled via the props passed to it.
 *
 * Props:
 * - isOpen (boolean): Determines whether the dialog is visible. Default is `false`.
 * - type (string): Specifies the dialog type affecting its styling (e.g., "message", "warning"). Default is `"message"`.
 * - message (string): The main text content displayed in the dialog.
 * - hasActions (boolean): Indicates if actions button will be rendered. Default is `true`.
 * - hasCancel (boolean): Indicates if a cancel button will be rendered. Default is `false`.
 * - isOkDisabled (boolean): Disables the confirm button when `true`. Default is `false`.
 * - isCancelDisabled (boolean): Disables the cancel button when `true`. Default is `false`.
 * - onConfirm (function): Callback triggered when the confirm button is clicked.
 * - onCancel (function): Callback triggered when the cancel button is clicked (if `hasCancel` is `true`).
 *
 * Styles:
 * - CSS modules are used to dynamically apply styling based on the `type` prop.
 * - Class names follow the convention: `dialog--type-{type}` and `dialog-text--type-{type}`.
 *
 * Dependencies:
 * - DialogButton: A reusable button component that supports different types (OK, Cancel) and states (active, disabled).
 * - Styling from `Dialog.module.scss` for layout and theming.
 *
 * Accessibility:
 * - Renders conditionally based on the `isOpen` prop to ensure proper semantics.
 * - Buttons support disabled states for enhanced usability.
 *
 * Example Usage:
 * ```jsx
 * <Dialog
 *   isOpen={true}
 *   type="warning"
 *   message="This action cannot be undone. Are you sure?"
 *   hasActions={true}
 *   hasCancel={true}
 *   isOkDisabled={false}
 *   isCancelDisabled={false}
 *   onConfirm={handleConfirm}
 *   onCancel={handleCancel}
 * />
 * ```
 */
const Dialog = memo(function Dialog({
  isOpen = false,
  type = "message",
  message,
  isOkDisabled = false,
  isCancelDisabled = false,
  hasActions = true,
  hasCancel = false,
  onConfirm,
  onCancel,
}) {
  const { handleMouseDown: playClickEffect } = useClickWithSound(() => {}, 75, STATE_ACTIVE);
  const [okButtonState, setOkButtonState] = useState(STATE_ACTIVE);
  const [cancelButtonState, setCancelButtonState] = useState(STATE_ACTIVE);

  /**
   * Simulates a button press by playing a click effect, updating button state to "pressed",
   * and triggering the provided callback after a delay.
   *
   * @param {Function} setButtonState - Function to update the button state.
   * @param {Function} callback - Function to execute after the button press simulation.
   * @param {number} releaseDelay - Time (in ms) after which the button state reverts to active. Default is 125ms.
   * @param {number} actionDelay - Time (in ms) after which the callback is executed. Default is 175ms.
   */
  const simulateButtonPress = (setButtonState, callback, releaseDelay = 125, actionDelay = 175) => {
    playClickEffect();
    setButtonState(STATE_PRESSED);

    setTimeout(() => {
      setButtonState(STATE_ACTIVE);
    }, releaseDelay);

    setTimeout(() => {
      callback();
    }, actionDelay);
  };

  // Attach keypress listeners for Escape key when the dialog is open
  useKeypress(KEY_ESCAPE, () => simulateButtonPress(setCancelButtonState, onCancel), isOpen, 10);

  // Attach keypress listeners for Enter key  when the dialog is open
  useKeypress(KEY_ENTER, () => simulateButtonPress(setOkButtonState, onConfirm), isOpen, 10);

  // Construct class names
  const dialogClassNames = `${styles.dialog} ${styles[`dialog--type-${type}`]}`;
  const dialogTextClassNames = `${styles.dialogText} ${styles[`dialog-text--type-${type}`]}`;

  // Render the Dialog component
  return (
    isOpen && (
      <>
        <div className={dialogClassNames}>
          <p className={dialogTextClassNames}>{message}</p>
          {hasActions && (
            <div className={styles.dialogActions}>
              <DialogButton
                type={BUTTON_TYPE_OK}
                state={isOkDisabled ? STATE_DISABLED : okButtonState}
                onClick={onConfirm}
              />
              {hasCancel && (
                <DialogButton
                  type={BUTTON_TYPE_CANCEL}
                  state={isCancelDisabled ? STATE_DISABLED : cancelButtonState}
                  onClick={onCancel}
                />
              )}
            </div>
          )}
        </div>
        <div className={styles.dialogOverlay} />
      </>
    )
  );
});

export default Dialog;
