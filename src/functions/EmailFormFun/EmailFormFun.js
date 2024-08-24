import axios from "axios";

export const createEmailFormDetails = async (values) => {
  return await axios.post(
    `${process.env.REACT_APP_API_URL_BPC}/api/auth/create/EmailForm-details`,
    values
  );
};

export const removeEmailFormDetails = async (_id) => {
  return await axios.delete(
    `${process.env.REACT_APP_API_URL_BPC}/api/auth/remove/EmailForm-details/${_id}`
  );
};

export const listEmailFormDetails = async () => {
  return await axios.get(
    `${process.env.REACT_APP_API_URL_BPC}/api/auth/list/EmailForm-details`
  );
};

export const updateEmailFormDetails = async (_id, values) => {
  return await axios.put(
    `${process.env.REACT_APP_API_URL_BPC}/api/auth/update/EmailForm-details/${_id}`,
    values
  );
};

export const getEmailFormDetails = async (_id) => {
  return await axios.get(
    `${process.env.REACT_APP_API_URL_BPC}/api/auth/get/EmailForm-details/${_id}`
  );
};
