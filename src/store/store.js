import { configureStore } from "@reduxjs/toolkit";

// import reducers
import systemOptionsReducer from "@slices/systemOptionsSlice";
import homeScreenReducer from "@slices/homeScreenSlice.js";

export default configureStore({
  reducer: {
    systemOptions: systemOptionsReducer,
    homeScreen: homeScreenReducer,
  },
});
