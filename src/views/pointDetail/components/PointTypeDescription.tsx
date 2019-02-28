import * as React from "react";
import { Civilian } from "./Civilian";
import { Commercial } from "./Commericial";
import { Guild } from "./Guild";
import { Military } from "./Military";
import { Science } from "./Science";
import { Treasury } from "./Treasury";
import { Wonders } from "./Wonders";

export interface IPointTypeDescriptionProps {
  pointType: string;
}

export const PointTypeDescription: React.FunctionComponent<
  IPointTypeDescriptionProps
> = props => {
  switch (props.pointType) {
    case "civilian":
      return <Civilian />;
    case "commercial":
      return <Commercial />;
    case "guilds":
      return <Guild />;
    case "military":
      return <Military />;
    case "science":
      return <Science />;
    case "treasury":
      return <Treasury />;
    case "wonders":
      return <Wonders />;
    default:
      return <p>Nones</p>;
  }
};
