import { configureStore } from "@reduxjs/toolkit";
import savedConfigsReducer from "./saved-configs/SavedConfigSlice";

export const store = configureStore({
  reducer: {
    savedConfigs: savedConfigsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
