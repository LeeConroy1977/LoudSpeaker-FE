import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { ScreenSizeProvider } from "./contexts/ScreenSizeContext.jsx";
import { UserProvider } from "./contexts/UserContext.jsx";
import { ArticlesProvider } from "./contexts/ArticlesContext.jsx";
import { ExistingUsersProvider } from "./contexts/ExistingUsersContext.jsx";
import { SearchBarInputProvider } from "./contexts/SearchBarInputContext.jsx";
import { SearchOpenProvider } from "./contexts/SearchOpenContext.jsx";
import { ComposeOpenProvider } from "./contexts/ComposeOpenContext.jsx";
import { VisibleProvider } from "./contexts/VisibleContext.jsx";
import { VoteCountProvider } from "./contexts/VoteCountContext.jsx";
import { PostCommentOpenProvider } from "./contexts/PostCommentOpenContext.jsx";
import { ThemeProvider } from "./contexts/ThemeContext.jsx";
import { TopicsOpenProvider } from "./contexts/TopicsOpenContext.jsx";
import { InitialRenderProvider } from "./contexts/InitialRenderContext.jsx";
import { CommentsProvider } from "./contexts/CommentsContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <InitialRenderProvider>
    <TopicsOpenProvider>
      <ThemeProvider>
        <ScreenSizeProvider>
          <BrowserRouter>
            <ArticlesProvider>
              <ExistingUsersProvider>
                <UserProvider>
                  <SearchOpenProvider>
                    <SearchBarInputProvider>
                      <ComposeOpenProvider>
                        <VisibleProvider>
                          <VoteCountProvider>
                            <PostCommentOpenProvider>
                              <CommentsProvider>
                                <App />
                              </CommentsProvider>
                            </PostCommentOpenProvider>
                          </VoteCountProvider>
                        </VisibleProvider>
                      </ComposeOpenProvider>
                    </SearchBarInputProvider>
                  </SearchOpenProvider>
                </UserProvider>
              </ExistingUsersProvider>
            </ArticlesProvider>
          </BrowserRouter>
        </ScreenSizeProvider>
      </ThemeProvider>
    </TopicsOpenProvider>
  </InitialRenderProvider>
);
