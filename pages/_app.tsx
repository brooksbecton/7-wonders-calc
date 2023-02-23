import { AnimatePresence } from "framer-motion";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import styled from "styled-components";
import { Pyramid } from "../components/icons/";
import store from "../models/store";
import "../styles/globals.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AnimatePresence>
      <Provider store={store}>
        <AppContainer>
          <TopBar>
            <Pyramid height={40} width={40} />
          </TopBar>
          <PageContainer>
            <Component {...pageProps} />
          </PageContainer>
        </AppContainer>
      </Provider>
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
  padding-bottom: 25px;
  padding-top: 15px;
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
