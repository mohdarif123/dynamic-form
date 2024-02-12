import urls from "global/constants/UrlConstants";
import {
  getCallParams,
  getCallSearchParams,
  getSearchedCallParams,
  makeCall,
  makeCallFile,
} from "utils/service";

export const leaningData = async (
  region: string,
  domain: string,
  reason: any,
  page: number,
  pageSize: number
) => {
  try {
    const callParams = await getCallParams("GET");
    const response = await makeCall(
      `${urls.getLearningData}/region/${region}/domain/${domain}/reason/${reason}/limit/${pageSize}/page/${page}`,
      callParams
    );
    return response;
  } catch (error: any) {
    throw error;
  }
};

export const learningCount = async (
  region: string,
  domain: string,
  reason: string
) => {
  try {
    const callParams = await getCallParams("GET");
    const response = await makeCall(
      `${urls.getLearningData}/count/region/${region}/domain/${domain}/reason/${reason}`,
      callParams
    );
    return response;
  } catch (error: any) {
    throw error;
  }
};
export const learningCountSearch = async (
  region: string,
  domain: string,
  searchTxt: any,
  reason: string
) => {
  try {
    const callParams = await getCallSearchParams("POST", searchTxt);
    const response = await makeCall(
      `${urls.getLearningData}/count/search/region/${region}/domain/${domain}/reason/${reason}`,
      callParams
    );
    return response;
  } catch (error: any) {
    throw error;
  }
};

export const getSearchData = async (
  region: string,
  domain: string,
  searchValue: string,
  reason: string,
  page: any,
  pageSize: any
) => {
  try {
    const callParams = await getSearchedCallParams("POST", searchValue);
    const response = await makeCall(
      `${urls.getSearchData}/region/${region}/domain/${domain}/reason/${reason}/limit/${pageSize}/page/${page}`,
      callParams
    );
    return response;
  } catch (error: any) {
    throw error;
  }
};

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

export const getExport = async (
  region: any,
  fileName: any,
  domain: any,
  reason: any
) => {
  const url = `${urls.EXPORT_FILE_LOST_RFP}/region/${region}/domain/${domain}/reason/${reason}/file/${fileName}`;
  try {
    const callParams = await getCallParams("GET");
    const response: any = await makeCallFile(url, callParams);
    return response;
  } catch (error: any) {
    throw error;
  }
};

export const viewDocumentProposal = async (data: any) => {
  try {
    const callParams = await getCallParams("POST", data);
    const response = await makeCall(`${urls.PREVIEW_DOCUMENT}`, callParams);
    return response;
  } catch (error) {
    throw error;
  }
};

export const downloadDocument = async (data: any) => {
  try {
    const callParams = await getCallParams("POST", data);
    const response: any = await makeCallFile(urls.DOWNLOAD_FILE, callParams);
    return response;
  } catch (error: any) {
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
