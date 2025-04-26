import { memo, useEffect, useRef } from "react";
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
  const containerRef = useRef(null);
  const dispatch = useDispatch();
  const scoreList = useScoreListTranslated();
  const { t } = useTranslation("scores");

  // Handle resizing and maintain aspect ratio of contents
  useEffect(() => {
    const updateContainerScale = () => {
      if (!containerRef.current) return;

      const container = containerRef.current;
      const parentWidth = container.parentElement.clientWidth;
      const parentHeight = container.parentElement.clientHeight;

      // Get computed style to account for paddings
      const computedStyle = window.getComputedStyle(container);
      const paddingHorizontal = parseFloat(computedStyle.paddingLeft) + parseFloat(computedStyle.paddingRight);
      const paddingVertical = parseFloat(computedStyle.paddingTop) + parseFloat(computedStyle.paddingBottom);

      // Calculate available space
      const availableWidth = parentWidth - paddingHorizontal;
      const availableHeight = parentHeight - paddingVertical;

      // Apply scale transformation to the content wrapper
      const contentWrapper = container.querySelector(`.${styles.scoresContent}`);
      if (contentWrapper) {
        const baseWidth = 800; // Base width the table was designed for
        const baseHeight = 600; // Base height the table was designed for

        // Calculate scale factors
        const scaleX = availableWidth / baseWidth;
        const scaleY = availableHeight / baseHeight;

        // Use the smaller scale to ensure it fits
        const scale = Math.min(scaleX, scaleY);

        // Apply the scale transformation
        contentWrapper.style.transform = `scale(${scale})`;
      }
    };

    // Initial update
    updateContainerScale();

    // Listen for resize events
    window.addEventListener("resize", updateContainerScale);

    // Cleanup
    return () => {
      window.removeEventListener("resize", updateContainerScale);
    };
  }, []);

  /**
   * Handle the "Escape" key press to exit the score screen and return to the main menu
   */
  useKeypress(KEY_ESCAPE, () => {
    dispatch(showScores(false));
    dispatch(showMainMenu(true));
  });

  // Render the scores screen
  return (
    <div className={styles.scores} ref={containerRef}>
      <div className={styles.scoresContent}>
        <div className={styles.scoresHead}>
          <ScoresColumnItem>{t("head.rank")}</ScoresColumnItem>
          <ScoresColumnItem>{t("head.player")}</ScoresColumnItem>
          <ScoresColumnItem>{t("head.land")}</ScoresColumnItem>
          <ScoresColumnItem>
            {t("head.days")} / {t("head.points")}
          </ScoresColumnItem>
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
      </div>
    </div>
  );
}
