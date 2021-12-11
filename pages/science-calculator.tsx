import Slider from "@mui/material/Slider";
import * as React from "react";
import styled from "styled-components";
import { DetailWrapper } from "../components/detail/DetailWrapper";
import { Cog, Mason, Tally } from "../components/icons";

export interface IProps {
  icon: string;
  iconAlt: string;
  onChange: (newValue: any) => void;
  value: any;
}

export const ScienceCalculator: React.FC = () => {
  const [gearCardCount, setGearCardCount] = React.useState(0);
  const [architectureCardCount, setArchitectureCardCount] = React.useState(0);
  const [tabletCardCount, setTabletCardCount] = React.useState(0);

  const getIdenticalScore = () => {
    const gearScore = gearCardCount * gearCardCount;
    const archScore = architectureCardCount * architectureCardCount;
    const langScore = tabletCardCount * tabletCardCount;

    return gearScore + archScore + langScore;
  };

  const getScienceSetsScore = () =>
    Math.min(gearCardCount, architectureCardCount, tabletCardCount) * 7;

  return (
    <DetailWrapper>
      <h1 className="text-md">Science</h1>
      <ScienceSliderWrapper>
        <Icon>
          <Cog />
        </Icon>
        <SliderWrapper>
          <Slider
            data-test-id="gear-slider"

            aria-label="gear point slider"
            value={gearCardCount}
            step={1}
            min={0}
            max={8}
            onChange={(_, value) => {
              setGearCardCount(value as number);
            }}
          />
        </SliderWrapper>
        <div
          style={{
            width: "20%",
            textAlign: "center",
          }}
        >
          <p className="text-l">{gearCardCount}</p>
          <p style={{ margin: "0" }}>cards</p>
        </div>
      </ScienceSliderWrapper>
      <ScienceSliderWrapper>
        <Icon>
          <Mason />
        </Icon>
        <SliderWrapper>
          <Slider
            data-test-id="masonry-slider"
            aria-label="masonry point slider"
            value={architectureCardCount}
            step={1}
            min={0}
            max={8}
            onChange={(_, value) => {
              setArchitectureCardCount(value as number);
            }}
          />
        </SliderWrapper>
        <div
          style={{
            width: "20%",
            textAlign: "center",
          }}
        >
          <p className="text-l">{architectureCardCount}</p>
          <p style={{ margin: "0" }}>cards</p>
        </div>
      </ScienceSliderWrapper>
      <ScienceSliderWrapper>
        <Icon>
          <Tally />
        </Icon>
        <SliderWrapper>
          <Slider
            data-test-id="language-slider"
            aria-label="language point slider"
            value={tabletCardCount}
            step={1}
            min={0}
            max={8}
            onChange={(_, value) => {
              setTabletCardCount(value as number);
            }}
          />
        </SliderWrapper>
        <div
          style={{
            width: "20%",
            textAlign: "center",
          }}
        >
          <p className="text-l">{tabletCardCount}</p>
          <p style={{ margin: "0" }}>cards</p>
        </div>
      </ScienceSliderWrapper>
      <hr />

      <p data-test-id="science-total" className="text-xl">
        {getIdenticalScore() + getScienceSetsScore()}
      </p>
    </DetailWrapper>
  );
};

const ScienceSliderWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;

  img {
    width: 12%;
  }
`;
const SliderWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 70%;
  padding-left: 7%;
  padding-right: 3%;
`;

const Icon = styled.div`
  width: 50px;
  height: 50px;

  display: flex;
  justify-content: center;
  align-items: center;
`;

export default ScienceCalculator;
