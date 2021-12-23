import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { set } from "lodash";
export const DEFAULT_TABLE_KEY: "default" = "default";
export const DEFAULT_USER_KEY: "abc" = "abc";

export type IPointType =
  | "military"
  | "treasury"
  | "wonders"
  | "civilian"
  | "commerce"
  | "guilds"
  | "science";

interface IState {
  [tableId: string]: {
    [uid: string]: ITableScore;
  };
}

export type ITableScore = Record<
  IPointType,
  {
    value: number;
  }
>;

export const defaultState: IState = {
  [DEFAULT_TABLE_KEY]: {
    [DEFAULT_USER_KEY]: {
      military: {value: 0,},
      treasury: {value: 0,},
      wonders: {value: 0,},
      civilian: {value: 0,},
      commerce: {value: 0,},
      guilds: {value: 0,},
      science: {value: 0,},
    },
  },
};

export const scoreSlice = createSlice({
  name: "score",
  initialState: defaultState,
  reducers: {
    createScore: (
      state,
      action: PayloadAction<{ tableId: string; userId: string }>
    ) => {
      const { tableId, userId } = action.payload;

      set(
        state,
        `${tableId}.${userId}`,
        defaultState[DEFAULT_TABLE_KEY][DEFAULT_USER_KEY]
      );
    },
    updateScore: (
      state,
      action: PayloadAction<{
        key: IPointType;
        tableId: string;
        userId?: string;
        value: number;
      }>
    ) => {
      const {
        key,
        tableId = DEFAULT_TABLE_KEY,
        userId = DEFAULT_USER_KEY,
        value,
      } = action.payload;

      const newState = set(
        state,
        `${tableId}.${userId}.${key}.value`,
        Number.isNaN(value) ? 0 : value
      );
      return newState;
    },
    putScore: (
      state,
      action: PayloadAction<{
        tableId: string;
        userId?: string;
        newScore: ITableScore;
      }>
    ) => {
      const {
        tableId = DEFAULT_TABLE_KEY,
        userId = DEFAULT_USER_KEY,
        newScore,
      } = action.payload;

      state[tableId][userId] = newScore;
    },
    resetScore: (
      state,
      action: PayloadAction<{ tableId: string; userId?: string }>
    ) => {
      const { tableId = DEFAULT_TABLE_KEY, userId = DEFAULT_USER_KEY } =
        action.payload;
      state[tableId][userId] =
        defaultState[DEFAULT_TABLE_KEY][DEFAULT_USER_KEY];
    },
  },
});

export const { createScore, putScore, resetScore, updateScore } =
  scoreSlice.actions;
