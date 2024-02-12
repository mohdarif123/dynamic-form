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
export const getData = async (month: any, year: any, region: any) => {
  const url = `${urls.getMonthlyReport}/region/${region}/month/${month}/year/${year}`;
  try {
    const callParams = await getCallParams("GET");
    const response = await makeCall(url, callParams);
    return response;
  } catch (error) {
    throw error;
  }
};
export const getDataTarget = async (month: any, year: any) => {
  const url = `${urls.getMonthlyReport}/rfpTarget/${month}/${year}`;
  try {
    const callParams = await getCallParams("GET");
    const response = await makeCall(url, callParams);
    if (response) {
      return response;
    } else {
      return { audit: null, value: [] };
    }
  } catch (error) {
    return { audit: null, value: [] };
  }
};
export const getDataWeek = async (first: any, second: any, region: any) => {
  const url = `${urls.getMonthlyReport}/region/${region}/weekly/${first}|${second}`;
  try {
    const callParams = await getCallParams("GET");
    const response = await makeCall(url, callParams);
    return response;
  } catch (error) {
    throw error;
  }
};
export const getDataTargetWeek = async (month: any, year: any) => {
  const url = `${urls.getMonthlyReport}/rfpTarget/${month}/${year}`;
  try {
    const callParams = await getCallParams("GET");
    const response = await makeCall(url, callParams);
    if (response) {
      return response;
    } else {
      return { audit: null, value: [] };
    }
  } catch (error) {
    return { audit: null, value: [] };
  }
};

export const getExport = async (
  region: any,
  month: any,
  year: any,
  fileName: any
) => {
  const url = `${urls.Export_FILE}/region/${region}/month/${month}/year/${year}/file/${fileName}`;
  try {
    const callParams = await getCallParams("GET");
    const response: any = await makeCallFile(url, callParams);
    return response;
  } catch (error: any) {
    throw error;
  }
};
