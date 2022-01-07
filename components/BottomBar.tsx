import Popover from "@mui/material/Popover";
import { motion } from "framer-motion";
import { useRouter } from "next/router";
import React, { MouseEventHandler, useState } from "react";
import styled from "styled-components";
import { useIsOnline } from "../hooks/useIsOnline";
import { usePrevious } from "../hooks/usePrevious";
import { DEFAULT_TABLE_KEY, ITableScore } from "../models/ScoreSlice";
import { createTable } from "../services/table";
import { getUserId } from "../utils/getUserId";
import { Button } from "./Button";

interface IProps {
  score: ITableScore;
  tableId?: string;
  handleReset: () => void;
}

export const BottomBar: React.FunctionComponent<IProps> = (props) => {
  const { handleReset, score, tableId = DEFAULT_TABLE_KEY } = props;
  const isOnline = useIsOnline();
  const [anchorEl, setAnchorEl] = useState<any>();
  const total = Object.values(score).reduce(
    (total, scoreType) => total + scoreType.value,
    0
  );
  const prevTotal = usePrevious(total);
  const isIncrementing = prevTotal < total;
  const router = useRouter();

  const handleCreateTable = async () => {
    const userId = await getUserId();

    await createTable(userId);
    router.push(`table/${tableId}`);
  };

  const handleMenuClick: MouseEventHandler = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleResetPress = () => {
    handleReset();
    handleClose();
  };

  const open = Boolean(anchorEl);

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
      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
      >
        <PopoverContainer>
          <MenuItem>
            <Button data-test-id="reset" onClick={handleResetPress}>Reset Score</Button>
          </MenuItem>
          {isOnline && (
            <MenuItem>
              <Button onClick={handleCreateTable}>Create Table</Button>
            </MenuItem>
          )}
        </PopoverContainer>
      </Popover>
      {/* <Button aria-label="Open Menu" onClick={handleMenuClick}>
        • • •
      </Button> */}
    </Container>
  );
};

const PopoverContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  padding: 15px;
`;

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
  bottom: 0;
  display: flex;
  flex-direction: row;
  justify-content: center;
  padding: 15px 25px;
  position: sticky;

  p {
    margin: 0px;
  }
`;

const MenuItem = styled.div`
  padding: 15px 25px;
`;
export default BottomBar;
