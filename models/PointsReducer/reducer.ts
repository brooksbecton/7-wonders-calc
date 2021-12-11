import { IPointType } from "./types";
import { updatePointType } from "./utils";

export const defaultState: IPointType[] = [
  {
    key: "military-points",
    svg: "/icons/military.svg",
    value: 0,
    color: "#EF8583",
  },
  {
    key: "treasury-points",
    svg: "/icons/coin.svg",
    value: 0,
    color: "#FFF",
  },
  {
    key: "wonders-points",
    svg: "/icons/wonders.svg",
    value: 0,
    color: "#FFF",
  },
  {
    key: "civilian-points",
    svg: "/icons/civilian.svg",
    value: 0,
    color: "#4396DD",
  },
  {
    key: "commerce-points",
    svg: "/icons/commerce.svg",
    value: 0,
    color: "#F6C044",
  },
  {
    key: "guilds-points",
    svg: "/icons/guild.svg",
    value: 0,
    color: "#9B7EC2",
  },
  {
    key: "science-points",
    svg: "/icons/science.svg",
    value: 0,
    color: "#4FAD7C",
  },
];

export const reducer = (state: typeof defaultState, action: any) => {
  const { type } = action;
  switch (type) {
    case "UPDATE_POINT": {
      const { type: x, ...pointType } = action;
      const newValue: number = pointType.value;
      const newState = Number.isNaN(newValue)
        ? state
        : updatePointType(pointType, state);

      return newState;
    }
    case "RESET": {
      return defaultState;
    }
    default:
      return state;
  }
};
