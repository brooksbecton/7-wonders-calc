import { RouteComponentProps } from "@reach/router";
import * as React from "react";
import {
  useJoinTableMutation,
  useCreateTableMutation,
  useDeleteTableMutation,
} from "../../../generated/graphql";
import { PointsContext } from "../../../PointsReducer/PointsContext";
import { CalculateInput } from "./CalculateInput";
import { TotalPoints } from "./TotalPoints";

export const Calculate: React.FunctionComponent<RouteComponentProps> = () => {
  const { pointTypes, setPoints } = React.useContext(PointsContext);
  const [joinTable] = useJoinTableMutation();
  const [createTable] = useCreateTableMutation();
  const [deleteTable] = useDeleteTableMutation();
  const x: Parameters<typeof joinTable>[0] = {};

  return (
    <>
      <button onClick={() => joinTable({ variables: { id: 35 } })}>Join</button>
      <button onClick={() => createTable({ variables: { title: "BeBOPP" } })}>
        Create
      </button>
      <button onClick={() => deleteTable({ variables: { id: 34 } })}>
        Delete
      </button>

      <>
        {pointTypes.map(({ key, value, svg, color }) => (
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
        ))}
      </>
      <TotalPoints pointTypes={pointTypes} />
    </>
  );
};
