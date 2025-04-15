import { memo, useEffect } from "react";

// import styles
import styles from "./Dialog.module.scss";

// import constants
import { BUTTON_TYPE_OK, BUTTON_TYPE_CANCEL, STATE_ACTIVE, STATE_DISABLED, KEY_ENTER } from "@constants";

// import hooks
import { useEscapeKey } from "@hooks/useEscapeKey.js";

// import components
import DialogButton from "@common/DialogButton/DialogButton.jsx";
import { useClickWithSound } from "@hooks/useClickWithSound.js";

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

  useEscapeKey(
    () => {
      playClickEffect();
      onCancel();
    },
    isOpen,
    10,
  );

  /**
   * Adds an event listener for keyboard interactions when the dialog is open, and removes it
   * when the dialog is closed or the component is unmounted. This effect enables the user
   * to trigger confirmation or cancellation actions using keyboard keys:
   *
   * - Pressing "Escape" triggers the `onCancel` callback if a cancel button is enabled and provided.
   * - Pressing "Enter" triggers the `onConfirm` callback if the confirm button is enabled.
   *
   * Dependencies:
   * - Reattaches the listener if any of `isOpen`, `hasCancel`, `isCancelDisabled`, `isOkDisabled`, `onCancel`, or `handleConfirm` change.
   */
  useEffect(() => {
    if (!isOpen) return;

    /**
     * Handles keyboard interactions when the dialog is open.
     *
     * - Pressing the "Escape" key triggers the `onCancel` callback if a cancel button is available
     *   and not disabled.
     * - Pressing the "Enter" key triggers the `onConfirm` callback if the confirm button is not disabled.
     *
     * @param {KeyboardEvent} event - The keyboard event object.
     */
    const handleKeyDown = (event) => {
      const { key } = event;

      // Handle Enter key for OK/Confirm
      if (key === KEY_ENTER && !isOkDisabled && onConfirm) {
        playClickEffect();
        onConfirm();
      }
    };

    // Add event listener when the dialog is open
    document.addEventListener("keydown", handleKeyDown);

    // Cleanup event listener when the component unmounts or dialog closes
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, isOkDisabled]);

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
                state={isOkDisabled ? STATE_DISABLED : STATE_ACTIVE}
                onClick={onConfirm}
              />
              {hasCancel && (
                <DialogButton
                  type={BUTTON_TYPE_CANCEL}
                  state={isCancelDisabled ? STATE_DISABLED : STATE_ACTIVE}
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
