import { useParams } from "react-router-dom";
import ArticleCard from "../components/ArticleCard";
import { getArticle, patchArticle } from "../../utilities/api/articlesApi";
import { getArticleComments } from "../../utilities/api/commentsApi";
import { useContext, useEffect, useRef, useState } from "react";
import { MainArticleContext } from "../contexts/MainArticleContext";
import { ArticleCommentsContext } from "../contexts/ArticleCommentsContext";
import { FaLessThanEqual } from "react-icons/fa6";
import { Oval } from "react-loader-spinner";
import LoadingSpinner from "../reuseable-components/LoadingSpinner";
import SearchContainer from "../components/SearchContainer";
import { ScreenSizeContext } from "../contexts/ScreenSizeContext";
import { SearchOpenContext } from "../contexts/SearchOpenContext";

const Article = ({ setCommentCount, commentCount, popularArticles }) => {
  const { article, setArticle } = useContext(MainArticleContext);
  const { setComments } = useContext(ArticleCommentsContext);
  const { isSearchOpen } = useContext(SearchOpenContext);
  const [incVotes, setIncVotes] = useState(0);
  const { article_id } = useParams();
  const { votes } = article;
  const [voteCount, setVoteCount] = useState(votes);
  const [isLoading, setIsLoading] = useState(FaLessThanEqual);
  const { width } = useContext(ScreenSizeContext);

  const isFirst = useRef(true);

  console.log(article_id);

  useEffect(() => {
    setIsLoading(true);
    if (article_id) {
      getArticle(article_id)
        .then((article) => {
          setComments([]);
          setArticle(article);
          setVoteCount(article.votes);
          setCommentCount(article.comment_count);
          setIsLoading(false);
        })
        .catch((error) => console.error("Error:", error));
    }
  }, [article_id, setArticle]);

  useEffect(() => {
    getArticleComments(article_id).then((articleComments) => {
      setComments(articleComments);
    });
  }, [article_id, commentCount]);

  console.log(article.title);

  useEffect(() => {
    if (!isFirst.current) {
      patchArticle(article_id, incVotes)
        .then((article) => {
          setVoteCount(article.votes);
        })
        .catch(() => {
          setVoteCount(voteCount - incVotes);
        });
    }
  }, [incVotes]);

  useEffect(() => {
    isFirst.current = false;
  }, []);

  useEffect(() => {
    setVoteCount(article.votes);
  }, []);

  const handleVoteCount = (change) => {
    setIncVotes(change);
    setVoteCount(voteCount + change);
  };

  console.log(article.article_id);

  return (
    <div>
      {width < 640 && isSearchOpen && (
        <SearchContainer popularArticles={popularArticles} />
      )}
      {isLoading ? (
        <div className="w-[100%] h-[600px] flex items-center justify-center">
          <LoadingSpinner />
        </div>
      ) : (
        <ArticleCard
          article={article}
          handleVoteCount={handleVoteCount}
          voteCount={voteCount}
          commentCount={commentCount}
          setCommentCount={setCommentCount}
        />
      )}
    </div>
  );
};

export default Article;
