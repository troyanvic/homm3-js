import { createSelector, createSlice } from "@reduxjs/toolkit";
import { getCurrentLanguage } from "@i18n/languageService.js";

const initialState = {
  language: getCurrentLanguage(),
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

// export selectors
const selectSystemOptions = (state) => state.systemOptions;

export const selectEffectsVolume = createSelector(
  [selectSystemOptions],
  (systemOptions) => systemOptions.effectsVolume,
);
export const selectMusicVolume = createSelector([selectSystemOptions], (systemOptions) => systemOptions.musicVolume);
export const selectLanguage = createSelector([selectSystemOptions], (systemOptions) => systemOptions.language);

// export reducer
export default systemOptionsSlice.reducer;
