import { Router } from "@reach/router";
import * as React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import { applyMiddleware, createStore } from "redux";
import logger from "redux-logger";
import { CalculateContainer } from "./CalculateContainer";
import { AppWrapper } from "./components/AppWrapper";
import {
  civilian,
  coin,
  commercial,
  guild,
  military,
  science,
  wonders
} from "./icons";
import { PointDetail } from "./PointDetail";
import serviceWorker from "./registerServiceWorker";
import { IActionTypes, IPointType } from "./types";
import { updatePointType } from "./utils";
const defaultState: { pointTypes: IPointType[] } = {
  pointTypes: [
    {
      key: "military-points",
      svg: military,
      value: 0
    },
    {
      key: "treasury-points",
      svg: coin,
      value: 0
    },
    {
      key: "wonders-points",
      svg: wonders,
      value: 0
    },
    {
      key: "civilian-points",
      svg: civilian,
      value: 0
    },
    {
      key: "commercial-points",
      svg: commercial,
      value: 0
    },
    {
      key: "guilds-points",
      svg: guild,
      value: 0
    },
    {
      key: "science-points",
      svg: science,
      value: 0
    }
  ]
};

const rootReducer = (state = defaultState, action: any) => {
  const type: IActionTypes = action.type;
  switch (type) {
    case "UPDATE_POINT":
      const { type: x, ...pointType } = action;
      const pointTypes = updatePointType(pointType, state.pointTypes);
      return { ...state, pointTypes };
    default:
      return state;
  }
};

const store = createStore(rootReducer, applyMiddleware(logger));

function App() {
  return (
    <Provider store={store}>
      <AppWrapper>
        <Router>
          <PointDetail path="/detail" />
          <CalculateContainer path="/" />
        </Router>
      </AppWrapper>
    </Provider>
  );
}

const rootElement = document.getElementById("root");
render(<App />, rootElement);
serviceWorker();
