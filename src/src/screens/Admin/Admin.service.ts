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
export const addAttribute = async (type: any, data: any) => {
  const url = `${urls.addAttribute}/${type}`;
  try {
    const callParams = await getCallParams("POST", data);
    const response = await makeCall(url, callParams);
    return response;
  } catch (error) {
    throw error;
  }
};
export const deleteAttribute = async (type: any, name: any, data: any) => {
  const url = `${urls.deleteAttribute}/${type}/${name}`;
  try {
    const callParams = await getCallParams("DELETE", data);
    const response = await makeCall(url, callParams);
    return response;
  } catch (error) {
    throw error;
  }
};
export const deleteAttributeSubDomains = async (
  type: any,
  name: any,
  data: any,
  context: any
) => {
  const url = `${urls.deleteAttribute}/${type}/domain/${context}/name/${name}`;
  try {
    const callParams = await getCallParams("DELETE", data);
    const response = await makeCall(url, callParams);
    return response;
  } catch (error) {
    throw error;
  }
};
export const deleteAttributeDomains = async (
  type: any,
  name: any,
  data: any,
  region: any
) => {
  const url = `${urls.deleteAttribute}/${type}/${name}/${region}`;
  try {
    const callParams = await getCallParams("DELETE", data);
    const response = await makeCall(url, callParams);
    return response;
  } catch (error) {
    throw error;
  }
};
export const addAttributeSubDomain = async (
  type: any,
  data: any,
  domain: any
) => {
  const url = `${urls.addAttribute}/${type}/${domain}`;
  try {
    const callParams = await getCallParams("POST", data);
    const response = await makeCall(url, callParams);
    return response;
  } catch (error) {
    throw error;
  }
};

export const getProcessDef = async () => {
  const url = `${urls.getProcessDef}`;
  try {
    const callParams = await getCallParams("GET");
    const response = await makeCall(url, callParams);
    return response;
  } catch (error) {
    throw error;
  }
};
export const getStatus = async () => {
  const url = `${urls.getStatus}`;
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

export const getContact = async () => {
  const url = `${urls.getContact}`;
  try {
    const callParams = await getCallParams("GET");
    const response = await makeCall(url, callParams);
    return response;
  } catch (error) {
    throw error;
  }
};

export const getSubDomain = async (domain: any) => {
  const url = `${urls.getSubDomain}/${domain}`;
  try {
    const callParams = await getCallParams("GET");
    const response = await makeCall(url, callParams);
    return response;
  } catch (error) {
    throw error;
  }
};

export const getSubmission = async () => {
  const url = `${urls.getSubmission}`;
  try {
    const callParams = await getCallParams("GET");
    const response = await makeCall(url, callParams);
    return response;
  } catch (error) {
    throw error;
  }
};

export const getReason = async () => {
  const url = `${urls.getReason}`;
  try {
    const callParams = await getCallParams("GET");
    const response = await makeCall(url, callParams);
    return response;
  } catch (error) {
    throw error;
  }
};

export const getDomain = async (region: any) => {
  const url = `${urls.getDomain}/${region}`;
  try {
    const callParams = await getCallParams("GET");
    const response = await makeCall(url, callParams);
    return response;
  } catch (error) {
    throw error;
  }
};
