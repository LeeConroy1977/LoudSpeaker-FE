import { createContext, useReducer, useState } from "react";
import ArticlesReducer from "../reducers/ArticlesReducer";
import {
  getAllArticles,
  getArticle,
  patchArticle,
  postArticle,
} from "../../utilities/api/articlesApi";

const initialState = {
  articles: [],
  filteredArticles: [],
  featuredArticles: [],
  popularArticles: [],
  articleCount: 0,
  totalArticles: 0,
  selectedArticle: null,
  loading: false,
  error: null,
};

export const ArticlesContext = createContext();

export const ArticlesProvider = ({ children }) => {
  const [state, dispatch] = useReducer(ArticlesReducer, initialState);

  const fetchTotalArticlesCount = async () => {
    dispatch({ type: "FETCH_TOTAL_ARTICLES" });
    try {
      const response = await getAllArticles(null, null, null, null, null);

      dispatch({
        type: "FETCH_TOTAL_ARTICLES_SUCCESS",
        payload: response.total_count.total_count,
      });
    } catch (error) {
      dispatch({
        type: "FETCH_TOTAL_ARTICLES_FAILURE",
        payload: error.message || "Error fetching total articles count",
      });
    }
  };

  const fetchArticle = async (articleId) => {
    dispatch({ type: "CLEAR_ARTICLE" });
    dispatch({ type: "FETCH_ARTICLE" });
    try {
      const response = await getArticle(articleId);

      dispatch({
        type: "FETCH_ARTICLE_SUCCESS",
        payload: response,
      });
    } catch (error) {
      dispatch({
        type: "FETCH_ARTICLE_FAILURE",
        payload: error.message || "Error fetching article",
      });
    }
  };

  const fetchArticles = async (topic, sorted_by, order, limit, page) => {
    dispatch({ type: "FETCH_ARTICLES", payload: { loading: true } });
    try {
      const response = await getAllArticles(
        topic,
        sorted_by,
        order,
        limit,
        page
      );

      dispatch({
        type: "FETCH_ARTICLES_SUCCESS",
        payload: {
          articles: response.articles || [],
          totalCount: response.total_count?.total_count || 0,
        },
      });
    } catch (error) {
      if (process.env.NODE_ENV === "development") {
        console.error(
          "Error fetching articles:",
          error.response?.data || error.message
        );
      }
      dispatch({
        type: "FETCH_ARTICLES_FAILURE",
        payload: error.response?.data?.msg || "Error fetching articles",
      });
    }
  };

  const fetchAdditionalArticles = async (
    topic,
    sorted_by,
    order,
    limit,
    page
  ) => {
    dispatch({ type: "FETCH_ADDITIONAL_ARTICLES" });
    try {
      const response = await getAllArticles(
        topic,
        sorted_by,
        order,
        limit,
        page
      );

      dispatch({
        type: "FETCH_ADDITIONAL_ARTICLES_SUCCESS",
        payload: {
          articles: response.articles,
          totalCount: response.total_count.total_count,
        },
      });
    } catch (error) {
      dispatch({
        type: "FETCH_ADDITIONAL_ARTICLES_FAILURE",
        payload: error.message || "Error fetching articles",
      });
    }
  };

  const fetchPopularArticles = async (topic, sorted_by, order, limit, page) => {
    dispatch({ type: "FETCH_POPULAR_ARTICLES" });
    try {
      const response = await getAllArticles(
        topic,
        sorted_by,
        order,
        limit,
        page
      );
      dispatch({
        type: "FETCH_POPULAR_ARTICLES_SUCCESS",
        payload: response.articles,
      });
    } catch (error) {
      dispatch({
        type: "FETCH_POPULAR_ARTICLES_FAILURE",
        payload: error.message || "Error fetching popular articles",
      });
    }
  };

  const fetchFeaturedArticles = async (
    topic,
    sorted_by,
    order,
    limit,
    page
  ) => {
    dispatch({ type: "FETCH_FEATURED_ARTICLES" });
    try {
      const response = await getAllArticles(
        topic,
        sorted_by,
        order,
        limit,
        page
      );

      const featuredArticles = response.articles;
      const filteredArticles = featuredArticles.filter(
        (article) => article.featured === true
      );

      dispatch({
        type: "FETCH_FEATURED_ARTICLES_SUCCESS",
        payload: filteredArticles,
      });
    } catch (error) {
      dispatch({
        type: "FETCH_FEATURED_ARTICLES_FAILURE",
        payload: error.message || "Error fetching featured articles",
      });
    }
  };

  const createArticle = async (body) => {
    dispatch({ type: "CREATE_ARTICLE" });
    try {
      const response = await postArticle(body);

      dispatch({
        type: "CREATE_ARTICLES_SUCCESS",
        payload: response,
      });
    } catch (error) {
      dispatch({
        type: "CREATE_ARTICLES_FAILURE",
        payload: error.message || "Error posting article",
      });
    }
  };

  const handleLikeArticle = async (articleId, voteChange) => {
    try {
      const response = await patchArticle(articleId, voteChange);
      console.log("Like article response:", response);
      dispatch({
        type: "LIKE_ARTICLE_SUCCESS",
        payload: { article: response.article },
      });
      return response;
    } catch (error) {
      console.error("Error liking article:", error.message, error.stack);
      dispatch({ type: "LIKE_ARTICLE_FAILURE", payload: error.message });
      throw error;
    }
  };

  const handleUnlikeArticle = async (articleId, voteChange) => {
    try {
      const response = await patchArticle(articleId, voteChange);
      console.log("Unlike article response:", response);
      dispatch({
        type: "UNLIKE_ARTICLE_SUCCESS",
        payload: { article: response.article },
      });
      return response;
    } catch (error) {
      console.error("Error unliking article:", error.message, error.stack);
      dispatch({ type: "UNLIKE_ARTICLE_FAILURE", payload: error.message });
      throw error;
    }
  };

  return (
    <ArticlesContext.Provider
      value={{
        state,
        fetchTotalArticlesCount,
        fetchArticle,
        fetchArticles,
        fetchFeaturedArticles,
        createArticle,
        handleLikeArticle,
        handleUnlikeArticle,
        fetchAdditionalArticles,
        fetchPopularArticles,
      }}>
      {children}
    </ArticlesContext.Provider>
  );
};
