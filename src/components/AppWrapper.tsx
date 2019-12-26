import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import * as React from "react";
import * as store from "store";
import styled from "styled-components";
import { useScroll } from "../hooks/useScroll";
import pyramid from "../icons/pyramid.svg";

const TopBar = ({ children }: { children: any }) => {
  const { y } = useScroll();
  const TopBarNoScroll = styled.div`
    justify-content: center;
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
      font-size: 34px;
      margin: 0px;
      padding: 0px;
    }
  `;

  return (
    <>
      {y > 60 && (
        <div
          style={{
            backgroundColor: "#e5e5e5",
            display: "flex",
            height: "45px",
            justifyContent: "space-between",
            position: "fixed",
            top: 0,
            width: "100%",
            zIndex: 1
          }}
        >
          <span style={{ marginLeft: 17 }}>{children[0]}</span>
          <span style={{ marginRight: 17, alignSelf: "center" }}>
            {children[1]}
          </span>
        </div>
      )}
      <TopBarNoScroll>{children[0]}</TopBarNoScroll>
    </>
  );
};

export const AppWrapper: React.FunctionComponent = props => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  function handleClick(event: React.MouseEvent<HTMLSpanElement>) {
    setAnchorEl(event.currentTarget);
  }

  function handleClose() {
    setAnchorEl(null);
  }

  return (
    <>
      <TopBar>
        <img
          src={pyramid}
          alt="Yellow Pyramid Icon"
          style={{ width: "40px" }}
        />
        <span onClick={handleClick}>Menu</span>
      </TopBar>
      <Wrapper>
        <main>{props.children}</main>
      </Wrapper>
      <Menu
        data-test-id="menu"
        anchorEl={anchorEl}
        keepMounted={true}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem data-test-id="reset" onClick={() => store.clearAll()}>
          Reset
        </MenuItem>
      </Menu>
    </>
  );
};

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  max-width: 380px;
  margin-left: 16px;
  margin-right: 16px;
`;

export default AppWrapper;
