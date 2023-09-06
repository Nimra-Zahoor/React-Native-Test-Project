import { constituencyApi } from "../index";

export const fetchConstituencies = async () => {
  try {
    const response = await constituencyApi.get();
    console.log(response)
    return response.data;
  } catch (error) {
    throw new Error("Error fetching constituencies");
  }
};

export const createConstituency = async (constituency, token) => {
  try {
    const response = await constituencyApi.post(
      `/create`,
      constituency,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    throw new Error("Error creating Constituency:", error);
  }
};
