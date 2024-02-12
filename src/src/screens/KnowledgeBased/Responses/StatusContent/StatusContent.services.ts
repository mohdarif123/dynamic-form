import urls from "global/constants/UrlConstants";
import { getCallParams, makeCall } from "utils/service";

export const rejectContent = async (newContent: any) => {
  try {
    const callParams = await getCallParams("POST", newContent);
    const response = await makeCall(`${urls.getContentReject}`, callParams);
    return response;
  } catch (error) {
    throw error;
  }
};

export const approvedContent = async (data: any) => {
  try {
    const callParams = await getCallParams("PATCH", data);
    const response: any = await makeCall(urls.getContentApproved, callParams);
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
