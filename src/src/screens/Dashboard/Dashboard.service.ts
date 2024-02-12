import moment from "moment";
import urls from "global/constants/UrlConstants";
import { getCallParams, getCallSearchParams, makeCall } from "utils/service";
import {
  handleCalculateDifference,
  weekValue,
  weekValueMonth,
} from "./DashboardData";

export const getRfpDomainCount = async (
  region: string,
  domain: string,
  dateRange: any
) => {
  const url = `${urls.GET_PROPOSAL_METRICS_BY_DATE_RANGE}/${region}/domain/${domain}/from/${dateRange.fromDate}/to/${dateRange.toDate}`;
  try {
    const callParams = await getCallParams("GET");
    const response = await makeCall(url, callParams);
    return response;
  } catch (error) {
    throw error;
  }
};

export const getTotalRFPsCountMethod = async (dateRange: any) => {
  const url = `${urls.GET_TOTAL_PROPOSAL_METRICS}/from/${dateRange.fromDate}/to/${dateRange.toDate}`;
  try {
    const callParams = await getCallParams("GET");
    const response = await makeCall(url, callParams);
    return response;
  } catch (error) {
    throw error;
  }
};

export const getUser = async () => {
  try {
    const callParams = await getCallParams("GET");
    const response = await makeCall(`${urls.getUserPage}`, callParams);
    return response;
  } catch (error) {
    throw error;
  }
};

export const getRfpDueCountwithDomain = async (
  region: string,
  domain: string,
  dateRange: any
) => {
  const url = `${urls.getRfpDueCountwithDomain}/${region}/domain/${domain}/from/${dateRange.fromDate}/to/${dateRange.toDate}`;
  try {
    const callParams = await getCallParams("GET");
    const response = await makeCall(url, callParams);
    return response;
  } catch (error) {
    throw error;
  }
};
export const getRfpTotalWithDomain = async (
  region: string,
  domain: string,
  interval: number
) => {
  const url = `${urls.getRfpTotalWithDomain}/${region}/domain/${domain}/interval/${interval}`;
  try {
    const callParams = await getCallParams("GET");
    const response = await makeCall(url, callParams);
    return response;
  } catch (error) {
    throw error;
  }
};
export const getWonProposalTableDataCount = async (dateRange: any) => {
  try {
    const callParams = await getCallSearchParams("POST", "All");
    const response = await makeCall(
      `${urls.getProposalData}/count/status/Won/type/All/action/All/region/All/domain/All/submissionType/All/contractType/All/subDomain/All/from/${dateRange.fromDate}/to/${dateRange.toDate}`,
      callParams
    );
    return response;
  } catch (error) {
    throw error;
  }
};
export const getRfpByStatusWithDomain = async (
  region: string,
  domain: string,
  dateRange: any
) => {
  const url = `${urls.getRfpByStatusWithDomain}/${region}/domain/${domain}/from/${dateRange.fromDate}/to/${dateRange.toDate}`;
  try {
    const callParams = await getCallParams("GET");
    const response = await makeCall(url, callParams);
    return response;
  } catch (error) {
    throw error;
  }
};

export const getRfpByTypeWithDomain = async (
  region: string,
  domain: string,
  dateRange: any
) => {
  const url = `${urls.getRfpByTypeWithDomain}/${region}/domain/${domain}/from/${dateRange.fromDate}/to/${dateRange.toDate}`;
  try {
    const callParams = await getCallParams("GET");
    const response = await makeCall(url, callParams);
    return response;
  } catch (error) {
    throw error;
  }
};
export const getRfpByDomainWithDomain = async () => {
  const url = `${urls.getRfpByDomainWithDomain}/interval/-1`;
  try {
    const callParams = await getCallParams("GET");
    const response = await makeCall(url, callParams);
    return response;
  } catch (error) {
    throw error;
  }
};
export const getDomainData = async (region: string) => {
  const url = `${urls.getDomain}/${region}`;
  try {
    const callParams = await getCallParams("GET");
    const response = await makeCall(url, callParams);
    return response;
  } catch (error) {
    throw error;
  }
};
export const getProjectTopDataValue = async (asigneeName: any) => {
  const url = `${urls.getProjectTop}/${asigneeName}/limit/5/page/1`;
  try {
    const callParams = await getCallParams("GET");
    const response = await makeCall(url, callParams);
    return response;
  } catch (error) {
    throw error;
  }
};
export const getDocumentExpiryValue = async (documentType: any) => {
  const url = `${urls.getDocumentExpiry}/${documentType}/metrics/expiry`;
  try {
    const callParams = await getCallParams("GET");
    const response = await makeCall(url, callParams);
    return response;
  } catch (error) {
    throw error;
  }
};
export const getlostRfpData = async (
  region: any,
  domain: any,
  dateRange: any
) => {
  const url = `${urls.getLostRfData}/region/${region}/domain/${domain}/from/${dateRange.fromDate}/to/${dateRange.toDate}`;
  try {
    const callParams = await getCallParams("GET");
    const response = await makeCall(url, callParams);
    return response;
  } catch (error) {
    throw error;
  }
};
export const getProjectData = async (dateRange: any) => {
  const fromdate = weekValueMonth(dateRange);
  const todate = moment().format("MM-DD-YYYY");
  const url = `${urls.getprojectVolumn}/month/from/${fromdate}/to/${todate}`;
  try {
    const callParams = await getCallParams("GET");
    const response = await makeCall(url, callParams);
    return response;
  } catch (error) {
    throw error;
  }
};
export const getRegionData = async () => {
  const url = `${urls.getRegion}`;
  try {
    const callParams = await getCallParams("GET");
    const response = await makeCall(url, callParams);
    return response;
  } catch (error) {
    throw error;
  }
};
export const getRfpMetricsByAttribute = async (
  type: string,
  interval: number
) => {
  const url = `${urls.getRfpMetricsByAttribute}/${type}/interval/${interval}`;
  try {
    const callParams = await getCallParams("GET");
    const response = await makeCall(url, callParams);
    return response;
  } catch (error) {
    throw error;
  }
};
export const getRfpTotal = async (interval: number) => {
  const url = `${urls.getRfpTotal}/${interval}`;
  try {
    const callParams = await getCallParams("GET");
    const response = await makeCall(url, callParams);
    return response;
  } catch (error) {
    throw error;
  }
};
export const getRfpTask = async () => {
  const url = `${urls.getRfpTask}`;
  try {
    const callParams = await getCallParams("GET");
    const response = await makeCall(url, callParams);
    return response;
  } catch (error) {
    throw error;
  }
};
export const getRfpTaskOpen = async () => {
  const url = `${urls.getRfpTaskOpen}`;
  try {
    const callParams = await getCallParams("GET");
    const response = await makeCall(url, callParams);
    return response;
  } catch (error) {
    throw error;
  }
};
export const getRfpByAttribute = async (type: string) => {
  const url = `${urls.getRfpByAttribute}/${type}`;
  try {
    const callParams = await getCallParams("GET");
    const response = await makeCall(url, callParams);
    return response;
  } catch (error) {
    throw error;
  }
};
export const getAnalytical = async (month: number, year: number) => {
  const url = `${urls.getAnalytical}/${month}/${year}`;
  try {
    const callParams = await getCallParams("GET");
    const response = await makeCall(url, callParams);
    return response;
  } catch (error) {
    throw error;
  }
};
export const getWeekReport = async (weekly: string) => {
  const url = `${urls.getWeekReport}/${weekly}`;
  try {
    const callParams = await getCallParams("GET");
    const response = await makeCall(url, callParams);
    return response;
  } catch (error) {
    throw error;
  }
};
export const getLastWonProposal = async () => {
  const url = `${urls.getLastWonProposal}`;
  try {
    const callParams = await getCallParams("GET");
    const response = await makeCall(url, callParams);
    return response;
  } catch (error) {
    throw error;
  }
};
export const getMyTasksCount = async () => {
  const url = `${urls.getMyTasksCount}`;
  try {
    const callParams = await getCallParams("GET");
    const response = await makeCall(url, callParams);
    return response;
  } catch (error) {
    throw error;
  }
};

export const getOpenTasksCount = async () => {
  const url = `${urls.getOpenTasksCount}`;
  try {
    const callParams = await getCallParams("GET");
    const response = await makeCall(url, callParams);
    return response;
  } catch (error) {
    throw error;
  }
};
export const getByDomainValue = async (dateRange: any) => {
  const url = `${urls.getDomainValueForChart}/${dateRange.fromDate}/to/${dateRange.toDate}`;
  try {
    const callParams = await getCallParams("GET");
    const response = await makeCall(url, callParams);
    return response;
  } catch (error) {
    throw error;
  }
};
// const url = `${urls.getRfpByAttribute}/${type}`;
