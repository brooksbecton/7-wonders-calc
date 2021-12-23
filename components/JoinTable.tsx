import { get } from "lodash";
import { FunctionComponent, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { usePrevious } from "../hooks/usePrevious";
import {
  createScore,
  ITableScore,
  putScore,
  resetScore,
} from "../models/ScoreSlice";
import { IRootState } from "../models/store";
import {
  IUserScores,
  joinTable,
  updateScore,
  watchTableData,
} from "../services/table";
import BottomBar from "./BottomBar";
import { Calculate } from "./Calculate";

interface IProps {
  userId: string;
  tableId: string;
}

export const JoinTable: FunctionComponent<IProps> = (props) => {
  const { userId: currentUserId, tableId } = props;
  const [isLoading, setIsLoading] = useState(true);
  const [tableData, setTableData] = useState<IUserScores>({});
  const dispatch = useDispatch();

  const score: ITableScore = useSelector((state: IRootState) =>
    get(state, `score.${tableId}.${currentUserId}`)
  );

  const total = Object.values(score || {}).reduce(
    (total, scoreType) => total + scoreType.value,
    0
  );
  const prevTotal = usePrevious(total);

  const handleReset = () => {
    dispatch(
      resetScore({
        tableId,
        userId: currentUserId,
      })
    );
  };

  useEffect(() => {
    if (prevTotal !== total) {
      if (currentUserId && tableId) {
        updateScore({
          tableId,
          userId: currentUserId,
          score,
        });
      }
    }
  }, [total, tableId, currentUserId]);

  useEffect(() => {
    if (tableId && currentUserId) {
      joinTable({
        tableId,
        userId: currentUserId,
      }).then(() => {
        dispatch(
          createScore({
            userId: currentUserId,
            tableId,
          })
        );

        return watchTableData({ tableId }, (data) => {
          setTableData(data);
          dispatch(putScore({
            tableId,
            userId: currentUserId,
            newScore: data[currentUserId].score,
          }));
          setIsLoading(false);
        });
      });
    }
  }, [tableId, currentUserId]);

  if (isLoading && !score) {
    return <p>Loading</p>;
  }

  return currentUserId ? (
    <div style={{ width: "100%" }}>
      <Calculate score={score} tableId={tableId} />
      {score &&
        Object.entries(tableData).map(([userId, values]) => {
          return (
            <div key={userId}>
              <Nickname>{userId === currentUserId ? "You" : userId}</Nickname>
              <ul>
                {values.score &&
                  Object.entries(values.score).map(([scoreType, score]) => {
                    return (
                      <li key={scoreType}>
                        {scoreType} - {score.value}
                      </li>
                    );
                  })}
              </ul>
            </div>
          );
        })}
      {tableData && currentUserId && score && (
        <BottomBar score={score} tableId={tableId} handleReset={handleReset} />
      )}
    </div>
  ) : (
    <p>Loading</p>
  );
};

const Nickname = styled.h3`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 380px;
`;
