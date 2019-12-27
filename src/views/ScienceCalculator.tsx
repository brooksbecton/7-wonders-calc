import Slider from "@material-ui/core/Slider";
import { RouteComponentProps } from "@reach/router";
import * as React from "react";
import styled from "styled-components";

import { usePoints } from "../hooks/usePoints";
import { DetailWrapper } from "./../components/DetailWrapper";
import cogSvg from "./../icons/cog.svg";
import { mason } from "./../icons/index";
export interface IProps {
  icon: string;
  iconAlt: string;
  setter: (value: any) => void;
  value: any;
}

export const ScienceCalculator: React.FC<RouteComponentProps> = props => {
  const { x: pointTypes } = usePoints();
  const [sciencePoints] = pointTypes.filter(
    pointType => pointType.key === "science-points"
  );

  const [gearPoints, setGearPoints] = React.useState(0);
  const [architecture, setArchitecture] = React.useState(0);
  const SliderRow: React.FC<IProps> = ({ icon, iconAlt, setter, value }) => (
    <ScienceSliderWrapper>
      <img src={icon} alt={iconAlt} />
      <SliderWrapper>
        <Slider
          value={value}
          marks={true}
          step={1}
          min={0}
          max={8}
          onChange={(e, value) =>
            setter(Array.isArray(value) ? value[0] : value)
          }
        />
      </SliderWrapper>
      <div
        style={{
          width: "20%",
          textAlign: "center"
        }}
      >
        <p className="text-xl" style={{ marginBottom: "-10px" }}>
          {value}
        </p>
        <p style={{ margin: "0" }}>cards</p>
      </div>
    </ScienceSliderWrapper>
  );

  return (
    <DetailWrapper>
      <h1 className="text-md">Science</h1>
      <SliderRow
        iconAlt={"Cog Icon"}
        icon={cogSvg}
        setter={setGearPoints}
        value={gearPoints}
      />
      <SliderRow
        iconAlt={"Architect Icon"}
        icon={mason}
        setter={setArchitecture}
        value={architecture}
      />
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
