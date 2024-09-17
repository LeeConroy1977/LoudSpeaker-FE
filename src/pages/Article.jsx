import { useContext, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import ArticleCard from "../components/ArticleCard";
import LoadingSpinner from "../reuseable-components/LoadingSpinner";
import SearchContainer from "../components/SearchContainer";
import { ScreenSizeContext } from "../contexts/ScreenSizeContext";
import { SearchOpenContext } from "../contexts/SearchOpenContext";
import { VoteCountContext } from "../contexts/VoteCountContext";
import { useApi } from "../contexts/ApiContext";
import { useLoading } from "../contexts/LoadingContext";
import { UserCommentContext } from "../contexts/UserCommentContext";

const Article = () => {
  const { isSearchOpen } = useContext(SearchOpenContext);
  const { width } = useContext(ScreenSizeContext);
  const { voteCount, setVoteCount } = useContext(VoteCountContext);
  const { userComment } = useContext(UserCommentContext);
  const { fetchArticle, fetchArticleComments, updateArticle } = useApi();
  const { article_id } = useParams();
  const [incVotes, setIncVotes] = useState(0);
  const { loadingStates } = useLoading();

  useEffect(() => {
    fetchArticle(article_id, userComment);
  }, [article_id]);

  useEffect(() => {
    fetchArticleComments(article_id);
  }, [article_id]);

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
      {loadingStates.mainArticle ? (
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
