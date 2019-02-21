import * as React from "react";
import { IPointType } from "../types";
import { getTotalPoints } from "../utils";

export interface ITotalPointsProps {
  pointTypes: IPointType[];
}

export const TotalPoints: React.SFC<ITotalPointsProps> = ({ pointTypes }) => {
  return (
    <>
      <p>Total Points: {getTotalPoints(pointTypes)}</p>
    </>
  );
};

export default TotalPoints;
