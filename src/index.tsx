import * as React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import { applyMiddleware, createStore } from "redux";
import logger from "redux-logger";
import { CalculateContainer } from "./CalculateContainer";
import { IActionTypes, IPointState } from "./types";
import { updatePointType } from "./utils";

const defaultState: IPointState = {
  pointTypes: [
    {
      key: "military-points",
      value: 0
    },
    {
      key: "treasury-points",
      value: 0
    },
    {
      key: "wonders-points",
      value: 0
    },
    {
      key: "civilian-points",
      value: 0
    },
    {
      key: "commercial-points",
      value: 0
    },
    {
      key: "guilds-points",
      value: 0
    },
    {
      key: "science-points",
      value: 0
    },
  ]
};

const rootReducer = (state = defaultState, action: any) => {
  const type: IActionTypes = action.type;
  switch (type) {
    case IActionTypes.UPDATE_POINT:
      const { key, value } = action;
      const pointTypes = updatePointType(key, value, state.pointTypes);
      return { ...state, pointTypes };
    default:
      return state;
  }
};

const store = createStore(rootReducer, applyMiddleware(logger));

function App() {
  return (
    <Provider store={store}>
      <CalculateContainer />
    </Provider>
  );
}

const rootElement = document.getElementById("root");
render(<App />, rootElement);
