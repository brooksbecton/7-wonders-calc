export interface IPointState {
  pointTypes: Array<{
    key: string;
    value: number;
  }>;
}

export enum IActionTypes {
  UPDATE_POINT
}
