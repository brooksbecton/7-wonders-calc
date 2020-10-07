import { createContext, Dispatch } from 'react';
import { IPointType } from './types';

export const PointsContext = createContext<{
  pointTypes: IPointType[];
  setPoints: any;
  dispatch: Dispatch<{ type: string }>;
}>({
  pointTypes: [],
  setPoints: () => {
    // eslint-disable-next-line no-console
    console.warn('No setState set for PointsProvider Context');
  },
  dispatch: () => {},
});
