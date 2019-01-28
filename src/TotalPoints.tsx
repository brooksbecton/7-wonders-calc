import * as React from "react";
import { IPointState } from "./types";
import { getTotalPoints } from "./utils";

export interface ITotalPointsProps {
  pointTypes: IPointState["pointTypes"];
}

export const TotalPoints: React.SFC<ITotalPointsProps> = ({ pointTypes }) => {
  return (
    <>
      <p>Total Points: {getTotalPoints(pointTypes)}</p>
    </>
  );
};

export default TotalPoints;
