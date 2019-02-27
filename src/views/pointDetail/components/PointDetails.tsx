import { RouteComponentProps } from "@reach/router";
import * as React from "react";
import styled from "styled-components";
import { backArrow } from "./../../../icons/";
import { upperFirst } from "./../../../utils/";
import { PointTypeDescription } from "./PointTypeDescription";
interface ICustomProps {
  pointType?: string;
}

type Props = RouteComponentProps & ICustomProps;

export const PointDetail: React.FunctionComponent<Props> = ({
  pointType = ""
}) => {
  return (
    <>
      <BackButton onClick={() => window.history.back()}>
        <img src={backArrow} alt="Go Back One Screen" />
        <span>Back</span>
      </BackButton>
      <Wrapper>
        <h1>{upperFirst(pointType)}</h1>
        <PointTypeDescription pointType={pointType} />
      </Wrapper>
    </>
  );
};

const Wrapper = styled.div`
  background-color: #e5e5e5;
  margin: 10px;
  padding: 10px;
`;

const BackButton = styled.button`
  display: flex;
  align-items: center;
  background-color: transparent;
  border: none;

  img {
    min-width: 24px;
  }
  span {
    color: #060056;
    font-weight: bold;
    font-size: 14px;
  }
`;
export default PointDetail;
