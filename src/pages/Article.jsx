import { useContext, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import ArticleCard from "../components/ArticleCard";
import { MainArticleContext } from "../contexts/MainArticleContext";
import { ArticleCommentsContext } from "../contexts/ArticleCommentsContext";
import LoadingSpinner from "../reuseable-components/LoadingSpinner";
import SearchContainer from "../components/SearchContainer";
import { ScreenSizeContext } from "../contexts/ScreenSizeContext";
import { SearchOpenContext } from "../contexts/SearchOpenContext";
import { VoteCountContext } from "../contexts/VoteCountContext";
import { CommentCountContext } from "../contexts/commentCountContext";
import { useApi } from "../contexts/ApiContext";

const Article = () => {
  const { article, setArticle } = useContext(MainArticleContext);
  const { isSearchOpen } = useContext(SearchOpenContext);
  const { width } = useContext(ScreenSizeContext);
  const { commentCount } = useContext(CommentCountContext);
  const { voteCount, setVoteCount } = useContext(VoteCountContext);
  const { fetchArticle, fetchArticleComments, updateArticle } = useApi();
  const { article_id } = useParams();
  const [incVotes, setIncVotes] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchArticle(article_id);
  }, [article_id, setArticle]);

  useEffect(() => {
    fetchArticleComments(article_id);
  }, [article_id, commentCount]);

  useEffect(() => {
    updateArticle(article_id, incVotes);
  }, [incVotes]);

  const handleVoteCount = (change) => {
    setIncVotes(change);
    setVoteCount(voteCount + change);
  };

  return (
    <div>
      {width < 640 && isSearchOpen && <SearchContainer />}
      {isLoading ? (
        <div className="w-[100%] h-[600px] flex items-center justify-center">
          <LoadingSpinner />
        </div>
      ) : (
        <ArticleCard handleVoteCount={handleVoteCount} />
      )}
    </div>
  );
};

export default Article;
