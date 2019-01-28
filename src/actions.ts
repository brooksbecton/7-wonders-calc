import { IActionTypes } from "./types";

export const updatePoint = ({
  key,
  value
}: {
  key: string;
  value: number;
}): { key: string, type: IActionTypes; value: number } => ({
  key,
  type: IActionTypes.UPDATE_POINT,
  value,
});
