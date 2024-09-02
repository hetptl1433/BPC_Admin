import axios from "axios";

export const createRAC = async (values) => {
  return await axios.post(
    `${process.env.REACT_APP_API_URL_BPC}/api/auth/create/RAC`,
    values
  );
};

export const removeRAC = async (_id) => {
  return await axios.delete(
    `${process.env.REACT_APP_API_URL_BPC}/api/auth/remove/RAS/${_id}`
  );
};

export const listRAC = async () => {
  return await axios.get(
    `${process.env.REACT_APP_API_URL_BPC}/api/auth/list/RAC`
  );
};
export const listRACData = async () => {
  return await axios.get(
    `${process.env.REACT_APP_API_URL_BPC}/api/auth/list/RACData`
  );
};

export const updateRAC = async (_id, values) => {
  return await axios.put(
    `${process.env.REACT_APP_API_URL_BPC}/api/auth/update/RAC/${_id}`,
    values
  );
};

export const getRAC = async (_id) => {
  return await axios.get(
    `${process.env.REACT_APP_API_URL_BPC}/api/auth/get/RAS/${_id}`
  );
};
export const getRACData = async (EmailID) => {
  return await axios.get(
    `${process.env.REACT_APP_API_URL_BPC}/api/auth/get/email/RASData/${EmailID}`
  );
};
