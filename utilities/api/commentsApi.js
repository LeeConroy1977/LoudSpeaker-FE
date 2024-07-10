import axios from "axios";

const loudSpeakerApi = axios.create({
  baseURL: "https://nc-news-northcoders-project.onrender.com",
});

export async function getArticleComments(id) {
  return loudSpeakerApi.get(`/api/articles/${id}/comments`).then(({ data }) => {
    return data.articleComments;
  });
}
