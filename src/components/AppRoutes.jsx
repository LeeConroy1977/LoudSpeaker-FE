import React, { useContext, useEffect, useState } from "react";

import AppLayout from "./AppLayout";
import { Route, Routes, useSearchParams } from "react-router-dom";
import Home from "../pages/Home";
import Article from "../pages/Article";
import { UserContext } from "../contexts/UserContext";
import { ArticlesContext } from "../contexts/ArticlesContext";
import { getAllArticles } from "../../utilities/api/articlesApi";
import { ExistingUserContext } from "../contexts/ExistingUsersContext";
import { getAllUsers } from "../../utilities/api/usersApi";
import SignIn from "./SignIn";
import { useModal } from "../contexts/ModalContext";
import { SelectedTopicContext } from "../contexts/SelectedTopicContext";
import { SearchParamsContext } from "../contexts/searchParamsContext";

const AppRoutes = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isComposeOpen, setIscomposeOpen] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [popularArticles, setPopularArticles] = useState([]);
  const [isSignInContainerOpen, setIsSignInContainerOpen] = useState(false);
  const [hasSignInContainerClosed, setHasSignInContainerClosed] =
    useState(false);
  const [commentCount, setCommentCount] = useState(null);
  const { user } = useContext(UserContext);
  const { articles, setArticles } = useContext(ArticlesContext);
  const { setExistingUsers } = useContext(ExistingUserContext);
  const { selectedTopic } = useContext(SelectedTopicContext);
  const { showModal } = useModal();
  const { searchParams } = useContext(SearchParamsContext);
  const [limit, setLimit] = useState(6);
  const [page, setPage] = useState(1);
  const [totalAricles, setTotalArticles] = useState(0);

  const topicParam = searchParams.get("topic");
  const sortByParam = searchParams.get("sort_by");
  const orderParam = searchParams.get("order");

  useEffect(() => {
    getAllArticles(topicParam, sortByParam, orderParam, limit, page).then(
      (results) => {
        setArticles(results.articles);

        setTotalArticles(results.total_count.total_count);
        console.log(page);
      }
    );
  }, [topicParam, sortByParam, orderParam, limit, page, commentCount]);

  console.log(topicParam);

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
      // showModal(<SignIn />);
    }
    if (user.username) {
      setIscomposeOpen(!isComposeOpen);
      setIsSearchOpen(false);
    }
  }

  function handleSignInContainerClosed() {
    setHasSignInContainerClosed(true);
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
            />
          }
        />
        <Route
          path="/articles"
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
            />
          }
        />
        <Route
          path="/articles/:article_id"
          element={
            <Article
              handleSignInContainerClosed={handleSignInContainerClosed}
              hasSignInContainerClosed={hasSignInContainerClosed}
              setCommentCount={setCommentCount}
              commentCount={commentCount}
            />
          }
        />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
