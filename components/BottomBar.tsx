import Popover from "@mui/material/Popover";
import { getAuth, signInAnonymously } from "firebase/auth";
import firebase from "firebase/compat/app";
import { motion } from "framer-motion";
import { useRouter } from "next/router";
import * as React from "react";
import { MouseEventHandler, useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { usePrevious } from "../hooks/usePrevious";
import {
  DEFAULT_TABLE_KEY,
  ITableScore,
  resetScore,
} from "../models/ScoreSlice";
import { createTable } from "../services/table";
import { Button } from "./Button";

interface IProps {
  score: ITableScore;
  tableId?: string;
  handleReset: () => void;
}

export const BottomBar: React.FunctionComponent<IProps> = (props) => {
  const { handleReset, score, tableId = DEFAULT_TABLE_KEY } = props;

  const [anchorEl, setAnchorEl] = useState<any>();
  const auth = getAuth();
  const dispatch = useDispatch();

  const total = Object.values(score).reduce(
    (total, scoreType) => total + scoreType.value,
    0
  );
  const prevTotal = usePrevious(total);
  const isIncrementing = prevTotal < total;
  const [userId, setUserId] = useState("");
  const [isCreatingTable, setIsCreatingTable] = useState(false);
  const router = useRouter();

  React.useEffect(() => {
    const unregisterAuthObserver = firebase
      .auth()
      .onAuthStateChanged(async (user) => {
        if (!!user) {
          setUserId(user.uid);
        } else {
          // Auth Error
        }
      });
    return () => unregisterAuthObserver();
  }, []);

  React.useEffect(() => {
    if (isCreatingTable && userId) {
      createTable(userId).then((tableId) => {
        if (tableId) {
          router.push(`table/${tableId}`);
        } else {
          // Failed to create table
        }
      });
    } else {
      signInAnonymously(auth);
    }
  }, [isCreatingTable, userId]);

  const handleCreateTable = () => {
    setIsCreatingTable(true);
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
        <div
          style={{
            padding: "15px",
        
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-around",
          }}
        >
          <MenuItem>
            <Button onClick={handleResetPress}>Reset Score</Button>
          </MenuItem>
          <MenuItem>
            <Button onClick={handleCreateTable}>Create Table</Button>
          </MenuItem>
        </div>
      </Popover>
      <Button onClick={handleMenuClick}>• • •</Button>
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
  position: sticky;
  bottom: 0;
  p {
    margin: 0px;
  }
`;

const MenuItem = styled.div`
  padding: 15px 25px;
`;
export default BottomBar;
