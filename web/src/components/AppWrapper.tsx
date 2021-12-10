import * as React from "react";
import styled from "styled-components";
import pyramid from "../icons/pyramid.svg";

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
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        height: "100%",
      }}
    >
      <TopBar>
        <div />
        <img
          src={pyramid}
          alt="Yellow Pyramid Icon"
          style={{ width: "40px" }}
        />
      </TopBar>
      <Wrapper>{children}</Wrapper>
    </div>
  );
};

const Wrapper = styled.main`
  display: flex;
  flex: 1;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;

  padding-left: 10px;
  padding-right: 10px;
`;

export default AppWrapper;
