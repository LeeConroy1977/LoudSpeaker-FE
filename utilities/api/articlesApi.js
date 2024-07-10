import axios from "axios";

const loudSpeakerApi = axios.create({
  baseURL: "https://nc-news-northcoders-project.onrender.com",
});

export const getAllArticles = () => {
  return loudSpeakerApi.get("/api/articles");
};

export async function getArticle(id) {
  return loudSpeakerApi.get(`/api/articles/${id}`).then(({ data }) => {
    return data.article;
  });
}
