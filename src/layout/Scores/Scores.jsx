import { memo } from "react";
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

// import scores
import { useScoreListTranslated } from "@layout/Scores/scoreList.js";

/**
 * ScoresColumnItem is a memoized functional component that renders a column item in the scores table.
 *
 * @param {Object} props - The component props
 * @param {React.ReactNode} props.children - The content to be rendered inside the column item
 * @returns {React.ReactElement} A div element with the scores column item styling
 */
const ScoresColumnItem = memo(function ScoreItem({ children }) {
  return <div className={styles.scoresColumnItem}>{children}</div>;
});

export default function Scores() {
  const dispatch = useDispatch();
  const { t } = useTranslation("scores");
  const scoreList = useScoreListTranslated();

  /**
   * Handle the "Escape" key press to exit the score screen and return to the main menu
   */
  useKeypress(KEY_ESCAPE, () => {
    dispatch(showScores(false));
    dispatch(showMainMenu(true));
  });

  return (
    <section className={styles.scores}>
      <div className={`${styles.scoresHead} ${styles.scoresRow}`}>
        <ScoresColumnItem>{t("head.rank")}</ScoresColumnItem>
        <ScoresColumnItem>{t("head.player")}</ScoresColumnItem>
        <ScoresColumnItem>{t("head.land")}</ScoresColumnItem>
        <ScoresColumnItem>{`${t("head.days")} / ${t("head.points")}`}</ScoresColumnItem>
        <ScoresColumnItem></ScoresColumnItem>
      </div>

      {scoreList.map((score, index) => {
        const { rank, player, land, days, points } = score;

        return (
          <div className={styles.scoresRow} key={index}>
            <ScoresColumnItem>{rank}</ScoresColumnItem>
            <ScoresColumnItem>{player}</ScoresColumnItem>
            <ScoresColumnItem>{land}</ScoresColumnItem>
            <ScoresColumnItem>
              {days} / {points}
            </ScoresColumnItem>
            <ScoresColumnItem />
          </div>
        );
      })}
    </section>
  );
}
