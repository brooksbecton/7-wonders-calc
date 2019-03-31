import { compose, findIndex, map, prop, propEq, sum, update } from "ramda";
import { IPointType } from "./types";

export const getPointIndex = (
  array: Array<{ key: string }>,
  searchPointType: string
) => findIndex(propEq("key", searchPointType), array);

export function updatePointType(
  newPointType: IPointType,
  pointTypes: IPointType[]
) {
  return update(
    getPointIndex(pointTypes, newPointType.key),
    newPointType,
    pointTypes
  );
}

export const getPointValues = (a: Array<{ value: number }>): number[] =>
  map(b => prop("value", b), a);

export const getTotalPoints = compose(
  sum,
  getPointValues
);
