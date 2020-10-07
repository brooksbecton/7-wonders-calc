import { RouteComponentProps } from '@reach/router';
import * as React from 'react';
import { PointsContext } from '../../../PointsReducer/PointsContext';
import { CalculateInput } from './CalculateInput';
import { TotalPoints } from './TotalPoints';

export const Calculate: React.FunctionComponent<RouteComponentProps> = () => {
  const { pointTypes, setPoints } = React.useContext(PointsContext);
  return (
    <>
      <>
        {pointTypes.map(({
          key, value, svg, color,
        }) => (
          <CalculateInput
            color={color}
            key={key}
            label={key}
            svg={svg}
            onChange={(newValue) => setPoints({
              key,
              svg,
              color,
              value: newValue,
            })}
            value={value}
          />
        ))}
      </>
      <TotalPoints pointTypes={pointTypes} />
    </>
  );
};
