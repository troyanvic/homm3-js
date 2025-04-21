import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";

// import styles
import styles from "./Scores.module.scss";

// import constants
import { KEY_ESCAPE } from "@constants";

// import hooks
import { useKeypress } from "@hooks/useKeypress.js";

// import actions
import { showMainMenu, showScores } from "@slices/homeScreenSlice.js";

export default function Scores() {
  const dispatch = useDispatch();
  const { t } = useTranslation("scores");

  /**
   * Handle the "Escape" key press to exit the score screen and return to the main menu
   */
  useKeypress(KEY_ESCAPE, () => {
    dispatch(showScores(false));
    dispatch(showMainMenu(true));
  });

  return (
    <section className={styles.scores}>
      <p>{t("message_line_1")}</p>
      <p>{t("message_line_2")}</p>
    </section>
  );
}
