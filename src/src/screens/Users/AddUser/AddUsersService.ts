import urls from "global/constants/UrlConstants";
import { getCallParams, makeCall } from "utils/service";
import { store } from "utils/store";

export const getRole = async () => {
  const url = `${urls.getUserRole}`;
  try {
    const callParams = await getCallParams("GET");
    const response = await makeCall(url, callParams);
    return response;
  } catch (error: any) {
    throw error;
  }
};

export const addUser = async (addUsersValue: any) => {
  const url = `${urls.addUser}`;
  try {
    const callParams = await getCallParams("POST", addUsersValue);
    const response = await makeCall(url, callParams);
    return response;
  } catch (error: any) {
    throw error;
  }
};

export const userDeleted = async (deletePayload: any) => {
  const url = `${urls.deleteUser}`;
  try {
    const callParams = await getCallParams("POST", deletePayload);
    const response = await makeCall(url, callParams);
    return response;
  } catch (error: any) {
    throw error;
  }
};

export const userUpdated = async (addUserPayload: any) => {
  const url = `${urls.updateUser}`;
  try {
    const callParams = await getCallParams("PATCH", addUserPayload);
    const response = await makeCall(url, callParams);
    return response;
  } catch (error: any) {
    throw error;
  }
};

export const userProfileUpdated = async (addUserPayload: any) => {
  const url = `${urls.updateUserProfile}`;
  try {
    const callParams = await getCallParams("PATCH", addUserPayload);
    const response = await makeCall(url, callParams);
    return response;
  } catch (error: any) {
    throw error;
  }
};

export const updateProfile = async (profileValue: any) => {
  const userAccount = store.getState().auth.userAccount;
  const url = `${urls.updateProfile}/${userAccount}`;
  try {
    const callParams = await getCallParams("PATCH", profileValue);
    const response = await makeCall(url, callParams);
    return response;
  } catch (error: any) {
    throw error;
  }
};
