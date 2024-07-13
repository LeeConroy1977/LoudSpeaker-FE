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
import { ArticleCommentsProvider } from "./contexts/ArticleCommentsContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <ScreenSizeProvider>
    <BrowserRouter>
      <ArticlesProvider>
        <MainArticleProvider>
          <ArticleCommentsProvider>
            <ExistingUsersProvider>
              <UserProvider>
                <App />
              </UserProvider>
            </ExistingUsersProvider>
          </ArticleCommentsProvider>
        </MainArticleProvider>
      </ArticlesProvider>
    </BrowserRouter>
  </ScreenSizeProvider>
);
