import React from "react";
import { Modal } from "@material-ui/core";
import { Link } from "react-router-dom";
import styled from "styled-components";
import {
  MyPlayerDocument,
  useDeletePlayerMutation,
  useMyPlayerQuery,
} from "../../generated/graphql";
import { close } from "./../../icons/index";

interface IProps {
  isMenuOpen: boolean;
  setIsMenuOpen: (newIsMenuOpen: boolean) => void;
}

export const BottomBarMenu: React.FunctionComponent<IProps> = ({
  isMenuOpen,
  setIsMenuOpen,
}) => {
  const { data } = useMyPlayerQuery();
  const player = data?.me;
  const [deletePlayer] = useDeletePlayerMutation();

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
