import React, { createContext, useContext, useCallback } from "react";
import { AllArticlesCountContext } from "./AllArticlesCountContext";
import {
  getAllArticles,
  getArticle,
  patchArticle,
} from "../../utilities/api/articlesApi";
import { ArticlesContext } from "./ArticlesContext";
import { VisibleContext } from "./VisibleContext";
import { TotalArticlesContext } from "./TotalArticlesContext";
import { FilteredArticlesContext } from "./FilteredArticlesContext";
import { SearchBarListContext } from "./SearchBarList";
import { FeaturedArticlesContext } from "./FeaturedArticlesContext";
import { MainArticleContext } from "./MainArticleContext";
import { ArticleCommentsContext } from "./ArticleCommentsContext";
import { CommentCountContext } from "./commentCountContext";
import { VoteCountContext } from "./VoteCountContext";
import {
  deleteArticleComment,
  getArticleComments,
} from "../../utilities/api/commentsApi";
import { useLoading } from "../contexts/LoadingContext";
import { InitialRenderContext } from "./InitialRenderContext";

const ApiContext = createContext();

export const ApiProvider = ({ children }) => {
  const { setAllArticlesCount } = useContext(AllArticlesCountContext);
  const { setArticles } = useContext(ArticlesContext);
  const { setVisible } = useContext(VisibleContext);
  const { setTotalArticles } = useContext(TotalArticlesContext);
  const { setFilteredArticles } = useContext(FilteredArticlesContext);
  const { setSearchBarList } = useContext(SearchBarListContext);
  const { setFeaturedArticles } = useContext(FeaturedArticlesContext);
  const { setArticle } = useContext(MainArticleContext);
  const { setComments } = useContext(ArticleCommentsContext);
  const { setCommentCount } = useContext(CommentCountContext);
  const { setVoteCount } = useContext(VoteCountContext);
  const { loadingStates, setLoading } = useLoading();

  const fetchArticleCount = useCallback(
    (topicParam, sortByParam, orderParam, limit, page) => {
      getAllArticles(topicParam, sortByParam, orderParam, limit, page)
        .then((results) => {
          setAllArticlesCount(results.total_count.total_count);
        })
        .catch(console.error);
    },
    []
  );

  const fetchFeaturedArticles = useCallback(
    async (topicParam, sortByParam, orderParam, limit = 300, page) => {
      setLoading("featuredArticles", true);
      try {
        const results = await getAllArticles(
          topicParam,
          sortByParam,
          orderParam,
          limit,
          page
        );
        const featured = results.articles.filter((article) => article.featured);
        setFeaturedArticles(featured);
        setLoading("featuredArticles", false);
      } catch (error) {
        console.error(error);
      }
    },
    []
  );

  const fetchAdditionalArticles = useCallback(
    (topicParam, sortByParam, orderParam, limit, page) => {
      setLoading("article", true);
      getAllArticles(topicParam, sortByParam, orderParam, limit, page)
        .then((results) => {
          setArticles((prev) => [...prev, ...results.articles]);
          setVisible((prev) => prev + results.articles.length);
          setLoading("article", false);
        })
        .catch(console.error);
    },
    []
  );

  const fetchArticles = useCallback(
    (topicParam, sortByParam, orderParam, limit, page) => {
      setLoading("article", true);
      getAllArticles(topicParam, sortByParam, orderParam, limit, page)
        .then((results) => {
          setArticles(results.articles);
          setTotalArticles(results.total_count.total_count);
          setLoading("article", false);
        })
        .catch(console.error);
    },
    []
  );

  const fetchFilteredArticles = useCallback(
    (topicParam, sortByParam, orderParam, limit, page) => {
      getAllArticles(topicParam, sortByParam, orderParam, limit, page)
        .then((results) => {
          setFilteredArticles(results.articles);
        })
        .catch(console.error);
    },
    []
  );

  const fetchMostPopularArticles = useCallback(
    async (topicParam, sortByParam, orderParam, limit, page) => {
      try {
        const mostPopularArticles = await getAllArticles(
          topicParam,
          sortByParam,
          orderParam,
          limit,
          page
        );
        setSearchBarList(mostPopularArticles.articles);
      } catch (error) {
        console.error(error);
      }
    },
    []
  );

  const fetchArticle = useCallback((article_id) => {
    setLoading("mainArticle", true);
    getArticle(article_id)
      .then((article) => {
        setArticle(article);
        setVoteCount(article.votes);
        setCommentCount(article.comment_count);
        setLoading("mainArticle", false);
      })
      .catch(console.error);
  }, []);

  const fetchArticleComments = useCallback((article_id) => {
    setComments([]);
    getArticleComments(article_id)
      .then((articleComments) => {
        setComments(articleComments);
      })
      .catch(console.error);
  }, []);

  const updateArticle = useCallback((article_id, incVotes) => {
    patchArticle(article_id, incVotes)
      .then((article) => {
        setVoteCount(article.votes);
      })
      .catch(() => {
        setVoteCount((prev) => prev - incVotes);
      });
  }, []);

  const deleteComment = useCallback((article_id) => {
    deleteArticleComment(article_id)
      .then(() => {
        setCommentCount((count) => count - 1);
      })
      .catch(console.error);
  }, []);

  return (
    <ApiContext.Provider
      value={{
        fetchArticleCount,
        fetchAdditionalArticles,
        fetchArticles,
        fetchFilteredArticles,
        fetchMostPopularArticles,
        fetchFeaturedArticles,
        fetchArticle,
        fetchArticleComments,
        updateArticle,
        deleteComment,
        loadingStates,
      }}
    >
      {children}
    </ApiContext.Provider>
  );
};

export const useApi = () => {
  const context = useContext(ApiContext);
  if (!context) {
    throw new Error("useApi must be used within an ApiProvider");
  }
  return context;
};
