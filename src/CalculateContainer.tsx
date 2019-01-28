import { connect } from "react-redux";

import { updatePoint } from "./actions";
import { Calculate } from "./Calculate";


const mapStateToProps = (state: any, ownProps: any) => {
  return { ...state, ...ownProps };
};

const mapDispatchToProps = {
  updatePoint
};

export const CalculateContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Calculate);
