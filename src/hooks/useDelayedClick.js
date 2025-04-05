import { useRef, useCallback } from "react";
import { STATE_DISABLED } from "@constants";

/**
 * A custom React hook that creates a delayed click handler.
 * The provided `onClick` function will be executed after the specified `delay`
 * unless the designated disabled state is active.
 *
 * @param {Function} onClick - The callback function to execute after the delay.
 * @param {number} [delay=75] - The delay in milliseconds before executing the onClick callback.
 * @param {any} [disabledState=null] - The state that, when matched, disables the click handler.
 * @returns {Function} - A new click handler function that incorporates the delay logic.
 */
export function useDelayedClick(onClick, delay = 75, disabledState = null) {
  const timeoutRef = useRef(null);

  return useCallback(
    (e) => {
      // If a disabled state is provided and matches the current state, return early
      if (disabledState === STATE_DISABLED) return;

      // Clear any existing timeout
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      // Execute the onClick callback after delay if provided
      timeoutRef.current = setTimeout(() => onClick && onClick(e), delay);
    },
    [onClick, delay, disabledState],
  );
}
