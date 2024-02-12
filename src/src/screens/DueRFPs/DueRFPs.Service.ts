import urls from "global/constants/UrlConstants";
import { getCallParams, getSearchedCallParams, makeCall } from "utils/service";

export const getUser = async () => {
  try {
    const callParams = await getCallParams("GET");
    const response = await makeCall(`${urls.getUserPage}`, callParams);
    return response;
  } catch (error) {
    throw error;
  }
};
export const getProjectTopDataValue = async (
  asigneeName: any,
  limit: any,
  page: any
) => {
  const url = `${urls.getProjectTop}/${asigneeName}/limit/${limit}/page/${page}`;
  try {
    const callParams = await getCallParams("GET");
    const response = await makeCall(url, callParams);
    return response;
  } catch (error) {
    throw error;
  }
};

export const getCountDueRFPs = async (asigneeName: any) => {
  const url = `${urls.getProjectTopCount}/${asigneeName}`;
  try {
    const callParams = await getCallParams("GET");
    const response = await makeCall(url, callParams);
    return response;
  } catch (error) {
    throw error;
  }
};
export const getProjectTopDataValueSearch = async (
  asigneeName: any,
  limit: any,
  page: any,
  searchText: any
) => {
  const url = `${urls.getProjectTopSearch}/${asigneeName}/limit/${limit}/page/${page}`;
  try {
    const callParams = await getSearchedCallParams("POST", searchText);
    const response = await makeCall(url, callParams);
    return response;
  } catch (error) {
    throw error;
  }
};

export const getCountDueRFPsSearch = async (
  asigneeName: any,
  searchText: any
) => {
  const url = `${urls.getProjectTopCountSearch}/${asigneeName}`;
  try {
    const callParams = await getSearchedCallParams("POST", searchText);
    const response = await makeCall(url, callParams);
    return response;
  } catch (error) {
    throw error;
  }
};
