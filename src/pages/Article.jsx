import ArticleCard from "../components/ArticleCard";

const Article = ({ selectedArticle }) => {
  return (
    <div>
      <ArticleCard article={selectedArticle} />
    </div>
  );
};

export default Article;
