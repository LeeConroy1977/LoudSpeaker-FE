import { useParams } from "react-router-dom";
import ArticleCard from "../components/ArticleCard";
import { getArticle } from "../../utilities/api/articlesApi";
import { getArticleComments } from "../../utilities/api/commentsApi";
import { useEffect, useState } from "react";

const Article = ({ handlePostCommentContainerOpen }) => {
  const [article, setArticle] = useState({});
  const [comments, setComments] = useState([]);
  const { article_id } = useParams();
  useEffect(() => {
    getArticle(article_id).then((article) => {
      console.log(article);
      setArticle(article);
    });
    getArticleComments(article_id).then((articleComments) => {
      console.log(articleComments);
      setComments(articleComments);
    });
  }, [article_id]);

  return (
    <div>
      {article && comments && (
        <ArticleCard
          article={article}
          comments={comments}
          handlePostCommentContainerOpen={handlePostCommentContainerOpen}
        />
      )}
    </div>
  );
};

export default Article;
