import React, { useState, useEffect, useCallback } from "react";

// import styles
import "@styles/global.scss";

/**
 * Represents the main application component that dynamically adjusts its resolution
 * based on the window's size, while maintaining an aspect ratio and specific resolution bounds.
 * The component calculates and sets a responsive resolution ranging from 800x600 to 1600x1200.
 *
 * @return {JSX.Element} A styled div element displaying a title for the application, scaled according to the calculated resolution.
 */
function App() {
  // Extracted constants for better readability
  const SCREEN_PADDING = 80 * 2;
  const MIN_WIDTH = 800 - SCREEN_PADDING;
  const MIN_HEIGHT = 600 - SCREEN_PADDING;
  const MAX_HEIGHT = MIN_HEIGHT * 2;

  const [gameResolution, setGameResolution] = useState({
    baseWidth: MIN_WIDTH,
    baseHeight: MIN_HEIGHT,
    currentWidth: MIN_WIDTH,
    currentHeight: MIN_HEIGHT,
  });

  const { baseWidth, baseHeight, currentWidth, currentHeight } = gameResolution;

  /**
   * Calculates and sets a responsive game resolution based on the current window height
   * while maintaining the original aspect ratio. Ensures the resolution stays within
   * specified minimum and maximum boundaries.
   */
  const calculateResponsiveResolution = useCallback(() => {
    // Define the aspect ratio
    const aspectRatio = 4 / 3;

    // Calculate available width accounting for parent padding on both sides
    const availableWidth = window.innerWidth - SCREEN_PADDING;

    // Ensure the resolution stays between MIN_HEIGHT and MAX_HEIGHT
    const calculatedHeight = Math.max(MIN_HEIGHT, Math.min(window.innerHeight - SCREEN_PADDING, MAX_HEIGHT));

    // Ensure the resolution stays between MIN_HEIGHT and MAX_HEIGHT
    let calculatedWidth = Math.round(calculatedHeight * aspectRatio);

    // Check if the calculated width exceeds available width
    if (calculatedWidth > availableWidth) {
      // If width exceeds available space, constrain it to available width
      calculatedWidth = availableWidth;

      // Adjust height proportionally to maintain aspect ratio
      const newHeight = Math.round(calculatedWidth / aspectRatio);

      // Check if the new height satisfies our min/max constraints
      if (newHeight >= MIN_HEIGHT && newHeight <= MAX_HEIGHT) {
        setGameResolution((prev) => ({
          ...prev,
          currentWidth: calculatedWidth,
          currentHeight: newHeight,
        }));
        return;
      }
    }

    // Update the game resolution state with calculated dimensions
    setGameResolution((prev) => ({
      ...prev,
      currentWidth: calculatedWidth,
      currentHeight: calculatedHeight,
    }));
  }, [baseWidth, baseHeight]);

  useEffect(() => {
    // Calculate initial resolution
    calculateResponsiveResolution();

    // Add event listener for window resize
    window.addEventListener("resize", calculateResponsiveResolution);

    // Cleanup listener on component unmount
    return () => {
      window.removeEventListener("resize", calculateResponsiveResolution);
    };
  }, [calculateResponsiveResolution]);

  // Extracted styles into a constant
  const containerStyles = {
    width: `${currentWidth}px`,
    height: `${currentHeight}px`,
  };

  return (
    <div className="main-container">
      <div className="main-menu-container" style={containerStyles}></div>
    </div>
  );
}

export default App;
