import urls from "global/constants/UrlConstants";
import { getCallParams, getCallSearchParams, makeCall } from "utils/service";

// user table data api method
export const getUser = async (pageNumber: number, pageSize: number) => {
  const url = `${urls.getUsers}/limit/${pageSize}/page/${pageNumber}`;
  try {
    const callParams = await getCallParams("GET");
    const response = await makeCall(url, callParams);
    return response;
  } catch (error: any) {
    throw error;
  }
};
// user search api method
export const getUserSearch = async (
  searchValue: string,
  pageNumber: any,
  pageSize: any
) => {
  const url = `${urls.getUserSearch}/limit/${pageSize}/page/${pageNumber}`;
  try {
    const callParams = await getCallSearchParams("POST",searchValue);
    const response = await makeCall(url, callParams);
    return response;
  } catch (error: any) {
    throw error;
  }
};

export const getUserEditData = async (emailId: any) => {
  const url = `${urls.getUsersEdit}/email/${emailId}`;
  try {
    const callParams = await getCallParams("GET");
    const response = await makeCall(url, callParams);
    return response;
  } catch (error: any) {
    throw error;
  }
};
// user count api method
export const getUserCountData = async () => {
  const url = `${urls.usersCount}`;
  try {
    const callParams = await getCallParams("GET");
    const response = await makeCall(url, callParams);
    return response;
  } catch (error: any) {
    throw error;
  }
};

// user count api method search
export const getUserCountDataSearch = async (searchValue: any) => {
  const url = `${urls.usersCountSearch}`;
  try {
    const callParams = await getCallSearchParams("POST",searchValue);
    const response = await makeCall(url, callParams);
    return response;
  } catch (error: any) {
    throw error;
  }
};

export const getUserById = async (id: String) => {
  const url = `${urls.getUser}/${id}`;
  try {
    const callParams = await getCallParams("GET");
    const response = await makeCall(url, callParams);
    return response;
  } catch (error: any) {
    throw error;
  }
};

export const getProfile = async () => {
  const url = `${urls.getCompanyProfile}`;
  try {
    const callParams = await getCallParams("GET");
    const response = await makeCall(url, callParams);
    return response;
  } catch (error: any) {
    throw error;
  }
};
