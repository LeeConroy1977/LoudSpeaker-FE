import React, { createContext, useContext } from "react";
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

  const fetchArticleCount = (
    topicParam,
    sortByParam,
    orderParam,
    limit,
    page
  ) => {
    getAllArticles(topicParam, sortByParam, orderParam, limit, page).then(
      (results) => {
        setAllArticlesCount(results.total_count.total_count);
        console.log(results.total_count.total_count);
      }
    );
  };

  console.log(AllArticlesCount);

  const fetchFeaturedArticles = async (
    topicParam,
    sortByParam,
    orderParam,
    limit,
    page
  ) => {
    getAllArticles(topicParam, sortByParam, orderParam, limit, page).then(
      (results) => {
        const featured = results.articles.filter(
          (article) => article.featured === true
        );
        setFeaturedArticles(featured);
        console.log(featured, "featured");
      }
    );
  };

  const fetchAdditionalArticles = (
    topicParam,
    sortByParam,
    orderParam,
    limit,
    page
  ) => {
    getAllArticles(topicParam, sortByParam, orderParam, limit, page).then(
      (results) => {
        setArticles((prev) => [...prev, ...results.articles]);

        setVisible((prev) => prev + results.articles.length);
      }
    );
  };

  const fetchArticles = (topicParam, sortByParam, orderParam, limit, page) => {
    getAllArticles(topicParam, sortByParam, orderParam, limit, page).then(
      (results) => {
        setArticles(results.articles);
        setTotalArticles(results.total_count.total_count);
      }
    );
  };

  const fetchFilteredArticles = (
    topicParam,
    sortByParam,
    orderParam,
    limit,
    page
  ) => {
    getAllArticles(topicParam, sortByParam, orderParam, limit, page).then(
      (results) => {
        setFilteredArticles(results.articles);
      }
    );
  };

  async function fetchMostPopularArticles(
    topicParam,
    sortByParam,
    orderParam,
    limit,
    page
  ) {
    const mostPopularArticles = await getAllArticles(
      topicParam,
      sortByParam,
      orderParam,
      limit,
      page
    );

    setSearchBarList(mostPopularArticles.articles);
  }

  const fetchArticle = (article_id) => {
    getArticle(article_id).then((article) => {
      setComments([]);
      setArticle(article);
      setVoteCount(article.votes);
      setCommentCount(article.comment_count);
    });
  };

  const fetchArticleComments = (article_id) => {
    getArticleComments(article_id).then((articleComments) => {
      setComments(articleComments);
    });
  };

  const updateArticle = (article_id, incVotes) => {
    patchArticle(article_id, incVotes)
      .then((article) => {
        setVoteCount(article.votes);
      })
      .catch(() => {
        setVoteCount(voteCount - incVotes);
      });
  };

  const deleteComment = (article_id) => {
    deleteArticleComment(article_id);
    setCommentCount((count) => count - 1);
  };

  const createArticleComment = (article_id, body, username) => {
    postArticleComment(article_id, body, username).then((comment) => {
      setComments((comments) => [comment, ...comments]);
      setCommentCount((count) => count + 1);
    });
  };

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
