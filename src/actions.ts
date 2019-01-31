import { IActionTypes, IPointType } from "./types";

interface IActionType extends IPointType {
  type: IActionTypes;
}
export const updatePoint = (newPointType: IPointType): IActionType => ({
  type: IActionTypes.UPDATE_POINT,
  ...newPointType
});
