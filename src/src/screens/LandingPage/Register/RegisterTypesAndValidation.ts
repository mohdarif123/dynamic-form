import strings from "global/constants/StringConstants";
import { RegistrationFeild } from "models/interfaces";

export const registerFormField = () => {
  return {
    name: {
      value: "",
      error: "",
    },
    lastName: {
      value: "",
      error: "",
    },
    company: {
      value: "",
      error: "",
    },
    email: {
      value: "",
      error: "",
    },
    pwd: {
      value: "",
      error: "",
    },
    contactNo: {
      value: "",
      error: "",
    },
  } as RegistrationFeild;
};

export const registrationValidation = (registerUserValue: any) => {
  let errors = registerUserValue;
  const name = registerUserValue.name.value;
  const lastName = registerUserValue.lastName.value;
  const email = registerUserValue.email.value;
  const pwd = registerUserValue.pwd.value;
  const contactNo = registerUserValue.contactNo.value;
  let isValid = true;
  if (!name) {
    errors.name.error = "Please enter first name";
    isValid = false;
  }
  if (!lastName) {
    errors.lastName.error = "Please enter last name";
    isValid = false;
  }
  if (!email) {
    errors.email.error = "Please enter email";
    isValid = false;
  }
  if (email) {
    const emailRegex = strings.regex;
    if (!emailRegex.test(email)) {
      errors.email.error = "Please enter valid E-mail";
      isValid = false;
    }
  }
  if (!pwd) {
    errors.pwd.error = "Please enter password";
    isValid = false;
  }
  if (pwd && !strings.passwordValidationRegex.test(pwd)) {
    errors.pwd.error =
      "Please enter a password that is at least 8 characters long and includes at least one digit, one lowercase letter, one uppercase letter, and one special character from the following: @ $ ! % * ? & #.";
    isValid = false;
  }
  return { isValid, errors };
};
