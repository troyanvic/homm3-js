import { memo } from "react";

// import styles
import styles from "./Dialog.module.scss";

// import constants
import { BUTTON_TYPE_OK, BUTTON_TYPE_CANCEL } from "@constants";

// import components
import DialogButton from "@common/DialogButton/DialogButton.jsx";

/**
 * Dialog Component
 *
 * A functional component that renders a customizable dialog. It displays a message along with optional
 * buttons for confirming or cancelling an action. The appearance and functionality are controlled
 * by props passed to the component.
 *
 * Props:
 * - isOpen (boolean): Determines whether the dialog is visible. Default is `false`.
 * - type (string): Specifies the dialog type (affects styling). Default is `"message"`.
 * - message (string): The text message to display in the dialog.
 * - hasCancel (boolean): If `true`, renders a cancel button. Default is `false`.
 * - onConfirm (function): Callback triggered when the confirm button is clicked.
 * - onCancel (function): Callback triggered when the cancel button is clicked (when `hasCancel` is `true`).
 *
 * Styles:
 * - The styles are applied dynamically based on the `type` prop.
 *
 * Dependencies:
 * - DialogButton: A reusable button component for confirming or cancelling actions.
 * - Imported styling from `Dialog.module.scss`.
 *
 * Example Usage:
 * ```jsx
 * <Dialog
 *   isOpen={true}
 *   type="message"
 *   message="Are you sure you want to proceed?"
 *   hasCancel={true}
 *   onConfirm={handleConfirm}
 *   onCancel={handleCancel}
 * />
 * ```
 */
const Dialog = memo(function Dialog({
  isOpen = false,
  type = "message",
  message,
  hasCancel = false,
  onConfirm,
  onCancel,
}) {
  const dialogClassNames = `${styles.dialog} ${styles[`dialog--type-${type}`]}`;
  const dialogTextClassNames = `${styles.dialogText} ${styles[`dialog-text--type-${type}`]}`;

  return (
    isOpen && (
      <div className={dialogClassNames}>
        <p className={dialogTextClassNames}>{message}</p>
        <div className={styles.dialogControls}>
          <DialogButton type={BUTTON_TYPE_OK} onClick={onConfirm} />
          {hasCancel && <DialogButton type={BUTTON_TYPE_CANCEL} onClick={onCancel} />}
        </div>
      </div>
    )
  );
});

export default Dialog;
