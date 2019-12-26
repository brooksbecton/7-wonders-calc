import { RouteComponentProps } from "@reach/router";
import * as React from "react";
import { DetailWrapper } from "../../../components/DetailWrapper";
import { PointTypeDescription } from "./PointTypeDescription";

interface ICustomProps {
  pointType?: string;
}

type Props = RouteComponentProps & ICustomProps;
export const PointDetail: React.FunctionComponent<Props> = ({
  pointType = ""
}) => {
  return (
    <DetailWrapper>
      <h1>{pointType}</h1>
      <p>Points</p>
      <hr />
      <PointTypeDescription pointType={pointType} />
    </DetailWrapper>
  );
};

export default PointDetail;
