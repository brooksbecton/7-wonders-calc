import * as React from "react";
import styled from "styled-components";
import pyramid from "./../icons/pyramid.svg";

export const AppWrapper: React.FunctionComponent = props => {
  return (
    <Wrapper>
      <TopBar>
        <img src={pyramid} alt="Yellow Pyramid Icon" />
      </TopBar>
      <main>{props.children}</main>
    </Wrapper>
  );
};

const TopBar = styled.div`
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
    font-family: "Trattatello";
    font-size: 34px;
    margin: 0px;
    padding: 0px;
  }
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  max-width: 380px;
  margin-left: 16px;
  margin-right: 16px;
`;

export default AppWrapper;
