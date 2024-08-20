import axios from "axios";

export const createIndustryUserMasterDetails = async (values) => {
  return await axios.post(
    `${process.env.REACT_APP_API_URL_BPC}/api/auth/create/IndustryUserMaster-details`,
    values
  );
};

export const removeIndustryUserMasterDetails = async (_id) => {
  return await axios.delete(
    `${process.env.REACT_APP_API_URL_BPC}/api/auth/remove/IndustryUserMaster-details/${_id}`
  );
};

export const listIndustryUserMasterDetails = async () => {
  return await axios.get(
    `${process.env.REACT_APP_API_URL_BPC}/api/auth/list/IndustryUserMaster-details`
  );
};

export const updateIndustryUserMasterDetails = async (_id, values) => {
  return await axios.put(
    `${process.env.REACT_APP_API_URL_BPC}/api/auth/update/IndustryUserMaster-details/${_id}`,
    values
  );
};

export const getIndustryUserMasterDetails = async (_id) => {
  return await axios.get(
    `${process.env.REACT_APP_API_URL_BPC}/api/auth/get/IndustryUserMaster-details/${_id}`
  );
};
