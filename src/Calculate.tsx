import * as React from "react";

import { CalculateInput } from "./CalculateInput";
import { TotalPoints } from "./TotalPoints";
import { IPointState } from "./types";

export const Calculate = ({
  pointTypes,
  updatePoint
}: {
  pointTypes: IPointState["pointTypes"];
  updatePoint: (param: any) => void;
}) => {
  return (
    <>
      {pointTypes.map(({ key, value }) => {
        return (
          <CalculateInput
            key={key}
            label={key}
            onChange={newValue => updatePoint({ key, value: newValue })}
            value={value}
          />
        );
      })}
      <TotalPoints pointTypes={pointTypes} />
    </>
  );
};
