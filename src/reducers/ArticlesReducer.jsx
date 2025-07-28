const initialState = {
  articles: [],
  filteredArticles: [],
  featuredArticles: [],
  popularArticles: [],
  articleCount: 0,
  totalArticles: 0,
  selectedArticle: null,
  loading: false,
  error: null,
};

const ArticlesReducer = (state = initialState, action) => {
  switch (action.type) {
    case "CLEAR_ARTICLE":
      return {
        ...state,
        selectedArticle: null,
      };
    case "FETCH_ARTICLE":
      return {
        ...state,
        loading: true,
        error: null,
      };
    case "FETCH_ARTICLE_SUCCESS":
      return {
        ...state,
        selectedArticle: action.payload,
        loading: false,
        error: null,
      };
    case "FETCH_ARTICLE_FAILURE":
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case "FETCH_ARTICLES":
      return {
        ...state,
        loading: true,
        error: null,
      };
    case "FETCH_ARTICLES_SUCCESS":
      return {
        ...state,
        articles: action.payload.articles || [],
        filteredArticles: action.payload.articles || [],
        articleCount: action.payload.totalCount || 0,
        loading: false,
        error: null,
      };
    case "FETCH_ARTICLES_FAILURE":
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case "FETCH_ADDITIONAL_ARTICLES":
      return {
        ...state,
        loading: true,
        error: null,
      };
    case "FETCH_ADDITIONAL_ARTICLES_SUCCESS":
      return {
        ...state,
        articles: [...state.articles, ...action.payload.articles] || [],
        articleCount: action.payload.totalCount || 0,
        loading: false,
        error: null,
      };
    case "FETCH_ADDITIONAL__FAILURE":
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case "FETCH_TOTAL_ARTICLES":
      return {
        ...state,
        loading: true,
        error: null,
      };
    case "FETCH_TOTAL_ARTICLES_SUCCESS":
      return {
        ...state,
        totalArticles: action.payload || 0,
        loading: false,
        error: null,
      };
    case "FETCH_TOTAL_ARTICLES_FAILURE":
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case "FETCH_POPULAR_ARTICLES":
      return {
        ...state,
        loading: true,
        error: null,
      };
    case "FETCH_POPULAR_ARTICLES_SUCCESS":
      const popArticles = action.payload
        .sort((a, b) => b.votes - a.votes)
        .slice(0, 6);
      return {
        ...state,
        popularArticles: popArticles || [],
        loading: false,
        error: null,
      };
    case "FETCH_POPULAR_ARTICLES_FAILURE":
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case "FETCH_FEATURED_ARTICLES":
      return {
        ...state,
        loading: true,
        error: null,
      };
    case "FETCH_FEATURED_ARTICLES_SUCCESS":
      return {
        ...state,
        featuredArticles: action.payload || [],
        loading: false,
        error: null,
      };
    case "FETCH_FEATURED_ARTICLES_FAILURE":
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case "CREATE_ARTICLE":
      return {
        ...state,
        loading: true,
        error: null,
      };
    case "CREATE_ARTICLES_SUCCESS":
      return {
        ...state,
        articles: [action.payload, ...state.articles],
        filteredArticles: [action.payload, ...state.filteredArticles],
        articleCount: state.articleCount + 1,
        totalArticles: state.totalArticles + 1,
        loading: false,
        error: null,
      };
    case "CREATE_ARTICLES_FAILURE":
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case "LIKE_ARTICLE":
    case "UNLIKE_ARTICLE":
      return {
        ...state,
        loading: true,
        error: null,
      };
    case "LIKE_ARTICLES_SUCCESS":
    case "UNLIKE_ARTICLES_SUCCESS":
      if (process.env.NODE_ENV === "development") {
        console.log(
          "Updating votes for article:",
          action.payload.id,
          "New votes:",
          action.payload.votes
        );
      }
      return {
        ...state,
        articles: state.articles.map((article) =>
          article.id === action.payload.id
            ? { ...article, votes: action.payload.votes }
            : article
        ),
        filteredArticles: state.filteredArticles.map((article) =>
          article.id === action.payload.id
            ? { ...article, votes: action.payload.votes }
            : article
        ),
        featuredArticles: state.featuredArticles.map((article) =>
          article.id === action.payload.id
            ? { ...article, votes: action.payload.votes }
            : article
        ),
        selectedArticle:
          state.selectedArticle?.id === action.payload.id
            ? { ...state.selectedArticle, votes: action.payload.votes }
            : state.selectedArticle,
        loading: false,
        error: null,
      };
    case "LIKE_ARTICLES_FAILURE":
    case "UNLIKE_ARTICLES_FAILURE":
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default ArticlesReducer;
