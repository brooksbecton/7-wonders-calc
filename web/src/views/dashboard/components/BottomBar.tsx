import * as React from "react";
import styled from "styled-components";
import { PointsContext } from "../../../PointsReducer/PointsContext";
import { getTotalPoints } from "../../../PointsReducer/utils";
import { menu } from "../../../icons";
import { AnimatePresence, motion } from "framer-motion";
import { usePrevious } from "../../../hooks/usePrevious";

interface IProps {
  handleMenuPress: () => void;
}

export const BottomBar: React.FC<IProps> = ({ handleMenuPress }) => {
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
        <AnimatePresence>
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
        </AnimatePresence>
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

  span {
    margin-left: 5px;
  }
`;

const Container = styled.div`
  background-color: var(--pyramid-yellow);
  display: flex;
  flex-direction: row;
  justify-content: center;
  padding: 15px;
  position: fixed;
  bottom: 0;
  width: calc(100vw - 30px);
  p {
    margin: 0px;
  }
`;
export default BottomBar;
