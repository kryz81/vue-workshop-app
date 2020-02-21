import { v4 as uuid } from "uuid";
import client from "./client";

export const REVIEWS_DEFAULT_LIMIT = 2;

export const getReviewsBySessionId = (sessionId, limit) =>
  client.get(
    `/reviews?sessionId=${sessionId}${
      limit ? "&_limit=" + limit : ""
    }&_sort=added&_order=desc`
  );

export const getReviewById = reviewId => client.get(`/reviews/${reviewId}`);

export const addReview = (sessionId, rating, comment) => {
  const review = {
    id: uuid(),
    added: new Date(),
    sessionId,
    rating,
    comment
  };

  return client.post("/reviews", review);
};
