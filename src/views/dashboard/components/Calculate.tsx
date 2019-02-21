import { RouteComponentProps } from "@reach/router";
import * as React from "react";
import styled from "styled-components";
import { savePoints, updatePoint } from "./../actions";
import { defaultState, reducer } from "./../reducer";
import { CalculateInput } from "./CalculateInput";
import { SaveButton } from "./SaveButton";
import { TotalPoints } from "./TotalPoints";

export const Calculate: React.FunctionComponent<RouteComponentProps> = () => {
  const [pointTypes, dispatch] = React.useReducer(reducer, defaultState);

  return (
    <>
      <ScoreInputContainer>
        {pointTypes.map(({ key, value, svg }) => {
          return (
            <CalculateInput
              key={key}
              label={key}
              svg={svg}
              onChange={newValue =>
                dispatch(updatePoint({ key, svg, value: newValue }))
              }
              value={value}
            />
          );
        })}
      </ScoreInputContainer>
      <TotalContainer>
        <TotalPoints pointTypes={pointTypes} />
      </TotalContainer>
      <SaveButton onClick={() => dispatch(savePoints(pointTypes))} />
    </>
  );
};

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
