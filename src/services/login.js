import axios from "axios";

const BASE_URL = "http://localhost:3000/login";

export const login = async (email, password) => {
  const res = await axios.get(
    `${BASE_URL}?email=${email}&password=${password}`
  );

  if (res.data.length !== 1) {
    throw new Error("Invalid credentials");
  }

  return res.data[0];
};
