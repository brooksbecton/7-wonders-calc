import { AnimatePresence, motion } from "framer-motion";
import React, { useEffect, useReducer, useState } from "react";
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
import { updatePoint } from "./PointsReducer/actions";
import { PointsContext } from "./PointsReducer/PointsContext";
import { defaultState, reducer } from "./PointsReducer/reducer";
import { IPointType } from "./PointsReducer/types";
import serviceWorker from "./registerServiceWorker";
import { Calculate } from "./views/dashboard";
import { BottomBar } from "./views/dashboard/components/BottomBar";
import { PointDetail } from "./views/pointDetail/components/PointDetails";
import { ScienceCalculator } from "./views/ScienceCalculator";
import { BottomBarMenu } from "./views/wrapper/Modal";

registerObserver();

const PageWrapper: React.FunctionComponent = ({ children }) => {
  const location = useLocation();
  const prevLocation = usePrevious(location);

  const isForward =
    prevLocation.pathname !== location.pathname && location.pathname === "/";

  const defaults = {
    position: "absolute" as const,
    margin: "auto",
    width: "100%",
    height: "100%",
  };
  const pageVariants = {
    initial: {
      opacity: 0,
      ...defaults,
    },
    in: {
      opacity: 1,
      x: 0,
      ...defaults,
    },
    out: {
      x: isForward ? "-100vw" : "100vw",

      opacity: 0,
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
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [pointTypes, dispatch] = useReducer(reducer, pointData);
  const setPoints = (newPointType: IPointType) =>
    dispatch(updatePoint(newPointType));
  useEffect(() => {
    store.set("points", pointTypes);
  });
  const location = useLocation();

  return (
    <>
      <Helmet>
        <title>7 Wonders Calculator</title>
        <meta
          name="description"
          content="Point calculator for the board game 7 Wonders"
        />
      </Helmet>
      <PointsContext.Provider value={{ dispatch, pointTypes, setPoints }}>
        <AnimatePresence>
          <PageWrapper key={location.pathname}>
            <AppWrapper>
              <Switch location={location} key={location.pathname}>
                <Route exact path="/">
                  <div
                    style={{
                      width: "100%",
                      height: "100%",
                      maxWidth: "380px",
                      marginBottom: 77,
                    }}
                  >
                    <Calculate />
                  </div>
                </Route>
                <Route exact path="/detail/:pointType">
                  <div
                    style={{
                      width: "100%",
                      height: "100%",
                      maxWidth: "380px",
                      marginBottom: 77,
                    }}
                  >
                    <PointDetail />
                  </div>
                </Route>
                <Route exact path="/science-calculator">
                  <div
                    style={{
                      width: "100%",
                      height: "100%",
                      maxWidth: "380px",
                      marginBottom: 77,
                    }}
                  >
                    <ScienceCalculator />
                  </div>
                </Route>
              </Switch>
            </AppWrapper>
          </PageWrapper>
        </AnimatePresence>
        <BottomBarMenu isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
        <BottomBar />
      </PointsContext.Provider>
    </>
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
