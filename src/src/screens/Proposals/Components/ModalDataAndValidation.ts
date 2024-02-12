import moment from "moment";

export const addTaskInitailState = () => {
  return {
    title: {
      value: "",
      error: "",
    },
    description: {
      value: "",
      error: "",
    },
    dueDate: {
      value: moment().format("YYYY-MM-DD"),
      error: "",
    },
    comment: {
      value: "",
      error: "",
    },
    assign: {
      value: "",
      error: "",
    },
  };
};

export const handleAddTaskValidation = (addTaskData: any) => {
  let errors = addTaskData;
  const title = addTaskData.title.value;
  const description = addTaskData.description.value;
  const dueDate = addTaskData.dueDate.value;
  const assign = addTaskData.assign.value;
  const comment = addTaskData.comment.value;
  let isValid = true;

  if (!title && !description && !dueDate && !assign && !comment) {
    errors.title.error = "Please enter title!";
    errors.description.error = "Please enter description!";
    errors.dueDate.error = "Please enter dueDate!";
    errors.assign.error = "Please select assign!";
    errors.comment.error = "Please enter comment!";
    isValid = false;
  }

  if (!title) {
    errors.title.error = "Please enter your title!";
    isValid = false;
  }

  if (!description) {
    errors.description.error = "Please enter description!";
    isValid = false;
  }

  if (!dueDate) {
    errors.dueDate.error = "Please enter dueDate!";
    isValid = false;
  }
  if (!assign) {
    errors.assign.error = "Please select assign!";
    isValid = false;
  }
  if (!comment) {
    errors.comment.error = "Please enter comment!";
    isValid = false;
  }

  return { isValid, errors };
};
