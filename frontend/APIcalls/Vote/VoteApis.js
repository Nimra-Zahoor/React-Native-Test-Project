import {voteApi} from '../index'

export const castVote = async (candidateId) => {
    try {
      const response = await voteApi.post( "",
        
        { candidateId },
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("jwt")}`,
          },
        }
      );
      return response.data.message;
    } catch (error) {
      throw new Error("Error while casting vote");
    }
  };