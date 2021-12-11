import React, { useCallback } from "react";
import {
  Military,
  Coin,
  Wonders,
  Civilian,
  Commerce,
  Guild,
  Science,
} from "./icons";

interface IProps {
  pointType: string;
}

export const PointTypeSvg: React.FunctionComponent<IProps> = (props) => {
  const getComponent = () => {
    switch (props.pointType) {
      case "military-points":
        return <Military />;

      case "treasury-points":
        return <Coin />;

      case "wonders-points":
        return <Wonders />;

      case "civilian-points":
        return <Civilian />;

      case "commerce-points":
        return <Commerce />;

      case "guilds-points":
        return <Guild />;

      case "science-points":
        return <Science />;
    }
  };
  
  return <>{getComponent()}</>;
};
