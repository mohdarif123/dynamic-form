import urls from "global/constants/UrlConstants";
import { getCallParams, makeCall } from "utils/service";

export const getCompetitiveData = async (id: any) => {
  const url = `${urls.viewCompetitive}/${id}`;
  try {
    const callParams = await getCallParams("GET");
    const response = await makeCall(url, callParams);
    return response;
  } catch (error) {
    throw error;
  }
};
export const getDocumentData = async (id: any) => {
  const url = `${urls.fetchDocument}/${id}`;
  try {
    const callParams = await getCallParams("GET");
    const response = await makeCall(url, callParams);
    return response;
  } catch (error) {
    throw error;
  }
};
