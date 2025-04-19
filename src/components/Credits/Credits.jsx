import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";

// import styles
import styles from "./Credits.module.scss";

// import actions
import { showCredits } from "@slices/homeScreenSlice.js";

// import credits list
import { useCreditsListTranslated } from "@components/Credits/creditsList.js";

/**
 * Helper function to parse text containing comma-separated authors
 * and wrap each author in a span element
 *
 * @param {string} text - The text containing comma-separated authors
 * @returns {(string|JSX.Element[])} Returns either the original text if no commas are found,
 * or an array of JSX span elements containing individual authors
 */
const formatCreditsText = (text) => {
  // Check if the text contains commas
  if (text.includes(",")) {
    // Split by comma and trim whitespace
    const authors = text.split(",").map((author) => author.trim());

    return authors.map((author, index) => <span key={index}>{author}</span>);
  }

  // Return the original text if there are no commas
  return text;
};

export default function Credits() {
  const dispatch = useDispatch();
  const creditsListRef = useRef(null);
  const animationTimeoutRef = useRef(null);
  const transitionEndTimeoutRef = useRef(null);
  const [showCopyright, setShowCopyright] = useState(false);

  // Initialize the `useTranslation` hook for accessing translations within the "credits" namespace
  const { t } = useTranslation("credits");

  const creditsList = useCreditsListTranslated();

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

  /**
   * Sets up the credits scrolling animation when the component mounts.
   * The animation follows these steps:
   * 1. Positions the credits list at the bottom of the screen
   * 2. Scrolls the credits upward over a defined duration
   * 3. Shows copyright text near the end of the animation
   * 4. Closes the credits screen when animation completes
   */
  useEffect(() => {
    const { current: creditsListCurrent } = creditsListRef;

    if (!creditsListCurrent) return;

    // Calculate total height of credits list for determining scroll distance
    const creditsListHeight = creditsListCurrent.offsetHeight;

    // Position credits list at bottom of screen initially
    creditsListCurrent.style.top = "100%";

    // Begin animation sequence after initial delay of 500ms
    animationTimeoutRef.current = setTimeout(() => {
      const transitionTime = 300; // Duration of scroll animation in seconds
      const animationDuration = transitionTime * 1000; // Convert to milliseconds

      // Configure and start the upward scrolling animation
      creditsListCurrent.style.transition = `${transitionTime}s linear`;
      creditsListCurrent.style.top = `calc(0% - ${creditsListHeight}px)`;

      // Display copyright text when credits are nearly finished (90% through)
      setTimeout(() => {
        setShowCopyright(true);
      }, animationDuration * 0.9);

      // Set backup timer to close credits screen after animation plus small delay
      transitionEndTimeoutRef.current = setTimeout(() => {
        dispatch(showCredits(false));
      }, animationDuration + 500);

      // Add listener to close credits when scroll animation completes
      creditsListCurrent.addEventListener(
        "transitionend",
        () => {
          dispatch(showCredits(false));
        },
        { once: true },
      );
    }, 500);

    // Cleanup function handles:
    // - Clearing all animation timers
    // - Removing event listeners
    // - Resetting animation state if component unmounts mid-animation
    return () => {
      if (animationTimeoutRef.current) {
        clearTimeout(animationTimeoutRef.current);
      }

      if (transitionEndTimeoutRef.current) {
        clearTimeout(transitionEndTimeoutRef.current);
      }

      if (creditsListCurrent) {
        creditsListCurrent.removeEventListener("transitionend", () => {
          dispatch(showCredits(false));
        });

        creditsListCurrent.style.transition = "none";
        creditsListCurrent.style.top = "100%";
      }
    };
  }, [dispatch]);

  // Render Credits screen
  return (
    <>
      <div className={styles.credits}>
        <div className={styles.creditsList} ref={creditsListRef}>
          {creditsList.map((credit, index) => {
            const { hasExtraTitle, extraTitle, title, text } = credit;

            return (
              <div className={styles.creditSection} key={index}>
                {hasExtraTitle && <h2 className={styles.creditExtraTitle}>{extraTitle}</h2>}
                <h3 className={styles.creditTitle}>{title}</h3>
                <p className={styles.creditText}>{formatCreditsText(text)}</p>
              </div>
            );
          })}
        </div>
      </div>

      {showCopyright && <p className={styles.creditsCopyrightText}>{t("copyright")}</p>}
    </>
  );
}
