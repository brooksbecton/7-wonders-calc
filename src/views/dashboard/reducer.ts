import {
  civilian,
  coin,
  commercial,
  guild,
  military,
  science,
  wonders
} from "./../../icons";
import { IActionTypes, IPointType } from "./types";
import { updatePointType } from "./utils";

export const defaultState: IPointType[] = [
  {
    key: "military-points",
    svg: military,
    value: 0
  },
  {
    key: "treasury-points",
    svg: coin,
    value: 0
  },
  {
    key: "wonders-points",
    svg: wonders,
    value: 0
  },
  {
    key: "civilian-points",
    svg: civilian,
    value: 0
  },
  {
    key: "commercial-points",
    svg: commercial,
    value: 0
  },
  {
    key: "guilds-points",
    svg: guild,
    value: 0
  },
  {
    key: "science-points",
    svg: science,
    value: 0
  }
];

export const reducer = (state: typeof defaultState, action: any) => {
  const type: IActionTypes = action.type;
  switch (type) {
    case "UPDATE_POINT":
      const { type: x, ...pointType } = action;
      const newValue: number = pointType.value;

      return Number.isNaN(newValue) ? state : updatePointType(pointType, state);
    default:
      return state;
  }
};
