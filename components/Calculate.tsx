import * as React from "react";
import { useCallback } from "react";
import { CalculateInput } from "./CalculateInput";
import { PointTypeSvg } from "./PointTypeSvg";
import { PointsContext } from "../models/PointsReducer/PointsContext";
import { IPointType } from "../models/PointsReducer/types";
import {
  Civilian,
  Military,
  Coin,
  Wonders,
  Commerce,
  Guild,
  Science,
} from "./icons";

export const Calculate: React.FunctionComponent = () => {
  const { pointTypes, setPoints } = React.useContext(PointsContext);

  return (
    <div>
      {pointTypes.map(({ color, key, svg, value }) => (
        <CalculateInput
          color={color}
          key={key}
          label={key}
          Svg={() =><PointTypeSvg pointType={key} />}
          onChange={(newValue) =>
            setPoints({
              key: key,
              svg: svg,
              color: color,
              value: newValue,
            })
          }
          value={value}
        />
      ))}
    </div>
  );
};
