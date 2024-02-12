export const addResponsesInitialState = (prevState: any) => {
  return {
    region: {
      value: prevState?.region ?? "US",
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
    question: {
      value: prevState?.question ?? "",
      error: "",
    },
    answer: {
      value: prevState?.answer ?? "",
      error: "",
    },
  };
};

export const handleAddResponsesValidation = (addResponseData: any) => {
  let errors = addResponseData;
  const region = addResponseData.region.value;
  const domain = addResponseData.domain.value;
  const subDomain = addResponseData.subDomain.value;
  const question = addResponseData.question.value;
  const answer = addResponseData.answer.value;
  let isValid = true;
  if (!region && !domain && !subDomain && question) {
    errors.region.error = "Please select region!";
    errors.domain.error = "Please select domain!";
    errors.subDomain.error = "Please select sub domain!";
    errors.question.error = "Please enter question!";
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
  if (!subDomain) {
    errors.subDomain.error = "Please select sub domain!";
    isValid = false;
  }
  if (!question) {
    errors.question.error = "Please enter question!";
    isValid = false;
  }
  if (!answer) {
    errors.answer.error = "Please enter answer!";
    isValid = false;
  }

  return { isValid, errors };
};
