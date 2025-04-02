import { useState } from "react";

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
} from "@constants";

// import components
import MenuSidebarItem from "@components/MenuSidebarItem/MenuSidebarItem.jsx";

function MenuSidebar() {
  const [menuType, setMenuType] = useState(MENU_TYPE_MAIN);

  const mainMenuItems = [
    { type: MENU_TYPE_NEW_GAME },
    { type: MENU_TYPE_LOAD_GAME },
    { type: MENU_TYPE_SCORES },
    { type: MENU_TYPE_CREDITS },
    { type: MENU_TYPE_QUIT },
  ];

  return (
    <aside className={styles.menu}>
      {menuType === MENU_TYPE_MAIN && mainMenuItems.map((item) => <MenuSidebarItem key={item.type} type={item.type} />)}
    </aside>
  );
}

export default MenuSidebar;
