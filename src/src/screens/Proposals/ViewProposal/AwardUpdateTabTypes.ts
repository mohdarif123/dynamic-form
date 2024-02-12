import strings from "global/constants/StringConstants";

export const initalField = (data: any) => {
  return {
    title: {
      value: data?.title,
      error: "",
    },
    contractDetailsUrl: {
      value: data?.proposalEvaluation?.contractDetailsUrl ?? "",
      error: "",
    },
    price: {
      value: data?.proposalEvaluation?.price ?? "",
      error: "",
    },
    comment: {
      value: Array.isArray(data?.proposalEvaluation?.comments)
        ? data?.proposalEvaluation?.comments[0]?.text ?? ""
        : "",
      error: "",
    },
    agencyName: {
      value: data?.proposalEvaluation?.agency?.name ?? data?.agency?.name,
      error: "",
    },
    agencyWebsite: {
      value: data?.proposalEvaluation?.agency?.webSite ?? data?.agency?.webSite,
      error: "",
    },
    address: {
      value:
        data?.proposalEvaluation?.agency?.address?.line1 ??
        data?.agency?.address?.line1,
      error: "",
    },
    city: {
      value: data?.proposalEvaluation?.agency?.address?.city ?? "",
      error: "",
    },
    state: {
      value: data?.proposalEvaluation?.agency?.address?.state ?? "",
      error: "",
    },
    country: {
      value: data?.proposalEvaluation?.agency?.address?.country ?? "",
      error: "",
    },
    pinCode: {
      value: data?.proposalEvaluation?.agency?.address?.pinCode ?? "",
      error: "",
    },
    source: {
      value: "",
      error: "",
    },
    path: {
      value: "",
      error: "",
    },
    fileName: {
      value: "",
      error: "",
    },
    reason: {
      value: data?.proposalEvaluation?.reason ?? "",
      error: "",
    },
  };
};
export const AwardValidation = (stepOneFormData: any) => {
  let errors = stepOneFormData;
  const emailRegex = strings.regex;
  const websiteRegex = strings.websiteRegex;
  let isValid = true;
  const title = stepOneFormData?.title?.value;
  const price = stepOneFormData?.price?.value;
  const source = stepOneFormData?.source?.value;
  const path = stepOneFormData?.path?.value;
  const contractDetailsUrl = stepOneFormData?.contractDetailsUrl?.value;
  const comment = stepOneFormData?.comment?.value;
  const reason = stepOneFormData?.reason?.value;
  if (!title && !comment) {
    // Set the fields as error true
    errors.title.error = "Please enter title";
    errors.comment.error = "Please enter Comment";
    isValid = false;
  }
  if (!title) {
    errors.title.error = "Please enter title";
    isValid = false;
  }
  if (!source && path) {
    errors.source.error = "Please select source";
    isValid = false;
  }
  if (!comment) {
    errors.comment.error = "Please enter comment";
    isValid = false;
  }
  if (!reason) {
    errors.reason.error = "Please enter reason";
    isValid = false;
  }
  if (price < 0) {
    errors.price.error = "Please enter valid price";
    isValid = false;
  }

  return { isValid, errors };
};
