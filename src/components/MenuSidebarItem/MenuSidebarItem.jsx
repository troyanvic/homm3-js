import { memo } from "react";

// import styles
import styles from "./MenuSidebarItem.module.scss";

// import constants
import { STATE_ACTIVE } from "@constants";

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
  const { handleMouseDown, handleClick } = useClickWithSound(onClick, 75, state);

  // Construct the button's CSS class name based on type and state props
  const className = `${styles.menuItem} ${styles[`menu-item--${type}`]}`;

  // Render the div element
  return <div className={className} onMouseDown={handleMouseDown} onClick={handleClick} />;
});

export default MenuSidebarItem;
