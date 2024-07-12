import { useParams } from "react-router-dom";
import ArticleCard from "../components/ArticleCard";
import { getArticle, patchArticle } from "../../utilities/api/articlesApi";
import { getArticleComments } from "../../utilities/api/commentsApi";
import { useContext, useEffect, useRef, useState } from "react";
import { MainArticleContext } from "../contexts/MainArticleContext";

const Article = ({ handlePostCommentContainerOpen }) => {
  const [comments, setComments] = useState([]);
  const { article, setArticle } = useContext(MainArticleContext);
  const [incVotes, setIncVotes] = useState(0);
  const { article_id } = useParams();
  const { votes } = article;
  const [voteCount, setVoteCount] = useState(votes);

  const isFirst = useRef(true);

  useEffect(() => {
    getArticle(article_id).then((article) => {
      console.log(article);
      setArticle(article);
      setVoteCount(article.votes);
      console.log(voteCount);
    });

    getArticleComments(article_id).then((articleComments) => {
      console.log(articleComments);
      setComments(articleComments);
    });
  }, [article_id, setArticle]);

  console.log(voteCount);

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

  const handleVoteCount = (change) => {
    setIncVotes(change);
    setVoteCount(voteCount + change);
  };

  return (
    <div>
      {article && (
        <ArticleCard
          article={article}
          comments={comments}
          handlePostCommentContainerOpen={handlePostCommentContainerOpen}
          handleVoteCount={handleVoteCount}
          voteCount={voteCount}
        />
      )}
    </div>
  );
};

export default Article;
