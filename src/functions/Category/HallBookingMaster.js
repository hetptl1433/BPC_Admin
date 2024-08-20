import axios from "axios";

export const createHalleCategory = async (values) => {
    return await axios.post(
      `${process.env.REACT_APP_API_URL_BPC}/api/auth/create/HalleCategoryMaster`,
      values
    );
  };
  
  export const removeHalleCategory = async (_id) => {
    return await axios.delete(
      `${process.env.REACT_APP_API_URL_BPC}/api/auth/remove/HalleCategoryMaster/${_id}`
    );
  };
  
  export const listHalleCategory = async () => {
    return await axios.get(
      `${process.env.REACT_APP_API_URL_BPC}/api/auth/list/HalleCategoryMaster`
    );
  };
  export const listHalleActiveCategory = async () => {
    return await axios.get(
      `${process.env.REACT_APP_API_URL_BPC}/api/auth/list-active/HalleCategoryMaster`
    );
  };
  
  
  export const updateHalleCategory = async (_id, values) => {
    return await axios.put(
      `${process.env.REACT_APP_API_URL_BPC}/api/auth/update/HalleCategoryMaster/${_id}`,
      values
    );
  };
  
  export const getHalleCategory = async (_id) => {
    return await axios.get(
      `${process.env.REACT_APP_API_URL_BPC}/api/auth/get/HalleCategoryMaster/${_id}`
    );
  };
  