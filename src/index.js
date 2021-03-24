import { StrictMode } from "react";
import ReactDOM from "react-dom";
import setupMockServer from "./api/mockserver";

import App from "./App";

setupMockServer();

const rootElement = document.getElementById("root");
ReactDOM.render(
  <StrictMode>
    <App />
  </StrictMode>,
  rootElement
);
