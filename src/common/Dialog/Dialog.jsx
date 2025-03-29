import { memo } from "react";

// import styles
import styles from "./Dialog.module.scss";

// import constants
import { BUTTON_TYPE_OK, BUTTON_TYPE_CANCEL, STATE_ACTIVE, STATE_DISABLED } from "@constants";

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
      </div>
    )
  );
});

export default Dialog;
