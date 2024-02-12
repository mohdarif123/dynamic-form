import strings from "global/constants/StringConstants";
import { isPhoneValid } from "helpers/methods";

export const addUserInitailState = () => {
  return {
    email: {
      value: "",
      error: "",
    },
    name: {
      value: "",
      error: "",
    },
    contactNumber: {
      value: "",
      error: "",
    },
    role: {
      value: "",
      error: "",
    },
  };
};

export const handleAddUserValidation = (
  addUserData: any,
  isVisitedContactField: boolean
) => {
  let errors = addUserData;
  const emailRegex = strings.regex;
  const email = addUserData.email.value;
  const name = addUserData.name.value;
  const contact = addUserData.contactNumber.value;
  const role = addUserData.role.value;
  const re = /^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/;
  let isValid = true;
  const contactValue =
    isPhoneValid(contact) && isVisitedContactField ? contact : "";
  if (!email && !name.trim() && !contactValue && role) {
    errors.email.error = "Please enter email!";
    errors.name.error = "Please enter name!";
    errors.contactNumber.error = "Please enter contact number!";
    errors.role.error = "Please enter role!";
    isValid = false;
  }
  if (!email || !emailRegex.test(email)) {
    errors.email.error = "Please enter email!";
    isValid = false;
  }
  if (!name.trim()) {
    errors.name.error = "Please enter name!";
    isValid = false;
  }
  if (!contactValue) {
    errors.contactNumber.error = "Please enter contact number!";
    isValid = false;
  }
  if (!role) {
    errors.role.error = "Please select role!";
    isValid = false;
  }
  // if (!re.test(contact) && contact) {
  //   errors.contactNumber.error = "Mobile number must be of 10 digits!";
  //   isValid = false;
  // }

  return { isValid, errors };
};
