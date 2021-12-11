import { NextPage } from "next";
import { useRouter } from "next/router";
import * as React from "react";
import styled from "styled-components";
import { DetailWrapper } from "../../components/detail/DetailWrapper";
import { PointTypeDescription } from "../../components/detail/PointTypeDescription";
import { PointTypeSvg } from "../../components/PointTypeSvg";
import { PointsContext } from "../../models/PointsReducer/PointsContext";

export const PointDetail: NextPage = () => {
  const { pointType } = useRouter().query;
  const { pointTypes } = React.useContext(PointsContext);
  const pointInfo = pointTypes.find(
    ({ key }) => key.indexOf(pointType as string) !== -1
  );

  return (
    <DetailWrapper>
      <Header>
        {pointInfo && (
          <div
            style={{
              backgroundColor: pointInfo.color,
              padding: 10,
              marginRight: 10,
              width: 50,
              height: 50,
            }}
          >
            <PointTypeSvg pointType={`${pointType as string}-points`} />
          </div>
        )}
        <div>
          <h1 className="text-md">{pointType}</h1>
          <p style={{ padding: 0, margin: 0 }}>Points</p>
        </div>
      </Header>
      <PointTypeDescription pointType={pointType as string} />
    </DetailWrapper>
  );
};



const Header = styled.div`
  display: flex;
  flex-direction: row;
  padding-bottom: 10px;
  margin-bottom: 10px;
  border-width: 0.5px;
  border-bottom-style: solid;
`;

export default PointDetail;
