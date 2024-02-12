export interface CustomDateRange {
  fromDate: string;
  toDate: string;
}

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
