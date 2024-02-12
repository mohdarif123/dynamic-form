import moment from "moment";
import strings from "global/constants/StringConstants";
import { store } from "utils/store";

export const stepOneFormDataInitialState = (data?: any) => {
  return {
    contractType: {
      value: data?.contractType ?? "",
      error: "",
    },
    submissionType: {
      value: data?.submissionType ?? "",
      error: "",
    },
    contractDetailsUrl: {
      value: data?.contractDetailsUrl,
      error: "",
    },
    dueDate: {
      value: moment(data?.dueDate).format("YYYY-MM-DD") ?? "",
      error: "",
    },
    agencyName: {
      value: data?.agency?.name ?? "",
      error: "",
    },
    agencyEmail: {
      value: data?.agency?.email ?? "",
      error: "",
    },
    agencyWebsite: {
      value: data?.agency?.webSite ?? "",
      error: "",
    },
    agencyContactNo: {
      value: data?.agency?.contactNo ?? "",
      error: "",
    },
    line1: {
      value: data?.agency?.address.line1 ?? "",
      error: "",
    },
    line2: {
      value: data?.agency?.address.line2 ?? "",
      error: "",
    },
    line3: {
      value: data?.agency?.address.line3 ?? "",
      error: "",
    },
    country: {
      value: data?.agency?.address.country ?? "",
      error: "",
    },
    state: {
      value: data?.agency?.address.state ?? "",
      error: "",
    },
    city: {
      value: data?.agency?.address.city ?? "",
      error: "",
    },
    postalCode: {
      value: data?.agency?.address.pinCode ?? "",
      error: "",
    },
    requestId: {
      value: data?.requestId ?? "",
      error: "",
    },
    type: {
      value: data?.type ?? "",
      error: "",
    },
    owner: {
      value: data?.ownerName ?? store.getState().auth.userName,
      error: "",
    },
    ownerEmail: {
      value: data?.ownerEmail ?? store.getState().auth.userEmail,
      error: "",
    },
    region: {
      value: data?.region ?? "",
      error: "",
    },
    complexity: {
      value: data?.complexity ?? "",
      error: "",
    },
    competitionType: {
      value: data?.competitionType ?? "",
      error: "",
    },
    title: {
      value: data?.title ?? "",
      error: "",
    },
    domain: {
      value: data?.domain ?? "",
      error: "",
    },
    subDomain: {
      value: data?.subDomain ?? "",
      error: "",
    },
    source: {
      value: data?.source ?? "",
      error: "",
    },
    status: {
      value: data?.status ?? "",
      error: "",
    },
    bidDecision: {
      value: data?.action ?? "",
      error: "",
    },
    text: {
      value: "",
    },
    price: {
      value: data?.price ?? "",
    },
  };
};

export const validateForStepOne = (stepOneFormData: any) => {
  let errors = stepOneFormData;
  let isValid = true;
  const region = stepOneFormData?.region?.value;
  const title = stepOneFormData?.title?.value;
  const domain = stepOneFormData?.domain?.value;
  const requestId = stepOneFormData?.requestId?.value;
  const source = stepOneFormData?.source?.value;
  const type = stepOneFormData?.type?.value;
  const price = stepOneFormData?.price?.value;

  if (
    !title &&
    !region &&
    !requestId &&
    !source &&
    !type &&
    !domain &&
    !price
  ) {
    // Set the fields as error true
    errors.title.error = "Please enter title";
    errors.region.error = "Please enter region";
    errors.requestId.error = "Please enter solicitation";
    errors.source.error = "Please enter source";
    errors.type.error = "Please enter type";
    errors.domain.error = "Please enter domain";
    isValid = false;
  }
  if (!title) {
    errors.title.error = "Please enter title";
    isValid = false;
  }
  if (!region) {
    errors.region.error = "Please enter region";
    isValid = false;
  }
  if (!requestId) {
    errors.requestId.error = "Please enter solicitation";
    isValid = false;
  }
  if (!source) {
    errors.source.error = "Please enter source";
    isValid = false;
  }
  if (!type) {
    errors.type.error = "Please enter type";
    isValid = false;
  }
  if (!domain) {
    errors.domain.error = "Please enter domain";
    isValid = false;
  }
  return { isValid, errors };
};

export const agencyValidation = (stepOneFormData: any) => {
  let errors = stepOneFormData;
  let isValid = true;
  const websiteRegex = strings.websiteRegex;
  const emailRegex = strings.regex;
  const agencyName = stepOneFormData?.agencyName?.value;
  const agencyEmail = stepOneFormData?.agencyEmail?.value;
  const agencyWebsite = stepOneFormData?.agencyWebsite?.value;
  if (!agencyName && !agencyEmail) {
    // Set the fields as error true
    errors.agencyName.error = "Please enter agency name";
    errors.agencyEmail.error = "Please enter agency email";
    isValid = false;
  }
  if (!agencyName) {
    errors.agencyName.error = "Please enter agency name";
    isValid = false;
  }
  if (!agencyEmail || !emailRegex.test(agencyEmail)) {
    errors.agencyEmail.error = "Please enter agency email";
    isValid = false;
  }
  if (agencyWebsite) {
    if (!websiteRegex.test(stepOneFormData.agencyWebsite?.value)) {
      isValid = false;
    }
  }
  return { isValid, errors };
};

export const contractValidation = (stepOneFormData: any) => {
  let errors = stepOneFormData;
  let isValid = true;
  const contractType = stepOneFormData?.contractType?.value;
  const submissionType = stepOneFormData?.submissionType?.value;
  const dueDate = stepOneFormData?.dueDate?.value;

  if (!contractType && !submissionType && !dueDate) {
    // Set the fields as error true
    errors.contractType.error = "Please enter contract type";
    errors.submissionType.error = "Please enter submission type";
    errors.dueDate.error = "Please enter due date";
    isValid = false;
  }
  if (!contractType) {
    errors.agencyName.error = "Please enter agency name";
    isValid = false;
  }
  if (!submissionType) {
    errors.agencyEmail.error = "Please enter agency email";
    isValid = false;
  }
  if (!dueDate) {
    errors.dueDate.error = "Please enter due date";
    isValid = false;
  }
  return { isValid, errors };
};
export const AdminContent = {
  rfpInformation: {
    label: "RFP Information",
    count: 0,
  },
  agencyinformation: {
    label: "Agency Information",
    count: 0,
  },
  document: {
    label: "Documents",
    count: 0,
  },
  comments: {
    label: "Comments",
    count: 0,
  },
};
const { rfpInformation, agencyinformation, document, comments } = AdminContent;

export const tabConfig = {
  Admin: [rfpInformation, agencyinformation, document, comments],
};
