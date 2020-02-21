import axios from "axios";

const BASE_URL = "http://localhost:3000/sessions";

export const getSessions = () => axios.get(BASE_URL);

export const getAndGroupSessionsByDay = async () => {
  const res = await getSessions();
  return res.data.reduce((result, currentSession) => {
    if (!result[currentSession.day]) {
      result[currentSession.day] = [];
    }
    result[currentSession.day].push(currentSession);
    return result;
  }, {});
};

export const getSessionById = sessionId =>
  axios.get(`${BASE_URL}/${sessionId}`);
