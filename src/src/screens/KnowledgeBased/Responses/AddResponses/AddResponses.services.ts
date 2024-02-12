import urls from "global/constants/UrlConstants";
import { getCallParams, makeCall } from "utils/service";

export const getRegionData = async () => {
  const url = `${urls.getRegion}`;
  try {
    const callParams = await getCallParams("GET");
    const response = await makeCall(url, callParams);
    return response;
  } catch (error: any) {
    throw error;
  }
};

export const getDomainData = async (region: string) => {
  const url = `${urls.getDomain}/${region}`;
  try {
    const callParams = await getCallParams("GET");
    const response = await makeCall(url, callParams);
    return response;
  } catch (error: any) {
    throw error;
  }
};

export const getSubDomainData = async (domain: string) => {
  const url = `${urls.getSubdomain}/${domain}`;
  try {
    const callParams = await getCallParams("GET");
    const response = await makeCall(url, callParams);
    return response;
  } catch (error: any) {
    throw error;
  }
};

export const getResponseData = async (id: any) => {
  const url = `${urls.getResponse}/${id}`;
  try {
    const callParams = await getCallParams("GET");
    const response = await makeCall(url, callParams);
    return response;
  } catch (error: any) {
    throw error;
  }
};
// add responses api
export const addResponsesApi = async (addResponseData: any) => {
  const url = `${urls.addResponses}`;
  try {
    const callParams = await getCallParams("POST", addResponseData);
    const response = await makeCall(url, callParams);
    return response;
  } catch (error: any) {
    throw error;
  }
};
