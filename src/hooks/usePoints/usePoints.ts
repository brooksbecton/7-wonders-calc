import { useEffect, useReducer } from 'react';
import * as store from 'store';
import { updatePoint } from './actions';
import { defaultState, reducer } from './reducer';
import { IPointType } from './types';

export function usePoints() {
  const pointData = store.get('points', defaultState);
  const [pointTypes, dispatch] = useReducer(reducer, pointData);
  const setPoint = (newPointType: IPointType) => dispatch(updatePoint(newPointType));

  useEffect(() => {
    store.set('points', pointTypes);
  });

  return { x: pointTypes, y: setPoint };
}
