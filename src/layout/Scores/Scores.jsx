import { memo, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

// import styles
import styles from "./Scores.module.scss";

// import constants
import {
  HIGH_SCORE_TYPE_CAMPAIGN,
  HIGH_SCORE_TYPE_STANDARD,
  KEY_ESCAPE,
  STATE_ACTIVE,
  STATE_PRESSED,
} from "@constants";

// import hooks
import { useKeypress } from "@hooks/useKeypress.js";
import { useClickWithSound } from "@hooks/useClickWithSound.js";

// import actions
import { showMainMenu, showScores } from "@slices/homeScreenSlice.js";

// import selectors
import { selectLanguage } from "@slices/systemOptionsSlice.js";

// import scores
import { useCampaignScoreListTranslated, useStandardScoreListTranslated } from "@layout/Scores/scoreList.js";

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

/**
 * ScoresButton is a memoized functional component that renders a button in the scores table.
 *
 * @param {Object} props - The component props
 * @param {string} props.position - The position of the button in the table
 * @param {string} props.type - The type of the button
 * @param {string} props.state - The state of the button
 * @returns {React.ReactElement} A span element with the scores button styling
 */
const ScoresButton = memo(function ScoresButton({
  position = "top-left",
  type = HIGH_SCORE_TYPE_CAMPAIGN,
  state = "",
  onClick = () => {},
}) {
  const language = useSelector(selectLanguage);
  const activeClass = state === STATE_ACTIVE ? styles[`scores-btn--${state}`] : "";
  const pressedClass = state === STATE_PRESSED ? styles[`scores-btn--${state}`] : "";
  const className = `${styles.scoresBtn} ${styles[`scores-btn--${position}`]} ${styles[`scores-btn--${type}-${language}`]} ${activeClass} ${pressedClass}`;

  return <span className={className} onClick={onClick} />;
});

export default function Scores() {
  const containerRef = useRef(null);
  const dispatch = useDispatch();
  const campaignScoreList = useCampaignScoreListTranslated();
  const standardScoreList = useStandardScoreListTranslated();
  const { t } = useTranslation("scores");

  // State for the current table type (either HIGH_SCORE_TYPE_CAMPAIGN or HIGH_SCORE_TYPE_STANDARD)
  const [currentType, setCurrentType] = useState(HIGH_SCORE_TYPE_CAMPAIGN);
  const [scoreList, setScoreList] = useState(campaignScoreList);
  const [exitButtonState, setExitButtonState] = useState("");

  // Destructure functions from the custom hook for handling sound and click events
  const { handleMouseDown } = useClickWithSound(() => {}, 75, STATE_ACTIVE);

  // Handle exiting the scores screen by hiding scores view and showing main menu
  const closeScores = () => {
    dispatch(showScores(false));
    dispatch(showMainMenu(true));
  };

  /**
   * Handles switching between campaign and standard score table types
   * and updates the displayed score list accordingly.
   *
   * @param {string} type - The type of score table to display (either HIGH_SCORE_TYPE_CAMPAIGN or HIGH_SCORE_TYPE_STANDARD)
   */
  const handleChangeTableType = (type) => {
    setCurrentType(type === HIGH_SCORE_TYPE_CAMPAIGN ? HIGH_SCORE_TYPE_CAMPAIGN : HIGH_SCORE_TYPE_STANDARD);
    setScoreList(type === HIGH_SCORE_TYPE_CAMPAIGN ? campaignScoreList : standardScoreList);
    handleMouseDown();
  };

  /**
   * Handles resetting the scores screen by triggering mouse down sound effect.
   * Currently only plays the sound without actual reset functionality.
   */
  const handleReset = () => {
    handleMouseDown();
  };

  /**
   * Handles exiting the scores screen by hiding scores view and showing main menu.
   * Also triggers mouse down sound effect.
   */
  const handleExit = () => {
    handleMouseDown();
    closeScores();
  };

  const simulateButtonPress = (setButtonState, callback, releaseDelay = 125, actionDelay = 175) => {
    handleMouseDown();
    setButtonState(STATE_PRESSED);

    setTimeout(() => {
      setButtonState("");
    }, releaseDelay);

    setTimeout(() => {
      callback();
    }, actionDelay);
  };

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
  useKeypress(KEY_ESCAPE, () => simulateButtonPress(setExitButtonState, closeScores));

  // Render the scores screen
  return (
    <div className={styles.scores} ref={containerRef}>
      <div className={styles.scoresContent}>
        <ScoresButton
          position="top-left"
          type={HIGH_SCORE_TYPE_CAMPAIGN}
          state={currentType === HIGH_SCORE_TYPE_CAMPAIGN ? STATE_ACTIVE : ""}
          onClick={() => handleChangeTableType(HIGH_SCORE_TYPE_CAMPAIGN)}
        />
        <ScoresButton
          position="bottom-left"
          type={HIGH_SCORE_TYPE_STANDARD}
          state={currentType === HIGH_SCORE_TYPE_STANDARD ? STATE_ACTIVE : ""}
          onClick={() => handleChangeTableType(HIGH_SCORE_TYPE_STANDARD)}
        />
        <ScoresButton position="top-right" type="reset" onClick={handleReset} />
        <ScoresButton position="bottom-right" type="exit" state={exitButtonState} onClick={handleExit} />

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
          const { rank, player, land, days, points, creature } = score;

          return (
            <div className={styles.scoresRow} key={index}>
              <ScoresColumnItem>{rank}</ScoresColumnItem>
              <ScoresColumnItem>{player}</ScoresColumnItem>
              <ScoresColumnItem>{land}</ScoresColumnItem>
              <ScoresColumnItem>
                {days} / {points}
              </ScoresColumnItem>
              <ScoresColumnItem>
                {creature !== "" ? <img className={styles.scoresIcon} src={creature} alt={player} /> : false}
              </ScoresColumnItem>
            </div>
          );
        })}
      </div>
    </div>
  );
}
