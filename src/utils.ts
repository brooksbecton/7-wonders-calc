import { findIndex, map, prop, propEq, sum, update } from "ramda";
import { IPointState } from "./types";

export function updatePointType(
  key: string,
  value: number,
  pointTypes: IPointState["pointTypes"]
) {
  return update(
    findIndex(propEq("key", key), pointTypes),
    { key, value },
    pointTypes
  );
}

export function getTotalPoints(pointTypes: IPointState["pointTypes"]) {
  return sum(map(x => prop("value", x), pointTypes));
}
