import axios from "axios";

const loudSpeakerApi = axios.create({
  baseURL: "https://nc-news-northcoders-project.onrender.com",
});

export async function getArticleComments(id) {
  return loudSpeakerApi.get(`/api/articles/${id}/comments`).then(({ data }) => {
    return data.articleComments;
  });
}
export async function postArticleComment(id, body, username) {
  return loudSpeakerApi
    .post(`/api/articles/${id}/comments`, { body, username })
    .then(({ data }) => {
      return data.comment;
    });
}

export async function deleteArticleComment(id) {
  return loudSpeakerApi.delete(`/api/comments/${id}`);
  // .then(({ data }) => {
  //   return data.comment;
  // });
}
