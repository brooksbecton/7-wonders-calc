import { RouteComponentProps } from "@reach/router";
import * as React from "react";

import { usePoints } from "./../../../hooks/usePoints";
import { useScroll } from "./../../../hooks/useScroll";
import { CalculateInput } from "./CalculateInput";
import { TotalPoints } from "./TotalPoints";

export const Calculate: React.FunctionComponent<RouteComponentProps> = () => {
  const [pointTypes, setPoint] = usePoints();
  const { y } = useScroll();
  console.log(y);
  return (
    <>
      <>
        <div
          style={{
            backgroundColor: "red",
            display: y > 60 ? "block" : "none",
            position: "fixed",
            top: 0
          }}
        >
          Topbar
        </div>
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
