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
  postArticleComment,
} from "../../utilities/api/commentsApi";
import { useLoading } from "../contexts/LoadingContext";
import { InitialRenderContext } from "./InitialRenderContext";

const ApiContext = createContext();

export const ApiProvider = ({ children }) => {
  const { AllArticlesCount, setAllArticlesCount } = useContext(
    AllArticlesCountContext
  );
  const { articles, setArticles } = useContext(ArticlesContext);
  const { visible, setVisible } = useContext(VisibleContext);
  const { totalArticles, setTotalArticles } = useContext(TotalArticlesContext);
  const { filteredArticles, setFilteredArticles } = useContext(
    FilteredArticlesContext
  );
  const { searchBarList, setSearchBarList } = useContext(SearchBarListContext);
  const { featuredArticles, setFeaturedArticles } = useContext(
    FeaturedArticlesContext
  );
  const { article, setArticle } = useContext(MainArticleContext);
  const { setComments } = useContext(ArticleCommentsContext);
  const { setCommentCount } = useContext(CommentCountContext);
  const { voteCount, setVoteCount } = useContext(VoteCountContext);
  const { setIsInitialRender } = useContext(InitialRenderContext);
  const { loadingStates, setLoading } = useLoading();

  const fetchArticleCount = useCallback(
    (topicParam, sortByParam, orderParam, limit, page) => {
      getAllArticles(topicParam, sortByParam, orderParam, limit, page)
        .then((results) => {
          setAllArticlesCount(results.total_count.total_count);
        })
        .catch(console.error);
    },
    [setLoading, setAllArticlesCount]
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
    [setLoading, setFeaturedArticles]
  );

  const fetchAdditionalArticles = useCallback(
    (topicParam, sortByParam, orderParam, limit, page) => {
      getAllArticles(topicParam, sortByParam, orderParam, limit, page)
        .then((results) => {
          setArticles((prev) => [...prev, ...results.articles]);
          setVisible((prev) => prev + results.articles.length);
        })
        .catch(console.error);
    },
    [setLoading, setArticles, setVisible]
  );

  const fetchArticles = useCallback(
    (topicParam, sortByParam, orderParam, limit, page) => {
      setLoading("articles", true);
      getAllArticles(topicParam, sortByParam, orderParam, limit, page)
        .then((results) => {
          setArticles(results.articles);
          setTotalArticles(results.total_count.total_count);
          setLoading("articles", false);
          setIsInitialRender(false);
        })
        .catch(console.error);
    },
    [setLoading, setArticles, setTotalArticles]
  );

  const fetchFilteredArticles = useCallback(
    (topicParam, sortByParam, orderParam, limit, page) => {
      getAllArticles(topicParam, sortByParam, orderParam, limit, page)
        .then((results) => {
          setFilteredArticles(results.articles);
          setLoading("filteredArticles", false);
        })
        .catch(console.error);
    },
    [setLoading, setFilteredArticles]
  );

  const fetchMostPopularArticles = useCallback(
    async (topicParam, sortByParam, orderParam, limit, page) => {
      setLoading("mostPopularArticles", true);
      try {
        const mostPopularArticles = await getAllArticles(
          topicParam,
          sortByParam,
          orderParam,
          limit,
          page
        );
        setSearchBarList(mostPopularArticles.articles);
        setLoading("mostPopularArticles", false);
      } catch (error) {
        console.error(error);
      }
    },
    [setLoading, setSearchBarList]
  );

  const fetchArticle = useCallback(
    (article_id) => {
      setLoading("article", true);
      setComments([]);
      getArticle(article_id)
        .then((article) => {
          setArticle(article);
          setVoteCount(article.votes);
          setCommentCount(article.comment_count);
          setLoading("article", false);
        })
        .catch(console.error);
    },
    [setLoading, setArticle, setVoteCount, setCommentCount, setComments]
  );

  const fetchArticleComments = useCallback(
    (article_id) => {
      setComments([]);
      getArticleComments(article_id)
        .then((articleComments) => {
          setComments(articleComments);
        })
        .catch(console.error);
    },
    [setComments]
  );

  const updateArticle = useCallback(
    (article_id, incVotes) => {
      patchArticle(article_id, incVotes)
        .then((article) => {
          setVoteCount(article.votes);
        })
        .catch(() => {
          setVoteCount((prev) => prev - incVotes);
        })
        .finally(() => {
          setLoading("updateArticle", false);
        });
    },
    [setLoading, setVoteCount]
  );

  const deleteComment = useCallback(
    (article_id) => {
      deleteArticleComment(article_id)
        .then(() => {
          setCommentCount((count) => count - 1);
        })
        .catch(console.error);
    },
    [setLoading, setCommentCount]
  );

  const createArticleComment = useCallback(
    (article_id, body, username) => {
      setComments([]);
      postArticleComment(article_id, body, username)
        .then((comment) => {
          setComments((comments) => [comment, ...comments]);
          setCommentCount((count) => count + 1);
        })
        .catch(console.error);
    },
    [setLoading, setComments, setCommentCount]
  );

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
        createArticleComment,
        loadingStates,
      }}
    >
      {children}
    </ApiContext.Provider>
  );
};

// Custom hook to use the API context
export const useApi = () => {
  const context = useContext(ApiContext);
  if (!context) {
    throw new Error("useApi must be used within an ApiProvider");
  }
  return context;
};
