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
      case "military":
        return <Military />;

      case "treasury":
        return <Coin />;

      case "wonders":
        return <Wonders />;

      case "civilian":
        return <Civilian />;

      case "commerce":
        return <Commerce />;

      case "guilds":
        return <Guild />;

      case "science":
        return <Science />;
    }
  };
  
  return <>{getComponent()}</>;
};
