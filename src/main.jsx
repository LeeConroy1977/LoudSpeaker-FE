import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { ScreenSizeProvider } from "./contexts/ScreenSizeContext.jsx";
import { BrowserRouter } from "react-router-dom";
import { UserProvider } from "./contexts/UserContext.jsx";
import { ArticlesProvider } from "./contexts/ArticlesContext.jsx";
import { ExistingUsersProvider } from "./contexts/ExistingUsersContext.jsx";
import { MainArticleProvider } from "./contexts/MainArticleContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <ScreenSizeProvider>
    <BrowserRouter>
      <ArticlesProvider>
        <MainArticleProvider>
          <ExistingUsersProvider>
            <UserProvider>
              <App />
            </UserProvider>
          </ExistingUsersProvider>
        </MainArticleProvider>
      </ArticlesProvider>
    </BrowserRouter>
  </ScreenSizeProvider>
);
