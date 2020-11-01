import * as React from "react";
import posed from "react-pose";
import styled from "styled-components";
import { backArrow } from "../icons";

export interface IProps {}

// eslint-disable-next-line react/prop-types
export const DetailWrapper: React.SFC<IProps> = ({ children }) => (
  <>
    <BackButton
      aria-label="Go Back One Screen"
      onClick={() => window.history.back()}
    >
      <img src={backArrow} alt="Back Arrow" />
      <span>Back</span>
    </BackButton>
    <ContentContainer>{children}</ContentContainer>
  </>
);

export const ContentContainer = styled.div`
  height: 90%;
  padding: 25px;
  display: flex;
  flex-direction: column;

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
  color: var(--royal-purple);
  display: flex;
  margin-bottom: 12px;
  padding: 0px;

  img {
    width: 20px;
  }
`;
