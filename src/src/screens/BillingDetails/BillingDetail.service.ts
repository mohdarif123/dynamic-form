import urls from "../../global/constants/UrlConstants";
import {
  getCallParams,
  getNoAuthCallParams,
  makeCall,
} from "../../utils/service";

export const getAccountPlanDetail = async () => {
  const url = `${urls.getPlanDetail}`;
  try {
    const callParams = await getCallParams("GET");
    const response = await makeCall(url, callParams);
    return response;
  } catch (error) {
    throw error;
  }
};

export const getCard = async () => {
  const url = `${urls.getCardDetail}`;
  try {
    const callParams = await getCallParams("GET");
    const response: any = await makeCall(url, callParams);
    return response;
  } catch (error: any) {
    throw error;
  }
};

export const addCardDetails = async (id: any, defaultCard: any) => {
  try {
    const callParams = await getCallParams("POST");
    const url = `${urls.addCard}/${id}/${defaultCard}`;
    const response: any = await makeCall(url, callParams);
    return response;
  } catch (error: any) {
    throw error;
  }
};

export const changePlanService = async (data: any) => {
  try {
    const callParams = await getCallParams("POST", data);
    const url = `${urls.changePlan}`;
    const response: any = await makeCall(url, callParams);
    return response;
  } catch (error: any) {
    throw error;
  }
};

export const deleteCard = async (id: any) => {
  try {
    const callParams = await getCallParams("DELETE");
    const response: any = await makeCall(
      `${urls.deleteCard}/${id}`,
      callParams
    );
    return response;
  } catch (error: any) {
    throw error;
  }
};

export const updatePlan = async (id: any) => {
  try {
    const callParams = await getCallParams("POST");
    const response: any = await makeCall(
      `${urls.updatePlan}/${id}`,
      callParams
    );
    return response;
  } catch (error: any) {
    throw error;
  }
};

export async function getPlans() {
  try {
    const callParams = getNoAuthCallParams("GET");
    const response: any = await makeCall(urls.GET_PLANS, callParams);
    return response;
  } catch (error: any) {
    throw error;
  }
}

export const featurePlan = async (account: string) => {
  try {
    const callParams = await getCallParams("GET");
    const response: any = await makeCall(
      `${urls.featurePlan}/${account}`,
      callParams
    );
    return response;
  } catch (error: any) {
    throw error;
  }
};

export const checkActivePlan = async () => {
  try {
    const callParams = await getCallParams("GET");
    const response: any = await makeCall(
      `${urls.isActiveCancelSubscription}`,
      callParams
    );
    return response;
  } catch (error: any) {
    throw error;
  }
};

export const cancelSubscription = async () => {
  try {
    const callParams = await getCallParams("DELETE");
    const response: any = await makeCall(
      `${urls.cancelSubscription}`,
      callParams
    );
    return response;
  } catch (error: any) {
    throw error;
  }
};

export const setDefaultCard = async (id: any) => {
  try {
    const callParams = await getCallParams("POST");
    const url = `${urls.setPrimaryCard}/${id}`;
    const response: any = await makeCall(url, callParams);
    return response;
  } catch (error: any) {
    throw error;
  }
};

export const invoice = async (page: number, limit: number) => {
  try {
    const callParams = await getCallParams("GET");
    const response: any = await makeCall(
      `${urls.getInvoice}/${page}/limit/${limit}`,
      callParams
    );
    return response;
  } catch (error: any) {
    throw error;
  }
};

export const invoiceCount = async () => {
  try {
    const callParams = await getCallParams("GET");
    const response: any = await makeCall(
      `${urls.getInvoiceCount}/count`,
      callParams
    );
    return response;
  } catch (error: any) {
    throw error;
  }
};
