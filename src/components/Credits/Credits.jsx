import { useEffect } from "react";
import { useDispatch } from "react-redux";

// import styles
import styles from "./Credits.module.scss";

// import actions
import { showCredits } from "@slices/homeScreenSlice.js";

import { creditsList } from "@components/Credits/creditsList.js";

export default function Credits() {
  const dispatch = useDispatch();

  /**
   * Sets up a keyboard event listener to close the credits screen when any key is pressed.
   * Cleans up the event listener when the component unmounts.
   */
  useEffect(() => {
    const handleKeyPress = () => {
      dispatch(showCredits(false));
    };

    window.addEventListener("keydown", handleKeyPress);

    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [dispatch]);

  // Render Credits screen
  return (
    <div className={styles.credits}>
      {creditsList.map((credit, index) => (
        <div className={styles.creditSection} key={index}>
          <h2 className={styles.creditExtraTitle}>{credit.extraTitle}</h2>
          <h3 className={styles.creditTitle}>{credit.title}</h3>
          <p className={styles.creditText}>{credit.text}</p>
        </div>
      ))}
    </div>
  );
}
