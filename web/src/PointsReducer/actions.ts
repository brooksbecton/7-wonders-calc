import { IActionTypes, IPointType } from './types';

interface IUpdatePointAction extends IPointType {
  type: IActionTypes;
}
export const updatePoint = (newPointType: IPointType): IUpdatePointAction => {
  const type: IActionTypes = 'UPDATE_POINT';
  return {
    type,
    ...newPointType,
  };
};

interface ISavePointsAction {
  type: IActionTypes;
  points: IPointType[];
}
export const savePoints = (points: IPointType[]): ISavePointsAction => {
  const type: IActionTypes = 'SAVE_POINTS';
  return {
    points,
    type,
  };
};
