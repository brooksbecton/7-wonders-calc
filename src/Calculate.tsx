import * as React from "react";
import styled from "styled-components";
import { CalculateInput } from "./CalculateInput";
import pyramid from "./icons/pyramid.svg";
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
      <TopBar>
        <img src={pyramid} alt="Yellow Pyramid Icon" />
        <p>7 Wonders</p>
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
  background-color: #d6d6d6;
  display: flex;
  text-align: center;
  width: 100%;

  img {
    padding-right: 10px;
    padding-top: 5px;
    height: 43px;
    width: 43px;
  }

  p {
    font-family: "Trattatello";
    font-size: 34px;
    margin: 0px;
    padding: 0px;
  }
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
