import axios from "axios";

export const getUserBillingAddress = async (_id) => {
  return await axios.get(
    `${process.env.REACT_APP_API_URL_BPC}/api/auth/get/userBillingAddress/${_id}`
  );
};
