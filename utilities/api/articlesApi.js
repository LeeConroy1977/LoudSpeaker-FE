import axios from "axios";

const loudSpeakerApi = axios.create({
  baseURL: "https://nc-news-northcoders-project.onrender.com",
});

export async function getAllArticles(
  topic,
  sorted_by,
  order = "desc",
  limit,
  p
) {
  const topicParam = topic || "";

  const params = {
    topic: topicParam,
    sorted_by,
    order,
    limit,
    p,
  };

  try {
    const { data } = await loudSpeakerApi.get("/api/articles", { params });
    return data.results;
  } catch (error) {
    if (error.response) {
      console.error(
        "Server responded with status code:",
        error.response.status
      );
      console.error("Response data:", error.response.data);
    } else if (error.request) {
      console.error("No response received:", error.request);
    } else {
      console.error("Error setting up request:", error.message);
    }
    console.error("Error config:", error.config);
    throw error;
  }
}

export async function getArticle(id) {
  try {
    const { data } = await loudSpeakerApi.get(`/api/articles/${id}`);
    console.log(data, "data<<<<<<<<<<<<<<<<<<<<<<<<<<<<");
    return data.article;
  } catch (error) {
    console.error("Error fetching article:", error);
    throw error;
  }
}

export async function postArticle(body) {
  try {
    const { data } = await loudSpeakerApi.post(`/api/articles`, body);
    return data.article;
  } catch (error) {
    console.error("Error posting article:", error);
    throw error;
  }
}

export async function patchArticle(id, inc_votes) {
  try {
    const { data } = await loudSpeakerApi.patch(`/api/articles/${id}`, {
      inc_votes,
    });
    return data.article;
  } catch (error) {
    console.error("Error patching article:", error);
    throw error;
  }
}
