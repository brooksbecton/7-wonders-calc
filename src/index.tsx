import { Router } from "@reach/router";
import * as React from "react";
import { render } from "react-dom";
import { AppWrapper } from "./components/AppWrapper";
import serviceWorker from "./registerServiceWorker";
import { Calculate } from "./views/dashboard";
import { PointDetail } from "./views/pointDetail/components/PointDetails";

function App() {
  return (
    <AppWrapper>
      <Router basepath={process.env.PUBLIC_URL}>
        <Calculate path="/" />
        <PointDetail path="detail" />
      </Router>
    </AppWrapper>
  );
}

const rootElement = document.getElementById("root");
render(<App />, rootElement);
serviceWorker();
