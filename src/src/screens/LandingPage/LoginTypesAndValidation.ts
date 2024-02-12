import strings from "global/constants/StringConstants";
import {
  ForgotPasswordFields,
  LoginFields,
  RegistrationFeild,
} from "models/interfaces";

export const loginForm = () => {
  return {
    email: {
      value: "",
      error: "",
    },
    password: {
      value: "",
      error: "",
    },
  } as LoginFields;
};

export const loginValidation = (loginUserData: any) => {
  let errors = loginUserData;
  let isValid = true;
  const email = loginUserData.email.value;
  const password = loginUserData.password.value;
  if (!email) {
    errors.email.error = "Please enter your email id";
    isValid = false;
  }
  if (!password) {
    errors.password.error = "Please enter your password";
    isValid = false;
  }
  return { isValid, errors };
};

export const forgotPasswordValue = () => {
  return {
    email: {
      value: "",
      error: "",
    },
  } as ForgotPasswordFields;
};

export const forgotPasswordValidation = (forgotUserData: any) => {
  const errors = forgotUserData;
  let isValid = true;
  let emailValue = forgotUserData.email.value;
  if (!emailValue) {
    errors.email.error = "Please enter email";
    isValid = false;
  }
  return { isValid, errors };
};
