import axios from "axios";

export const createpoint = async (values) => {
    return await axios.post(
      `${process.env.REACT_APP_API_URL_COFFEE}/api/auth/create/point`,
      values
    );
  };
  
  export const removepoint = async (_id) => {
    return await axios.delete(
      `${process.env.REACT_APP_API_URL_COFFEE}/api/auth/remove/point/${_id}`
    );
  };
  
  export const listpoint = async () => {
    return await axios.get(
      `${process.env.REACT_APP_API_URL_COFFEE}/api/auth/list/point`
    );
  };
  export const listLEDActiveCategory = async () => {
    return await axios.get(
      `${process.env.REACT_APP_API_URL_COFFEE}/api/auth/list-active/point`
    );
  };
  
  
  export const updatepoint = async (_id, values) => {
    return await axios.put(
      `${process.env.REACT_APP_API_URL_COFFEE}/api/auth/update/point/${_id}`,
      values
    );
  };
  
  export const getpoint = async (_id) => {
    return await axios.get(
      `${process.env.REACT_APP_API_URL_COFFEE}/api/auth/get/point/${_id}`
    );
  };
  