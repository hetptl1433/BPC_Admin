import axios from "axios";

export const createLEDBoardDetails = async (values) => {
  return await axios.post(
    `${process.env.REACT_APP_API_URL_BPC}/api/auth/create/ledboard-details`,
    values
  );
};

export const removeLEDBoardDetails = async (_id) => {
  return await axios.delete(
    `${process.env.REACT_APP_API_URL_BPC}/api/auth/remove/ledboard-details/${_id}`
  );
};

export const listLEDBoardDetails = async () => {
  return await axios.get(
    `${process.env.REACT_APP_API_URL_BPC}/api/auth/list/ledboard-details`
  );
};

export const updateLEDBoardDetails = async (_id, values) => {
  return await axios.put(
    `${process.env.REACT_APP_API_URL_BPC}/api/auth/update/ledboard-details/${_id}`,
    values
  );
};

export const getLEDBoardDetails = async (_id) => {
  return await axios.get(
    `${process.env.REACT_APP_API_URL_BPC}/api/auth/get/ledboard-details/${_id}`
  );
};
