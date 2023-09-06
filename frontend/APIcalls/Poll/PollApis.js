import AsyncStorage from "@react-native-async-storage/async-storage";
import { pollApi } from "../index";
export const startPolling = async (duration, electionId) => {
  try {
    const token = await AsyncStorage.getItem('jwt')
    const response = await pollApi.post(
      `/start`,
      { duration, electionId },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw new Error("Error starting polling.");
  }
};

export const endPolling = async (electionId, token) => {
  try {
    const response = await pollApi.post(
      `/end`,
      { electionId },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data.message;
  } catch (error) {
    throw new Error("Error ending polling:", error);
  }
};
