import axios from "axios";

export const createNeonDescDetails = async (values) => {
  return await axios.post(
    `${process.env.REACT_APP_API_URL_BPC}/api/auth/create/neondesc-details`,
    values
  );
};

export const removeNeonDescDetails = async (_id) => {
  return await axios.delete(
    `${process.env.REACT_APP_API_URL_BPC}/api/auth/remove/neondesc-details/${_id}`
  );
};

export const listNeonDescDetails = async () => {
  return await axios.get(
    `${process.env.REACT_APP_API_URL_BPC}/api/auth/list/neondesc-details`
  );
};

export const updateNeonDescDetails = async (_id, values) => {
  return await axios.put(
    `${process.env.REACT_APP_API_URL_BPC}/api/auth/update/neondesc-details/${_id}`,
    values
  );
};

export const getNeonDescDetails = async (_id) => {
  return await axios.get(
    `${process.env.REACT_APP_API_URL_BPC}/api/auth/get/neondesc-details/${_id}`
  );
};
