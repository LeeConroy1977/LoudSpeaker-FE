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
    return setIsSearchOpen(!isSearchOpen);
  }

  function handleComposeOpen() {
    return setIscomposeOpen(!isComposeOpen);
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
          />
        }
      >
        <Route
          index
          element={
            <Home
              isSearchOpen={isSearchOpen}
              isComposeOpen={isComposeOpen}
              handleComposeOpen={handleComposeOpen}
              handleSelectedArticle={handleSelectedArticle}
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
