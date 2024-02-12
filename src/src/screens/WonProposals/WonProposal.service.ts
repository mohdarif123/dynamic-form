import urls from "global/constants/UrlConstants";
import { getCallParams, getCallSearchParams, makeCall } from "utils/service";

export const getWonProposalTableData = async (page: number, pageSize: any) => {
  try {
    const callParams = await getCallParams("GET");
    const response = await makeCall(
      `${urls.getProposalData}/interval/-1/status/Won/type/All/action/All/region/All/domain/All/submissionType/All/contractType/All/subDomain/All/limit/${pageSize}/page/${page}`,
      callParams
    );
    return response;
  } catch (error) {
    throw error;
  }
};
export const getWonProposalTableDataCount = async () => {
  try {
    const callParams = await getCallParams("GET");
    const response = await makeCall(
      `${urls.getProposalData}/count/interval/-1/status/Won/type/All/action/All/region/All/domain/All/submissionType/All/contractType/All/subDomain/All`,
      callParams
    );
    return response;
  } catch (error) {
    throw error;
  }
};
export const getProposalSearchCount = async (searchText: any) => {
  try {
    const callParams = await getCallParams("GET");
    const response = await makeCall(
      `${urls.searchingProspsal}/count/interval/-1/status/Won/type/All/action/All/region/All/domain/All/submissionType/All/contractType/All/subDomain/All/text/${searchText}`,
      callParams
    );
    return response;
  } catch (error) {
    throw error;
  }
};

export const getSearchedWonProposalTableData = async (
  searchText: string,
  page: any,
  pageSize: any
) => {
  try {
    const callParams = await getCallParams("GET");
    const response = await makeCall(
      `${urls.searchingProspsal}/interval/-1/status/Won/type/All/action/All/region/All/domain/All/submissionType/All/contractType/All/subDomain/All/text/${searchText}/limit/${pageSize}/page/${page}`,
      callParams
    );
    return response;
  } catch (error) {
    throw error;
  }
};

export const getExpiredWon = async (
  limit: any,
  pageNumber: any,
  region: any,
  state: any
) => {
  try {
    const callParams = await getCallParams("GET");
    const response = await makeCall(
      `${urls.getExpiredWon}/region/${region}/state/${state}/limit/${limit}/page/${pageNumber}`,
      callParams
    );
    return response;
  } catch (error) {
    throw error;
  }
};

export const getExpiredWonCount = async (region: any, state: any) => {
  try {
    const callParams = await getCallParams("GET");
    const response = await makeCall(
      `${urls.getExpiredWonCount}/region/${region}/state/${state}/count`,
      callParams
    );
    return response;
  } catch (error) {
    throw error;
  }
};

export const getContinueWon = async (
  limit: any,
  pageNumber: any,
  region: any,
  state: any,
  interval: any
) => {
  try {
    const callParams = await getCallParams("GET");
    const response = await makeCall(
      `${urls.getContinueWon}/region/${region}/state/${state}/interval/${interval}/limit/${limit}/page/${pageNumber}`,
      callParams
    );
    return response;
  } catch (error) {
    throw error;
  }
};

export const getContinueWonCount = async (
  region: any,
  state: any,
  interval: any
) => {
  try {
    const callParams = await getCallParams("GET");
    const response = await makeCall(
      `${urls.getContinueWonCount}/region/${region}/state/${state}/interval/${interval}/count`,
      callParams
    );
    return response;
  } catch (error) {
    throw error;
  }
};

export const getWon = async (
  limit: any,
  pageNumber: any,
  region: any,
  state: any
) => {
  try {
    const callParams = await getCallParams("GET");
    const response = await makeCall(
      `${urls.getWon}/region/${region}/state/${state}/limit/${limit}/page/${pageNumber}`,
      callParams
    );
    return response;
  } catch (error) {
    throw error;
  }
};

export const getWonCount = async (region: any, state: any) => {
  try {
    const callParams = await getCallParams("GET");
    const response = await makeCall(
      `${urls.getWonCount}/region/${region}/state/${state}/count`,
      callParams
    );
    return response;
  } catch (error) {
    throw error;
  }
};

export const getContinueWonSearch = async (
  limit: any,
  pageNumber: any,
  search: any,
  region: any,
  state: any,
  interval: any
) => {
  try {
    const callParams = await getCallSearchParams("POST", search);
    const response = await makeCall(
      `${urls.getContinueWonSearch}/region/${region}/state/${state}/interval/${interval}/limit/${limit}/page/${pageNumber}`,
      callParams
    );
    return response;
  } catch (error) {
    throw error;
  }
};

export const getContinueWonCountSearch = async (
  searchTxt: any,
  region: any,
  state: any,
  interval: any
) => {
  try {
    const callParams = await getCallSearchParams("POST", searchTxt);
    const response = await makeCall(
      `${urls.getContinueWonCountSearch}/region/${region}/state/${state}/interval/${interval}/count`,
      callParams
    );
    return response;
  } catch (error) {
    throw error;
  }
};

export const getExpiredWonSearch = async (
  limit: any,
  pageNumber: any,
  searchTxt: any,
  region: any,
  state: any
) => {
  try {
    const callParams = await getCallSearchParams("POST", searchTxt);
    const response = await makeCall(
      `${urls.getExpiredWonSearch}/region/${region}/state/${state}/limit/${limit}/page/${pageNumber}`,
      callParams
    );
    return response;
  } catch (error) {
    throw error;
  }
};

export const getExpiredWonCountSearch = async (
  searchTxt: any,
  region: any,
  state: any
) => {
  try {
    const callParams = await getCallSearchParams("POST", searchTxt);
    const response = await makeCall(
      `${urls.getExpiredWonCountSearch}/region/${region}/state/${state}/count`,
      callParams
    );
    return response;
  } catch (error) {
    throw error;
  }
};

export const getWonSearch = async (
  limit: any,
  pageNumber: any,
  searchTxt: any,
  region: any,
  state: any
) => {
  try {
    const callParams = await getCallSearchParams("POST", searchTxt);
    const response = await makeCall(
      `${urls.getWonSearch}/region/${region}/state/${state}/limit/${limit}/page/${pageNumber}`,
      callParams
    );
    return response;
  } catch (error) {
    throw error;
  }
};

export const getWonCountSearch = async (
  searchTxt: any,
  region: any,
  state: any
) => {
  try {
    const callParams = await getCallSearchParams("POST", searchTxt);
    const response = await makeCall(
      `${urls.getWonCountSearch}/region/${region}/state/${state}/count`,
      callParams
    );
    return response;
  } catch (error) {
    throw error;
  }
};

export const getRegion = async () => {
  try {
    const callParams = await getCallParams("GET");
    const response = await makeCall(urls.getRegion, callParams);
    return response;
  } catch (error) {
    throw error;
  }
};

export const getState = async (region: any) => {
  if (region === "US") {
    region = "United States";
  }
  try {
    const callParams = await getCallParams("GET");
    const response = await makeCall(
      `${urls.getStateData}/country/${region}`,
      callParams
    );
    return response;
  } catch (error) {
    throw error;
  }
};
//http://localhost:6010/erp/secure/location/country/{United States}
