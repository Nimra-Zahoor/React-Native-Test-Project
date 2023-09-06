import axios from "axios";
import { BASE_URL } from "../constants"; 

const createApiInstance = (urlSegment) => {
  return axios.create({
    baseURL: `${BASE_URL}/${urlSegment}`,
  });
};

export const voteApi = createApiInstance("vote");
export const candidateApi = createApiInstance("candidates");
export const authApi = createApiInstance("auth");
export const pollApi = createApiInstance("poll");
export const inviteApi = createApiInstance("users");
export const electionApi = createApiInstance("elections");
export const constituencyApi = createApiInstance("constituencies");
export const resultApi = createApiInstance("results");
