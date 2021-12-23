import { configureStore } from "@reduxjs/toolkit";
import { scoreSlice } from "./ScoreSlice";

const store = configureStore({
  reducer: {
    score: scoreSlice.reducer,
  },
});
export type IRootState = ReturnType<typeof store.getState>;

export default store;
