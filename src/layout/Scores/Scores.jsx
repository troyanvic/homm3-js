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

  const scores = [
    {
      rank: 1,
      player: "Sandro",
      land: "Dead and Buried",
      days: 75,
      score: 200,
      creature: "",
    },
    {
      rank: 2,
      player: "Astral",
      land: "All for One",
      days: 100,
      score: 190,
      creature: "",
    },
    {
      rank: 3,
      player: "Oris",
      land: "Keep Deep in the Dead",
      days: 125,
      score: 180,
      creature: "",
    },
    {
      rank: 4,
      player: "Lord Haart",
      land: "Titans's Winter",
      days: 150,
      score: 170,
      creature: "",
    },
    {
      rank: 5,
      player: "Alamar",
      land: "Dragon Orb",
      days: 175,
      score: 160,
      creature: "",
    },
    {
      rank: 6,
      player: "Styg",
      land: "Emerald Isles",
      days: 200,
      score: 150,
      creature: "",
    },
    {
      rank: 7,
      player: "Yog",
      land: "Overthrow Thy Neighbors",
      days: 250,
      score: 140,
      creature: "",
    },
    {
      rank: 8,
      player: "Ajit",
      land: "Search for the Grail",
      days: 500,
      score: 130,
      creature: "",
    },
    {
      rank: 9,
      player: "Iona",
      land: "The Mandate of Heaven",
      days: 750,
      score: 120,
      creature: "",
    },
    {
      rank: 10,
      player: "Tazar",
      land: "Myth and Legend",
      days: 1000,
      score: 100,
      creature: "",
    },
    {
      rank: 11,
      player: "Your Name",
      land: "Just play a Map",
      days: 2000,
      score: 1,
      creature: "",
    },
  ];

  return (
    <section className={styles.scores}>
      <div className={`${styles.scoresHead} ${styles.scoresRow}`}>
        <span className={styles.scoresColumnItem}>Rank</span>
        <span className={styles.scoresColumnItem}>Player</span>
        <span className={styles.scoresColumnItem}>Land</span>
        <span className={styles.scoresColumnItem}>Days / Score</span>
        <span className={styles.scoresColumnItem}></span>
      </div>

      {scores.map((score, index) => {
        const { rank, player, land, days, score: scoreAmount } = score;

        return (
          <div className={styles.scoresRow} key={index}>
            <span className={styles.scoresColumnItem}>{rank}</span>
            <span className={styles.scoresColumnItem}>{player}</span>
            <span className={styles.scoresColumnItem}>{land}</span>
            <span className={styles.scoresColumnItem}>
              {days} / {scoreAmount}
            </span>
          </div>
        );
      })}
    </section>
  );
}
