import { AnimatePresence } from "framer-motion";
import type { AppProps } from "next/app";
import Image from "next/image";
import { useEffect, useReducer } from "react";
import * as store from "store";
import styled from "styled-components";
import BottomBar from "../components/BottomBar";
import { updatePoint } from "../models/PointsReducer/actions";
import { PointsContext } from "../models/PointsReducer/PointsContext";
import { defaultState, reducer } from "../models/PointsReducer/reducer";
import { IPointType } from "../models/PointsReducer/types";
import "../styles/globals.css";

function MyApp({ Component, pageProps }: AppProps) {
  const pointData = store.get("points", defaultState);
  const [pointTypes, dispatch] = useReducer(reducer, pointData);
  const setPoints = (newPointType: IPointType) =>
    dispatch(updatePoint(newPointType));

  useEffect(() => {
    if (typeof window !== "undefined") {
      store.set("points", pointTypes);
    }
  });

  return (
    <AnimatePresence>
      <PointsContext.Provider value={{ dispatch, pointTypes, setPoints }}>
        <AppContainer>
          <TopBar>
            <Image
              src={"/pyramid.svg"}
              alt="Yellow Pyramid Icon"
              height={40}
              width={40}
            />
          </TopBar>
          <PageContainer>
            <Component {...pageProps} />
          </PageContainer>
          <BottomBarSpacer />
          <BottomBar />
        </AppContainer>
      </PointsContext.Provider>
    </AnimatePresence>
  );
}

const BottomBarSpacer = styled.div`
  height: 60px;
`;

const AppContainer = styled.div`
  height: 100%;
  width: 100%;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;

const PageContainer = styled.div`
  max-width: 380px;
  display: flex;

  flex: 1;
  justify-content: center;
  width: calc(100% - 50px);
`;

const TopBar = styled.div`
  align-items: center;
  background-color: var(--backdrop);
  display: flex;
  justify-content: center;
  padding-bottom: 15px;
  text-align: center;
  width: 100%;

  img {
    padding: 10px;
    height: 43px;
    width: 43px;
  }

  p {
    margin: 0px;
    padding: 0px;
  }
`;

export default MyApp;
