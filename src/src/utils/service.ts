import history from "./history";
import urls from "global/constants/UrlConstants";
import { store } from "./store";
import { logOutAction } from "redux/authSlice";
import strings from "global/constants/StringConstants";
import notifiers from "global/constants/NotificationConstants";

// Checks if the error code is 401 or 403 -> Logout the user
export const checkStatus = (error: any) => {
  if (error.status === 401) {
    store.dispatch(logOutAction());
    history.push(urls.LANDING_VIEW_PATH);
    return true;
  } else return false;
};

// Authenticated Call Headers
export const getCallParams = async (methodType: string, body?: any) => {
  const accessToken = "Bearer " + store.getState().auth.accessToken;
  return {
    method: methodType,
    headers: await getHeaderObject(accessToken, strings.applicationJSON),
    body: JSON.stringify(body),
  };
};

export const getCallParamsWithToken = async (
  methodType: string,
  body?: any,
  tokens?: any
) => {
  const accessToken = "Bearer " + tokens;
  return {
    method: methodType,
    headers: await getHeaderObject(accessToken, strings.applicationJSON),
    body: JSON.stringify(body),
  };
};

export const getCallParamsWithCountryToken = async (
  methodType: string,
  tokens: any
) => {
  const accessToken = "Bearer " + tokens;
  return {
    method: methodType,
    headers: await getHeaderObject(accessToken, strings.applicationJSON),
    // body: JSON.stringify(body),
  };
};

export const getCallSearchParams = async (methodType: string, body?: any) => {
  const accessToken = "Bearer " + store.getState().auth.accessToken;
  return {
    method: methodType,
    headers: await getHeaderObject(accessToken, strings.applicationJSON),
    body: body,
  };
};

// Unauthenticated Call Headers
export const getNoAuthCallParams = (methodType: string, body?: any) => {
  return {
    method: methodType,
    headers: strings.applicationJSON,
    body: JSON.stringify(body),
  };
};

export async function getFileCallParams(body: any) {
  const accessToken = "Bearer " + store.getState().auth.accessToken;
  return {
    method: "POST",
    headers: await getHeaderObject(accessToken),
    body: body,
  };
}

export async function getFileCallParamsWithToken(body: any, tokens?: any) {
  const accessToken = "Bearer " + tokens;
  return {
    method: "POST",
    headers: await getHeaderObject(accessToken),
    body: body,
  };
}

export async function getSearchedCallParams(methodType: string, body?: any) {
  const accessToken = "Bearer " + store.getState().auth.accessToken;
  return {
    method: methodType,
    headers: await getHeaderObject(accessToken, strings.applicationJSON),
    body: body,
  };
}

export async function getAccessToken(
  methodType: string,
  body?: any,
  token?: string
) {
  const accessToken = "Bearer " + token;
  return {
    method: methodType,
    headers: await getHeaderObject(accessToken, strings.applicationJSON),
    body: JSON.stringify(body),
  };
}

export const getNoAuthFileCallParams = (body: any) => {
  return {
    method: "POST",
    headers: strings.multipartForm,
    body: body,
  };
};

export async function getHeaderObject(accessToken: string, contentType?: any) {
  try {
    if (accessToken) {
      return {
        ...contentType,
        Authorization: accessToken,
      };
    }
    history.push(urls.LANDING_VIEW_PATH);
    return null;
  } catch (error: any) {
    throw error;
  }
}

// Triggers the api call
// If the api call takes more time than timeout, then it will timeout the call.
export const makeCall = async (callName: string, callParams: any) => {
  try {
    let call = fetch(callName, callParams);
    let timeout = getTimeoutPromise();

    const response: any = await Promise.race([timeout, call]).catch((error) => {
      throw error;
    });

    const json = await response.json();
    if (response && response.ok) {
      return json;
    }
    throw json;
  } catch (error: any) {
    const isLoggedOut = checkStatus(error);
    if (isLoggedOut) {
      error.message = notifiers.LOGGEDOUT;
      error.errorMessage = notifiers.LOGGEDOUT;
    }
    throw error;
  }
};

export async function makeCallFile(callName: string, callParams: any) {
  try {
    let call = fetch(callName, callParams);
    let timeout = getTimeoutPromise();

    const response: any = await Promise.race([timeout, call]).catch((err) => {
      throw err;
    });

    // const json = await response.json();
    if (response && response.ok) {
      return response.blob();
    } else {
      throw response.blob();
    }
  } catch (error: any) {
    throw error;
  }
}
export function getTimeoutPromise() {
  return new Promise((resolve, reject) => {
    setTimeout(() => reject({ error: true, message: "Timeout" }), 200000);
  });
}
