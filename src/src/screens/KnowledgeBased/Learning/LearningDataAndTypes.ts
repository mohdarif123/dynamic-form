export const initialState = (searchValueData: any) => {
  return {
    region: {
      value: "US",
    },
    domain: {
      value: "Staffing",
    },
    searchValue: {
      value: searchValueData ?? "",
    },
  };
};

export const exportDataInitial = () => {
  return {
    fileName: {
      value: "",
      error: "",
    },
  };
};

export const exportValidation = (adminDetails: any) => {
  let errors = adminDetails;
  let isValid = true;
  const adminDetail = adminDetails;
  if (!adminDetail.value) {
    errors.error = "Please enter file name";
    isValid = false;
  }
  return { errors, isValid };
};
