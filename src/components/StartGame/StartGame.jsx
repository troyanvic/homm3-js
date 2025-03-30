import { useState } from "react";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";

// import styles
import "./StartGame.scss";

// import constants
import { DIALOG_TYPE_MESSAGE, BUTTON_TYPE_OK, BUTTON_TYPE_CANCEL } from "@constants";

// import actions
import { setMusicVolume, setEffectsVolume } from "@slices/systemOptionsSlice.js";
import { showMainMenu } from "@slices/menuLayoutSlice.js";

// import components
import Dialog from "@common/Dialog/Dialog.jsx";

/**
 * The `StartGame` component is responsible for displaying the initial dialog
 * prompting the user to set sound preferences (music and effect volumes) when starting the game.
 *
 * Key features:
 * - Utilizes React state to manage the visibility of the dialog.
 * - Dispatches Redux actions to update system options (music and effects volumes).
 * - Translates dialog messages using the `react-i18next` library.
 * - Includes user interaction options:
 *   - "OK" button to set default sound preferences and proceed to the main menu.
 *   - "Cancel" button to mute sound preferences and proceed to the main menu.
 *
 * The component uses the `Dialog` component to render the modal interface.
 */
function StartGame() {
  const dispatch = useDispatch();
  const [isShowingDialog, setIsShowingDialog] = useState(true);
  const { t } = useTranslation("dialogs");

  /**
   * Handles user interaction with the dialog buttons and sets sound preferences accordingly.
   *
   * - Sets default volume levels:
   *   - `BUTTON_TYPE_OK`: Sets music and effects volume to 0.6.
   *   - `BUTTON_TYPE_CANCEL`: Sets music and effects volume to 0 (muted).
   * - Updates the application state by dispatching Redux actions:
   *   - Updates music and effects volume in the system options.
   *   - Shows the main menu after closing the dialog.
   * - Closes the dialog by updating the local state.
   *
   * @param {string} type - The type of button clicked, either `ok` or `cancel`.
   */
  const handleClick = (type) => {
    const defaultVolume = type === BUTTON_TYPE_OK ? 0.6 : 0;

    setIsShowingDialog(false);
    dispatch(setMusicVolume(defaultVolume));
    dispatch(setEffectsVolume(defaultVolume));
    dispatch(showMainMenu(true));
  };

  return (
    <div className="start-game">
      {isShowingDialog && (
        <Dialog
          isOpen={true}
          type={DIALOG_TYPE_MESSAGE}
          message={t("startGame.soundPrompt")}
          hasCancel
          onConfirm={() => handleClick(BUTTON_TYPE_OK)}
          onCancel={() => handleClick(BUTTON_TYPE_CANCEL)}
        />
      )}
    </div>
  );
}

export default StartGame;
