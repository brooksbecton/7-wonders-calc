export interface IPointState {
  pointTypes: Array<{
    key: string;
    value: number;
    svg: string;
  }>;
}

export enum IActionTypes {
  UPDATE_POINT
}
