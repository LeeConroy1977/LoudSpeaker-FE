import React, { useState } from "react";

import AppLayout from "./AppLayout";
import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import Article from "../pages/Article";

const AppRoutes = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isComposeOpen, setIscomposeOpen] = useState(false);
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
          />
        }
      >
        <Route
          index
          element={
            <Home isSearchOpen={isSearchOpen} isComposeOpen={isComposeOpen} />
          }
        />
        <Route path="/article" element={<Article />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
