import { IPointType } from "../models/ScoreSlice";

export function getPointTypeColor(pointType: IPointType) {
  switch (pointType) {
    case "military":
      return "#EF8583";
    case "treasury":
      return "#FFF";
    case "wonders":
      return "#FFF";
    case "civilian":
      return "#4396DD";
    case "commerce":
      return "#F6C044";
    case "guilds":
      return "#9B7EC2";
    case "science":
      return "#4FAD7C";
  }
}
