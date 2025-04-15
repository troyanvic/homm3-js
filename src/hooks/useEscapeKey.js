import { useEffect, useRef } from "react";

// import constants
import { KEY_ESCAPE } from "@constants";

/**
 * Custom hook to handle Escape key presses with priority management
 * @param {Function} callback - Function to execute when Escape is pressed
 * @param {boolean} isActive - Whether this escape handler is active
 * @param {number} priority - Priority level (higher number = higher priority)
 */
export function useEscapeKey(callback, isActive, priority) {
  // Use a ref to store the callback to avoid unnecessary re-renders
  const callbackRef = useRef(null);

  // Update the callbackRef when callback changes
  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  useEffect(() => {
    // If not active, don't register the event listener
    if (!isActive) return;

    // Store this handler's information in a global registry
    if (!window.__escapeHandlers) {
      window.__escapeHandlers = [];
    }

    // Create a handler object with priority
    const handlerId = Date.now() + Math.random();
    const handler = {
      id: handlerId,
      callback: () => callbackRef.current(),
      priority,
    };

    // Add to registry, sorted by priority (highest first)
    window.__escapeHandlers.push(handler);
    window.__escapeHandlers.sort((a, b) => b.priority - a.priority);

    // The global event handler that manages all escape key presses
    const handleEscapeGlobal = (e) => {
      if (e.key === KEY_ESCAPE && window.__escapeHandlers && window.__escapeHandlers.length > 0) {
        // Get the highest priority active handler
        const topHandler = window.__escapeHandlers[0];

        // Execute the highest priority handler
        topHandler.callback();

        // Prevent other handlers from firing
        e.stopPropagation();
      }
    };

    // Only add the global handler if it's not already added
    if (!window.__escapeHandlerRegistered) {
      window.addEventListener("keydown", handleEscapeGlobal);
      window.__escapeHandlerRegistered = true;
    }

    // Cleanup function
    return () => {
      // Remove this handler from the registry
      if (window.__escapeHandlers) {
        window.__escapeHandlers = window.__escapeHandlers.filter((h) => h.id !== handlerId);

        // If no handlers left, remove the global event listener
        if (window.__escapeHandlers.length === 0) {
          window.removeEventListener("keydown", handleEscapeGlobal);
          window.__escapeHandlerRegistered = false;
        }
      }
    };
  }, [isActive, priority]);
}
