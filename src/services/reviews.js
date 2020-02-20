import axios from "axios";
import { v4 as uuid } from "uuid";

const BASE_URL = "http://localhost:3000/reviews";

export const getReviews = () => axios.get(BASE_URL);

export const getReviewById = reviewId => axios.get(`${BASE_URL}/${reviewId}`);

export const addReview = (sessionId, mark, content) => {
  const review = {
    id: uuid(),
    sessionId,
    mark,
    content
  };

  return axios.post(BASE_URL, review);
};
