import * as React from "react";
import posed from "react-pose";
import styled from "styled-components";
import { backArrow } from "./../icons";

export interface IProps {}

export const DetailWrapper: React.SFC<IProps> = props => {
  return (
    <>
      <BackButton
        aria-label="Go Back One Screen"
        onClick={() => window.history.back()}
      >
        <img src={backArrow} alt="Back Arrow" />
        <span>Back</span>
      </BackButton>
      <BounceIn initialPose="exit" pose="enter">
        <ContentContainer>{props.children}</ContentContainer>
      </BounceIn>
    </>
  );
};

const BounceIn = posed.div({
  enter: {
    opacity: 100,
    x: 0
  },
  exit: {
    opacity: 50,
    x: 50
  }
});

const ContentContainer = styled.div`
  background-color: #e5e5e5;
  padding: 10px;

  h1 {
    font-size: 20px;
    text-transform: uppercase;
    margin: 0px;
  }
  p {
    margin: 0px;
    margin-top: 5px;
  }
`;

const BackButton = styled.button`
  align-items: center;
  background-color: transparent;
  border: none;
  color: #060056;
  display: flex;
  margin-bottom: 12px;
  padding: 0px;

  img {
    width: 20px;
  }
  span {
    font-size: 14px;
  }
`;
