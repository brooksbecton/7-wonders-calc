import { Modal } from "@material-ui/core";
import { Link } from "react-router-dom";
import * as React from "react";
import { useContext } from "react";
import styled from "styled-components";
import {
  useDeletePlayerMutation,
  useMyPlayerQuery,
  MyPlayerDocument,
  useUpdatePlayerScoreMutation,
} from "../generated/graphql";
import { close } from "../icons";
import pyramid from "../icons/pyramid.svg";
import { PointsContext } from "../PointsReducer/PointsContext";
import { getTotalPoints } from "../PointsReducer/utils";
import { BottomBar } from "../views/dashboard/components/BottomBar";

const TopBar = styled.div`
  align-items: center;
  justify-content: center;
  background-color: var(--backdrop);
  display: flex;
  text-align: center;
  width: 100%;

  img {
    padding: 10px;
    height: 43px;
    width: 43px;
  }

  p {
    margin: 0px;
    padding: 0px;
  }
`;

// eslint-disable-next-line react/prop-types
export const AppWrapper: React.FunctionComponent = ({ children }) => {
  const { pointTypes } = useContext(PointsContext);
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const { data } = useMyPlayerQuery();
  const [deletePlayer] = useDeletePlayerMutation();
  const [updatePlayerScore] = useUpdatePlayerScoreMutation();
  const player = data?.me;
  const totalPoints = getTotalPoints(pointTypes);

  React.useEffect(() => {
    if (player) {
      updatePlayerScore({
        variables: { score: totalPoints },
        refetchQueries: [{ query: MyPlayerDocument }],
      });
    }
  }, [updatePlayerScore, totalPoints, player]);

  const handleMenuItemPress = () => {
    setIsMenuOpen(false);
  };

  const handleLeavePress = () => {
    if (player) {
      deletePlayer({
        variables: { id: Number(player.id) },
        refetchQueries: [{ query: MyPlayerDocument }],
      });
      handleMenuItemPress();
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <TopBar>
        <div />
        <img
          src={pyramid}
          alt="Yellow Pyramid Icon"
          style={{ width: "40px" }}
        />
        {/* <button
          type="button"
          onClick={handleResetPress}
          onKeyDown={handleResetPress}
        >
          reset
        </button> */}
      </TopBar>
      <Wrapper>{children}</Wrapper>
      <BottomBar handleMenuPress={() => setIsMenuOpen(!isMenuOpen)} />
      <Modal
        open={isMenuOpen}
        style={{
          flexDirection: "column",
          justifyContent: "flex-end",
          display: "flex",
          textAlign: "center",
        }}
        onClose={() => setIsMenuOpen(false)}
      >
        <ModalContainer>
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              flexDirection: "row",
              width: "100%",
            }}
          >
            <button
              className="text-sm"
              onClick={() => setIsMenuOpen(false)}
              style={{
                backgroundColor: "transparent",
                border: 0,
                margin: 0,
                padding: 10,
                cursor: "pointer",
              }}
            >
              <img src={close} alt="close icon" />
            </button>
          </div>
          <ul
            style={{
              listStyle: "none",
              padding: 0,
              margin: 0,
              fontSize: "24px",
            }}
          >
            <li>
              <Link
                onClick={handleMenuItemPress}
                style={{ textDecoration: "none" }}
                className="text-sm"
                aria-label="Go to Calculator"
                to={`/`}
              >
                Home
              </Link>
            </li>
            {data?.me && (
              <>
                {data.me.table && (
                  <li>
                    <Link
                      onClick={handleMenuItemPress}
                      style={{ textDecoration: "none" }}
                      className="text-sm"
                      aria-label="Go to Table"
                      to={`${process.env.PUBLIC_URL}/scoreboard/${data.me.table.id}`}
                    >
                      Go to Table
                    </Link>
                  </li>
                )}
                <li>
                  <Link
                    onClick={handleLeavePress}
                    style={{ textDecoration: "none" }}
                    className="text-sm"
                    aria-label="Leave Table"
                    to={`${process.env.PUBLIC_URL}/`}
                  >
                    Leave Table
                  </Link>
                </li>
              </>
            )}
            {!data?.me && (
              <>
                <li>
                  <Link
                    onClick={handleMenuItemPress}
                    style={{ textDecoration: "none" }}
                    className="text-sm"
                    aria-label="Join a Table"
                    to={`${process.env.PUBLIC_URL}/join-table`}
                  >
                    Join Table
                  </Link>
                </li>
                <li>
                  <Link
                    onClick={handleMenuItemPress}
                    style={{ textDecoration: "none" }}
                    className="text-sm"
                    aria-label="Create a Table"
                    to={`${process.env.PUBLIC_URL}/create-table`}
                  >
                    Create Table
                  </Link>
                </li>
              </>
            )}
            <li>
              <button
                className="text-sm"
                onClick={handleMenuItemPress}
                style={{
                  backgroundColor: "transparent",
                  border: 0,
                  margin: 0,
                  padding: 0,
                  cursor: "pointer",
                }}
              >
                Cancel
              </button>
            </li>
          </ul>
        </ModalContainer>
      </Modal>
    </div>
  );
};

const ModalContainer = styled.div`
  padding-bottom: 45px;
  padding-left: 15;
  padding-right: 15;
  display: "flex";
  flex-direction: "column";
  justify-content: "center";
  align-items: "center";
  background-color: var(--pyramid-yellow);
`;
const Wrapper = styled.main`
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  flex-direction: column;
  width: 380px;
  flex: 1;
  margin-left: auto;
  margin-right: auto;
  padding-left: 10px;
  padding-right: 10px;
`;

export default AppWrapper;
