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
          <IconContainer
            style={{
              backgroundColor: pointInfo.color,
              padding: 10,
              marginRight: 10,
              width: 35,
              height: 35,
            }}
          >
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
  padding-bottom: 10px;
  margin-bottom: 10px;
  border-width: 0.5px;
  border-bottom-style: solid;
`;

export default PointDetail;
