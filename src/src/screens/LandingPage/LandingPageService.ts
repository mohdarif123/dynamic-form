import urls from "global/constants/UrlConstants";
import { User } from "models/interfaces";
import { getAccessToken, getNoAuthCallParams, makeCall } from "utils/service";

export async function login(
  email: string,
  password: string,
  captchaToken: any
) {
  const body = {
    email,
    pwd: password,
    captchaToken: captchaToken,
  };
  try {
    const callParams = getNoAuthCallParams("POST", body);
    const response: any = await makeCall(urls.LOGIN, callParams);
    return response;
  } catch (error: any) {
    throw error;
  }
}

export async function addUserRegister(user: any) {
  try {
    const callParams = getNoAuthCallParams("POST", user);
    const response: any = await makeCall(urls.REGISTER_USER, callParams);
    return response;
  } catch (error: any) {
    throw error;
  }
}

export async function forgotPassword(user: User) {
  try {
    const callParams = await getNoAuthCallParams("POST", user);
    const response: any = await makeCall(urls.FORGET, callParams);
    return response;
  } catch (error: any) {
    throw error;
  }
}

export async function verifyTempPwd(user: User) {
  try {
    const callParams = getNoAuthCallParams("POST", user);
    const response: any = await makeCall(urls.VERIFY_TEMP_PWD, callParams);
    return response;
  } catch (error: any) {
    throw error;
  }
}

export async function verifyTempPwdForActivateAccount(user: User) {
  try {
    const callParams = getNoAuthCallParams("POST", user);
    const response: any = await makeCall(
      urls.VERIFY_TEMP_PWD_FOR_ACTIVATE_ACCOUNT,
      callParams
    );
    return response;
  } catch (error: any) {
    throw error;
  }
}

export const activateUser = async (user: User, token: string) => {
  try {
    const callParams = await getAccessToken("POST", user, token);
    const response: any = await makeCall(urls.ACTIVATE_USER, callParams);
    return response;
  } catch (error: any) {
    throw error;
  }
};
export const forgetPassword = async (user: User, token: string) => {
  try {
    const callParams = await getAccessToken("POST", user, token);
    const response: any = await makeCall(urls.UPDATE_PASSWORD, callParams);
    return response;
  } catch (error: any) {
    throw error;
  }
};
