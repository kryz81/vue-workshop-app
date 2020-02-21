import client from "./client";

export const getUserByEmail = async email => {
  const res = await client.get(`/users?email=${email}`);

  if (res.data.length !== 1) {
    return null;
  }

  return res.data[0];
};
