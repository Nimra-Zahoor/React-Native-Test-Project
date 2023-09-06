import { resultApi } from "../index";
export const fetchResults = async () => {
  try {
    const response = await resultApi.get(`/constituency`, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("jwt")}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching results:", error);
    throw error;
  }
};

export const fetchWinners = async (name) => {
  try {
    const response = await resultApi.get(`?name=${name}`, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("jwt")}`,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error("Error fetching candidates");
  }
};
