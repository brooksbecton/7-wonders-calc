import React from "react";
import { Modal } from "@material-ui/core";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { close } from "./../../icons/index";

interface IProps {
  isMenuOpen: boolean;
  setIsMenuOpen: (newIsMenuOpen: boolean) => void;
}

export const BottomBarMenu: React.FunctionComponent<IProps> = ({
  isMenuOpen,
  setIsMenuOpen,
}) => {

  const handleMenuItemPress = () => {
    setIsMenuOpen(false);
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
