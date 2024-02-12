import urls from "global/constants/UrlConstants";
import { openSuccessNotification } from "helpers/methods";
import {
  getCallParams,
  getCallSearchParams,
  getFileCallParams,
  makeCall,
  makeCallFile,
} from "utils/service";

export const getProposalTableData = async (
  page: number,
  data: any,
  value: any,
  limit: any,
  dateRange: any
) => {
  try {
    const callParams = await getCallSearchParams("POST", data.ownerEmail);
    const response = await makeCall(
      `${urls.getProposalData}/status/${data.status}/type/${data.type}/action/${data.action}/region/${data.region}/domain/${data.domian}/submissionType/${data.submission}/contractType/${data.contract}/subDomain/${data.subDomain}/from/${dateRange.fromDate}/to/${dateRange.toDate}/limit/${limit}/page/${page}`,
      callParams
    );
    return response;
  } catch (error) {
    throw error;
  }
};

export const getProposalTableDataByDateRange = async (
  status: any,
  page: number,
  action: any,
  domain: any,
  fromDate: any,
  toDate: any,
  region: any,
  pageSize: any
) => {
  try {
    const callParams = await getCallParams("GET");
    const response = await makeCall(
      `${urls.getProposalData}/status/${status}/region/${region}/domain/${domain}/action/${action}/from/${fromDate}/to/${toDate}/limit/${pageSize}/page/${page}`,
      callParams
    );
    return response;
  } catch (error) {
    throw error;
  }
};

export const getProposalTableCountByDateRange = async (
  status: any,
  action: any,
  domain: any,
  fromDate: any,
  toDate: any,
  region: any
) => {
  try {
    const callParams = await getCallParams("GET");
    const response = await makeCall(
      `${urls.getProposalData}/count/status/${status}/region/${region}/domain/${domain}/action/${action}/from/${fromDate}/to/${toDate}`,
      callParams
    );
    return response;
  } catch (error) {
    throw error;
  }
};

export const getProposalTableCount = async (
  page: number,
  data: any,
  value: any,
  dateRange: any
) => {
  try {
    const callParams = await getCallSearchParams("POST", data.ownerEmail);
    const response = await makeCall(
      `${urls.getProposalData}/count/status/${data.status}/type/${data.type}/action/${data.action}/region/${data.region}/domain/${data.domian}/submissionType/${data.submission}/contractType/${data.contract}/subDomain/${data.subDomain}/from/${dateRange.fromDate}/to/${dateRange.toDate}`,
      callParams
    );
    return response;
  } catch (error) {
    throw error;
  }
};
export const getProposalSearchCount = async (
  data: any,
  searchText: any,
  dateRange: any
) => {
  try {
    const callParams = await getCallSearchParams("POST", searchText);
    const response = await makeCall(
      `${urls.searchingProspsal}/count/status/${data.status}/type/${data.type}/action/${data.action}/region/${data.region}/domain/${data.domian}/submissionType/${data.submission}/contractType/${data.contract}/subDomain/${data.subDomain}/owner/${data.ownerEmail}/from/${dateRange.fromDate}/to/${dateRange.toDate}`,
      callParams
    );
    return response;
  } catch (error) {
    throw error;
  }
};

export const getProposalDomain = async () => {
  try {
    const callParams = await getCallParams("GET");
    const response = await makeCall(urls.getDomainValue, callParams);
    return response;
  } catch (error) {
    throw error;
  }
};
export const getProposalRegion = async () => {
  try {
    const callParams = await getCallParams("GET");
    const response = await makeCall(urls.getRegion, callParams);
    return response;
  } catch (error) {
    throw error;
  }
};
export const getProposalDomainAll = async () => {
  try {
    const callParams = await getCallParams("GET");
    const response = await makeCall(urls.getDomainAll, callParams);
    return response;
  } catch (error) {
    throw error;
  }
};
export const getProposalTypes = async () => {
  try {
    const callParams = await getCallParams("GET");
    const response = await makeCall(urls.getProposalType, callParams);
    return response;
  } catch (error) {
    throw error;
  }
};
export const getProposalContract = async () => {
  try {
    const callParams = await getCallParams("GET");
    const response = await makeCall(urls.getContract, callParams);
    return response;
  } catch (error) {
    throw error;
  }
};

export const getProposalAction = async () => {
  try {
    const callParams = await getCallParams("GET");
    const response = await makeCall(urls.getAction, callParams);
    return response;
  } catch (error) {
    throw error;
  }
};

export const getProposalSubmission = async () => {
  try {
    const callParams = await getCallParams("GET");
    const response = await makeCall(urls.getSubmission, callParams);
    return response;
  } catch (error) {
    throw error;
  }
};
export const getProposalStatus = async () => {
  try {
    const callParams = await getCallParams("GET");
    const response = await makeCall(urls.getPropsalStatus, callParams);
    return response;
  } catch (error) {
    throw error;
  }
};

export const deleteProps = async (data: any) => {
  try {
    const callParams = await getCallParams("POST", data);
    const response = await makeCall(urls.deleteProposal, callParams);
    return response;
  } catch (error) {
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

export const getReason = async () => {
  const url = `${urls.getReason}`;
  try {
    const callParams = await getCallParams("GET");
    const response = await makeCall(url, callParams);
    return response;
  } catch (error) {
    throw error;
  }
};

export const responseOrder = async (id: any, data: any) => {
  try {
    const callParams = await getCallParams("PATCH", data);
    const response = await makeCall(
      `${urls.responseOrderChange}/${id}`,
      callParams
    );
    return response;
  } catch (error) {
    throw error;
  }
};
export const responseExport = async (data: any, title: String) => {
  const fileName = `${title}.docx`;
  try {
    const callParams = await getCallParams("POST", data);
    const response = await makeCallFile(`${urls.responseExport}`, callParams);
    downloadFile(response, fileName);
    return response;
  } catch (error) {
    throw error;
  }
};

const downloadFile = (data: Blob, fileName: string) => {
  try {
    const href = URL.createObjectURL(data);
    const a = Object.assign(document.createElement("a"), {
      href,
      style: "display:none",
      download: fileName,
    });
    a.click();
    URL.revokeObjectURL(href);
    a.remove();
    openSuccessNotification("RFP response has been exported successfully");
  } catch (error) {
    throw error;
  }
};

export const addTaskViewProposal = async (data: any) => {
  try {
    const callParams = await getCallParams("POST", data);
    const response = await makeCall(urls.addTask, callParams);
    return response;
  } catch (error) {
    throw error;
  }
};

export const followUpProposal = async (data: any) => {
  try {
    const callParams = await getCallParams("POST", data);
    const response = await makeCall(urls.followUpPropsal, callParams);
    return response;
  } catch (error) {
    throw error;
  }
};

export const getProposalSearch = async (
  page: number,
  data: any,
  searchText: any,
  pageSize: any,
  dateRange: any
) => {
  try {
    const callParams = await getCallSearchParams("POST", searchText);
    const response = await makeCall(
      `${urls.searchingProspsal}/status/${data.status}/type/${data.type}/action/${data.action}/region/${data.region}/domain/${data.domian}/submissionType/${data.submission}/contractType/${data.contract}/subDomain/${data.subDomain}/owner/${data.ownerEmail}/from/${dateRange.fromDate}/to/${dateRange.toDate}/limit/${pageSize}/page/${page}`,
      callParams
    );
    return response;
  } catch (error) {
    throw error;
  }
};

export const addCompetitive = async (data: any) => {
  try {
    const callParams = await getCallParams("POST", data);
    const response = await makeCall(`${urls.addCompetitive}`, callParams);
    return response;
  } catch (error) {
    throw error;
  }
};

export const proposalUpdate = async (data: any, proposalId: any) => {
  try {
    const callParams = await getCallParams("POST", data);
    const response = await makeCall(
      `${urls.updateProposal}/evaluation/id/${proposalId}`,
      callParams
    );
    return response;
  } catch (error) {
    throw error;
  }
};

export const getAddResponseContent = async (
  region: any,
  domain: any,
  subDomain: any,
  pageSize: any,
  page: any
) => {
  try {
    const callParams = await getCallParams("GET");
    const response = await makeCall(
      `${urls.addResponseContent}/region/${region}/domain/${domain}/subDomain/${subDomain}/limit/${pageSize}/page/${page}`,
      callParams
    );
    return response;
  } catch (error) {
    throw error;
  }
};

export const getAppprovedResponseContent = async (
  region: any,
  domain: any,
  subDomain: any,
  pageSize: any,
  page: any
) => {
  try {
    const callParams = await getCallParams("GET");
    const response = await makeCall(
      `${urls.getApprovedResponseContent}/region/${region}/domain/${domain}/subDomain/${subDomain}/limit/${pageSize}/page/${page}`,
      callParams
    );
    return response;
  } catch (error) {
    throw error;
  }
};

export const addResponse = async (data: any) => {
  try {
    const callParams = await getCallParams("POST", data);
    const response = await makeCall(`${urls.responseAdd}`, callParams);
    return response;
  } catch (error) {
    throw error;
  }
};
