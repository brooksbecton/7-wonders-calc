import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { Router } from "@reach/router";
import React, { useEffect, useReducer } from "react";
import { render } from "react-dom";
import { registerObserver } from "react-perf-devtool";
import * as store from "store";
import { AppWrapper } from "./components/AppWrapper";
import { updatePoint } from "./PointsReducer/actions";
import { PointsContext } from "./PointsReducer/PointsContext";
import { defaultState, reducer } from "./PointsReducer/reducer";
import { IPointType } from "./PointsReducer/types";
import serviceWorker from "./registerServiceWorker";
import { CreateGame } from "./views/CreateGame";
import { Calculate } from "./views/dashboard";
import { JoinGame } from "./views/JoinGame";
import { PointDetail } from "./views/pointDetail/components/PointDetails";
import { ScienceCalculator } from "./views/ScienceCalculator";
import { Scoreboard } from "./views/Scoreboard";

const client = new ApolloClient({
  uri:
    process.env.NODE_ENV === "production"
      ? "https://www.harveythegoodboy.xyz/graphql"
      : "http://localhost:4000/graphql",

  cache: new InMemoryCache(),
  credentials: "include",
});

registerObserver();

function App() {
  const pointData = store.get("points", defaultState);
  const [pointTypes, dispatch] = useReducer(reducer, pointData);
  const setPoints = (newPointType: IPointType) =>
    dispatch(updatePoint(newPointType));

  useEffect(() => {
    store.set("points", pointTypes);
  });

  return (
    <ApolloProvider client={client}>
      <PointsContext.Provider value={{ dispatch, pointTypes, setPoints }}>
        <AppWrapper>
          <Router basepath={process.env.PUBLIC_URL}>
            <Calculate path="/" />
            <PointDetail path="detail/:pointType" />
            <ScienceCalculator path="science-calculator" />
            <JoinGame path="join-table" />
            <CreateGame path="create-table" />
            <Scoreboard path="scoreboard/:tableId" />
          </Router>
        </AppWrapper>
      </PointsContext.Provider>
    </ApolloProvider>
  );
}

const rootElement = document.getElementById("root");
render(<App />, rootElement);
serviceWorker();
