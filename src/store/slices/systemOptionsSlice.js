import { createSlice } from "@reduxjs/toolkit";

// import constants
import { LANGUAGE_EN } from "@constants";

const initialState = {
  language: LANGUAGE_EN,
  heroSpeed: 2, // 1, 2, 3, 4
  enemySpeed: 2, // 1, 2, 3, 4
  mapScrollSpeed: 2, // 1, 2, 3
  musicVolume: 0, // 0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9
  effectsVolume: 0, // 0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9
  showMovePath: true,
  showHeroReminder: true,
  quickCombat: false,
  townBuildingsOutline: true,
  showObjectMessages: false,
};

export const systemOptionsSlice = createSlice({
  name: "systemOptions",
  initialState,
  reducers: {
    setMusicVolume: (state, action) => {
      state.musicVolume = action.payload;
    },
    setEffectsVolume: (state, action) => {
      state.effectsVolume = action.payload;
    },
  },
});

// export actions
export const { setMusicVolume, setEffectsVolume } = systemOptionsSlice.actions;

// export reducer
export default systemOptionsSlice.reducer;
