import * as React from "react";
import styled from "styled-components";
import { BackArrow } from "../icons";

export const DetailWrapper: React.FunctionComponent = ({ children }) => (
  <ContentContainer>
    <BackButton
      aria-label="Go Back One Screen"
      onClick={() => window.history.back()}
    >
      <BackArrow />
      <span>Back</span>
    </BackButton>
    {children}
  </ContentContainer>
);

export const ContentContainer = styled.div`
  background: #e5e5e5;
  height: 90%;
  padding: 25px;
  display: flex;
  flex-direction: column;
  width: 100%; 
  
  h1 {
    text-transform: capitalize;
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
