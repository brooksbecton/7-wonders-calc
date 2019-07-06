import { RouteComponentProps } from "@reach/router";
import * as React from "react";

import { usePoints } from "./../../../hooks/usePoints";
import { CalculateInput } from "./CalculateInput";
import { TotalPoints } from "./TotalPoints";

export const Calculate: React.FunctionComponent<RouteComponentProps> = () => {
  const [pointTypes, setPoint] = usePoints();
  return (
    <>
      <>
        {pointTypes.map(({ key, value, svg }) => {
          return (
            <CalculateInput
              key={key}
              label={key}
              svg={svg}
              onChange={newValue => setPoint({ key, svg, value: newValue })}
              value={value}
            />
          );
        })}
      </>
      <TotalPoints pointTypes={pointTypes} />
    </>
  );
};
