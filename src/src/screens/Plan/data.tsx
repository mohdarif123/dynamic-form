import strings from "global/constants/StringConstants";

// payment Data
export const paymentInitailFormState = () => {
  return {
    companyName: {
      value: "",
      error: "",
    },
    companyDetails: {
      value: "",
      error: "",
    },
    website: {
      value: "",
      error: "",
    },
    email: {
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
    phoneNumber: {
      value: "",
      error: "",
    },
    uploadLogo: {
      value: "",
      error: "",
    },
    description: {
      value: "",
      error: "",
    },
  };
};

export const handlePaymentFormValidation = (paymentFormData: any) => {
  let errors = paymentFormData;
  const emailRegex = strings.regex;
  const companyName = paymentFormData.companyName.value;
  const email = paymentFormData.email.value;
  const contactNumber = paymentFormData.contactNumber.value;
  const faxNumber = paymentFormData.faxNumber.value;
  const phoneNumber = paymentFormData.phoneNumber.value;
  const uploadLogo = paymentFormData.logoPath.value;
  const country = paymentFormData.country.value;
  const state = paymentFormData.state.value;
  const city = paymentFormData.city.value;
  const companyAddress = paymentFormData.companyAddress.value;

  let isValid = true;
  if (
    !companyName &&
    !email &&
    !contactNumber &&
    !faxNumber &&
    !phoneNumber &&
    !uploadLogo &&
    !country &&
    !state &&
    !city &&
    !companyAddress
  ) {
    errors.companyName.error = "Please enter company name";
    errors.email.error = "Please enter email";
    errors.contactNumber.error = "Please enter contact number";
    // errors.faxNumber.error = "Please enter fax number";
    // errors.phoneNumber.error = "Please enter phone number";
    errors.logoPath.error = "Please upload logo";
    errors.country.error = "Please enter country";
    errors.state.error = "Please enter state";
    errors.city.error = "Please enter city";
    errors.companyAddress.error = "Please enter address";
    isValid = false;
  }
  if (!companyName) {
    errors.companyName.error = "Please enter company name";
    isValid = false;
  }
  if (!email || !emailRegex.test(email)) {
    errors.email.error = "Please enter email";
    isValid = false;
  }
  if (!contactNumber) {
    errors.contactNumber.error = "Please enter contact number";
    isValid = false;
  }
  // if (!faxNumber) {
  //   errors.faxNumber.error = "Please enter fax number";
  //   isValid = false;
  // }
  // if (!phoneNumber) {
  //   errors.phoneNumber.error = "Please enter Phone number";
  //   isValid = false;
  // }
  if (!uploadLogo) {
    errors.logoPath.error = "Please upload logo";
    isValid = false;
  }
  if (!country) {
    errors.country.error = "Please enter country";
    isValid = false;
  }
  if (!state) {
    errors.state.error = "Please enter state";
    isValid = false;
  }
  if (!city) {
    errors.city.error = "Please enter city";
    isValid = false;
  }
  if (!companyAddress) {
    errors.companyAddress.error = "Please enter address";
    isValid = false;
  }
  return { isValid, errors };
};
