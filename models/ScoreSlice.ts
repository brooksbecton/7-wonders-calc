import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { set } from "lodash";

export type IPointType =
  | "military"
  | "treasury"
  | "wonders"
  | "civilian"
  | "commerce"
  | "guilds"
  | "science";

type IState = ITableScore;

export type ITableScore = Record<
  IPointType,
  {
    value: number;
  }
>;

export const defaultState: IState = {
  military: { value: 0 },
  treasury: { value: 0 },
  wonders: { value: 0 },
  civilian: { value: 0 },
  commerce: { value: 0 },
  guilds: { value: 0 },
  science: { value: 0 },
};

export const scoreSlice = createSlice({
  name: "score",
  initialState: defaultState,
  reducers: {
    updateScore: (
      state,
      action: PayloadAction<{
        key: IPointType;
        value: number;
      }>
    ) => {
      const { key, value } = action.payload;

      const newState = set(
        state,
        `${key}.value`,
        Number.isNaN(value) ? 0 : value
      );
      return newState;
    },

    resetScore: () => defaultState,
  },
});

export const { resetScore, updateScore } = scoreSlice.actions;
