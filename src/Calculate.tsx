import * as React from "react";
import styled from "styled-components";
import { CalculateInput } from "./CalculateInput";
import { SaveButton } from "./SaveButton";
import { TotalPoints } from "./TotalPoints";
import { IPointType } from "./types";

export const Calculate = ({
  pointTypes,
  savePoints,
  updatePoint
}: {
  pointTypes: IPointType[];
  savePoints: (points: IPointType[]) => void;
  updatePoint: (point: IPointType) => void;
}) => {
  return (
    <>
      {/* <div>
        Icons made by{" "}
        <a href="https://www.freepik.com/" title="Freepik">
          Freepik
        </a>{" "}
        from{" "}
        <a href="https://www.flaticon.com/" title="Flaticon">
          www.flaticon.com
        </a>{" "}
        is licensed by{" "}
        <a
          href="http://creativecommons.org/licenses/by/3.0/"
          title="Creative Commons BY 3.0"
          target="_blank"
        >
          CC 3.0 BY
        </a>
      </div> */}
      <TopBar>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="126"
          height="48"
          viewBox="0 0 126 62"
        >
          <text
            transform="translate(62 39)"
            fill="#3B3A3A"
            fontSize="34"
            fontFamily="Trattatello"
          >
            <tspan x="-61.778" y="0">
              7 Wonders
            </tspan>
          </text>
        </svg>
      </TopBar>
      <ScoreInputContainer>
        {pointTypes.map(({ key, value, svg }) => {
          return (
            <CalculateInput
              key={key}
              label={key}
              svg={svg}
              onChange={newValue => updatePoint({ key, svg, value: newValue })}
              value={value}
            />
          );
        })}
      </ScoreInputContainer>
      <TotalContainer>
        <TotalPoints pointTypes={pointTypes} />
      </TotalContainer>
      <SaveButton onClick={() => savePoints(pointTypes)} />
    </>
  );
};

const TopBar = styled.div`
  justify-content: center;
  background-color: #eead0e;
  display: flex;
  text-align: center;
  width: 100%;
`;

const ScoreInputContainer = styled.div`
  margin: 10px;
`;

const TotalContainer = styled.div`
  background-color: #eead0e;
  text-align: center;
  position: sticky;
  bottom: 0;
  padding-bottom: 15px;
  padding-top: 15px;

  p {
    font-size: 23px;
    margin: 0px;
  }
`;
