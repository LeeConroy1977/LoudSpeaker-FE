import { useContext, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import ArticleCard from "../components/ArticleCard";
import { MainArticleContext } from "../contexts/MainArticleContext";
import LoadingSpinner from "../reuseable-components/LoadingSpinner";
import SearchContainer from "../components/SearchContainer";
import { ScreenSizeContext } from "../contexts/ScreenSizeContext";
import { SearchOpenContext } from "../contexts/SearchOpenContext";
import { VoteCountContext } from "../contexts/VoteCountContext";
import { CommentCountContext } from "../contexts/commentCountContext";
import { DeletedCommentIdContext } from "../contexts/DeletedCommentIdContext";
import { useApi } from "../contexts/ApiContext";
import { ArticleCommentsContext } from "../contexts/ArticleCommentsContext";
import { useLoading } from "../contexts/LoadingContext";

const Article = () => {
  const { article, setArticle } = useContext(MainArticleContext);
  const { isSearchOpen } = useContext(SearchOpenContext);
  const { width } = useContext(ScreenSizeContext);
  const { comments, setComments } = useContext(ArticleCommentsContext);
  const { commentCount } = useContext(CommentCountContext);
  const { voteCount, setVoteCount } = useContext(VoteCountContext);
  const { deletedCommentId } = useContext(DeletedCommentIdContext);
  const { fetchArticle, fetchArticleComments, updateArticle } = useApi();
  const { article_id } = useParams();
  const [incVotes, setIncVotes] = useState(0);

  const { loadingStates } = useLoading();

  useEffect(() => {
    fetchArticle(article_id);
  }, [article_id, setArticle]);

  useEffect(() => {
    fetchArticleComments(article_id);
  }, [article_id, commentCount, deletedCommentId]);

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
      {loadingStates.article ? (
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
