import { useContext, useEffect, useState } from "react";
import AppLayout from "./AppLayout";
import { Route, Routes, useSearchParams } from "react-router-dom";
import Home from "../pages/Home";
import Article from "../pages/Article";
import { VisibleContext } from "../contexts/VisibleContext";
import { VoteCountContext } from "../contexts/VoteCountContext";
import { ArticlesContext } from "../contexts/ArticlesContext";
import { CommentsContext } from "../contexts/CommentsContext";
import { UserContext } from "../contexts/UserContext";

const AppRoutes = () => {
  const {
    state: { totalComments },
  } = useContext(CommentsContext);
  const { visible } = useContext(VisibleContext);
  const {
    state: { totalArticles },
    fetchTotalArticlesCount,
    fetchAdditionalArticles,
    fetchPopularArticles,
    fetchArticles,
    fetchFeaturedArticles,
  } = useContext(ArticlesContext);
  const [searchParams] = useSearchParams();
  const topicParam = searchParams.get("topic");
  const sortByParam = searchParams.get("sort_by");
  const orderParam = searchParams.get("order");
  const [searchInput] = useState("");
  const { voteCount } = useContext(VoteCountContext);

  const [limit] = useState(12);
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetchTotalArticlesCount();
  }, []);

  useEffect(() => {
    fetchAdditionalArticles(topicParam, sortByParam, orderParam, limit, page);
  }, [page]);

  useEffect(() => {
    setPage(1);
    fetchArticles(topicParam, sortByParam, orderParam, limit, page);
  }, [topicParam, sortByParam, orderParam, voteCount]);

  useEffect(() => {
    fetchPopularArticles(null, "votes", null, "10000", null);
  }, []);

  function handleOnLoadMore() {
    return setPage((prev) => prev + 1);
  }

  return (
    <Routes>
      <Route path="/" element={<AppLayout searchInput={searchInput} />}>
        <Route
          index
          element={
            <Home handleOnLoadMore={handleOnLoadMore} visible={visible} />
          }
        />
        <Route
          path="/articles"
          element={
            <Home
              handleOnLoadMore={handleOnLoadMore}
              visible={visible}
              topicParam={topicParam}
            />
          }
        />
        <Route
          path="/articles/:article_id"
          element={<Article commentCount={totalComments} />}
        />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
