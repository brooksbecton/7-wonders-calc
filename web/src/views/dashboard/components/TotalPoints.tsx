import * as React from "react";
import styled from "styled-components";
import { PointsContext } from "../../../PointsReducer/PointsContext";
import { getTotalPoints } from "../../../PointsReducer/utils";

export const TotalPoints: React.FC = () => {
  const { pointTypes } = React.useContext(PointsContext);

  return (
    <TotalContainer>
      <h3 className="text-md" aria-live="polite">
        Total Points:{" "}
        <span data-test-id="totalPoints">{getTotalPoints(pointTypes)}</span>
      </h3>
    </TotalContainer>
  );
};

const TotalContainer = styled.div`
  background-color: #eead0e;
  text-align: center;
  position: sticky;
  bottom: 0;
  padding-bottom: 15px;
  padding-top: 15px;

  p {
    margin: 0px;
  }
`;
export default TotalPoints;
