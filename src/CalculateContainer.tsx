import { RouteComponentProps } from "@reach/router";
import { connect } from "react-redux";
import { savePoints, updatePoint } from "./actions";
import { Calculate } from "./Calculate";

const mapStateToProps = (state: any, ownProps: RouteComponentProps) => {
  return { ...state, ...ownProps };
};

const mapDispatchToProps = {
  savePoints,
  updatePoint
};

export const CalculateContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Calculate);
