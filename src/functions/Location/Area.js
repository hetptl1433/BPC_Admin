import axios from "axios";


export const listCountry = async () => {
  return await axios.get(
    `${process.env.REACT_APP_API_URL_BPC}/api/auth/location/country`
  );
};


export const getCountry = async (_id) => {
  return await axios.get(
    `${process.env.REACT_APP_API_URL_BPC}/api/auth/location/country/${_id}`
  );
};

// ////////////////////////////////////////STATE//////////////////////////////


export const listState = async () => {
  return await axios.get(
    `${process.env.REACT_APP_API_URL_BPC}/api/auth/location/state`
  );
};



export const getState = async (_id) => {
  return await axios.get(
    `${process.env.REACT_APP_API_URL_BPC}/api/auth/location/state/${_id}`
  );
};

// ////////////////////////////////////////CITY//////////////////////////////



export const listCity = async () => {
  return await axios.get(
    `${process.env.REACT_APP_API_URL_BPC}/api/auth/location/city`
  );
};




export const getCity = async (_id) => {
  return await axios.get(
    `${process.env.REACT_APP_API_URL_BPC}/api/auth/location/city/${_id}`
  );
};



// ////////////////////////////////////////AreaLoc//////////////////////////////

export const createAreaLoc = async (values) => {
  return await axios.post(
    `${process.env.REACT_APP_API_URL_BPC}/api/auth/location/AreaLoc`,
    values
  );
};

export const listAreaLoc = async () => {
  return await axios.get(
    `${process.env.REACT_APP_API_URL_BPC}/api/auth/location/AreaLoc`
  );
};

export const removeAreaLoc = async (_id) => {
  return await axios.delete(
    `${process.env.REACT_APP_API_URL_BPC}/api/auth/location/AreaLoc/${_id}`
  );
};

export const removeAndUpdateAreaLoc = async (_id) => {
  return await axios.put(
    `${process.env.REACT_APP_API_URL_BPC}/api/auth/location/AreaLoc/${_id}`
  );
};

export const getAreaLoc = async (_id) => {
  return await axios.get(
    `${process.env.REACT_APP_API_URL_BPC}/api/auth/location/AreaLoc/${_id}`
  );
};

export const updateAreaLoc = async (_id, values) => {
  return await axios.put(
    `${process.env.REACT_APP_API_URL_BPC}/api/auth/location/AreaLoc/${_id}`,
    values
  );
};
