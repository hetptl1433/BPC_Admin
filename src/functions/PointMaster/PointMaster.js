import axios from "axios";




/////////////Points//////////////


// ////////////////////////////////////////STATE//////////////////////////////



// ////////////////////////////////////////PointMaster//////////////////////////////

export const createPointMaster = async (values) => {
  return await axios.post(
    `${process.env.REACT_APP_API_URL_BPC}/api/auth/location/PointMaster`,
    values
  );
};

export const listPointMaster = async () => {
  return await axios.get(
    `${process.env.REACT_APP_API_URL_BPC}/api/auth/location/PointMaster`
  );
};

export const removePointMaster = async (_id) => {
  return await axios.delete(
    `${process.env.REACT_APP_API_URL_BPC}/api/auth/location/PointMaster/${_id}`
  );
};

export const removeAndUpdatePointMaster = async (_id) => {
  return await axios.put(
    `${process.env.REACT_APP_API_URL_BPC}/api/auth/location/PointMaster/${_id}`
  );
};

export const getPointMaster = async (_id) => {
  return await axios.get(
    `${process.env.REACT_APP_API_URL_BPC}/api/auth/location/PointMaster/${_id}`
  );
};

export const updatePointMaster = async (_id, values) => {
  return await axios.put(
    `${process.env.REACT_APP_API_URL_BPC}/api/auth/location/PointMaster/${_id}`,
    values
  );
};
