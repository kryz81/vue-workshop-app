import axios from "axios";

const BASE_URL = "http://localhost:3000/sessions";

export const getSessions = () => axios.get(BASE_URL);

export const getSessionById = sessionId =>
  axios.get(`${BASE_URL}/${sessionId}`);
