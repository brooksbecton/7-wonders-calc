import { useEffect, useReducer } from 'react';
import * as store from 'store';
import { updatePoint } from './actions';
import { defaultState, reducer } from './reducer';

export function usePoints() {
  const pointData = store.get('points', defaultState);
  const [pointTypes, dispatch] = useReducer(reducer, pointData);
  const setPoint = ({
    key,
    svg,
    value,
  }: {
    key: string;
    svg: string;
    value: number;
  }) => dispatch(updatePoint({ key, svg, value }));

  useEffect(() => {
    store.set('points', pointTypes);
  });

  return { x: pointTypes, y: setPoint };
}
