import { useContext, useEffect} from "react";
import { useParams } from "react-router-dom";
import ArticleCard from "../components/ArticleCard";
import LoadingSpinner from "../reuseable-components/LoadingSpinner";
import SearchContainer from "../components/SearchContainer";
import { ScreenSizeContext } from "../contexts/ScreenSizeContext";
import { SearchOpenContext } from "../contexts/SearchOpenContext";
import { ArticlesContext } from "../contexts/ArticlesContext";
import { CommentsContext } from "../contexts/CommentsContext";

const Article = () => {
  const { isSearchOpen } = useContext(SearchOpenContext);
  const { width } = useContext(ScreenSizeContext);
  const {
    state: {},
    fetchArticleComments,
  } = useContext(CommentsContext);
  const {
    state: { loading },
    fetchArticle,
  } = useContext(ArticlesContext);

  const { article_id } = useParams();

  useEffect(() => {
    fetchArticle(article_id);
  }, [article_id]);

  useEffect(() => {
    fetchArticleComments(article_id);
  }, [article_id]);

  return (
    <div>
      {width < 900 && isSearchOpen && <SearchContainer />}
      {loading ? (
        <div className="w-[100%] h-[600px] flex items-center justify-center">
          <LoadingSpinner />
        </div>
      ) : (
        <ArticleCard />
      )}
    </div>
  );
};

export default Article;
