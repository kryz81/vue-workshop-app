import axios from "axios";
import { v4 as uuid } from "uuid";

const BASE_URL = "http://localhost:3000/reviews";

export const REVIEWS_DEFAULT_LIMIT = 2;

export const getReviewsBySessionId = (
  sessionId,
  limit = REVIEWS_DEFAULT_LIMIT
) =>
  axios.get(
    `${BASE_URL}?sessionId=${sessionId}&_limit=${limit}&_sort=added&_order=desc`
  );

export const getReviewById = reviewId => axios.get(`${BASE_URL}/${reviewId}`);

export const addReview = (sessionId, mark, content) => {
  const review = {
    id: uuid(),
    added: new Date(),
    sessionId,
    mark,
    content
  };

  return axios.post(BASE_URL, review);
};
