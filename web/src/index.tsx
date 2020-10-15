import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { Modal } from "@material-ui/core";
import { Link, Router } from "@reach/router";
import React, { useEffect, useReducer, useState } from "react";
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
  uri: "http://localhost:4000/graphql",
  cache: new InMemoryCache(),
  credentials: "include",
});

registerObserver();

function App() {
  const pointData = store.get("points", defaultState);
  const [pointTypes, dispatch] = useReducer(reducer, pointData);
  const setPoints = (newPointType: IPointType) =>
    dispatch(updatePoint(newPointType));
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleMenuItemPress = () => {
    setIsMenuOpen(false);
  };
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

          <Modal
            open={isMenuOpen}
            style={{
              flexDirection: "column",
              justifyContent: "flex-end",
              display: "flex",
              textAlign: "center",
            }}
            onClose={() => setIsMenuOpen(false)}
          >
            <div
              style={{
                minHeight: "30%",
                backgroundColor: "white",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <ul
                style={{
                  listStyle: "none",
                  padding: 0,
                  margin: 0,
                  fontSize: "24px",
                }}
              >
                <li>
                  <Link
                    onClick={handleMenuItemPress}
                    style={{ textDecoration: "none" }}
                    className="text-sm"
                    aria-label="Join a Table"
                    to={`${process.env.PUBLIC_URL}/`}
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    onClick={handleMenuItemPress}
                    style={{ textDecoration: "none" }}
                    className="text-sm"
                    aria-label="Join a Table"
                    to={`${process.env.PUBLIC_URL}/join-table`}
                  >
                    Join Game
                  </Link>
                </li>
                <li>
                  <Link
                    onClick={handleMenuItemPress}
                    style={{ textDecoration: "none" }}
                    className="text-sm"
                    aria-label="Create a Table"
                    to={`${process.env.PUBLIC_URL}/create-table`}
                  >
                    Create Game
                  </Link>
                </li>
                <li>
                  <button
                    className="text-sm"
                    onClick={handleMenuItemPress}
                    style={{
                      backgroundColor: "transparent",
                      border: 0,
                      margin: 0,
                      padding: 0,
                      cursor: "pointer",
                    }}
                  >
                    Cancel
                  </button>
                </li>
              </ul>
            </div>
          </Modal>

          <button onClick={() => setIsMenuOpen(!isMenuOpen)}>Open Menu</button>
        </AppWrapper>
      </PointsContext.Provider>
    </ApolloProvider>
  );
}

const rootElement = document.getElementById("root");
render(<App />, rootElement);
serviceWorker();
