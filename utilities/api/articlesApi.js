import axios from "axios";

const loudSpeakerApi = axios.create({
  baseURL: "https://nc-news-northcoders-project.onrender.com",
});

export const getAllArticles = () => {
  return loudSpeakerApi.get("/api/articles");
};
