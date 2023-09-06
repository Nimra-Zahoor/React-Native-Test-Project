import { candidateApi } from "../index";

export const fetchCandidates = async (token) => {
  try {
    const response = await candidateApi.get(`constituency`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error("Error fetching candidates");
  }
};

export const fetchVotersByCandidate = async (token) => {
  try {
    const response = await candidateApi.get(`/voters`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error("Error fetching voters");
  }
};

export const fetchVotesCastedToCandidate = async (token) => {
  try {
    const response = await candidateApi.get(`/votes`, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("jwt")}`,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error("Error fetching voters");
  }
};

export const fetchAppliedCandidates = async (token) => {
  try {
    const response = await candidateApi.get(`/applied`, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    throw new Error("Error fetching candidates:", error);
  }
};

export const approveCandidate = async (token, candidateId, userType) => {
  try {
    await candidateApi.put(`/approve/${candidateId}`, userType, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return true;
  } catch (error) {
    console.error("Error approving candidate:", error);
    throw error;
  }
};

export const applyCandidate = async (formData, token) => {
  try {
    const response = await candidateApi.post(`/apply`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error.response.data.message;
  }
};
