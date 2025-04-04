import { memo } from "react";

// import styles
import styles from "./MenuSidebarItem.module.scss";

// import sound effects
import buttonClickSound from "@sounds/button-click.ogg";

// import constants
import { STATE_ACTIVE, STATE_DISABLED } from "@constants";

// import hooks
import { useSoundEffect } from "@hooks/useSoundEffect";
import { useDelayedClick } from "@hooks/useDelayedClick";

const MenuSidebarItem = memo(function MenuSidebarItem({ type, state = STATE_ACTIVE, onClick }) {
  const { playSound } = useSoundEffect(buttonClickSound);

  // Use the custom hook to handle the delayed click
  const handleDelayedClick = useDelayedClick(onClick, 75, state);

  // Play sound on mouse down if the button is not disabled
  const handleMouseDown = () => {
    if (state === STATE_DISABLED) return;

    playSound();
  };

  const className = `${styles.menuItem} ${styles[`menu-item--${type}`]}`;

  return <div className={className} onMouseDown={handleMouseDown} onClick={handleDelayedClick} />;
});

export default MenuSidebarItem;
