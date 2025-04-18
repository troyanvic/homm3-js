import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isShowingHomeScreen: false,
  isShowingMainMenu: false,
  isShowingCredits: false,
};

const homeScreenSlice = createSlice({
  name: "homeScreen",
  initialState,
  reducers: {
    showHomeScreen: (state, action) => {
      state.isShowingHomeScreen = action.payload;
    },
    showMainMenu: (state, action) => {
      state.isShowingMainMenu = action.payload;
    },
    showCredits: (state, action) => {
      state.isShowingCredits = action.payload;
    },
  },
});

// export actions
export const { showHomeScreen, showMainMenu, showCredits } = homeScreenSlice.actions;

//export selectors
export const selectIsShowingMainMenu = (state) => state.homeScreen.isShowingMainMenu;
export const selectIsShowingHomeScreen = (state) => state.homeScreen.isShowingHomeScreen;
export const selectIsShowingCredits = (state) => state.homeScreen.isShowingCredits;

// export reducer
export default homeScreenSlice.reducer;
