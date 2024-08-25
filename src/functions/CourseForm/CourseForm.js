import axios from "axios";

export const createCourseForm = async (values) => {
  return await axios.post(
    `${process.env.REACT_APP_API_URL_BPC}/api/auth/create/CourseForm`,
    values
  );
};

export const removeCourseForm = async (_id) => {
  return await axios.delete(
    `${process.env.REACT_APP_API_URL_BPC}/api/auth/remove/CourseForm/${_id}`
  );
};

export const listCourseForm = async () => {
  return await axios.get(
    `${process.env.REACT_APP_API_URL_BPC}/api/auth/list/CourseForm`
  );
};

export const updateCourseForm = async (_id, values) => {
  return await axios.put(
    `${process.env.REACT_APP_API_URL_BPC}/api/auth/update/CourseForm/${_id}`,
    values
  );
};

export const getCourseForm = async (_id) => {
  return await axios.get(
    `${process.env.REACT_APP_API_URL_BPC}/api/auth/get/CourseForm/${_id}`
  );
};
