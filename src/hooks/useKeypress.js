import { useEffect, useRef } from "react";

/**
 * Custom hook to handle keyboard key presses with priority management
 *
 * @param {string|string[]} keys - Key or array of keys to listen for (e.g., "Escape", "Enter")
 * @param {Function} callback - Function to execute when the specified key is pressed
 * @param {boolean} isActive - Whether this key handler is active
 * @param {number} priority - Priority level (higher number = higher priority)
 */
export function useKeypress(keys, callback, isActive = true, priority = 0) {
  // Convert single key to array for consistent handling
  const keysArray = Array.isArray(keys) ? keys : [keys];

  // Use a ref to store the callback to avoid unnecessary re-renders
  const callbackRef = useRef(null);

  // Update the callbackRef when callback changes
  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  useEffect(() => {
    // If not active, don't register the event listener
    if (!isActive) return;

    // Initialize global handlers registry if it doesn't exist
    if (!window.__keyHandlers) {
      window.__keyHandlers = {};
    }

    // Ensure global handler is initialized
    if (!window.__keyHandlerGlobal) {
      window.__keyHandlerGlobal = (e) => {
        const handlers = window.__keyHandlers[e.key];

        if (handlers && handlers.length > 0) {
          // Get the highest priority active handler for this key
          const topHandler = handlers[0];

          // Execute the highest priority handler
          topHandler.callback();

          // Prevent default behavior for special keys
          e.preventDefault();
          // Prevent other handlers from firing
          e.stopPropagation();
        }
      };
    }

    // Create a handler object with priority
    const handlerId = Date.now() + Math.random();
    const handler = {
      id: handlerId,
      callback: () => callbackRef.current(),
      priority,
    };

    // Register handler for each key
    keysArray.forEach((key) => {
      // Initialize array for this key if it doesn't exist
      if (!window.__keyHandlers[key]) {
        window.__keyHandlers[key] = [];

        // If this is the first handler for this key, add the event listener
        if (!window.__keyRegistered) {
          window.__keyRegistered = {};
        }
        if (!window.__keyRegistered[key]) {
          window.addEventListener("keydown", window.__keyHandlerGlobal);
          window.__keyRegistered[key] = true;
        }
      }

      // Add to registry for this key
      window.__keyHandlers[key].push(handler);

      // Sort handlers by priority (highest first)
      window.__keyHandlers[key].sort((a, b) => b.priority - a.priority);
    });

    // Cleanup function
    return () => {
      // Remove this handler from the registry for each key
      keysArray.forEach((key) => {
        if (window.__keyHandlers && window.__keyHandlers[key]) {
          window.__keyHandlers[key] = window.__keyHandlers[key].filter((h) => h.id !== handlerId);

          // If no handlers left for this key, clean up
          if (window.__keyHandlers[key].length === 0) {
            delete window.__keyHandlers[key];

            // Remove event listener for this key
            if (window.__keyRegistered && window.__keyRegistered[key]) {
              window.removeEventListener("keydown", window.__keyHandlerGlobal);
              delete window.__keyRegistered[key];
            }
          }
        }
      });
    };
  }, [keysArray, isActive, priority]);
}
