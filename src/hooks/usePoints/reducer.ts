import {
  civilian,
  coin,
  commerce,
  guild,
  military,
  science,
  wonders,
} from '../../icons';
import { IPointType } from './types';
import { updatePointType } from './utils';

export const defaultState: IPointType[] = [
  {
    key: 'military-points',
    svg: military,
    value: 0,
  },
  {
    key: 'treasury-points',
    svg: coin,
    value: 0,
  },
  {
    key: 'wonders-points',
    svg: wonders,
    value: 0,
  },
  {
    key: 'civilian-points',
    svg: civilian,
    value: 0,
  },
  {
    key: 'commerce-points',
    svg: commerce,
    value: 0,
  },
  {
    key: 'guilds-points',
    svg: guild,
    value: 0,
  },
  {
    key: 'science-points',
    svg: science,
    value: 0,
  },
];

export const reducer = (state: typeof defaultState, action: any) => {
  const { type } = action;
  switch (type) {
    case 'UPDATE_POINT': {
      const { type: x, ...pointType } = action;
      const newValue: number = pointType.value;
      const newState = Number.isNaN(newValue)
        ? state
        : updatePointType(pointType, state);

      return newState;
    }
    default:
      return state;
  }
};
