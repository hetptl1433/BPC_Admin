import axios from "axios";

export const createTestCatMasterDetails = async (values) => {
  return await axios.post(
    `${process.env.REACT_APP_API_URL_BPC}/api/auth/create/TestCatMaster-details`,
    values
  );
};

export const removeTestCatMasterDetails = async (_id) => {
  return await axios.delete(
    `${process.env.REACT_APP_API_URL_BPC}/api/auth/remove/TestCatMaster-details/${_id}`
  );
};

export const listTestCatMasterDetails = async () => {
  return await axios.get(
    `${process.env.REACT_APP_API_URL_BPC}/api/auth/list/TestCatMaster-details`
  );
};

export const updateTestCatMasterDetails = async (_id, values) => {
  return await axios.put(
    `${process.env.REACT_APP_API_URL_BPC}/api/auth/update/TestCatMaster-details/${_id}`,
    values
  );
};

export const getTestCatMasterDetails = async (_id) => {
  return await axios.get(
    `${process.env.REACT_APP_API_URL_BPC}/api/auth/get/TestCatMaster-details/${_id}`
  );
};
