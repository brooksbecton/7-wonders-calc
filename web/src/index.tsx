import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import useScrollPosition from "@react-hook/window-scroll";
import { AnimatePresence, motion } from "framer-motion";
import React, { useEffect, useReducer } from "react";
import { render } from "react-dom";
import { Helmet } from "react-helmet";
import { registerObserver } from "react-perf-devtool";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  useLocation,
} from "react-router-dom";
import * as store from "store";
import { AppWrapper } from "./components/AppWrapper";
import { usePrevious } from "./hooks/usePrevious";
import { useScroll } from "./hooks/useScroll";
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

const PageWrapper: React.FunctionComponent = ({ children }) => {
  const location = useLocation();
  const prevLocation = usePrevious(location);

  const isForward =
    prevLocation.pathname !== location.pathname && location.pathname === "/";

  const defaults = {
    maxWidth: "380px",
  };
  const pageVariants = {
    initial: {
      opacity: 0,
      overflow: "hidden",
      position: "absolute" as const,
      x: isForward ? "100vw" : "-100vw",
      ...defaults,
    },
    in: {
      opacity: 1,
      x: 0,
      position: "relative" as const,
      ...defaults,
    },
    out: {
      opacity: 0,
      position: "absolute" as const,
      overflow: "hidden",
      x: isForward ? "-100vw" : "100vw",
      ...defaults,
    },
  };

  const pageTransition = {
    type: "tween",
    ease: "anticipate",
    duration: 0.5,
  };

  return (
    <motion.div
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={pageTransition}
    >
      {children}
    </motion.div>
  );
};

function App() {
  const pointData = store.get("points", defaultState);
  const [pointTypes, dispatch] = useReducer(reducer, pointData);
  const setPoints = (newPointType: IPointType) =>
    dispatch(updatePoint(newPointType));
  useEffect(() => {
    store.set("points", pointTypes);
  });
  const location = useLocation();

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
          <AnimatePresence>
            <Switch location={location} key={location.pathname}>
              <Route exact path="/">
                <PageWrapper>
                  <Calculate />
                </PageWrapper>
              </Route>
              <Route exact path="/detail/:pointType">
                <PageWrapper>
                  <PointDetail />
                </PageWrapper>
              </Route>
              <Route exact path="/science-calculator">
                <PageWrapper>
                  <ScienceCalculator />
                </PageWrapper>
              </Route>
              <Route exact path="/join-table">
                <PageWrapper>
                  <JoinGame />
                </PageWrapper>
              </Route>
              <Route exact path="/create-table">
                <PageWrapper>
                  <CreateGame />
                </PageWrapper>
              </Route>
              <Route path="scoreboard/:tableId">
                <PageWrapper>
                  <Scoreboard />
                </PageWrapper>
              </Route>
            </Switch>
          </AnimatePresence>
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
