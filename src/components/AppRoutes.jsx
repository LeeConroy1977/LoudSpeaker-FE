import React, { useContext, useEffect, useState } from "react";
import AppLayout from "./AppLayout";
import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import Article from "../pages/Article";
import { SearchParamsContext } from "../contexts/searchParamsContext";
import { useApi } from "../contexts/ApiContext";
import { VisibleContext } from "../contexts/VisibleContext";
import { ArticlesContext } from "../contexts/ArticlesContext";
import { AllArticlesCountContext } from "../contexts/AllArticlesCountContext";
import { InitialRenderContext } from "../contexts/InitialRenderContext";

const AppRoutes = () => {
  const { AllArticlesCount } = useContext(AllArticlesCountContext);
  const { searchParams } = useContext(SearchParamsContext);
  const { visible } = useContext(VisibleContext);
  const { articles } = useContext(ArticlesContext);
  // const { setIsInitialRender } = useContext(InitialRenderContext);
  const {
    fetchArticleCount,
    fetchAdditionalArticles,
    fetchArticles,
    fetchFilteredArticles,
    fetchMostPopularArticles,
    fetchFeaturedArticles,
  } = useApi();
  const topicParam = searchParams.get("topic");
  const sortByParam = searchParams.get("sort_by");
  const orderParam = searchParams.get("order");
  const [searchInput] = useState("");
  const [commentCount, setCommentCount] = useState(null);
  const [isMainArticlesLoading, setIsMainArticlesLoading] = useState(false);
  const [limit] = useState(12);
  const [page, setPage] = useState(1);

  console.log(AllArticlesCount && AllArticlesCount);

  useEffect(() => {
    fetchArticleCount(topicParam, sortByParam, orderParam, limit, page);
  }, []);

  useEffect(() => {
    fetchAdditionalArticles(topicParam, sortByParam, orderParam, limit, page);
  }, [page]);

  useEffect(() => {
    fetchArticles(topicParam, sortByParam, orderParam, limit, page);
  }, [topicParam, sortByParam, orderParam, commentCount]);

  useEffect(() => {
    fetchFilteredArticles(null, null, null, AllArticlesCount, null);
  }, [AllArticlesCount]);

  useEffect(() => {
    fetchMostPopularArticles(null, "votes", null, 6, null);
  }, []);

  useEffect(() => {
    fetchFeaturedArticles(null, null, null, AllArticlesCount, null);
  }, []);

  function handleOnLoadMore() {
    return setPage((prev) => prev + 1);
  }

  return (
    <Routes>
      <Route path="/" element={<AppLayout searchInput={searchInput} />}>
        <Route
          index
          element={
            <Home
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
