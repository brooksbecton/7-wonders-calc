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
      {/* <div>
        Icons made by{" "}
        <a href="https://www.freepik.com/" title="Freepik">
          Freepik
        </a>{" "}
        from{" "}
        <a href="https://www.flaticon.com/" title="Flaticon">
          www.flaticon.com
        </a>{" "}
        is licensed by{" "}
        <a
          href="http://creativecommons.org/licenses/by/3.0/"
          title="Creative Commons BY 3.0"
          target="_blank"
        >
          CC 3.0 BY
        </a>
      </div> */}
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
