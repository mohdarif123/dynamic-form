import urls from "global/constants/UrlConstants";
import { getCallParams, makeCall } from "utils/service";

export const fetchRoles = async (page: number) => {
  const url = `${urls.GET_ROLES_BY_DOMAIN}/${page}`;
  try {
    const callParams = await getCallParams("GET");
    const response: any = await makeCall(url, callParams);
    return response;
  } catch (error: any) {
    throw error;
  }
};

export const fetchResources = async () => {
  try {
    const callParams = await getCallParams("GET");
    const response: any = await makeCall(
      urls.GET_RESOURCES_BY_DOMAIN,
      callParams
    );
    return response;
  } catch (error: any) {
    throw error;
  }
};

export const addRole = async (user: any) => {
  try {
    const callParams = await getCallParams("POST", user);
    const response: any = await makeCall(urls.ADD_ROLE, callParams);
    return response;
  } catch (error: any) {
    throw error;
  }
};

export const updateRole = async (user: any) => {
  try {
    const callParams = await getCallParams("POST", user);
    const response: any = await makeCall(urls.UPDATE_ROLE, callParams);
    return response;
  } catch (error: any) {
    throw error;
  }
};

export const fetchRolesCount = async () => {
  try {
    const callParams = await getCallParams("GET");
    const response: any = await makeCall(
      urls.GET_ROLES_BY_DOMAIN_COUNT,
      callParams
    );
    return response;
  } catch (error: any) {
    throw error;
  }
};

export const fetchSearchRoles = async (search: string, page: number) => {
  const url = `${urls.GET_ROLES_SEARCH}/${search}/${page}`;
  try {
    const callParams = await getCallParams("GET");
    const response: any = await makeCall(url, callParams);
    return response;
  } catch (error: any) {
    throw error;
  }
};

export const fetchSearchRolesCount = async (search: string) => {
  const url = `${urls.GET_ROLES_SEARCH_COUNT}/${search}`;
  try {
    const callParams = await getCallParams("GET");
    const response: any = await makeCall(url, callParams);
    return response;
  } catch (error: any) {
    throw error;
  }
};
