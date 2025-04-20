import { useCallback, useState } from "react";

/**
 * Custom React hook for managing fullscreen functionality in the application.
 * Provides methods to toggle fullscreen mode and track the current fullscreen state.
 *
 * @returns {Object} An object containing:
 *   - isFullscreen: boolean indicating if the app is in fullscreen mode
 *   - toggleFullscreen: function to switch between fullscreen and normal mode
 *
 * @example
 * const { isFullscreen, toggleFullscreen } = useFullscreen();
 * <button onClick={toggleFullscreen}>
 *   {isFullscreen ? 'Exit Fullscreen' : 'Enter Fullscreen'}
 * </button>
 */
export const useFullscreen = () => {
  // Track whether the application is currently in fullscreen mode
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Memoized callback to handle toggling fullscreen mode
  const toggleFullscreen = useCallback(() => {
    if (!document.fullscreenElement) {
      // Enter fullscreen
      document.documentElement
        .requestFullscreen()
        .then(() => {
          setIsFullscreen(true);
        })
        .catch((err) => {
          // Log error when fullscreen request fails (e.g., not supported or denied)
          console.error(`Error attempting to enable fullscreen: ${err.message}`);
        });
    } else {
      // Exit fullscreen
      document
        .exitFullscreen()
        .then(() => {
          setIsFullscreen(false);
        })
        .catch((err) => {
          // Log error when exiting fullscreen fails (e.g., document is not in fullscreen)
          console.error(`Error attempting to exit fullscreen: ${err.message}`);
        });
    }
  }, []);

  return { isFullscreen, toggleFullscreen };
};
