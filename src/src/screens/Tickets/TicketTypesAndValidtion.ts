export const insertTicketField = () => {
  return {
    comment: {
      value: "",
      error: "",
    },
    reAssignValue: {
      value: "",
      error: "",
    },
    complete: {
      value: false,
      error: "",
    },
  } as any;
};

export const reAssignFropDownValidation = () => {
  return {
    reassign: {
      value: "",
      error: "",
    },
  } as any;
};

export const validateAddCommentForm = (userDetail: any) => {
  let errors = userDetail;
  let isValid = true;
  const comment = userDetail.comment.value.trim();
  const reAssignValue = userDetail.name;

  if (!comment) {
    errors.comment.error = "Please enter comment";
    isValid = false;
  }

  if (comment) {
    errors.comment.error = "";
    isValid = true;
  }

  if (!reAssignValue) {
    errors.reAssignValue.error = "Please select value";
    isValid = false;
  }

  if (reAssignValue) {
    errors.reAssignValue.error = "";
    isValid = true;
  }
  return { isValid, errors };
};

export const validateComment = (userDetail: any) => {
  let errors = userDetail;
  let isValid = true;
  const comment = userDetail.comment.value.trim();
  if (!comment) {
    errors.comment.error = "Please enter comment";
    isValid = false;
  }

  if (comment) {
    errors.comment.error = "";
    isValid = true;
  }
  return { isValid, errors };
};

export const validateReassign = (userDetail: any) => {
  let errors = userDetail;
  let isValid = true;
  const reassign = userDetail?.reassign?.value;
  if (!reassign) {
    errors.reassign.error = "Please select assignee name";
    isValid = false;
  }

  return { isValid, errors };
};
