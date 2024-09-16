import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { ScreenSizeProvider } from "./contexts/ScreenSizeContext.jsx";
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
import { SearchOpenProvider } from "./contexts/SearchOpenContext.jsx";
import { ComposeOpenProvider } from "./contexts/ComposeOpenContext.jsx";
import { AllArticlesCountProvider } from "./contexts/AllArticlesCountContext.jsx";
import { ApiProvider } from "./contexts/ApiContext.jsx";
import { VisibleProvider } from "./contexts/VisibleContext.jsx";
import { TotalArticlesProvider } from "./contexts/TotalArticlesContext.jsx";
import { VoteCountProvider } from "./contexts/VoteCountContext.jsx";
import { CommentCountProvider } from "./contexts/commentCountContext.jsx";
import { DeletedCommentIdProvider } from "./contexts/DeletedCommentIdContext.jsx";
import { PostCommentOpenProvider } from "./contexts/PostCommentOpenContext.jsx";
import { UserCommentProvider } from "./contexts/UserCommentContext.jsx";
import { LoadingProvider } from "./contexts/LoadingContext.jsx"; // Import LoadingProvider
import { ThemeProvider } from "./contexts/ThemeContext.jsx";
import { TopicsOpenProvider } from "./contexts/TopicsOpenContext.jsx";
import { InitialRenderProvider } from "./contexts/InitialRenderContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <LoadingProvider>
    <InitialRenderProvider>
      <TopicsOpenProvider>
        <ThemeProvider>
          <ScreenSizeProvider>
            <BrowserRouter>
              <ArticlesProvider>
                <AllArticlesCountProvider>
                  <MainArticleProvider>
                    <ArticleCommentsProvider>
                      <ExistingUsersProvider>
                        <UserProvider>
                          <SelectedTopicProvider>
                            <SearchParamsProvider>
                              <PopupProvider>
                                <FeaturedArticlesProvider>
                                  <FilteredArticlesProvider>
                                    <SearchOpenProvider>
                                      <SearchBarInputProvider>
                                        <SearchBarListProvider>
                                          <ComposeOpenProvider>
                                            <VisibleProvider>
                                              <TotalArticlesProvider>
                                                <CommentCountProvider>
                                                  <VoteCountProvider>
                                                    <DeletedCommentIdProvider>
                                                      <PostCommentOpenProvider>
                                                        <UserCommentProvider>
                                                          <ApiProvider>
                                                            <App />
                                                          </ApiProvider>
                                                        </UserCommentProvider>
                                                      </PostCommentOpenProvider>
                                                    </DeletedCommentIdProvider>
                                                  </VoteCountProvider>
                                                </CommentCountProvider>
                                              </TotalArticlesProvider>
                                            </VisibleProvider>
                                          </ComposeOpenProvider>
                                        </SearchBarListProvider>
                                      </SearchBarInputProvider>
                                    </SearchOpenProvider>
                                  </FilteredArticlesProvider>
                                </FeaturedArticlesProvider>
                              </PopupProvider>
                            </SearchParamsProvider>
                          </SelectedTopicProvider>
                        </UserProvider>
                      </ExistingUsersProvider>
                    </ArticleCommentsProvider>
                  </MainArticleProvider>
                </AllArticlesCountProvider>
              </ArticlesProvider>
            </BrowserRouter>
          </ScreenSizeProvider>
        </ThemeProvider>
      </TopicsOpenProvider>
    </InitialRenderProvider>
  </LoadingProvider>
);
