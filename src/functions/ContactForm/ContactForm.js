import axios from "axios";

export const createContactForm = async (values) => {
  return await axios.post(
    `${process.env.REACT_APP_API_URL_BPC}/api/auth/create/ContactForm`,
    values
  );
};

export const removeContactForm = async (_id) => {
  return await axios.delete(
    `${process.env.REACT_APP_API_URL_BPC}/api/auth/remove/ContactForm/${_id}`
  );
};

export const listContactForm = async () => {
  return await axios.get(
    `${process.env.REACT_APP_API_URL_BPC}/api/auth/list/ContactForm`
  );
};

export const updateContactForm = async (_id, values) => {
  return await axios.put(
    `${process.env.REACT_APP_API_URL_BPC}/api/auth/update/ContactForm/${_id}`,
    values
  );
};

export const getContactForm = async (_id) => {
  return await axios.get(
    `${process.env.REACT_APP_API_URL_BPC}/api/auth/get/ContactForm/${_id}`
  );
};
