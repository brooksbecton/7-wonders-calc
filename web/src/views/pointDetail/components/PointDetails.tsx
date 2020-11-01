import { RouteComponentProps } from "@reach/router";
import * as React from "react";
import styled from "styled-components";

import { DetailWrapper } from "../../../components/DetailWrapper";
import { PointsContext } from "../../../PointsReducer/PointsContext";
import { PointTypeDescription } from "./PointTypeDescription";

interface ICustomProps {
  // eslint-disable-next-line react/require-default-props
  pointType?: string;
}

type Props = RouteComponentProps & ICustomProps;
export const PointDetail: React.FunctionComponent<Props> = ({
  pointType = "",
}: Props) => {
  const { pointTypes } = React.useContext(PointsContext);
  const pointInfo = pointTypes.find(({ key }) => key.indexOf(pointType) !== -1);
  return (
    <DetailWrapper>
      <Header>
        {pointInfo && (
          <IconContainer style={{ paddingRight: "10px" }}>
            <img src={pointInfo.svg} alt={`${pointInfo.key} icon`} />
          </IconContainer>
        )}
        <div>
          <h1 className="text-md">{pointType}</h1>
          <p style={{ padding: 0, margin: 0 }}>Points</p>
        </div>
      </Header>
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
