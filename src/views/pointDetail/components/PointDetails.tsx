import { RouteComponentProps } from "@reach/router";
import * as React from "react";
import styled from "styled-components";

import { DetailWrapper } from "../../../components/DetailWrapper";
import { usePoints } from "../../../hooks/usePoints";
import { PointTypeDescription } from "./PointTypeDescription";

interface ICustomProps {
  pointType?: string;
}

type Props = RouteComponentProps & ICustomProps;
export const PointDetail: React.FunctionComponent<Props> = ({
  pointType = ""
}) => {
  const { x: pointTypes } = usePoints();
  const pointInfo = pointTypes.find(({ key }) => key.indexOf(pointType) !== -1);
  return (
    <DetailWrapper>
      <Header>
        {pointInfo && (
          <IconContainer style={{ paddingRight: "10px" }}>
            <img src={pointInfo.svg} alt={pointInfo.key + " icon"} />
          </IconContainer>
        )}
        <div>
          <h1>{pointType}</h1>
          <p>Points</p>
        </div>
      </Header>
      <hr />
      <PointTypeDescription pointType={pointType} />
    </DetailWrapper>
  );
};

const IconContainer = styled.div`
  display: flex;
  align-items: center;
  img {
    width: 35px;
  }
`;

const Header = styled.div`
  display: flex;
  flex-direction: row;
`;

export default PointDetail;
