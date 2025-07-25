import { createContext, useReducer, useCallback } from "react";
import CommentsReducer from "../reducers/CommentReducer";
import {
  deleteArticleComment,
  getArticleComments,
  patchComment,
  postArticleComment,
} from "../../utilities/api/commentsApi";

const initialState = {
  comments: [],
  totalComments: 0,
  loading: false,
  error: null,
};

export const CommentsContext = createContext();

export const CommentsProvider = ({ children }) => {
  const [state, dispatch] = useReducer(CommentsReducer, initialState);

  const fetchArticleCommentsTotal = useCallback(async (id) => {
    dispatch({ type: "FETCH_TOTAL_COMMENTS" });
    try {
      const response = await getArticleComments(id);
      dispatch({
        type: "FETCH_TOTAL_COMMENTS_SUCCESS",
        payload: response.length,
      });
    } catch (error) {
      console.error("Error fetching total comments:", error);
      dispatch({
        type: "FETCH_TOTAL_COMMENTS_FAILURE",
        payload: error.message || "Error fetching total comments",
      });
    }
  }, []);

  const fetchArticleComments = useCallback(async (id) => {
    dispatch({ type: "FETCH_COMMENTS" });
    try {
      const response = await getArticleComments(id);
      const mappedComments = response.map((comment) => ({
        id: comment.comment_id,
        body: comment.body,
        username: comment.author,
        created_at: comment.created_at,
        votes: comment.votes,
      }));
      dispatch({
        type: "FETCH_COMMENTS_SUCCESS",
        payload: mappedComments,
      });
    } catch (error) {
      console.error("Error fetching comments:", error);
      dispatch({
        type: "FETCH_COMMENTS_FAILURE",
        payload: error.message || "Error fetching comments",
      });
    }
  }, []);

  const CreateArticleComments = useCallback(async (id, body, username) => {
    dispatch({ type: "CREATE_COMMENT" });
    try {
      const response = await postArticleComment(id, body, username);
      const mappedComment = {
        id: response.comment_id,
        body: response.body,
        username: response.author,
        created_at: response.created_at,
        votes: response.votes,
      };
      dispatch({
        type: "CREATE_COMMENT_SUCCESS",
        payload: mappedComment,
      });
      return mappedComment;
    } catch (error) {
      console.error("Error posting comment:", error);
      dispatch({
        type: "CREATE_COMMENT_FAILURE",
        payload: error.message || "Error posting comment",
      });
      throw error;
    }
  }, []);

  const handleLikeComment = useCallback(async (id, inc_vote) => {
    dispatch({ type: "LIKE_COMMENT" });
    try {
      const response = await patchComment(id, inc_vote);
      if (!response || typeof response.votes !== "number") {
        throw new Error("Invalid comment response: missing votes");
      }
      const updatedComment = {
        comment_id: response.comment_id,
        votes: response.votes,
      };
      dispatch({
        type: "LIKE_COMMENT_SUCCESS",
        payload: updatedComment,
      });
      return updatedComment; 
    } catch (error) {
      console.error("Error liking comment:", error);
      dispatch({
        type: "LIKE_COMMENT_FAILURE",
        payload: error.message || "Error liking comment",
      });
      throw error;
    }
  }, []);

  const handleUnlikeComment = useCallback(async (id, inc_vote) => {
    dispatch({ type: "UNLIKE_COMMENT" });
    try {
      const response = await patchComment(id, inc_vote);
      if (!response || typeof response.votes !== "number") {
        throw new Error("Invalid comment response: missing votes");
      }
      const updatedComment = {
        comment_id: response.comment_id,
        votes: response.votes,
      };
      dispatch({
        type: "UNLIKE_COMMENT_SUCCESS",
        payload: updatedComment,
      });
      return updatedComment; 
    } catch (error) {
      console.error("Error unliking comment:", error);
      dispatch({
        type: "UNLIKE_COMMENT_FAILURE",
        payload: error.message || "Error unliking comment",
      });
      throw error;
    }
  }, []);

  const handleRemoveComment = useCallback(async (id) => {
    dispatch({ type: "DELETE_COMMENT" });
    try {
      await deleteArticleComment(id);
      dispatch({
        type: "DELETE_COMMENT_SUCCESS",
        payload: { id },
      });
    } catch (error) {
      console.error("Error removing comment:", error);
      dispatch({
        type: "DELETE_COMMENT_FAILURE",
        payload: error.message || "Error removing comment",
      });
    }
  }, []);

  return (
    <CommentsContext.Provider
      value={{
        state,
        fetchArticleComments,
        fetchArticleCommentsTotal,
        CreateArticleComments,
        handleLikeComment,
        handleUnlikeComment,
        handleRemoveComment,
      }}>
      {children}
    </CommentsContext.Provider>
  );
};
