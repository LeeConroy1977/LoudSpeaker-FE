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
export async function patchComment(id, inc_votes) {
  try {
    const { data } = await loudSpeakerApi.patch(`/api/comments/${id}`, {
      inc_votes,
    });
    return data.comment;
  } catch (error) {
    console.error("Error patching comment:", error);
    throw error;
  }
}

export async function deleteArticleComment(id) {
  return loudSpeakerApi.delete(`/api/comments/${id}`);
}
