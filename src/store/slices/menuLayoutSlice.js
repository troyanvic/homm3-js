import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isShowingMainMenu: false,
};

const menuLayoutSlice = createSlice({
  name: "menuLayout",
  initialState,
  reducers: {
    showMainMenu: (state, action) => {
      state.isShowingMainMenu = action.payload;
    },
  },
});

// export actions
export const { showMainMenu } = menuLayoutSlice.actions;

//export selectors
export const selectIsShowingMainMenu = (state) => state.menuLayout.isShowingMainMenu;

// export reducer
export default menuLayoutSlice.reducer;
