import { findIndex, map, prop, propEq, sum, update } from "ramda";
import { IPointType } from "./types";

export function updatePointType(
  newPointType: IPointType,
  pointTypes: IPointType[]
) {
  return update(
    findIndex(propEq("key", newPointType.key), pointTypes),
    newPointType,
    pointTypes
  );
}

export function getTotalPoints(pointTypes: IPointType[]) {
  return sum(map(x => prop("value", x), pointTypes));
}
