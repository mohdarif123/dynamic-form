import urls from "global/constants/UrlConstants";
import { getCallParams, getCallSearchParams, makeCall } from "utils/service";

// responses table api
export const getResponse = async (
  region: string,
  domain: string,
  subDomain: string,
  limit: any,
  page: any
) => {
  const url = `${urls.getResponsesData}/region/${region}/domain/${domain}/subDomain/${subDomain}/limit/${limit}/page/${page}`;
  try {
    const callParams = await getCallParams("GET");
    const response = await makeCall(url, callParams);
    return response;
  } catch (error: any) {
    throw error;
  }
};

export const getResponseCount = async (
  region: string,
  domain: string,
  subDomain: string
) => {
  const url = `${urls.getResponsesDataCount}/region/${region}/domain/${domain}/subDomain/${subDomain}`;
  try {
    const callParams = await getCallParams("GET");
    const response = await makeCall(url, callParams);
    return response;
  } catch (error: any) {
    throw error;
  }
};

// responses search table api
export const getSearchData = async (
  region: string,
  domain: string,
  subDomain: string,
  searchValue: string,
  page: any,
  pageSize: any
) => {
  const url = `${urls.getResponsesSearchData}/region/${region}/domain/${domain}/subDomain/${subDomain}/limit/${pageSize}/page/${page}`;
  try {
    const callParams = await getCallSearchParams("POST",searchValue);
    const response = await makeCall(url, callParams);
    return response;
  } catch (error: any) {
    throw error;
  }
};

export const getSearchDataCount = async (
  region: string,
  domain: string,
  subDomain: string,
  searchValue: string
) => {
  const url = `${urls.getResponsesSearchData}/count/region/${region}/domain/${domain}/subDomain/${subDomain}`;
  try {
    const callParams = await getCallSearchParams("POST", searchValue);
    const response = await makeCall(url, callParams);
    return response;
  } catch (error: any) {
    throw error;
  }
};

// view history modal table data api
export const getHistoryData = async (id: string, page: number, data: any) => {
  const url = `${urls.getHistory}/${id}/${page}`;
  try {
    const callParams = await getCallSearchParams("POST", data);
    const response = await makeCall(url, callParams);
    return response;
  } catch (error: any) {
    throw error;
  }
};

// statuc old content  api
export const getOldContent = async (id: string) => {
  const url = `${urls.getOldContent}/${id}`;
  try {
    const callParams = await getCallParams("GET");
    const response = await makeCall(url, callParams);
    return response;
  } catch (error: any) {
    throw error;
  }
};
// statuc old content  api
export const getNewContent = async (id: string) => {
  const url = `${urls.getNewContent}/${id}`;
  try {
    const callParams = await getCallParams("GET");
    const response = await makeCall(url, callParams);
    return response;
  } catch (error: any) {
    throw error;
  }
};
// get region api
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
// get domain api
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
// get sub domain api
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
export const deleteResponse = async (data: any) => {
  const url = `${urls.deleteResponse}`;
  try {
    const callParams = await getCallParams("POST", data);
    const response = await makeCall(url, callParams);
    return response;
  } catch (error: any) {
    throw error;
  }
};
