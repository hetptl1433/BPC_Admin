import axios from "axios";



export const removeResultData = async (_id) => {
  return await axios.delete(
    `${process.env.REACT_APP_API_URL_BPC}/api/auth/remove/ResultData/${_id}`
  );
};

export const listResultData = async () => {
  return await axios.get(
    `${process.env.REACT_APP_API_URL_BPC}/api/auth/list-by-params/ResultData`
  );
};



export const getResultData = async (_id) => {
  return await axios.get(
    `${process.env.REACT_APP_API_URL_BPC}/api/auth/get/ResultData/${_id}`
  );
};


export const getResultAns = async (userID, testID) => {
  return await axios.get(
    `${process.env.REACT_APP_API_URL_BPC}/api/auth/get/ResultAns/${userID}/${testID}`
  );
};
