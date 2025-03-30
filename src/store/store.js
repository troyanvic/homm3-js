import { configureStore } from "@reduxjs/toolkit";

// import reducers
import systemOptionsReducer from "@slices/systemOptionsSlice";
import menuLayoutReducer from "@slices/menuLayoutSlice.js";

export default configureStore({
  reducer: {
    systemOptions: systemOptionsReducer,
    menuLayout: menuLayoutReducer,
  },
});
