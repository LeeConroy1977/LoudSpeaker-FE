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
import { SelectedTopicProvider } from "./contexts/SelectedTopicContext.jsx";
import { SearchParamsProvider } from "./contexts/searchParamsContext.jsx";
import { PopupProvider } from "./contexts/PopupContext.jsx";
import { FilteredArticlesProvider } from "./contexts/FilteredArticlesContext.jsx";
import { SearchBarInputProvider } from "./contexts/SearchBarInputContext.jsx";
import { FeaturedArticlesProvider } from "./contexts/FeaturedArticlesContext.jsx";
import { SearchBarListProvider } from "./contexts/SearchBarList.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <ScreenSizeProvider>
    <BrowserRouter>
      <ArticlesProvider>
        <MainArticleProvider>
          <ArticleCommentsProvider>
            <ExistingUsersProvider>
              <UserProvider>
                <SelectedTopicProvider>
                  <SearchParamsProvider>
                    <PopupProvider>
                      <FeaturedArticlesProvider>
                        <FilteredArticlesProvider>
                          <SearchBarInputProvider>
                            <SearchBarListProvider>
                              <App />
                            </SearchBarListProvider>
                          </SearchBarInputProvider>
                        </FilteredArticlesProvider>
                      </FeaturedArticlesProvider>
                    </PopupProvider>
                  </SearchParamsProvider>
                </SelectedTopicProvider>
              </UserProvider>
            </ExistingUsersProvider>
          </ArticleCommentsProvider>
        </MainArticleProvider>
      </ArticlesProvider>
    </BrowserRouter>
  </ScreenSizeProvider>
);
