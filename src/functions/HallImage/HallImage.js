import axios from "axios";

export const createHalleBoardDetails = async (values) => {
  return await axios.post(
    `${process.env.REACT_APP_API_URL_BPC}/api/auth/create/Halleboard-details`,
    values
  );
};

export const removeHalleBoardDetails = async (_id) => {
  return await axios.delete(
    `${process.env.REACT_APP_API_URL_BPC}/api/auth/remove/Halleboard-details/${_id}`
  );
};

export const listHalleBoardDetails = async () => {
  return await axios.get(
    `${process.env.REACT_APP_API_URL_BPC}/api/auth/list/Halleboard-details`
  );
};

export const updateHalleBoardDetails = async (_id, values) => {
  return await axios.put(
    `${process.env.REACT_APP_API_URL_BPC}/api/auth/update/Halleboard-details/${_id}`,
    values
  );
};

export const getHalleBoardDetails = async (_id) => {
  return await axios.get(
    `${process.env.REACT_APP_API_URL_BPC}/api/auth/get/Halleboard-details/${_id}`
  );
};
