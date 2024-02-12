import urls from "global/constants/UrlConstants";
import { getCallParams, makeCall, makeCallFile } from "utils/service";

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
export const getName = async () => {
  const url = `${urls.getUserPage}`;
  try {
    const callParams = await getCallParams("GET");
    const response = await makeCall(url, callParams);
    return response;
  } catch (error) {
    throw error;
  }
};
export const getTableData = async (
  from: any,
  to: any,
  type: any,
  region: any,
  domain: any,
  status: any,
  createdBy: any
) => {
  const url = `${urls.viewProposal}/statusHistory/ByDateWithAction/from/${from}/to/${to}/type/${type}/region/${region}/domain/${domain}/status/${status}/createdBy/${createdBy}`;
  try {
    const callParams = await getCallParams("GET");
    const response = await makeCall(url, callParams);
    return response;
  } catch (error) {
    throw error;
  }
};
export const getTableDataUser = async (
  from: any,
  to: any,
  type: any,
  region: any,
  domain: any,
  status: any,
  createdBy: any
) => {
  const url = `${urls.viewProposal}/statusHistory/from/${from}/to/${to}/type/${type}/region/${region}/domain/${domain}/status/${status}/createdBy/${createdBy}`;
  try {
    const callParams = await getCallParams("GET");
    const response = await makeCall(url, callParams);
    return response;
  } catch (error) {
    throw error;
  }
};

export const getExport = async (
  region: any,
  createdBy: any,
  status: any,
  fileName: any,
  fromDate: any,
  toDate: any,
  domain: any,
  type: any
) => {
  const url = `${urls.EXORT_FILE_USER}/from/${fromDate}/to/${toDate}/type/${type}/region/${region}/domain/${domain}/status/${status}/createdBy/${createdBy}/file/${fileName}`;
  try {
    const callParams = await getCallParams("GET");
    const response: any = await makeCallFile(url, callParams);
    return response;
  } catch (error: any) {
    throw error;
  }
};
