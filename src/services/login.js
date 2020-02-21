import client from "./client";

export const login = async (email, password) => {
  const res = await client.get(`/users?email=${email}&password=${password}`);

  if (res.data.length !== 1) {
    throw new Error("Invalid credentials");
  }

  return res.data[0];
};
