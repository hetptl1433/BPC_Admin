import axios from "axios";




/////////////Points//////////////


// ////////////////////////////////////////STATE//////////////////////////////



// ////////////////////////////////////////TestQuestionMaster//////////////////////////////

export const createTestQuestionMaster = async (values) => {
  return await axios.post(
    `${process.env.REACT_APP_API_URL_COFFEE}/api/auth/location/create/TestQuestionMaster`,
    values
  );
};

export const listTestQuestionMaster = async () => {
  return await axios.get(
    `${process.env.REACT_APP_API_URL_COFFEE}/api/auth/location/TestQuestionMaster`
  );
};

export const removeTestQuestionMaster = async (_id) => {
  return await axios.delete(
    `${process.env.REACT_APP_API_URL_COFFEE}/api/auth/location/TestQuestionMaster/${_id}`
  );
};

export const removeAndUpdateTestQuestionMaster = async (_id) => {
  return await axios.put(
    `${process.env.REACT_APP_API_URL_COFFEE}/api/auth/location/TestQuestionMaster/${_id}`
  );
};

export const getTestQuestionMaster = async (_id) => {
  return await axios.get(
    `${process.env.REACT_APP_API_URL_COFFEE}/api/auth/location/TestQuestionMaster/${_id}`
  );
};

export const updateTestQuestionMaster = async (_id, values) => {
  return await axios.put(
    `${process.env.REACT_APP_API_URL_COFFEE}/api/auth/location/TestQuestionMaster/${_id}`,
    values
  );
};
