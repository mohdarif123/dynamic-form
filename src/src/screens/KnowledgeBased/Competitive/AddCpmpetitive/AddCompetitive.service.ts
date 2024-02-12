import urls from "global/constants/UrlConstants";
import { getCallParams, makeCall } from "utils/service";

export const getRegion = async () => {
  const url = `${urls.getRegion}`;
  try {
    const callParams = await getCallParams("GET");
    const response = await makeCall(url, callParams);
    return response;
  } catch (error) {
    throw error;
  }
};
export const getDomain = async (domain: string) => {
  const url = `${urls.getDomain}/${domain}`;
  try {
    const callParams = await getCallParams("GET");
    const response = await makeCall(url, callParams);
    return response;
  } catch (error) {
    throw error;
  }
};
export const getType = async () => {
  const url = `${urls.getType}`;
  try {
    const callParams = await getCallParams("GET");
    const response = await makeCall(url, callParams);
    return response;
  } catch (error) {
    throw error;
  }
};
export const getSource = async () => {
  const url = `${urls.getSource}`;
  try {
    const callParams = await getCallParams("GET");
    const response = await makeCall(url, callParams);
    return response;
  } catch (error) {
    throw error;
  }
};
export const addCompetitive = async (competitivePayload: any) => {
  try {
    const callParams = await getCallParams("POST", competitivePayload);
    const response = await makeCall(`${urls.addCompetitive}`, callParams);
    return response;
  } catch (error) {
    throw error;
  }
};
