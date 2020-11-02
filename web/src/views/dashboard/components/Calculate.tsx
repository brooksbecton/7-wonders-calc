import * as React from "react";
import posed from "react-pose";
import { PointsContext } from "../../../PointsReducer/PointsContext";
import { CalculateInput } from "./CalculateInput";

export const Calculate: React.FunctionComponent = () => {
  const { pointTypes, setPoints } = React.useContext(PointsContext);
  const ListContainer = posed.div({
    enter: { staggerChildren: 50 },
    exit: { staggerChildren: 20, staggerDirection: -1 },
  });

  const Item = posed.div({
    enter: { y: 0, opacity: 1 },
    exit: { y: 50, opacity: 0 },
  });
  return (
    <ListContainer>
      {pointTypes.map(({ key, value, svg, color }) => (
        <Item>
          <CalculateInput
            color={color}
            key={key}
            label={key}
            svg={svg}
            onChange={(newValue) =>
              setPoints({
                key,
                svg,
                color,
                value: newValue,
              })
            }
            value={value}
          />
        </Item>
      ))}
    </ListContainer>
  );
};
