const sessions = [
  {
    id: "node-01",
    title: "Node-Tools für Frontend-Entwickler & Webpack",
    tutor: "Robert Weber",
    room: "4a",
    day: 2,
    startDate: "9:00",
    endDate: "12:30",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
  },
  {
    id: "testing-01",
    title: "Javascript Testing",
    tutor: "Dominik Ehrenberg",
    room: "1",
    day: 3,
    startDate: "11:00",
    endDate: "15:15",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
  }
];

export const getSessions = () => ({ data: [...sessions] });

export const getSessionById = sessionId => ({
  data: {
    ...sessions[0],
    id: sessionId
  }
});
