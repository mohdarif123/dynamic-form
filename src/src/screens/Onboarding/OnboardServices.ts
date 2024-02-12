import urls from "global/constants/UrlConstants";
import { User, paidValidate } from "models/interfaces";
import {
  getAccessToken,
  getCallParams,
  getCallParamsWithCountryToken,
  getCallParamsWithToken,
  getFileCallParamsWithToken,
  getNoAuthCallParams,
  makeCall,
} from "utils/service";

export async function getUserDetails(authToken: string) {
  try {
    const requestBody = {
      authToken,
    };
    const callParams = getNoAuthCallParams("POST", requestBody);
    const response: any = await makeCall(
      urls.VERIFY_TEMP_PWD_FOR_ACTIVATE_ACCOUNT,
      callParams
    );
    return response;
  } catch (error: any) {
    throw error;
  }
}
export const upload = async (id: any, formData: any, tokens: any) => {
  try {
    const callParams = await getFileCallParamsWithToken(formData, tokens);
    const response = await makeCall(`${urls.uploadDocument}/${id}`, callParams);
    return response;
  } catch (error) {
    throw error;
  }
};

// export async function getPlans() {
//   try {
//     const callParams = getNoAuthCallParams("GET");
//     const response: any = await makeCall(urls.viewPlans, callParams);
//     return response;
//   } catch (error: any) {
//     throw error;
//   }
// }

export async function activateUser(user: User, token: string) {
  try {
    const callParams = await getAccessToken("POST", user, token);
    const response: any = await makeCall(urls.ACTIVATE_USER, callParams);
    return response;
  } catch (error: any) {
    throw error;
  }
}

export const getState = async (value: any, token: any) => {
  try {
    const callParams = await getCallParamsWithCountryToken("GET", token);
    const response = await makeCall(
      `${urls.getStateValue}/${value}`,
      callParams
    );
    return response;
  } catch (error) {
    throw error;
  }
};

export const getCity = async (value: any, state: any, token: any) => {
  try {
    const callParams = await getCallParamsWithCountryToken("GET", token);
    const response = await makeCall(
      `${urls.getStateValue}/${value}/state/${state}`,
      callParams
    );
    return response;
  } catch (error) {
    throw error;
  }
};

export const getAddProposalCountriesOnBording = async (token: any) => {
  try {
    const callParams = await getCallParamsWithCountryToken("GET", token);
    const response = await makeCall(`${urls.getCountries}`, callParams);
    return response;
  } catch (error) {
    throw error;
  }
};

export async function getPlanDetails() {
  try {
    const callParams = await getCallParams("GET");
    const response: any = await makeCall(urls.GET_PLANS, callParams);
    return response;
  } catch (error: any) {
    throw error;
  }
}

export const getUserRegisterPaid = async (objectData: paidValidate) => {
  try {
    const url = urls.REGISTER_USER;
    const callParams = await getCallParams("POST", objectData);
    const response: any = await makeCall(url, callParams);
    return response;
  } catch (error: any) {
    throw error;
  }
};

export const updateProfile = async (
  profileValue: any,
  email: any,
  token: any
) => {
  const url = `${urls.updateProfile}/${email}`;
  try {
    const callParams = await getCallParamsWithToken(
      "PATCH",
      profileValue,
      token
    );
    const response = await makeCall(url, callParams);
    return response;
  } catch (error: any) {
    throw error;
  }
};
