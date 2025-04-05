// import sound effects
import buttonClickSound from "@sounds/button-click.ogg";

// import constants
import { STATE_DISABLED } from "@constants";

// import hooks
import { useSoundEffect } from "@hooks/useSoundEffect";
import { useDelayedClick } from "@hooks/useDelayedClick";

/**
 * A custom hook that enhances click interactions by adding a sound effect and optional delay.
 *
 * @param {Function} onClick - The callback function to be executed on a click event.
 * @param {number} [delayMs=75] - The delay in milliseconds before the `onClick` is triggered.
 * @param {string} state - The current state of the element (e.g., `STATE_DISABLED`).
 * @returns {Object} An object containing handlers for `handleMouseDown` and `handleClick`:
 *   - `handleMouseDown`: Plays a click sound when the element is not disabled.
 *   - `handleClick`: Handles the delayed execution of the `onClick` function.
 */
export function useClickWithSound(onClick, delayMs = 75, state) {
  const { playSound } = useSoundEffect(buttonClickSound);
  const handleDelayedClick = useDelayedClick(onClick, delayMs, state);

  // Plays a button click sound effect if the element is not in a disabled state.
  const handleMouseDown = () => {
    if (state === STATE_DISABLED) return;
    playSound();
  };

  return {
    handleMouseDown,
    handleClick: handleDelayedClick,
  };
}
