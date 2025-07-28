const initialState = {
  comments: [],
  totalComments: 0,
  loading: false,
  error: null,
};

const CommentsReducer = (state = initialState, action) => {
  switch (action.type) {
    case "CLEAR_COMMENTS":
      return {
        ...state,
        comments: [],
      };
    case "FETCH_TOTAL_COMMENTS":
      return {
        ...state,
        loading: true,
        error: null,
      };
    case "FETCH_TOTAL_COMMENTS_SUCCESS":
      return {
        ...state,
        totalComments: action.payload,
        loading: false,
        error: null,
      };
    case "FETCH_TOTAL_COMMENTS_FAILURE":
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case "FETCH_COMMENTS":
      return {
        ...state,
        loading: true,
        error: null,
      };
    case "FETCH_COMMENTS_SUCCESS":
      return {
        ...state,
        comments: action.payload,
        totalComments: action.payload.length,
        loading: false,
        error: null,
      };
    case "FETCH_COMMENTS_FAILURE":
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case "CREATE_COMMENT":
      return {
        ...state,
        loading: true,
        error: null,
      };
    case "CREATE_COMMENT_SUCCESS":
      return {
        ...state,
        comments: [action.payload, ...state.comments],
        totalComments: action.payload.length,
        loading: false,
        error: null,
      };
    case "CREATE_COMMENT_FAILURE":
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case "LIKE_COMMENT":
      return {
        ...state,
        loading: true,
        error: null,
      };
    case "LIKE_COMMENT_SUCCESS":
      return {
        ...state,
        comments: state.comments.map((comment) =>
          comment.comment_id === action.payload.comment_id
            ? { ...comment, votes: action.payload.votes }
            : comment
        ),
        loading: false,
        error: null,
      };
    case "LIKE_COMMENT_FAILURE":
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case "UNLIKE_COMMENT":
      return {
        ...state,
        loading: true,
        error: null,
      };
    case "UNLIKE_COMMENT_SUCCESS":
      return {
        ...state,
        comments: state.comments.map((comment) =>
          comment.comment_id === action.payload.comment_id
            ? { ...comment, votes: action.payload.votes }
            : comment
        ),
        loading: false,
        error: null,
      };
    case "UNLIKE_COMMENT_FAILURE":
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case "DELETE_COMMENT":
      return {
        ...state,
        loading: true,
        error: null,
      };
    case "DELETE_COMMENT_SUCCESS":
      return {
        ...state,
        loading: false,
        comments: state.comments.filter(
          (comment) => comment.id !== action.payload.id
        ),
      };
    case "DELETE_COMMENT_FAILURE":
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default CommentsReducer;
