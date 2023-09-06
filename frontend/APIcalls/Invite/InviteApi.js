import AsyncStorage from "@react-native-async-storage/async-storage";
import { inviteApi } from "../index";

export const getInvitedUser = async (token) => {
  try {
    const response = await inviteApi.get(`/invitations`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error("Error fetching invited user data.");
  }
};

export const confirmAdmin = async (token) => {
  try {
    const response = await inviteApi.put(
      `/admin/confirm`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw new Error("Error confirming admin status.");
  }
};
export const getAllUsersOtherThanAdmin = async () => {
  try {
    console.log("working at API File");
    const token = await AsyncStorage.getItem("jwt");
    const response = await inviteApi.get(`/non-admin`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.log(error);
    throw new Error("Error fetching users data.");
  }
};
export const inviteUser = async (selectedUser, constituency, cnic) => {
  try {
    const token = await AsyncStorage.getItem('jwt');
    console.log(token)
    const response = await inviteApi.post(
      `/invitations`,
      {
        userId: selectedUser,
        constituency: constituency,
        cnic: cnic,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw new Error("Error inviting user.");
  }
};
