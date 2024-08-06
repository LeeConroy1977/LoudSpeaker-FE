import { useParams } from "react-router-dom";
import ArticleCard from "../components/ArticleCard";
import { getArticle, patchArticle } from "../../utilities/api/articlesApi";
import { getArticleComments } from "../../utilities/api/commentsApi";
import { useContext, useEffect, useRef, useState } from "react";
import { MainArticleContext } from "../contexts/MainArticleContext";
import { ArticleCommentsContext } from "../contexts/ArticleCommentsContext";

const Article = ({ setCommentCount, commentCount }) => {
  const { article, setArticle } = useContext(MainArticleContext);
  const { setComments } = useContext(ArticleCommentsContext);
  const [incVotes, setIncVotes] = useState(0);
  const { article_id } = useParams();
  const { votes } = article;
  const [voteCount, setVoteCount] = useState(votes);

  const isFirst = useRef(true);

  console.log(article_id);

  useEffect(() => {
    if (article_id) {
      getArticle(article_id)
        .then((article) => {
          setArticle(article);

          console.log(article, "<<<<<<<<<<<<<<<<<<");
          setVoteCount(article.votes);
          setCommentCount(article.comment_count);
          console.log(commentCount);
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
    setVoteCount(article.comment_count);
  }, []);

  const handleVoteCount = (change) => {
    setIncVotes(change);
    setVoteCount(voteCount + change);
  };

  console.log(article.article_id);

  return (
    <div>
      {article && (
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
