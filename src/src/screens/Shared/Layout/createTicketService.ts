import urls from "global/constants/UrlConstants";
import {
  getCallParams,
  getFileCallParams,
  makeCall,
} from "utils/service";

export const addNewSupportTicket = async (
  process: any,
  name: any,
  description: any,
  docUrl: any
) => {
  try {
    const body = { process, name, description, docUrl };
    const callParams = await getCallParams("POST", body);
    const response: any = await makeCall(urls.Add_Support, callParams);
    return response;
  } catch (error: any) {
    throw error;
  }
};
export const attachFileUpload = async (formData: any) => {
  try {
    const callParams = await getFileCallParams(formData);
    const response: any = await makeCall(urls.attachFileUpload, callParams);
    return response;
  } catch (error: any) {
    throw error;
  }
};
