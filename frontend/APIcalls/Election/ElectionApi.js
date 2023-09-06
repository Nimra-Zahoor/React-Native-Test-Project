import { electionApi } from "../index";

export const getScheduledElections = async () => {
  try {
    const response = await electionApi.get();
    console.log("resss",response)
    return response.data;

  } catch (error) {
    throw new Error("Error fetching scheduled elections:", error);
  }
};

export const scheduleElection = async (electionData, token) => {
  try {
    console.log('Working in api file')
    const response = await electionApi.post(`/schedule`, electionData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("response ",response)
    return response.data;
  } catch (error) {
    throw new Error("Error scheduling election");
  }
};


