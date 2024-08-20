import axios from "axios";

export const createHallBook = async (values) => {
  return await axios.post(
    `${process.env.REACT_APP_API_URL_BPC}/api/auth/create/HallBook`,
    values
  );
};

export const removeHallBook = async (_id) => {
  return await axios.delete(
    `${process.env.REACT_APP_API_URL_BPC}/api/auth/remove/HallBook/${_id}`
  );
};

export const listHallBook = async () => {
  return await axios.get(
    `${process.env.REACT_APP_API_URL_BPC}/api/auth/list/HallBook`
  );
};

export const updateHallBook = async (_id, values) => {
  return await axios.put(
    `${process.env.REACT_APP_API_URL_BPC}/api/auth/update/HallBook/${_id}`,
    values
  );
};

export const getHallBook = async (_id) => {
  return await axios.get(
    `${process.env.REACT_APP_API_URL_BPC}/api/auth/get/HallBook/${_id}`
   
  );
};
