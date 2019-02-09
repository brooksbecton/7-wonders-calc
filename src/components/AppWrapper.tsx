import * as React from "react";
import styled from "styled-components";
import pyramid from "./../icons/pyramid.svg";

export const AppWrapper: React.FunctionComponent = props => {
  return (
    <Wrapper>
      <TopBar>
        <img src={pyramid} alt="Yellow Pyramid Icon" />
        <p>7 Wonders</p>
      </TopBar>
      {props.children}
    </Wrapper>
  );
};

const TopBar = styled.div`
  justify-content: center;
  background-color: #d6d6d6;
  display: flex;
  text-align: center;
  width: 100%;

  img {
    padding-right: 10px;
    padding-top: 5px;
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
  width: 380px;
`;

export default AppWrapper;
