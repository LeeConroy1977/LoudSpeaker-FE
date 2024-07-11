import React, { useContext, useEffect, useState } from "react";

import AppLayout from "./AppLayout";
import { Route, Routes, useParams } from "react-router-dom";
import Home from "../pages/Home";
import Article from "../pages/Article";
import { UserContext } from "../contexts/UserContext";
import { ArticlesContext } from "../contexts/ArticlesContext";
import { getAllArticles } from "../../utilities/api/articlesApi";
import { ExistingUserContext } from "../contexts/ExistingUsersContext";
import { getAllUsers } from "../../utilities/api/usersApi";
import SignIn from "./SignIn";
import { useModal } from "../contexts/ModalContext";

const AppRoutes = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isComposeOpen, setIscomposeOpen] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [popularArticles, setPopularArticles] = useState([]);
  const [isSignInContainerOpen, setIsSignInContainerOpen] = useState(false);
  const [isPostCommentContainerOpen, setIsPostCommentContainerOpen] =
    useState(false);
  const [hasSignInContainerClosed, setHasSignInContainerClosed] =
    useState(false);

  const { user } = useContext(UserContext);
  const { articles, setArticles } = useContext(ArticlesContext);
  const { setExistingUsers } = useContext(ExistingUserContext);
  const { showModal } = useModal();

  useEffect(() => {
    getAllArticles().then(({ data }) => {
      setArticles(data.results.articles);
    });
    getAllUsers().then(({ data }) => {
      setExistingUsers(data.users);
    });
  }, []);

  console.log(articles);

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

    setIscomposeOpen(false);
    handlePopularArticles();
  }

  function handleComposeOpen() {
    if (!user.username) {
      setIsSearchOpen(false);
      showModal(<SignIn />);
    }
    if (user.username) {
      setIscomposeOpen(!isComposeOpen);
      setIsSearchOpen(false);
    }
  }

  function handleSignInContainerClosed() {
    setHasSignInContainerClosed(true);
  }

  function handlePostCommentContainerOpen() {
    setIsPostCommentContainerOpen(true);
  }

  return (
    <Routes>
      <Route
        path="/"
        element={
          <AppLayout
            handleSearchOpen={handleSearchOpen}
            handleComposeOpen={handleComposeOpen}
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
              popularArticles={popularArticles}
              isSignInContainerOpen={isSignInContainerOpen}
              handleSignInContainerClosed={handleSignInContainerClosed}
              setHasSignInContainerClosed={setHasSignInContainerClosed}
              hasSignInContainerClosed={hasSignInContainerClosed}
              isPostCommentContainerOpen={isPostCommentContainerOpen}
            />
          }
        />
        <Route
          path="/articles/:article_id"
          element={
            <Article
              isPostCommentContainerOpen={isPostCommentContainerOpen}
              handlePostCommentContainerOpen={handlePostCommentContainerOpen}
              handleSignInContainerClosed={handleSignInContainerClosed}
              hasSignInContainerClosed={hasSignInContainerClosed}
            />
          }
        />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
