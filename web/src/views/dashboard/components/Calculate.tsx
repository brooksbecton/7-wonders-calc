import * as React from "react";
import { PointsContext } from "../../../PointsReducer/PointsContext";
import { CalculateInput } from "./CalculateInput";

export const Calculate: React.FunctionComponent = () => {
  const { pointTypes, setPoints } = React.useContext(PointsContext);

  return (
    <div>
      {pointTypes.map(({ color, key, svg, value }) => (
        <CalculateInput
          color={color}
          key={key}
          label={key}
          svg={svg}
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
