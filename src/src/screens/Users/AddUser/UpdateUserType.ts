import strings from "global/constants/StringConstants";

export const UpadteUserInitailState = (prevState: any) => {
  return {
    email: {
      value: prevState?.email ?? "",
      error: "",
    },
    name: {
      value: prevState?.name ?? "",
      error: "",
    },
    contactNumber: {
      value: prevState?.contactNo ?? "",
      error: "",
    },
    role: {
      value: prevState?.roleIds && (prevState?.roleIds[0] ?? ""),
      error: "",
    },
  };
};

export const handleAddUserValidation = (addUserData: any) => {
  let errors = addUserData;
  const emailRegex = strings.regex;
  const re = /^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/;
  const email = addUserData.email.value;
  const name = addUserData.name.value;
  const contact = addUserData.contactNumber.value;
  const role = addUserData.role.value;
  let isValid = true;

  if (!email && !name.trim() && !contact && role) {
    errors.email.error = "Please enter email!";
    errors.name.error = "Please enter name!";
    errors.role.error = "Please select role!";
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
  if (!role) {
    errors.role.error = "Please select Role!";
    isValid = false;
  }
  // if (!re.test(contact) && contact) {
  //   errors.contactNumber.error = "Mobile number must be of 10 digits!";
  //   isValid = false;
  // }
  if (!contact) {
    errors.contactNumber.error = "Please enter contact number!";
    isValid = false;
  }
  return { isValid, errors };
};
