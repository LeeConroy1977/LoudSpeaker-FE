import React, { useState } from "react";

import AppLayout from "./AppLayout";
import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import Article from "../pages/Article";
import articlesArray from "../../data/articles";

const AppRoutes = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isComposeOpen, setIscomposeOpen] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState({});
  const [isTopicContainerOpen, setIsTopicContainerOpen] = useState(false);
  const [articles, setArticles] = useState(articlesArray);
  const [searchInput, setSearchInput] = useState("");
  const [popularArticles, setPopularArticles] = useState([]);

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

  console.log(searchInput.length);

  // change to ID when fetching from DB
  function handleSelectedArticle(title) {
    articles.map((article) => {
      if (title === article.title) {
        setSelectedArticle(article);
      }
    });
  }

  console.log(isSearchOpen);
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
    setIscomposeOpen(!isComposeOpen);
    setIsSearchOpen(false);
  }

  function handleTopicContainer() {
    setIsTopicContainerOpen(!isTopicContainerOpen);
    setIsSearchOpen(false);
  }

  return (
    <Routes>
      <Route
        path="/"
        element={
          <AppLayout
            handleSearchOpen={handleSearchOpen}
            handleComposeOpen={handleComposeOpen}
            handleSelectedArticle={handleSelectedArticle}
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
              handleSelectedArticle={handleSelectedArticle}
              isTopicContainerOpen={isTopicContainerOpen}
              handleTopicContainer={handleTopicContainer}
              popularArticles={popularArticles}
            />
          }
        />
        <Route
          path="/article"
          element={<Article selectedArticle={selectedArticle} />}
        />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
