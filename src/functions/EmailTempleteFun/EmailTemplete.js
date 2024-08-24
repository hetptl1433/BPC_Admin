import axios from "axios";

export const createEmailTempleteDetails = async (values) => {
  return await axios.post(
    `${process.env.REACT_APP_API_URL_BPC}/api/auth/create/EmailTemplete-details`,
    values
  );
};

export const removeEmailTempleteDetails = async (_id) => {
  return await axios.delete(
    `${process.env.REACT_APP_API_URL_BPC}/api/auth/remove/EmailTemplete-details/${_id}`
  );
};

export const listEmailTempleteDetails = async () => {
  return await axios.get(
    `${process.env.REACT_APP_API_URL_BPC}/api/auth/list/EmailTemplete-details`
  );
};

export const updateEmailTempleteDetails = async (_id, values) => {
  return await axios.put(
    `${process.env.REACT_APP_API_URL_BPC}/api/auth/update/EmailTemplete-details/${_id}`,
    values
  );
};

export const getEmailTempleteDetails = async (_id) => {
  return await axios.get(
    `${process.env.REACT_APP_API_URL_BPC}/api/auth/get/EmailTemplete-details/${_id}`
  );
};
