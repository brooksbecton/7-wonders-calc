import * as React from "react";
import styled from "styled-components";
import { PointsContext } from "../../../PointsReducer/PointsContext";
import { getTotalPoints } from "../../../PointsReducer/utils";
import { menu } from "../../../icons";

interface IProps {
  handleMenuPress: () => void;
}

export const BottomBar: React.FC<IProps> = ({ handleMenuPress }) => {
  const { pointTypes } = React.useContext(PointsContext);

  return (
    <Container>
      <TotalPoints
        style={{ flexGrow: 1 }}
        className="text-md"
        aria-live="polite"
      >
        Total Points:{" "}
        <span data-test-id="totalPoints">{getTotalPoints(pointTypes)}</span>
      </TotalPoints>
      <button
        aria-label="Toggle Menu"
        style={{
          backgroundColor: "transparent",
          border: 0,
          margin: 0,
          padding: 10,
          cursor: "pointer",
        }}
        onClick={handleMenuPress}
      >
        <img src={menu} alt="menu icon" />
      </button>
    </Container>
  );
};

const TotalPoints = styled.h3`
  flex-grow: 1;
  display: flex;
  flex-direction: row;
  align-items: center;

  span{
    margin-left: 5px
  }
`;

const Container = styled.div`
  background-color: var(--pyramid-yellow);
  display: flex;
  flex-direction: row;
  justify-content: center;

  padding-left: 15px;
  padding-right: 15px;
  position: sticky;
  bottom: 0;
  padding-bottom: 15px;
  padding-top: 15px;

  p {
    margin: 0px;
  }
`;
export default BottomBar;
