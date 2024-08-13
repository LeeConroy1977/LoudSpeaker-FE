import React, { useContext, useEffect, useState } from "react";

import AppLayout from "./AppLayout";
import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import Article from "../pages/Article";
import { UserContext } from "../contexts/UserContext";
import { ArticlesContext } from "../contexts/ArticlesContext";
import { getAllArticles } from "../../utilities/api/articlesApi";
import { SearchParamsContext } from "../contexts/searchParamsContext";
import { FilteredArticlesContext } from "../contexts/FilteredArticlesContext";
import { FeaturedArticlesContext } from "../contexts/FeaturedArticlesContext";
import { SearchBarListContext } from "../contexts/SearchBarList";
import { SearchOpenContext } from "../contexts/SearchOpenContext";
import { ComposeOpenContext } from "../contexts/ComposeOpenContext";

const AppRoutes = () => {
  const [searchInput, setSearchInput] = useState("");
  const [popularArticles, setPopularArticles] = useState([]);
  const [isSignInContainerOpen, setIsSignInContainerOpen] = useState(false);
  const [hasSignInContainerClosed, setHasSignInContainerClosed] =
    useState(false);
  const [commentCount, setCommentCount] = useState(null);
  const { articles, setArticles } = useContext(ArticlesContext);
  const { filteredArticles, setFilteredArticles } = useContext(
    FilteredArticlesContext
  );
  const { featuredArticles, setFeaturedArticles } = useContext(
    FeaturedArticlesContext
  );
  const { setSearchBarList } = useContext(SearchBarListContext);

  const { searchParams } = useContext(SearchParamsContext);
  const [limit] = useState(12);
  const [page, setPage] = useState(1);
  const [totalAricles, setTotalArticles] = useState(0);
  const [allArticles, setAllArticles] = useState(0);
  const [visible, setVisible] = useState(0);
  const [isMainArticlesLoading, setIsMainArticlesLoading] = useState(false);

  const topicParam = searchParams.get("topic");
  const sortByParam = searchParams.get("sort_by");
  const orderParam = searchParams.get("order");

  useEffect(() => {
    getAllArticles(topicParam, sortByParam, orderParam, limit, page).then(
      (results) => {
        setAllArticles(results.total_count.total_count);
      }
    );
  }, []);

  console.log(allArticles);

  useEffect(() => {
    getAllArticles(topicParam, sortByParam, orderParam, limit, page).then(
      (results) => {
        setArticles((prev) => [...prev, ...results.articles]);

        setVisible((prev) => prev + results.articles.length);
      }
    );
  }, [page]);

  useEffect(() => {
    setIsMainArticlesLoading(true);
    getAllArticles(topicParam, sortByParam, orderParam, limit, page).then(
      (results) => {
        setArticles(results.articles);
        setTotalArticles(results.total_count.total_count);
        setIsMainArticlesLoading(false);
      }
    );
  }, [topicParam, sortByParam, orderParam, commentCount]);

  useEffect(() => {
    {
      getAllArticles(null, null, null, allArticles, null).then((results) => {
        setFilteredArticles(results.articles);
      });
    }
  }, [allArticles]);

  useEffect(() => {
    async function fetchMostCommentedArticles() {
      try {
        const mostCommentedArticles = await getAllArticles(
          null,
          "comment_count",
          "desc",
          6,
          1
        );

        setSearchBarList(mostCommentedArticles.articles);
      } catch (error) {
        console.error("Error fetching most commented articles:", error);
      }
    }

    fetchMostCommentedArticles();
  }, []);

  useEffect(() => {
    const featured = filteredArticles.filter(
      (article) => article.featured === true
    );
    setFeaturedArticles(featured);
  }, [filteredArticles]);

  function handleOnLoadMore() {
    console.log("this ran!!!!");
    return setPage((prev) => prev + 1);
  }

  function handlePopularArticles() {
    const popularArticlesArray = articles
      .slice()
      .sort((a, b) => b.votes - a.votes)
      .slice(0, 6);
    setPopularArticles(popularArticlesArray);
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
            searchInput={searchInput}
            handlePopularArticles={handlePopularArticles}
            popularArticles={popularArticles}
          />
        }
      >
        <Route
          index
          element={
            <Home
              popularArticles={popularArticles}
              isSignInContainerOpen={isSignInContainerOpen}
              handleSignInContainerClosed={handleSignInContainerClosed}
              setHasSignInContainerClosed={setHasSignInContainerClosed}
              hasSignInContainerClosed={hasSignInContainerClosed}
              allArticles={allArticles}
              handleOnLoadMore={handleOnLoadMore}
              visible={visible}
              isMainArticlesLoading={isMainArticlesLoading}
            />
          }
        />
        <Route
          path="/articles"
          element={
            <Home
              popularArticles={popularArticles}
              isSignInContainerOpen={isSignInContainerOpen}
              handleSignInContainerClosed={handleSignInContainerClosed}
              setHasSignInContainerClosed={setHasSignInContainerClosed}
              hasSignInContainerClosed={hasSignInContainerClosed}
              allArticles={allArticles}
              handleOnLoadMore={handleOnLoadMore}
              visible={visible}
              isMainArticlesLoading={isMainArticlesLoading}
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
              popularArticles={popularArticles}
            />
          }
        />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
