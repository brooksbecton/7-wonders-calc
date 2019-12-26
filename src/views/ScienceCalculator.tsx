import { RouteComponentProps } from "@reach/router";
import * as React from "react";

import { DetailWrapper } from "./../components/DetailWrapper";

export interface IProps extends RouteComponentProps {}

export const ScienceCalculator: React.SFC<IProps> = props => {
  return (
    <DetailWrapper>
      <h1>Science</h1>
    </DetailWrapper>
  );
};
