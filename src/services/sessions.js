import client from "./client";

export const getSessions = () => client.get("/sessions");

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

export const getSessionById = sessionId => client.get(`/sessions/${sessionId}`);
