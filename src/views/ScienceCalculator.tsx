import Slider from '@material-ui/core/Slider';
import { RouteComponentProps } from '@reach/router';
import * as React from 'react';
import styled from 'styled-components';

import { DetailWrapper } from '../components/DetailWrapper';
import cogSvg from '../icons/cog.svg';
import { mason, tally } from '../icons/index';

export interface IProps {
  icon: string;
  iconAlt: string;
  onChange: (newValue: any) => void;
  value: any;
}

export const ScienceCalculator: React.FC<RouteComponentProps> = () => {
  const [gearCardCount, setGearCardCount] = React.useState(0);
  const [architectureCardCount, setArchitectureCardCount] = React.useState(0);
  const [tabletCardCount, setTabletCardCount] = React.useState(0);

  const getIdenticalScore = () => {
    const gearScore = gearCardCount * gearCardCount;
    const archScore = architectureCardCount * architectureCardCount;
    const langScore = tabletCardCount * tabletCardCount;

    return gearScore + archScore + langScore;
  };

  const getScienceSetsScore = () => Math.min(
    gearCardCount, architectureCardCount, tabletCardCount,
  ) * 7;

  return (
    <DetailWrapper>
      <h1 className="text-md">Science</h1>
      <hr />
      <ScienceSliderWrapper>
        <img src={cogSvg} alt="Gear Icon" />
        <SliderWrapper>
          <Slider
            value={gearCardCount}
            step={1}
            min={0}
            max={8}
            onChange={(event, value) => {
              setGearCardCount(value as number);
            }}
          />
        </SliderWrapper>
        <div
          style={{
            width: '20%',
            textAlign: 'center',
          }}
        >
          <p className="text-xl" style={{ marginBottom: '-10px' }}>
            {gearCardCount}
          </p>
          <p style={{ margin: '0' }}>cards</p>
        </div>
      </ScienceSliderWrapper>
      <ScienceSliderWrapper>
        <img src={mason} alt="Freemason Icon" />
        <SliderWrapper>
          <Slider
            value={architectureCardCount}
            step={1}
            min={0}
            max={8}
            onChange={(event, value) => {
              setArchitectureCardCount(value as number);
            }}
          />
        </SliderWrapper>
        <div
          style={{
            width: '20%',
            textAlign: 'center',
          }}
        >
          <p className="text-xl" style={{ marginBottom: '-10px' }}>
            {architectureCardCount}
          </p>
          <p style={{ margin: '0' }}>cards</p>
        </div>
      </ScienceSliderWrapper>
      <ScienceSliderWrapper>
        <img src={tally} alt="5 Tally Marks" />
        <SliderWrapper>
          <Slider
            value={tabletCardCount}
            step={1}
            min={0}
            max={8}
            onChange={(event, value) => {
              setTabletCardCount(value as number);
            }}
          />
        </SliderWrapper>
        <div
          style={{
            width: '20%',
            textAlign: 'center',
          }}
        >
          <p className="text-xl" style={{ marginBottom: '-10px' }}>
            {tabletCardCount}
          </p>
          <p style={{ margin: '0' }}>cards</p>
        </div>
      </ScienceSliderWrapper>
      <hr />

      <p className="text-xl">{getIdenticalScore() + getScienceSetsScore()}</p>
    </DetailWrapper>
  );
};

const ScienceSliderWrapper = styled.div`
  display: flex;
  flex-direction: row;
  img {
    width: 12%;
  }
`;
const SliderWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 70%;
  padding-left: 7%;
  padding-right: 3%;
`;
