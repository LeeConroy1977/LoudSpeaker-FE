import React, { useContext, useEffect, useState } from "react";

import AppLayout from "./AppLayout";
import { Route, Routes, useParams } from "react-router-dom";
import Home from "../pages/Home";
import Article from "../pages/Article";
import { UserContext } from "../contexts/UserContext";
import { ArticlesContext } from "../contexts/ArticlesContext";
import { getAllArticles, getArticle } from "../../utilities/api/articlesApi";
import { ExistingUserContext } from "../contexts/ExistingUsersContext";
import { getAllUsers } from "../../utilities/api/usersApi";
import { getArticleComments } from "../../utilities/api/commentsApi";

const AppRoutes = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isComposeOpen, setIscomposeOpen] = useState(false);
  const [isTopicContainerOpen, setIsTopicContainerOpen] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [popularArticles, setPopularArticles] = useState([]);
  const [isSignInContainerOpen, setIsSignInContainerOpen] = useState(false);
  const [hasSignInContainerClosed, setHasSignInContainerClosed] =
    useState(false);

  const { user } = useContext(UserContext);
  const { articles, setArticles } = useContext(ArticlesContext);
  const { setExistingUsers } = useContext(ExistingUserContext);

  useEffect(() => {
    getAllArticles().then(({ data }) => {
      setArticles(data.results.articles);
    });
    getAllUsers().then(({ data }) => {
      setExistingUsers(data.users);
    });
  }, []);

  let filteredArticles = [];

  function handleSearchInput(e) {
    setSearchInput(e.target.value);
  }

  articles &&
    articles.filter((article) => {
      if (article.body.toLowerCase().includes(searchInput.toLowerCase())) {
        filteredArticles.push(article);
      }
    });

  function handlePopularArticles() {
    const popularArticlesArray = articles
      .slice()
      .sort((a, b) => b.votes - a.votes)
      .slice(0, 6);
    setPopularArticles(popularArticlesArray);
  }

  function handleSearchOpen() {
    setIsSearchOpen(!isSearchOpen);
    setIsTopicContainerOpen(false);
    setIscomposeOpen(false);
    handlePopularArticles();
  }

  function handleComposeOpen() {
    if (!user.username && !isSignInContainerOpen) {
      setIsSignInContainerOpen(true);
      setHasSignInContainerClosed(false);
    }
    if (user.username) {
      setIscomposeOpen(!isComposeOpen);
      setIsSearchOpen(false);
    }
  }

  function handleTopicContainer() {
    setIsTopicContainerOpen(!isTopicContainerOpen);
    setIsSearchOpen(false);
  }

  function handleSignInContainerClosed() {
    setHasSignInContainerClosed(true);
  }

  console.log(isSignInContainerOpen);

  return (
    <Routes>
      <Route
        path="/"
        element={
          <AppLayout
            handleSearchOpen={handleSearchOpen}
            handleComposeOpen={handleComposeOpen}
            isTopicContainerOpen={isTopicContainerOpen}
            handleSearchInput={handleSearchInput}
            searchInput={searchInput}
            filteredArticles={filteredArticles}
            handlePopularArticles={handlePopularArticles}
            popularArticles={popularArticles}
            isSearchOpen={isSearchOpen}
            setIsSearchOpen={setIsSearchOpen}
          />
        }
      >
        <Route
          index
          element={
            <Home
              isSearchOpen={isSearchOpen}
              setIsSearchOpen={setIsSearchOpen}
              isComposeOpen={isComposeOpen}
              handleComposeOpen={handleComposeOpen}
              isTopicContainerOpen={isTopicContainerOpen}
              handleTopicContainer={handleTopicContainer}
              popularArticles={popularArticles}
              isSignInContainerOpen={isSignInContainerOpen}
              handleSignInContainerClosed={handleSignInContainerClosed}
              setHasSignInContainerClosed={setHasSignInContainerClosed}
              hasSignInContainerClosed={hasSignInContainerClosed}
            />
          }
        />
        <Route path="/articles/:article_id" element={<Article />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
