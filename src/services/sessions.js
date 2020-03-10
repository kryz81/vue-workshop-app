import client from "./client";

export const getSessions = () => client.get("/sessions");

export const getAndGroupSessionsByDay = async () => {
  const res = await getSessions();
  return groupSessionsByDay(res.data);
};

export const getSessionById = sessionId => client.get(`/sessions/${sessionId}`);

const groupSessionsByDay = sessions =>
  sessions.reduce((result, currentSession) => {
    if (!result[currentSession.day]) {
      result[currentSession.day] = [];
    }
    result[currentSession.day].push(currentSession);
    return result;
  }, {});
