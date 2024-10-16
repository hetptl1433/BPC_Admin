import axios from "axios";

export const listLegacyTestCatMasterDetails = async () => {
  return await axios.get(
    `${process.env.REACT_APP_API_URL_BPC}/api/auth/get/LegacyTestCategory`
  );
};


  export const listLegacyIndustry = async () => {
    return await axios.get(
      `${process.env.REACT_APP_API_URL_BPC}/api/auth/get/LegacyTestIndustry`
    );
  };