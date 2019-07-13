import { RouteComponentProps } from "@reach/router";
import * as React from "react";

import { usePoints } from "./../../../hooks/usePoints";
import { CalculateInput } from "./CalculateInput";
import { TotalPoints } from "./TotalPoints";

export const Calculate: React.FunctionComponent<RouteComponentProps> = () => {
  // Array type is being weird
  // const [pointTypes, setPoints] = usePoints();
  const { x, y } = usePoints();
  return (
    <>
      <>
        {x.map(({ key, value, svg }) => {
          return (
            <CalculateInput
              key={key}
              label={key}
              svg={svg}
              onChange={newValue => y({ key, svg, value: newValue })}
              value={value}
            />
          );
        })}
      </>
      <TotalPoints pointTypes={x} />
    </>
  );
};
