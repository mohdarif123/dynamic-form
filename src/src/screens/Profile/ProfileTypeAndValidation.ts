import strings from "global/constants/StringConstants";

export const profileInitialState = () => {
  return {
    companyName: {
      value: "",
      error: "",
    },
    companyDetails: {
      value: "",
      error: "",
    },
    email: {
      value: "",
      error: "",
    },
    companyAddress: {
      value: "",
      error: "",
    },
    contactNumber: {
      value: "",
      error: "",
    },
    faxNumber: {
      value: "",
      error: "",
    },
    logoPath: {
      value: "",
      error: "",
    },
    phoneNumber: {
      value: "",
      error: "",
    },
    website: {
      value: "",
      error: "",
    },
    country: {
      value: "",
      error: "",
    },
    state: {
      value: "",
      error: "",
    },
    city: {
      value: "",
      error: "",
    },
    zipCode: {
      value: "",
      error: "",
    },
  };
};

export const handleAddUserValidation = (addUserData: any) => {
  let errors = addUserData;
  const emailRegex = strings.regex;
  const email = addUserData.email.value;
  const name = addUserData.name.value;
  const role = addUserData.role.value;
  let isValid = true;

  if (!email && !name.trim() && role) {
    errors.email.error = "Please enter email!";
    errors.name.error = "Please enter name!";
    errors.contact.error = "Please enter contactNumber!";
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
    errors.role.error = "Please select role!";
    isValid = false;
  }

  return { isValid, errors };
};

export const handleProfileValidation = (profileData: any) => {
  let errors = profileData;
  const emailRegex = strings.regex;
  const email = profileData.email.value;
  const name = profileData.companyName.value;
  const address = profileData.companyAddress.value;
  const country = profileData.country.value;
  const state = profileData.state.value;
  const city = profileData.city.value;
  const contactNumber = profileData.contactNumber.value;
  const phoneNumber = profileData.phoneNumber.vaule;
  const faxNumber = profileData.faxNumber.value;
  const logoPath = profileData.logoPath.value;
  let isValid = true;

  if (
    !email &&
    !name &&
    !address &&
    !contactNumber &&
    phoneNumber &&
    !faxNumber &&
    !country &&
    !state &&
    !city &&
    !logoPath
  ) {
    errors.email.error = "Please enter email!";
    errors.companyName.error = "Please enter company name!";
    errors.contactNumber.error = "Please enter contact number";
    errors.companyAddress.error = "Please enter address";
    errors.phoneNumber.error = "Please enter phone number";
    errors.country.error = "Please enter country";
    errors.state.error = "Please enter state";
    errors.city.error = "Please enter city";
    errors.logoPath.error = "Please upload logo";
    isValid = false;
  }
  if (!name) {
    errors.companyName.error = "Please enter name!";
    isValid = false;
  }
  if (!email || !emailRegex.test(email)) {
    errors.email.error = "Please enter email!";
    isValid = false;
  }
  if (!address) {
    errors.companyAddress.error = "Please enter company address!";
    isValid = false;
  }
  if (!country) {
    errors.country.error = "Please enter country!";
    isValid = false;
  }
  if (!state) {
    errors.state.error = "Please enter state!";
    isValid = false;
  }
  if (!city) {
    errors.city.error = "Please enter city!";
    isValid = false;
  }
  if (!logoPath) {
    errors.logoPath.error = "Please upload logo!";
    isValid = false;
  }

  return { isValid, errors };
};
