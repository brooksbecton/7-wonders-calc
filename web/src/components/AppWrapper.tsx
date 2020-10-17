import { Modal } from "@material-ui/core";
import { Link } from "@reach/router";
import * as React from "react";
import { useContext } from "react";
import styled from "styled-components";
import {
  useDeletePlayerMutation,
  useMyUserIdQuery
} from "../generated/graphql";
import pyramid from "../icons/pyramid.svg";
import { PointsContext } from "../PointsReducer/PointsContext";

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
  const { dispatch } = useContext(PointsContext);
  const handleResetPress = () => dispatch({ type: "RESET" });
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const { data } = useMyUserIdQuery();
  const [deletePlayer] = useDeletePlayerMutation();

  const handleMenuItemPress = () => {
    setIsMenuOpen(false);
  };

  const handleLeavePress = () => {
    if (data?.me) {
      deletePlayer({ variables: { id: Number(data.me) } });
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
              <li>
                <button
                  className="text-sm"
                  onClick={handleLeavePress}
                  style={{
                    backgroundColor: "transparent",
                    border: 0,
                    margin: 0,
                    padding: 0,
                    cursor: "pointer",
                  }}
                >
                  Leave Table
                </button>
              </li>
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
