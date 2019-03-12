import { RouteComponentProps } from "@reach/router";
import * as React from "react";
import * as store from "store";
import { updatePoint } from "./../actions";
import { defaultState, reducer } from "./../reducer";
import { CalculateInput } from "./CalculateInput";
// import { SaveButton } from "./SaveButton";
import { TotalPoints } from "./TotalPoints";

export const Calculate: React.FunctionComponent<RouteComponentProps> = () => {
  const pointData = store.get("7WondersCalc/Points", defaultState);
  const [pointTypes, dispatch] = React.useReducer(reducer, pointData);
  
  return (
    <>
      <>
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
      </>
      <TotalPoints pointTypes={pointTypes} />
      {/* <SaveButton onClick={() => dispatch(savePoints(pointTypes))} /> */}
    </>
  );
};
