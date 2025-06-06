import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

// import styles
import "./Home.scss";

// import music
import mainTheme from "@sounds/main-theme.mp3";

// import selectors and actions
import { selectMusicVolume } from "@slices/systemOptionsSlice.js";
import {
  selectIsShowingCredits,
  selectIsShowingMainMenu,
  selectIsShowingScores,
  showCredits,
  showMainMenu,
} from "@slices/homeScreenSlice.js";

// import components
import InitialVideo from "@components/InitialVideo/InitialVideo.jsx";
import MenuSidebar from "@components/MenuSidebar/MenuSidebar.jsx";
import BackgroundMusic from "@components/BackgroundMusic/BackgroundMusic.jsx";
import Scores from "@layout/Scores/Scores.jsx";

/**
 * The `MainMenu` function is a React component that renders a dynamically resizable menu
 * with a fixed 4:3 aspect ratio. It adjusts its size based on the dimensions of the
 * browser window while staying within defined minimum and maximum width and height constraints.
 *
 * This component uses hooks like `useState`, `useEffect`, and `useCallback` to manage state and
 * side effects effectively, ensuring performance and proper cleanup of event listeners.
 */
function Home() {
  // Constants to define layout padding and resolution limits
  const SCREEN_PADDING = 80 * 2;
  const MIN_WIDTH = 800 - SCREEN_PADDING;
  const MIN_HEIGHT = 600 - SCREEN_PADDING;
  const MAX_HEIGHT = MIN_HEIGHT * 2;

  // State to manage the dimensions of the menu screen
  const [menuScreenResolution, setMenuScreenResolution] = useState({
    baseWidth: MIN_WIDTH,
    baseHeight: MIN_HEIGHT,
    currentWidth: MIN_WIDTH,
    currentHeight: MIN_HEIGHT,
  });

  const { baseWidth, baseHeight, currentWidth, currentHeight } = menuScreenResolution;

  // Get the global state from Redux store
  const musicVolume = useSelector(selectMusicVolume);
  const isShowingMainMenu = useSelector(selectIsShowingMainMenu);
  const isShowingCredits = useSelector(selectIsShowingCredits);
  const isShowingScores = useSelector(selectIsShowingScores);

  // Define dispatch function to update global state
  const dispatch = useDispatch();

  /**
   * Handles click events on the main container. If the main menu is not currently
   * showing, it dispatches an action to display the main menu.
   */
  const handleClick = () => {
    if (!isShowingMainMenu && !isShowingScores && !isShowingCredits) {
      dispatch(showMainMenu(true));
    }

    if (isShowingCredits) {
      dispatch(showCredits(false));
    }
  };

  /**
   * Dynamically calculates the menu's size based on the window's dimensions while keeping
   * the original aspect ratio (4:3). The width and height are constrained within specified
   * boundaries, ensuring it fits properly within the viewport.
   */
  const calculateResponsiveResolution = useCallback(() => {
    const aspectRatio = 4 / 3; // Fixed aspect ratio for the menu screen

    // Compute the available width taking into account the horizontal padding
    const availableWidth = window.innerWidth - SCREEN_PADDING;

    // Compute the height while limiting it between the minimum and maximum allowed values
    const calculatedHeight = Math.max(MIN_HEIGHT, Math.min(window.innerHeight - SCREEN_PADDING, MAX_HEIGHT));

    // Calculate the width based on the calculated height and aspect ratio
    let calculatedWidth = Math.round(calculatedHeight * aspectRatio);

    // If the calculated width exceeds the available space, adjust it
    if (calculatedWidth > availableWidth) {
      calculatedWidth = availableWidth; // Limit the width to the available space

      // Adjust the height proportionally to maintain the aspect ratio
      const newHeight = Math.round(calculatedWidth / aspectRatio);

      // Validate the new height falls within acceptable boundaries
      if (newHeight >= MIN_HEIGHT && newHeight <= MAX_HEIGHT) {
        setMenuScreenResolution((prev) => ({
          ...prev,
          currentWidth: calculatedWidth,
          currentHeight: newHeight,
        }));
        return;
      }
    }

    // Update the state with the calculated dimensions
    setMenuScreenResolution((prev) => ({
      ...prev,
      currentWidth: calculatedWidth,
      currentHeight: calculatedHeight,
    }));
  }, [baseWidth, baseHeight]);

  /**
   * Sets up the initial screen resolution and manages window resize events.
   * This effect runs on component mount and whenever calculateResponsiveResolution changes.
   * It handles:
   * - Initial resolution calculation
   * - Window resize event listener registration
   * - Cleanup of event listeners on component unmount
   */
  useEffect(() => {
    // Initialize the resolution when the component mounts
    calculateResponsiveResolution();

    // Listen for window resize events to adjust the resolution dynamically
    window.addEventListener("resize", calculateResponsiveResolution);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener("resize", calculateResponsiveResolution);
    };
  }, [calculateResponsiveResolution]);

  // Inline styles applied to the container for dynamic sizing
  const containerStyles = {
    width: `${currentWidth}px`,
    height: `${currentHeight}px`,
  };

  // Construct class names for the container
  const homeContainerClassName = "home-container";
  const menuClassName = isShowingMainMenu ? ` ${homeContainerClassName}--is-menu` : "";
  const scoresClassName = isShowingScores ? ` ${homeContainerClassName}--is-scores` : "";
  const className = `${homeContainerClassName}${menuClassName}${scoresClassName}`;

  // Render the main container with the calculated resolution and styles
  return (
    <main className="main-container" onClick={handleClick}>
      <section className={className} style={containerStyles}>
        {!isShowingMainMenu && !isShowingScores ? (
          <InitialVideo />
        ) : (
          <>
            {isShowingMainMenu && <MenuSidebar />}
            {isShowingScores && <Scores />}
            {musicVolume !== 0 && <BackgroundMusic src={mainTheme} />}
          </>
        )}
      </section>
    </main>
  );
}

export default Home;
