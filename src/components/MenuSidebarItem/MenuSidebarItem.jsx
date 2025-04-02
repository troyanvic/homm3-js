import { memo } from "react";

// import styles
import styles from "./MenuSidebarItem.module.scss";

const MenuSidebarItem = memo(function MenuSidebarItem({ type }) {
  const className = `${styles.menuItem} ${styles[`menu-item--${type}`]}`;

  return <div className={className} />;
});

export default MenuSidebarItem;
