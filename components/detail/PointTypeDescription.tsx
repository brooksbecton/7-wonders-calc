import * as React from 'react';
import { Civilian } from './Civilian';
import { Commerce } from './Commericial';
import { Guild } from './Guild';
import { Military } from './Military';
import { Science } from './Science';
import { Treasury } from './Treasury';
import { Wonders } from './Wonders';

export interface IPointTypeDescriptionProps {
  pointType: string;
}
function getPointDetail(pointType: string) {
  switch (pointType) {
    case 'civilian':
      return <Civilian />;
    case 'commerce':
      return <Commerce />;
    case 'guilds':
      return <Guild />;
    case 'military':
      return <Military />;
    case 'science':
      return <Science />;
    case 'treasury':
      return <Treasury />;
    case 'wonders':
      return <Wonders />;
    default:
      return <p>Nones</p>;
  }
}
export const PointTypeDescription: React.FunctionComponent<IPointTypeDescriptionProps> = ({
  pointType,
}: IPointTypeDescriptionProps) => (
  <div data-test-id={`${pointType}-detail`}>{getPointDetail(pointType)}</div>
);
