import React from "react";
import ReactDOM from "react-dom";
import "./assets/css/index.css";
import App from "./App";
import { store } from "./utils/store";
import { Provider } from "react-redux";
import * as serviceWorker from "./serviceWorker";
import ThemeProvider from "@mui/styles/ThemeProvider";
import { theme } from "./utils/styles";
import smoothscroll from "smoothscroll-polyfill";
import ErrorBoundary from "./utils/ErrorBoundary";
import { StyledEngineProvider } from "@mui/material";

// steps to override default smooth scrolling behaviour in browsers
declare global {
  interface Window {
    __forceSmoothScrollPolyfill__: boolean;
  }
}
window.__forceSmoothScrollPolyfill__ = true;
smoothscroll.polyfill();

ReactDOM.render(
  <StyledEngineProvider injectFirst>
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <React.StrictMode>
          <ErrorBoundary>
            <App />
          </ErrorBoundary>
        </React.StrictMode>
      </Provider>
    </ThemeProvider>
  </StyledEngineProvider>,
  document.getElementById("root")
);

serviceWorker.unregister();
