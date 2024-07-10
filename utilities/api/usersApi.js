import axios from "axios";

const loudSpeakerApi = axios.create({
  baseURL: "https://nc-news-northcoders-project.onrender.com",
});

export const getAllUsers = () => {
  return loudSpeakerApi.get("/api/users");
};
