import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./assets/fonts/netflix-sans.css";
import "./i18n";
import "./CustomClassNameSetup";
import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { RouterProvider } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import store from "./store";
import { extendedApi } from "./store/slices/configuration";
import palette from "./theme/palette";
import typography from "./theme/typography";
import router from "./routes";
import MainLoadingScreen from "./components/MainLoadingScreen";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { GOOGLE_CLIENT_ID } from "./constant";

store.dispatch(extendedApi.endpoints.getConfiguration.initiate(undefined));

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement,
);
root.render(
  <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
    <Provider store={store}>
      <React.StrictMode>
        <ThemeProvider theme={createTheme({ palette, typography })}>
          <RouterProvider
            router={router}
            fallbackElement={<MainLoadingScreen />}
           />
        </ThemeProvider>
      </React.StrictMode>
    </Provider>
  </GoogleOAuthProvider>,
);
