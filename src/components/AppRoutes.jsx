import React, { useState } from "react";

import AppLayout from "./AppLayout";
import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import Article from "../pages/Article";
import articles from "../../data/articles";

const AppRoutes = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isComposeOpen, setIscomposeOpen] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState({});
  const [isTopicContainerOpen, setIsTopicContainerOpen] = useState(false);

  // change to ID when fetching from DB
  function handleSelectedArticle(title) {
    articles.map((article) => {
      if (title === article.title) {
        setSelectedArticle(article);
      }
    });
  }

  console.log(selectedArticle);

  function handleSearchOpen() {
    setIsSearchOpen(!isSearchOpen);
    setIsTopicContainerOpen(false);
  }

  function handleComposeOpen() {
    return setIscomposeOpen(!isComposeOpen);
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
