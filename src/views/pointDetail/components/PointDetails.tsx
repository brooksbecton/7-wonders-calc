import { RouteComponentProps } from "@reach/router";
import * as React from "react";
import styled from "styled-components";
import { backArrow } from "./../../../icons/";
import { upperFirst } from "./../../../utils/";
import { Military } from "./Military";
interface ICustomProps {
  pointType?: string;
}

type Props = RouteComponentProps & ICustomProps;

export const PointDetail: React.FunctionComponent<Props> = ({
  pointType = ""
}) => {
  return (
    <>
      <Wrapper>
        <h1>{upperFirst(pointType)}</h1>
        <Military />
      </Wrapper>

      <BackButton onClick={() => window.history.back()}>
        <img src={backArrow} alt="Go Back One Screen" />
        <span>Back</span>
      </BackButton>
    </>
  );
};

const Wrapper = styled.div`
  background-color: #f2f2f2;
  margin: 10px;
  padding: 10px;
`;

const BackButton = styled.button`
  display: flex;
  align-items: center;

  span {
    color: #060056;
    font-size: 23px;
  }
`;
export default PointDetail;
