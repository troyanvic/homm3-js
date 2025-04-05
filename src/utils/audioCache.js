const audioCache = new Map();

/**
 * Gets or creates an Audio object for the given sound file
 * @param {string} soundFile - Path to the sound file
 * @returns {Audio} The Audio object for the sound file
 */
export function getAudio(soundFile) {
  if (!audioCache.has(soundFile)) {
    audioCache.set(soundFile, new Audio(soundFile));
  }

  return audioCache.get(soundFile);
}
