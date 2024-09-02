import axios from "axios";

export const createBookingDetails = async (values) => {
  return await axios.post(
    `${process.env.REACT_APP_API_URL_BPC}/api/auth/create/BookingDetails`,
    values
  );
};

export const removeBookingDetails = async (_id) => {
  return await axios.delete(
    `${process.env.REACT_APP_API_URL_BPC}/api/auth/remove/BookingDetails/${_id}`
  );
};

export const listBookingDetails = async () => {
  return await axios.get(
    `${process.env.REACT_APP_API_URL_BPC}/api/auth/list/BookingDetails`
  );
};
export const listBookingDetailsData = async () => {
  return await axios.get(
    `${process.env.REACT_APP_API_URL_BPC}/api/auth/list/BookingDetailsData`
  );
};

export const updateBookingDetails = async (_id, values) => {
  return await axios.put(
    `${process.env.REACT_APP_API_URL_BPC}/api/auth/update/BookingDetails/${_id}`,
    values
  );
};

export const getBookingDetails = async (_id) => {
  return await axios.get(
    `${process.env.REACT_APP_API_URL_BPC}/api/auth/get/BookingDetails/${_id}`
  );
};
export const getExtraBookingDetailsData = async (_id) => {
  return await axios.get(
    `${process.env.REACT_APP_API_URL_BPC}/api/auth/get/book/ExtraBookingDetails/${_id}`
  );
};
