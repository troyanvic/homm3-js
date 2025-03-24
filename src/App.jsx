import React, { useState, useEffect, useCallback } from "react";

// import styles
import "@styles/global.scss";

// import components
import Main from "@layout/Main/Main.jsx";

/**
 * Represents the main application component that dynamically adjusts its resolution
 * based on the window's size, while maintaining an aspect ratio and specific resolution bounds.
 * The component calculates and sets a responsive resolution ranging from 800x600 to 1600x1200.
 *
 * @return {JSX.Element} A styled div element displaying a title for the application, scaled according to the calculated resolution.
 */
function App() {
  // Extracted constants for better readability
  const MIN_WIDTH = 800;
  const MIN_HEIGHT = 600;
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
    const { baseWidth, baseHeight } = gameResolution;
    const aspectRatio = baseWidth / baseHeight;

    // Ensure the resolution stays between MIN_HEIGHT and MAX_HEIGHT
    const calculatedHeight = Math.max(
      MIN_HEIGHT,
      Math.min(window.innerHeight, MAX_HEIGHT),
    );
    const calculatedWidth = Math.round(calculatedHeight * aspectRatio);

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
    margin: "auto",
  };

  return (
    <div className="game-container" style={containerStyles}>
      <Main />
    </div>
  );
}

export default App;
