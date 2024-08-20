import axios from "axios";

export const createUserGroup = async (values) => {
    return await axios.post(
      `${process.env.REACT_APP_API_URL_BPC}/api/auth/create/UserGroupMaster`,
      values
    );
  };
  
  export const removeUserGroup = async (_id) => {
    return await axios.delete(
      `${process.env.REACT_APP_API_URL_BPC}/api/auth/remove/UserGroupMaster/${_id}`
    );
  };
  
  export const listUserGroup = async () => {
    return await axios.get(
      `${process.env.REACT_APP_API_URL_BPC}/api/auth/list/UserGroupMaster`
    );
  };
  export const listActiveTestGroupCategory = async () => {
    return await axios.get(
      `${process.env.REACT_APP_API_URL_BPC}/api/auth/list-active/UserGroupMaster`
    );
  };
  
  
  export const updateUserGroup = async (_id, values) => {
    return await axios.put(
      `${process.env.REACT_APP_API_URL_BPC}/api/auth/update/UserGroupMaster/${_id}`,
      values
    );
  };
  
  export const getUserGroup = async (_id) => {
    return await axios.get(
      `${process.env.REACT_APP_API_URL_BPC}/api/auth/get/UserGroupMaster/${_id}`
    );
  };
  