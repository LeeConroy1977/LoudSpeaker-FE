import axios from "axios";

const loudSpeakerApi = axios.create({
  baseURL: "https://nc-news-northcoders-project.onrender.com",
});
export const getAllArticles = (topic, sorted_by, order = "desc", limit, p) => {
  const topicParam = topic || "";

  const params = {
    topic: topicParam,
    sorted_by,
    order,
    limit,
    p,
  };
  return loudSpeakerApi
    .get("/api/articles", { params })
    .then(({ data }) => {
      return data.results;
    })
    .catch((error) => {
      // Handle specific AxiosError or general errors here
      if (error.response) {
        // The request was made and the server responded with a status code
        console.error(
          "Server responded with status code:",
          error.response.status
        );
        console.error("Response data:", error.response.data);
      } else if (error.request) {
        // The request was made but no response was received
        console.error("No response received:", error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error("Error setting up request:", error.message);
      }
      console.error("Error config:", error.config);
      throw error; // Re-throw the error to propagate it further if needed
    });
};

export async function getArticle(id) {
  return loudSpeakerApi.get(`/api/articles/${id}`).then(({ data }) => {
    return data.article;
  });
}

export async function patchArticle(id, inc_votes) {
  return loudSpeakerApi
    .patch(`/api/articles/${id}`, { inc_votes })
    .then(({ data }) => {
      return data.article;
    });
}
