import client from "./client";
import { getUserByEmail } from "./user";

export const getSessions = () => client.get("/sessions");

export const getAndGroupSessionsByDay = async () => {
  const res = await getSessions();
  return groupSessionsByDay(res.data);
};

export const getSessionsByIdAndGroup = async sessionIds => {
  const res = await getSessions();
  const plannedSessions = res.data.filter(session =>
    sessionIds.includes(session.id)
  );
  return groupSessionsByDay(plannedSessions);
};

export const getSessionById = sessionId => client.get(`/sessions/${sessionId}`);

export const addToPlannedSessions = async (userEmail, sessionId) => {
  const user = await getUserByEmail(userEmail);
  if (!user) {
    throw new Error("Invalid user");
  }

  const plannedSessions = [...new Set([...user.plannedSessions, sessionId])];

  const userData = {
    ...user,
    plannedSessions
  };

  return client.put(`users/${user.id}`, userData);
};

export const removeFromPlannedSessions = async (userEmail, sessionId) => {
  const user = await getUserByEmail(userEmail);
  if (!user) {
    throw new Error("Invalid user");
  }

  const plannedSessions = user.plannedSessions.filter(
    plannedSessionId => plannedSessionId !== sessionId
  );

  const userData = {
    ...user,
    plannedSessions
  };

  return client.put(`users/${user.id}`, userData);
};

const groupSessionsByDay = sessions =>
  sessions.reduce((result, currentSession) => {
    if (!result[currentSession.day]) {
      result[currentSession.day] = [];
    }
    result[currentSession.day].push(currentSession);
    return result;
  }, {});
