import strings from "global/constants/StringConstants";

export const addCompetitiveInitialState = (prevState: any) => {
  return {
    title: {
      value: prevState?.title ?? "",
      error: "",
    },
    solicitation: {
      value: prevState?.solicitation ?? "",
      error: "",
    },
    region: {
      value: prevState?.region ?? "",
      error: "",
    },
    source: {
      value: prevState?.source ?? "",
      error: "",
    },
    type: {
      value: prevState?.type ?? "",
      error: "",
    },
    contract: {
      value: prevState?.contract ?? "",
      error: "",
    },
    price: {
      value: prevState?.price ?? "",
      error: "",
    },
    comment: {
      value: prevState?.comment ?? "",
      error: "",
    },
    aggencyName: {
      value: prevState?.aggencyName ?? "",
      error: "",
    },
    aggencyEmail: {
      value: prevState?.aggencyEmail ?? "",
      error: "",
    },
    aggencyWebsite: {
      value: prevState?.aggencyWebsite ?? "",
      error: "",
    },
    aggencyContactNo: {
      value: prevState?.aggencyContactNo ?? "",
      error: "",
    },
    line1: {
      value: prevState?.line1 ?? "",
      error: "",
    },
    line2: {
      value: prevState?.line2 ?? "",
      error: "",
    },
    line3: {
      value: prevState?.line3 ?? "",
      error: "",
    },
    domain: {
      value: prevState?.domain ?? "",
      error: "",
    },
    subDomain: {
      value: prevState?.subDomain ?? "",
      error: "",
    },
    country: {
      value: prevState?.country ?? "",
      error: "",
    },
    state: {
      value: prevState?.state ?? "",
      error: "",
    },
    city: {
      value: prevState?.city ?? "",
      error: "",
    },
    Zip: {
      value: prevState?.Zip ?? "",
      error: "",
    },
  };
};
export const addCompetitiveInitialStateReset = () => {
  return {
    title: {
      value: "",
      error: "",
    },
    solicitation: {
      value: "",
      error: "",
    },
    region: {
      value: "",
      error: "",
    },
    source: {
      value: "",
      error: "",
    },
    type: {
      value: "",
      error: "",
    },
    contract: {
      value: "",
      error: "",
    },
    price: {
      value: "",
      error: "",
    },
    comment: {
      value: "",
      error: "",
    },
    aggencyName: {
      value: "",
      error: "",
    },
    aggencyEmail: {
      value: "",
      error: "",
    },
    aggencyWebsite: {
      value: "",
      error: "",
    },
    aggencyContactNo: {
      value: "",
      error: "",
    },
    line1: {
      value: "",
      error: "",
    },
    line2: {
      value: "",
      error: "",
    },
    line3: {
      value: "",
      error: "",
    },
    domain: {
      value: "",
      error: "",
    },
    subDomain: {
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
    Zip: {
      value: "",
      error: "",
    },
  };
};

export const handleAddCompetitiveValidation = (addResponseData: any) => {
  let errors = addResponseData;
  const emailRegex = strings.regex;
  const websiteRegex = strings.websiteRegex;
  const solicitation = addResponseData.solicitation.value;
  const title = addResponseData.title.value;
  const region = addResponseData.region.value;
  const domain = addResponseData.domain.value;
  const source = addResponseData.source.value;
  const type = addResponseData.type.value;
  const aggencyName = addResponseData.aggencyName.value;
  const aggencyEmail = addResponseData.aggencyEmail.value;
  const aggencyWebsite = addResponseData.aggencyWebsite.value;

  let isValid = true;
  if (
    !solicitation &&
    !title &&
    !region &&
    !domain &&
    !solicitation &&
    !source &&
    !type
  ) {
    errors.region.error = "Please select region!";
    errors.solicitation.error = "Please enter solicitation!";
    errors.title.error = "Please enter title!";
    errors.domain.error = "Please select domain!";
    errors.source.error = "Please select source!";
    errors.type.error = "Please select type!";

    isValid = false;
  }

  if (!solicitation) {
    errors.solicitation.error = "Please enter solicitation!";
    isValid = false;
  }
  if (!title) {
    errors.title.error = "Please enter title!";
    isValid = false;
  }
  if (!region) {
    errors.region.error = "Please select region!";
    isValid = false;
  }
  if (!domain) {
    errors.domain.error = "Please select domain!";
    isValid = false;
  }
  if (!source) {
    errors.source.error = "Please select source!";
    isValid = false;
  }
  if (!type) {
    errors.type.error = "Please select type!";
    isValid = false;
  }
  if (!aggencyName) {
    errors.aggencyName.error = "Please enter agency name!";

    isValid = false;
  }
  if (!aggencyName) {
    errors.aggencyName.error = "Please enter agency name!";
    isValid = false;
  }
  if (!aggencyEmail || !emailRegex.test(aggencyEmail)) {
    errors.aggencyEmail.error = "Please enter agency email!";
    isValid = false;
  }
  if (aggencyWebsite) {
    if (!websiteRegex.test(aggencyWebsite)) {
      errors.aggencyWebsite.error = "Please enter correct agency website!";
      isValid = false;
    }
  }
  if (!aggencyEmail) {
    errors.aggencyEmail.error = "Please enter agency email!";
    isValid = false;
  }
  return { isValid, errors };
};
