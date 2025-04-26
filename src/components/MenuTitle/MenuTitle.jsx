import { useSelector } from "react-redux";

// import styles
import style from "./MenuTitle.module.scss";

// import constants
import { MENU_TYPE_LOAD_GAME, MENU_TYPE_MAIN, MENU_TYPE_NEW_GAME, MENU_TYPE_NEW_GAME_CAMPAIGN } from "@constants";

// import selectors
import { selectLanguage } from "@slices/systemOptionsSlice.js";

export default function MenuTitle({ type = MENU_TYPE_MAIN }) {
  // Get the language from the Redux state
  const language = useSelector(selectLanguage);

  // Construct the text class name based on the language
  const textClassName = `${style.menuTitleText} ${style[`menu-title-text--${type}-title-${language}`]}`;

  if (type === MENU_TYPE_NEW_GAME || type === MENU_TYPE_LOAD_GAME || type === MENU_TYPE_NEW_GAME_CAMPAIGN) {
    return (
      <div className={style.menuTitleContainer}>
        <div className={textClassName} />
      </div>
    );
  }
}
