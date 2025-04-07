import { useState } from "react";
import { useTranslation } from "react-i18next";

// import styles
import styles from "./MenuSidebar.module.scss";

// import constants
import {
  MENU_TYPE_MAIN,
  MENU_TYPE_NEW_GAME,
  MENU_TYPE_LOAD_GAME,
  MENU_TYPE_SCORES,
  MENU_TYPE_CREDITS,
  MENU_TYPE_QUIT,
  STATE_ACTIVE,
  STATE_DISABLED,
  DIALOG_TYPE_MESSAGE,
  STATE_PRESSED,
} from "@constants";

// import components
import MenuSidebarItem from "@components/MenuSidebarItem/MenuSidebarItem.jsx";
import Dialog from "@common/Dialog/Dialog.jsx";

/**
 * The `MenuSidebar` component renders a menu sidebar that allows users to navigate between different menu items.
 *
 * Features:
 * - Displays a list of menu items, each represented by a `MenuSidebarItem` component.
 * - Supports various menu types such as "New Game", "Load Game", "Scores", "Credits", and "Quit".
 * - Handles navigation actions by changing the `menuType` state.
 */
function MenuSidebar() {
  const [menuType, setMenuType] = useState(MENU_TYPE_MAIN);
  const [isShowingQuitDialog, setIsShowingQuitDialog] = useState(false);
  const [mainMenuItems, setMainMenuItems] = useState([
    { type: MENU_TYPE_NEW_GAME, state: STATE_DISABLED },
    { type: MENU_TYPE_LOAD_GAME, state: STATE_DISABLED },
    { type: MENU_TYPE_SCORES, state: STATE_DISABLED },
    { type: MENU_TYPE_CREDITS, state: STATE_DISABLED },
    { type: MENU_TYPE_QUIT },
  ]);

  // Initialize the `useTranslation` hook for accessing translations within the "dialogs" namespace
  const { t } = useTranslation("dialogs");

  /**
   * Handles click events for menu sidebar items.
   *
   * Depending on the item type:
   * - If the clicked item is "Quit", it displays the quit confirmation dialog
   *   and updates the "Quit" menu item's state to pressed.
   * - For other item types, it updates the `menuType` state to reflect the selected menu item.
   *
   * @param {string} type - The type of the clicked menu item.
   */
  const handleClick = (type) => {
    if (type === MENU_TYPE_QUIT) {
      setIsShowingQuitDialog(true);

      setMainMenuItems(
        mainMenuItems.map((item) => {
          if (item.type === MENU_TYPE_QUIT) {
            return { ...item, state: STATE_PRESSED };
          }

          return item;
        }),
      );
    } else {
      setMenuType(type);
    }
  };

  /**
   * Handles the cancellation of the quit action.
   *
   * - Closes the quit confirmation dialog by setting `isShowingQuitDialog` to `false`.
   * - Resets the state of the "Quit" menu item to active.
   */
  const handleCancel = () => {
    setIsShowingQuitDialog(false);

    setMainMenuItems(
      mainMenuItems.map((item) => {
        if (item.type === MENU_TYPE_QUIT) {
          return { ...item, state: STATE_ACTIVE };
        }

        return item;
      }),
    );
  };

  /**
   * Handles the confirmation of the quit action.
   *
   * - Closes the quit confirmation dialog by setting `isShowingQuitDialog` to `false`.
   * - Exits the application by calling `window.close()`.
   */
  const handleConfirm = () => {
    setIsShowingQuitDialog(false);
    window.close();
  };

  // Render the MenuSidebar component, including menu items and the quit confirmation dialog
  return (
    <aside className={styles.menu}>
      {menuType === MENU_TYPE_MAIN &&
        mainMenuItems.map((item) => {
          const { type, state } = item;

          return <MenuSidebarItem key={type} type={type} state={state} onClick={() => handleClick(type)} />;
        })}

      {isShowingQuitDialog && (
        <Dialog
          isOpen={isShowingQuitDialog}
          type={DIALOG_TYPE_MESSAGE}
          message={t("menu.quit")}
          hasCancel
          onConfirm={handleConfirm}
          onCancel={handleCancel}
        />
      )}
    </aside>
  );
}

export default MenuSidebar;
