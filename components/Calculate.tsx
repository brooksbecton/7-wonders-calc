import { getAuth } from "firebase/auth";
import * as React from "react";
import { useCallback } from "react";
import { useDispatch } from "react-redux";
import {
  DEFAULT_TABLE_KEY,
  IPointType,
  ITableScore,
  updateScore,
} from "../models/ScoreSlice";
import { getPointTypeColor } from "../utils/getPointTypeColor";
import { CalculateInput } from "./CalculateInput";
import { PointTypeSvg } from "./PointTypeSvg";

interface IProps {
  tableId?: string;
  score: ITableScore;
}

export const Calculate: React.FunctionComponent<IProps> = (props) => {
  const { score, tableId = DEFAULT_TABLE_KEY } = props;
  const userId = getAuth().currentUser?.uid;
  const dispatch = useDispatch();

  const handleScoreChange = useCallback(
    ({ value, key }: { value: number; key: IPointType }) => {
      dispatch(
        updateScore({
          key,
          tableId,
          userId,
          value,
        })
      );
    },
    []
  );

  return (
    <div data-asd="asdf">
      {Object.entries(score)
        .sort(([pointType1], [pointType2]) =>
          pointType1.localeCompare(pointType2)
        )
        .map(([key, { value }]) => (
          <CalculateInput
            color={getPointTypeColor(key as IPointType)}
            key={key}
            label={key}
            Svg={() => <PointTypeSvg pointType={key} />}
            onChange={(newValue) =>
              handleScoreChange({ value: newValue, key: key as IPointType })
            }
            value={value}
          />
        ))}
    </div>
  );
};
