import urls from "global/constants/UrlConstants";
import {
  getCallParams,
  getCallSearchParams,
  getFileCallParams,
  makeCall,
  makeCallFile,
} from "utils/service";

export const getCompetitive = async (
  region: string,
  domain: string,
  page: number,
  limit: any
) => {
  const url = `${urls.getCompetitiveData}/${region}/${domain}/limit/${limit}/page/${page}`;
  try {
    const callParams = await getCallParams("GET");
    const response = await makeCall(url, callParams);
    return response;
  } catch (error: any) {
    throw error;
  }
};
export const getCompetitiveSearch = async (
  region: string,
  domain: string,
  page: number,
  text: any,
  pageSize?: any
) => {
  const url = `${urls.getSearchCompetitiveData}/region/${region}/domain/${domain}/limit/${pageSize}/page/${page}`;
  try {
    const callParams = await getCallSearchParams("POST", text);
    const response = await makeCall(url, callParams);
    return response;
  } catch (error: any) {
    throw error;
  }
};
export const upload = async (id: any, formData: any) => {
  try {
    const callParams = await getFileCallParams(formData);
    const response = await makeCall(`${urls.uploadDocument}/${id}`, callParams);
    return response;
  } catch (error) {
    throw error;
  }
};
export const addDocumentService = async (data: any) => {
  try {
    const callParams = await getCallParams("POST", data);
    const response: any = await makeCall(urls.documentAdd, callParams);
    return response;
  } catch (error: any) {
    throw error;
  }
};
export const deleteDocument = async (data: any) => {
  try {
    const callParams = await getCallParams("POST", data);
    const response: any = await makeCall(urls.deleteDocument, callParams);
    return response;
  } catch (error: any) {
    throw error;
  }
};
export const deleteCompetitive = async (data: any) => {
  try {
    const callParams = await getCallParams("POST", data);
    const response: any = await makeCall(urls.competitiveDelete, callParams);
    return response;
  } catch (error: any) {
    throw error;
  }
};

export const getRegion = async () => {
  try {
    const callParams = await getCallParams("GET");
    const response = await makeCall(`${urls.getRegion}`, callParams);
    return response;
  } catch (error) {
    throw error;
  }
};

export const getDomain = async (value: any) => {
  try {
    const callParams = await getCallParams("GET");
    const response = await makeCall(
      `${urls.getProposalDomain}/${value}`,
      callParams
    );
    return response;
  } catch (error) {
    throw error;
  }
};

export const getCompetitiveCount = async (region: string, domain: string) => {
  try {
    const callParams = await getCallParams("GET");
    const response = await makeCall(
      `${urls.getCompetitiveCount}/region/${region}/domain/${domain}`,
      callParams
    );
    return response;
  } catch (error) {
    throw error;
  }
};

export const getCompetitiveCountSearch = async (
  region: string,
  domain: string,
  searchText: string
) => {
  try {
    const callParams = await getCallSearchParams("POST", searchText);
    const response = await makeCall(
      `${urls.getSearchCompetitiveCount}/region/${region}/domain/${domain}`,
      callParams
    );
    return response;
  } catch (error) {
    throw error;
  }
};
export const updateComptitve = async (data: any) => {
  try {
    const callParams = await getCallParams("PATCH", data);
    const response = await makeCall(`${urls.updateComptetive}`, callParams);
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
