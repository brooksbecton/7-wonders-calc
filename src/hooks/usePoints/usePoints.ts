import { useEffect, useReducer } from "react";
import * as store from "store";
import { updatePoint } from "./actions";
import { defaultState, reducer } from "./reducer";
import { IPointType } from "./types";

export function usePoints(): [IPointType[], typeof setPoint] {
  const pointData = store.get("7WondersCalc/Points", defaultState);
  const [pointTypes, dispatch] = useReducer(reducer, pointData);
  const setPoint = ({
    key,
    svg,
    value
  }: {
    key: string;
    svg: string;
    value: number;
  }) => dispatch(updatePoint({ key, svg, value }));


  useEffect(() => {
    store.set("points", pointTypes);
  }, [pointData]);

  return [pointTypes, setPoint];
}
