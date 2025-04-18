import { useState } from "react";
import { useTranslation } from "react-i18next";

// import styles
import styles from "./MenuSidebar.module.scss";

// import constants
import {
  DIALOG_TYPE_MESSAGE,
  KEY_ESCAPE,
  MENU_TYPE_BACK,
  MENU_TYPE_LOAD_GAME,
  MENU_TYPE_MAIN,
  MENU_TYPE_NEW_GAME,
  MENU_TYPE_QUIT,
  STATE_ACTIVE,
  STATE_PRESSED,
} from "@constants";

// import hooks
import { useKeypress } from "@hooks/useKeypress.js";

// import components
import MenuSidebarItem from "@components/MenuSidebarItem/MenuSidebarItem.jsx";
import MenuTitle from "@components/MenuTitle/MenuTitle.jsx";
import Dialog from "@common/Dialog/Dialog.jsx";

// import menu items
import { loadGameMenuItems, mainMenuItems as initialMainMenuItems, newGameMenuItems } from "./menuItems.js";

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
  const [mainMenuItems, setMainMenuItems] = useState(initialMainMenuItems);

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
    // Update a menu type to navigate to the selected menu section, unless "Quit" is clicked
    if (type !== MENU_TYPE_QUIT) setMenuType(type);

    // Switch to new game menu items when "New Game" is selected
    if (type === MENU_TYPE_NEW_GAME) {
      setMainMenuItems(newGameMenuItems);
    }

    // Switch to load game menu items when "Load Game" is selected
    if (type === MENU_TYPE_LOAD_GAME) {
      setMainMenuItems(loadGameMenuItems);
    }

    // Return to main menu when "Back" is clicked
    if (type === MENU_TYPE_BACK) {
      setMainMenuItems(initialMainMenuItems);
      setMenuType(MENU_TYPE_MAIN);
    }

    // Change the "Quit" menu item state to pressed
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

  // Attach the `useKeypress` hook to listen for the "Escape" key press.
  // - When "Escape" is pressed, the "Quit" menu item's state is set to pressed,
  //   and the quit confirmation dialog is displayed.
  useKeypress(
    KEY_ESCAPE,
    () => {
      // In main menu, show quit dialog and set "Quit" item state to pressed
      if (menuType === MENU_TYPE_MAIN) {
        setMainMenuItems(
          mainMenuItems.map((item) => {
            if (item.type === MENU_TYPE_QUIT) {
              return { ...item, state: STATE_PRESSED };
            }

            return item;
          }),
        );

        setIsShowingQuitDialog(true);
      }

      // In the new game menu, set the "Back" item state to pressed and return to the main menu
      if (menuType === MENU_TYPE_NEW_GAME) {
        setMainMenuItems(
          newGameMenuItems.map((item) => {
            if (item.type === MENU_TYPE_BACK) {
              return { ...item, state: STATE_PRESSED };
            }

            return item;
          }),
        );

        setTimeout(() => {
          setMainMenuItems(initialMainMenuItems);
          setMenuType(MENU_TYPE_MAIN);
        }, 100);
      }

      // In the load game menu, set the "Back" item state to pressed and return to the main menu
      if (menuType === MENU_TYPE_LOAD_GAME) {
        setMainMenuItems(
          loadGameMenuItems.map((item) => {
            if (item.type === MENU_TYPE_BACK) {
              return { ...item, state: STATE_PRESSED };
            }

            return item;
          }),
        );

        setTimeout(() => {
          setMainMenuItems(initialMainMenuItems);
          setMenuType(MENU_TYPE_MAIN);
        }, 100);
      }
    },
    true,
    1,
  );

  // Render the MenuSidebar component, including menu items and the quit confirmation dialog
  return (
    <>
      <MenuTitle type={menuType} />
      <aside className={styles.menu}>
        {mainMenuItems.map((item) => {
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
    </>
  );
}

export default MenuSidebar;
