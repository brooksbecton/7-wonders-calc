import { RouteComponentProps } from "@reach/router";
import * as React from "react";
import posed from "react-pose";
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
      <Tasdf initialPose="exit" pose="enter">
        <Wrapper>
          <h1>{upperFirst(pointType)}</h1>
          <p>Points</p>
          <hr />
          <PointTypeDescription pointType={pointType} />
        </Wrapper>
      </Tasdf>
    </>
  );
};

const Tasdf = posed.div({
  enter: {
    opacity: 100,
    x: 0
  },
  exit: {
    opacity: 50,
    x: 50
  }
});

const Wrapper = styled.div`
  background-color: #e5e5e5;
  padding: 10px;

  h1 {
    font-size: 20px;
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

  img {
    width: 20px;
  }
  span {
    font-size: 14px;
  }
`;
export default PointDetail;
