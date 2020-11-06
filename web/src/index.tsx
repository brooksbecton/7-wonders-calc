import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import React, { useEffect, useReducer } from "react";
import { render } from "react-dom";
import { Helmet } from "react-helmet";
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
import posed, { PoseGroup } from "react-pose";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

const client = new ApolloClient({
  uri:
    process.env.NODE_ENV === "production"
      ? "https://www.harveythegoodboy.xyz/graphql"
      : "http://localhost:4000/graphql",

  cache: new InMemoryCache(),
  credentials: "include",
});

const RoutesContainer = posed.div({
  enter: { opacity: 1 },
  exit: { opacity: 0 },
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
      <Helmet>
        <title>7 Wonders Calculator</title>
        <meta
          name="description"
          content="Point calculator for the board game 7 Wonders"
        />
      </Helmet>
      <PointsContext.Provider value={{ dispatch, pointTypes, setPoints }}>
        <AppWrapper>
          <RoutesContainer style={{ width: "100%", height: "100%" }}>
            <Switch>
              <Route exact path="/">
                <Calculate />
              </Route>
              <Route exact path="/detail/:pointType">
                <PointDetail />
              </Route>
              <Route exact path="/science-calculator">
                <ScienceCalculator />
              </Route>
              <Route exact path="/join-table">
                <JoinGame />
              </Route>
              <Route exact path="/create-table">
                <CreateGame />
              </Route>
              <Route path="scoreboard/:tableId">
                <Scoreboard />
              </Route>
            </Switch>
          </RoutesContainer>
        </AppWrapper>
      </PointsContext.Provider>
    </ApolloProvider>
  );
}

const rootElement = document.getElementById("root");
render(
  <Router>
    <App />
  </Router>,
  rootElement
);
serviceWorker();
