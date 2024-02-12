import strings from "global/constants/StringConstants";
import urls from "global/constants/UrlConstants";
import {
  getCallParams,
  getFileCallParams,
  makeCall,
  makeCallFile,
} from "utils/service";

export const getAssigned = async (page: number, limit: number) => {
  const url = `${urls.ASSIGNED}my/limit/10/page/${page + 1}`;
  try {
    const callParams = await getCallParams("GET");
    const response = await makeCall(url, callParams);
    return response;
  } catch (error: any) {
    throw error;
  }
};

export const getAssigneeValue = async () => {
  const url = `${urls.getUsersData}/-1`;
  try {
    const callParams = await getCallParams("GET");
    const response = await makeCall(url, callParams);
    return response;
  } catch (error: any) {
    throw error;
  }
};

export const updateAssignName = async (data: any) => {
  const url = `${urls.updateAssignTo}`;
  try {
    const callParams = await getCallParams("POST", data);
    const response = await makeCall(url, callParams);
    return response;
  } catch (error: any) {
    throw error;
  }
};

export const getTicketInfoById = async (id: number) => {
  const url = `${urls.GET_TASK_BY_ID}/${id}`;
  try {
    const callParams = await getCallParams("GET");
    const response = await makeCall(url, callParams);
    return response;
  } catch (error: any) {
    throw error;
  }
};

export const getAssignedCount = async () => {
  try {
    const callParams = await getCallParams("GET");
    const response = await makeCall(urls.ASSIGNED_COUNT, callParams);
    return response;
  } catch (error: any) {
    throw error;
  }
};
export const isProcessIsAdmin = async () => {
  const url = `${urls.isProcessAdmin}`;
  try {
    const callParams = await getCallParams("GET");
    const response = await makeCall(url, callParams);
    return response;
  } catch (error: any) {
    throw error;
  }
};

export const getRaised = async (page: number, limit: number) => {
  const url = `${urls.RAISED}/${page + 1}`;
  try {
    const callParams = await getCallParams("GET");
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
export const completeTasks = async (data: any) => {
  const url = `${urls.COMPLETE}`;
  try {
    const callParams = await getCallParams("POST", data);
    const response = await makeCall(url, callParams);
    return response;
  } catch (error: any) {
    throw error;
  }
};

export const getRaisedCount = async () => {
  try {
    const callParams = await getCallParams("GET");
    const response = await makeCall(urls.RAISED_COUNT, callParams);
    return response;
  } catch (error: any) {
    throw error;
  }
};

export const getCompleted = async (page: number, limit: number) => {
  const url = `${urls.COMPLETED}/${page + 1}`;
  try {
    const callParams = await getCallParams("GET");
    const response = await makeCall(url, callParams);
    return response;
  } catch (error: any) {
    throw error;
  }
};

export const getCompletedCount = async () => {
  try {
    const callParams = await getCallParams("GET");
    const response = await makeCall(urls.COMPLETED_COUNT, callParams);
    return response;
  } catch (error: any) {
    throw error;
  }
};

export const getOpen = async (page: number, limit: number) => {
  const url = `${urls.OPEN}/limit/${limit}/page/${page + 1}`;
  try {
    const callParams = await getCallParams("GET");
    const response = await makeCall(url, callParams);
    return response;
  } catch (error: any) {
    throw error;
  }
};

export const getOpenCount = async () => {
  try {
    const callParams = await getCallParams("GET");
    const response = await makeCall(urls.OPEN_COUNT, callParams);
    return response;
  } catch (error: any) {
    throw error;
  }
};

const getSearchUrl = (
  tab: string,
  search: string,
  page: number,
  limit: number
) => {
  if (tab === strings.assignedToMe) {
    return `${urls.ASSIGNED_SEARCH_DATA}/${search}/${page + 1}`;
  } else if (tab === strings.raisedByMe) {
    return `${urls.RAISED_SEARCH_DATA}/${search}/${page + 1}`;
  } else if (tab === strings.completedTickets) {
    return `${urls.COMPLETED_SEARCH_DATA}/${search}/${page + 1}`;
  } else {
    return `${urls.OPEN_SEARCH_DATA}/${search}/${page + 1}`;
  }
};

export const getSearchParams = async (
  tab: string,
  search: string,
  page: number,
  limit: number
) => {
  const url = getSearchUrl(tab, search, page, limit);
  try {
    const callParams = await getCallParams("GET");
    const response = await makeCall(url, callParams);
    return response;
  } catch (error: any) {
    throw error;
  }
};

const getSearchCountUrl = (tab: string, search: string) => {
  switch (tab) {
    case strings.assignedToMe:
      return `${urls.ASSIGNED_SEARCH_COUNT}/${search}`;
    case strings.raisedByMe:
      return `${urls.RAISED_SEARCH_COUNT}/${search}`;
    case strings.completedTickets:
      return `${urls.COMPLETED_SEARCH_COUNT}/${search}`;
    case strings.openTickets:
      return `${urls.OPEN_SEARCH_COUNT}/${search}`;
    default:
      return `${urls.ASSIGNED_SEARCH_COUNT}/${search}`;
  }
};

export const getSearchCountParams = async (tab: string, search: string) => {
  const url = getSearchCountUrl(tab, search);
  try {
    const callParams = await getCallParams("GET");
    const response = await makeCall(url, callParams);
    return response;
  } catch (error: any) {
    throw error;
  }
};

export const updateTicket = async (task: any) => {
  try {
    const callParams = await getCallParams("PATCH", task);
    const response: any = await makeCall(urls.UPDATE_TASK, callParams);
    return response;
  } catch (error: any) {
    throw error;
  }
};

export const completeTicket = async (task: any, complete: boolean) => {
  try {
    const callParams = await getCallParams("POST", task);
    const response = await makeCall(urls.COMPLETE, callParams);
    return response;
  } catch (error) {
    throw error;
  }
};

export const completedTicket = async () => {
  try {
    const callParams = await getCallParams("GET");
    const response = await makeCall(urls.COMPLETED_SEARCH_COUNT, callParams);
    return response;
  } catch (error) {
    throw error;
  }
};

export const completedSearchCount = async () => {
  try {
    const callParams = await getCallParams("GET");
    const response = await makeCall(urls.OPEN_COUNT, callParams);
    return response;
  } catch (error) {
    throw error;
  }
};

export const assignedCount = async () => {
  try {
    const callParams = await getCallParams("GET");
    const response = await makeCall(urls.ASSIGNED_COUNT, callParams);
    return response;
  } catch (error) {
    throw error;
  }
};

export const assignedTicket = async (pageNumber: number, limit: number) => {
  const url = `${urls.ASSIGNED}/${pageNumber + 1}/limit/${limit}`;
  try {
    const callParams = await getCallParams("GET");
    const response = await makeCall(url, callParams);
    return response;
  } catch (error) {
    throw error;
  }
};

export const assigneeGroupName = async (processName: string) => {
  const url = `${urls.ASSIGNEE_GROUP_NAME}/${processName}`;
  try {
    const callParams = await getCallParams("GET");
    const response = await makeCall(url, callParams);
    return response;
  } catch (error) {
    throw error;
  }
};

export const reAssigneeTicket = async (task: any) => {
  try {
    const callParams = await getCallParams("POST", task);
    const response: any = await makeCall(urls.REASSIGN_TICKET, callParams);
    return response;
  } catch (error: any) {
    throw error;
  }
};

export const viewUploadedDocument = async (apiPayload: any) => {
  try {
    const callParams = await getCallParams("POST", apiPayload);
    const response: any = await makeCall(urls.PREVIEW_DOCUMENT, callParams);
    return response;
  } catch (error: any) {
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

export const getIsProcessAdmin = async () => {
  try {
    const callParams = await getCallParams("GET");
    const response = await makeCall(urls.PROCESSADMIN, callParams);
    return response;
  } catch (error: any) {
    throw error;
  }
};
