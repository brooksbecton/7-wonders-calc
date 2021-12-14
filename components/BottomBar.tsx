import { motion } from "framer-motion";
import * as React from "react";
import styled from "styled-components";
import { usePrevious } from "../hooks/usePrevious";
import { PointsContext } from "../models/PointsReducer/PointsContext";
import { getTotalPoints } from "../models/PointsReducer/utils";

export const BottomBar: React.FunctionComponent = () => {
  const { pointTypes } = React.useContext(PointsContext);
  const total = getTotalPoints(pointTypes);
  const prevTotal = usePrevious(total);
  const isIncrementing = prevTotal < total;

  return (
    <Container>
      <TotalPoints
        style={{ flexGrow: 1 }}
        className="text-md"
        aria-live="polite"
      >
        Total Points:{" "}
        <motion.span
          key={total}
          initial={{ opacity: 0, y: isIncrementing ? 15 : -15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          style={{ position: "absolute", marginLeft: 150 }}
          data-test-id="totalPoints"
        >
          {total}
        </motion.span>
      </TotalPoints>
    </Container>
  );
};

const TotalPoints = styled.h3`
  flex-grow: 1;
  display: flex;
  flex-direction: row;
  align-items: center;

  span {
    margin-left: 5px;
  }
`;

const Container = styled.div`
  background-color: var(--pyramid-yellow);
  display: flex;
  flex-direction: row;
  justify-content: center;
  padding: 15px 25px;
  position: fixed;
  bottom: 0;
  width: calc(100vw - 50px);
  p {
    margin: 0px;
  }
`;
export default BottomBar;
