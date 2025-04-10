import { memo, useState, useEffect } from "react";

// import styles
import styles from "./MenuSidebarItem.module.scss";

// import constants
import { MENU_TYPE_QUIT, STATE_ACTIVE, STATE_DISABLED, STATE_PRESSED } from "@constants";

// import hooks
import { useClickWithSound } from "@hooks/useClickWithSound.js";

/**
 * `MenuSidebarItem` is a memoized functional component that represents a menu item in the sidebar.
 *
 * Props:
 * - `type` (string): Determines the specific type of the menu item, which is used to apply corresponding styles.
 * - `state` (string, optional): The current state of the menu item. Defaults to `STATE_ACTIVE`.
 * - `onClick` (function): A callback function triggered when the menu item is clicked.
 */
const MenuSidebarItem = memo(function MenuSidebarItem({ type, state = STATE_ACTIVE, onClick }) {
  const [isPressed, setIsPressed] = useState(false);
  const { handleMouseDown, handleClick } = useClickWithSound(onClick, 75, state);

  // Effect to reset the `isPressed` state if the menu type is `MENU_TYPE_QUIT`
  // and the state is changed back to `STATE_ACTIVE`
  useEffect(() => {
    if (type === MENU_TYPE_QUIT) {
      if (state === STATE_ACTIVE) {
        setIsPressed(false);
      }
    }
  }, [type, state]);

  /**
   * Handles the click action for the menu item.
   *
   * - If the menu type is `MENU_TYPE_QUIT`, sets the `isPressed` state to `true`.
   * - Calls the `handleClick` function provided by the `useClickWithSound` hook.
   */
  const handleClickAction = () => {
    if (type === MENU_TYPE_QUIT) {
      setIsPressed(true);
    }

    handleClick();
  };

  // Determine the CSS class name for the disabled state based on the `state` prop
  // Determine the CSS class name for the pressed state based on the `isPressed` state
  // Determine the attributes to apply if the menu item is in the disabled state
  const disabledClass = state === STATE_DISABLED ? styles[`menu-item--${STATE_DISABLED}`] : "";
  const pressedClass = isPressed ? styles[`menu-item--${type}--${STATE_PRESSED}`] : "";
  const disabledAttrs = state === STATE_DISABLED ? { "aria-disabled": true, tabIndex: -1 } : {};

  // Construct the button's complete CSS class name by combining the base style,
  // the style for the specific type, the pressed state style (if applicable),
  // and the disabled state style (if applicable).
  const className = `${styles.menuItem} ${styles[`menu-item--${type}`]} ${pressedClass} ${disabledClass}`;

  // Render the div element
  return <div className={className} onMouseDown={handleMouseDown} onClick={handleClickAction} {...disabledAttrs} />;
});

export default MenuSidebarItem;
