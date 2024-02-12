import urls from "global/constants/UrlConstants";
import {
  getCallParams,
  getCallSearchParams,
  getFileCallParams,
  makeCall,
} from "utils/service";

// for table data MY api
export const getMyTaskDataFromApi = async (
  status: string,
  page: number,
  pageSize: number
) => {
  const url = `${urls.getMyTasks}/${status}/assigned/status/Open/limit/${pageSize}/page/${page}`;
  try {
    const callParams = await getCallParams("GET");
    const response = await makeCall(url, callParams);
    return response;
  } catch (error: any) {
    throw error;
  }
};

// for table data OPEN api
export const getOpenTaskDataFromApi = async (
  status: string,
  page: number,
  pageSize: number
) => {
  const url = `${urls.getOpenTasks}/status/${status}/limit/${pageSize}/page/${page}`;
  try {
    const callParams = await getCallParams("GET");
    const response = await makeCall(url, callParams);
    return response;
  } catch (error: any) {
    throw error;
  }
};
// for table search MY api
export const getMyTaskSearchApi = async (
  status: string,
  page: number,
  text: any,
  pageSize: any
) => {
  const url = `${urls.getMyTasksSearch}/${status}/assigned/search/status/Open/limit/${pageSize}/page/${page}`;
  try {
    const callParams = await getCallSearchParams("POST", text);
    const response = await makeCall(url, callParams);
    return response;
  } catch (error: any) {
    throw error;
  }
};
// for table search OPEN api
export const getOpenTaskSearchApi = async (
  status: string,
  page: number,
  text: any,
  pageSize: number
) => {
  const url = `${urls.getOpenTasksSearch}/${status}/limit/${pageSize}/page/${page}`;
  try {
    const callParams = await getCallSearchParams("POST", text);
    const response = await makeCall(url, callParams);
    return response;
  } catch (error: any) {
    throw error;
  }
};
// for table count OPEN
export const getOpenTaskCount = async () => {
  const url = `${urls.getOpenCount}`;
  try {
    const callParams = await getCallParams("GET");
    const response = await makeCall(url, callParams);
    return response;
  } catch (error: any) {
    throw error;
  }
};
export const getOpenTaskCountSearch = async (searchValue: any) => {
  const url = `${urls.getOpenCount}/search`;
  try {
    const callParams = await getCallSearchParams("POST", searchValue);
    const response = await makeCall(url, callParams);
    return response;
  } catch (error: any) {
    throw error;
  }
};
export const getMyTasksCount = async (searchValue: any) => {
  const url = `${urls.getMyCount}/search`;
  try {
    const callParams = await getCallSearchParams("POST", searchValue);
    const response = await makeCall(url, callParams);
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

// for table count OPEN
export const getMyTaskCount = async () => {
  const url = `${urls.getMyCount}`;
  try {
    const callParams = await getCallParams("GET");
    const response = await makeCall(url, callParams);
    return response;
  } catch (error: any) {
    throw error;
  }
};

// datepicker component due by date change api
export const dueByDateChange = async (rowsData: any) => {
  const url = `${urls.changeDueByDate}`;
  try {
    const callParams = await getCallParams("POST", rowsData);
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

// action modal -dropzone api

export const upload = async (id: any, formData: any) => {
  try {
    const callParams = await getFileCallParams(formData);
    const response = await makeCall(`${urls.uploadDocument}/${id}`, callParams);
    return response;
  } catch (error) {
    throw error;
  }
};

export const completeTasks = async (data: any, action: any) => {
  const url = `${urls.completeTaskAction}/${action}`;
  try {
    const callParams = await getCallParams("POST", data);
    const response = await makeCall(url, callParams);
    return response;
  } catch (error: any) {
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
