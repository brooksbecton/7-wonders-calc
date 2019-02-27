import * as React from "react";
import { Military } from "./Military";
import { Wonders } from "./Wonders";

export interface IPointTypeDescriptionProps {
  pointType: string;
}

export const PointTypeDescription: React.FunctionComponent<
  IPointTypeDescriptionProps
> = props => {
  switch (props.pointType) {
    case "wonders":
      return <Wonders />;
    case "military":
      return <Military />;
    default:
      return <p>Nones</p>;
  }
};
