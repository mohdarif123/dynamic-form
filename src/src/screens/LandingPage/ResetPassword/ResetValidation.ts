import strings from "global/constants/StringConstants";

export const handleResetValidation = (resetData: any) => {
  let errors = resetData;
  const newPassword = resetData.newPassword.value;
  const confirmPassword = resetData.confirmPassword.value;
  let isValid = true;

  if (!newPassword && !confirmPassword) {
    errors.newPassword.error = "Please enter new password!";
    errors.confirmPassword.error = "Please enter confirm password!";
    isValid = false;
  }

  if (!newPassword) {
    errors.newPassword.error = "Please enter new password!";
    isValid = false;
  }

  if (!confirmPassword) {
    errors.confirmPassword.error = "Please enter confirm password!";
    isValid = false;
  }
  if (newPassword && !strings.passwordValidationRegex.test(newPassword)) {
    errors.newPassword.error =
      "Please enter a password that is at least 8 characters long and includes at least one digit, one lowercase letter, one uppercase letter, and one special character from the following: @ $ ! % * ? & #.";
    isValid = false;
  }
  return { isValid, errors };
};
