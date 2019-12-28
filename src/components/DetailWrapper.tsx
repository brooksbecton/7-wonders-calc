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
  min-height: 90%;
  background-color: #e5e5e5;
  padding: 25px;
  box-shadow: 0px 6px 5px -3px rgba(0, 0, 0, 0.75);

  h1 {
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
`;
