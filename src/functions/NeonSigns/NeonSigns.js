import axios from "axios";

export const createNeonSignsDetails = async (values) => {
  return await axios.post(
    `${process.env.REACT_APP_API_URL_BPC}/api/auth/create/neonsigns-details`,
    values
  );
};

export const removeNeonSignsDetails = async (_id) => {
  return await axios.delete(
    `${process.env.REACT_APP_API_URL_BPC}/api/auth/remove/neonsigns-details/${_id}`
  );
};

export const listNeonSignsDetails = async () => {
  return await axios.get(
    `${process.env.REACT_APP_API_URL_BPC}/api/auth/list/neonsigns-details`
  );
};

export const updateNeonSignsDetails = async (_id, values) => {
  return await axios.put(
    `${process.env.REACT_APP_API_URL_BPC}/api/auth/update/neonsigns-details/${_id}`,
    values
  );
};

export const getNeonSignsDetails = async (_id) => {
  return await axios.get(
    `${process.env.REACT_APP_API_URL_BPC}/api/auth/get/neonsigns-details/${_id}`
  );
};
