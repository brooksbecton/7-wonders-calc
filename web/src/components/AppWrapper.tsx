import { Modal } from "@material-ui/core";
import { Link } from "@reach/router";
import * as React from "react";
import { useContext } from "react";
import styled from "styled-components";
import {
  useDeletePlayerMutation,
  useMyPlayerQuery,
  MyPlayerDocument,
  useUpdatePlayerScoreMutation,
} from "../generated/graphql";
import pyramid from "../icons/pyramid.svg";
import { PointsContext } from "../PointsReducer/PointsContext";
import { getTotalPoints } from "../PointsReducer/utils";

const TopBar = styled.div`
  align-items: center;
  justify-content: space-between;
  background-color: #d1d1d1;
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
  const { dispatch, pointTypes } = useContext(PointsContext);
  const handleResetPress = () => dispatch({ type: "RESET" });
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
    <>
      <TopBar>
        <div />
        <img
          src={pyramid}
          alt="Yellow Pyramid Icon"
          style={{ width: "40px" }}
        />
        <button
          type="button"
          onClick={handleResetPress}
          onKeyDown={handleResetPress}
        >
          reset
        </button>
      </TopBar>
      <Wrapper>
        {/* eslint-disable-next-line react/prop-types */}
        <main>{children}</main>
      </Wrapper>
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
        <div
          style={{
            minHeight: "30%",
            backgroundColor: "white",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
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
                aria-label="Join a Table"
                to={`${process.env.PUBLIC_URL}/`}
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
        </div>
      </Modal>

      <button onClick={() => setIsMenuOpen(!isMenuOpen)}>Open Menu</button>
    </>
  );
};

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  max-width: 380px;
  margin-left: auto;
  margin-right: auto;
  padding-left: 10px;
  padding-right: 10px;
`;

export default AppWrapper;
