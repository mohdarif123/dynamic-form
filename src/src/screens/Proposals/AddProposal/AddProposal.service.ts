import urls from "global/constants/UrlConstants";
import { getCallParams, makeCall, makeCallFile } from "utils/service";

export const getAddProposalSource = async () => {
  try {
    const callParams = await getCallParams("GET");
    const response = await makeCall(`${urls.getSource}`, callParams);
    return response;
  } catch (error) {
    throw error;
  }
};
export const getAddProposalDomain = async (value: any) => {
  try {
    const callParams = await getCallParams("GET");
    const response = await makeCall(
      `${urls.getProposalDomain}/${value}`,
      callParams
    );
    return response;
  } catch (error) {
    throw error;
  }
};
export const getAddProposalType = async () => {
  try {
    const callParams = await getCallParams("GET");
    const response = await makeCall(`${urls.getProposalType}`, callParams);
    return response;
  } catch (error) {
    throw error;
  }
};

export const getAddProposalUserPage = async () => {
  try {
    const callParams = await getCallParams("GET");
    const response = await makeCall(`${urls.getUserPage}`, callParams);
    return response;
  } catch (error) {
    throw error;
  }
};
export const getAddProposalRegion = async () => {
  try {
    const callParams = await getCallParams("GET");
    const response = await makeCall(`${urls.getRegion}`, callParams);
    return response;
  } catch (error) {
    throw error;
  }
};

export const getAddProposalCountries = async () => {
  try {
    const callParams = await getCallParams("GET");
    const response = await makeCall(`${urls.getCountries}`, callParams);
    return response;
  } catch (error) {
    throw error;
  }
};
export const getAddProposalSubmission = async () => {
  try {
    const callParams = await getCallParams("GET");
    const response = await makeCall(`${urls.getSubmission}`, callParams);
    return response;
  } catch (error) {
    throw error;
  }
};
export const getAddProposalContract = async () => {
  try {
    const callParams = await getCallParams("GET");
    const response = await makeCall(`${urls.getContract}`, callParams);
    return response;
  } catch (error) {
    throw error;
  }
};
export const getAddSubdomain = async (value: any) => {
  try {
    const callParams = await getCallParams("GET");
    const response = await makeCall(
      `${urls.getSubdomain}/${value}`,
      callParams
    );
    return response;
  } catch (error) {
    throw error;
  }
};
export const getState = async (value: any) => {
  try {
    const callParams = await getCallParams("GET");
    const response = await makeCall(
      `${urls.getStateValue}/${value}`,
      callParams
    );
    return response;
  } catch (error) {
    throw error;
  }
};

export const getCity = async (value: any, state: any) => {
  try {
    const callParams = await getCallParams("GET");
    const response = await makeCall(
      `${urls.getStateValue}/${value}/state/${state}`,
      callParams
    );
    return response;
  } catch (error) {
    throw error;
  }
};

export const addProposals = async (proposalPayload: any) => {
  try {
    const callParams = await getCallParams("POST", proposalPayload);
    const response = await makeCall(`${urls.submitProposal}`, callParams);
    return response;
  } catch (error) {
    throw error;
  }
};

export const viewProposal = async (id: any) => {
  try {
    const callParams = await getCallParams("GET");
    const response = await makeCall(`${urls.viewProposal}/${id}`, callParams);
    return response;
  } catch (error) {
    throw error;
  }
};

export const fetchResponseProposal = async (
  id: any,
  page: any,
  pageSize: any
) => {
  try {
    const callParams = await getCallParams("GET");
    const response = await makeCall(
      `${urls.responseTabProposal}/${id}/limit/${"All"}/page/${"-1"}`,
      callParams
    );
    return response;
  } catch (error) {
    throw error;
  }
};

export const fetchDocumentProposal = async (id: any) => {
  try {
    const callParams = await getCallParams("GET");
    const response = await makeCall(
      `${urls.fetchDocument}/${id}/type/All`,
      callParams
    );
    return response;
  } catch (error) {
    throw error;
  }
};

export const viewDocumentProposal = async (data: any) => {
  try {
    const callParams = await getCallParams("POST", data);
    const response = await makeCall(`${urls.PREVIEW_DOCUMENT}`, callParams);
    return response;
  } catch (error) {
    throw error;
  }
};

export const updateDocumentProposal = async (id: any) => {
  try {
    const callParams = await getCallParams("POST", id);
    const response = await makeCall(
      `${urls.UPDATE_DOCUMENT}/id/${id}`,
      callParams
    );
    return response;
  } catch (error) {
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

export const updateProposalService = async (data: any) => {
  try {
    const callParams = await getCallParams("PATCH", data);
    const response: any = await makeCall(urls.updateProposal, callParams);
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

export const downloadZipDocument = async (data: any) => {
  try {
    const callParams = await getCallParams("POST", data);
    const response: any = await makeCallFile(urls.downLoadZip, callParams);
    return response;
  } catch (error: any) {
    throw error;
  }
};

export const deleteDocument = async (data: any) => {
  try {
    const callParams = await getCallParams("POST", data);
    const response: any = await makeCall(urls.deleteDocument, callParams);
    return response;
  } catch (error: any) {
    throw error;
  }
};
export const wonPropsoalUpdateService = async (data: any) => {
  try {
    const callParams = await getCallParams("POST", data);
    const response: any = await makeCall(urls.updateProposal, callParams);
    return response;
  } catch (error: any) {
    throw error;
  }
};
