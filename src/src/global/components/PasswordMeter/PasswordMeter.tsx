import { Box, Typography } from "@mui/material";
import LinearProgress from "@mui/material/LinearProgress";

export const PasswordStrengthIndicator = ({ password }: any) => {
  const strength = calculatePasswordStrength(password);

  const color =
    strength >= 66 ? "success" : strength >= 33 ? "warning" : "error";
  const colorText =
    strength >= 66 ? "#2e7d32" : strength >= 33 ? "#ed6c02" : "#d32f2f";
  const text =
    strength >= 66 ? "Strong " : strength >= 33 ? "Moderate" : "Weak";
  return (
    <>
      <Box justifyContent={"space-between"} display={"flex"} ml={1}>
        <Box width={"80%"}>
          <LinearProgress
            variant="determinate"
            value={String(strength) == "NaN" ? 0 : strength}
            sx={{ marginTop: 1 }}
            color={color}
          />
        </Box>
        <Box>
          <Typography color={colorText} sx={{ float: "inline-end" }}>
            {text}
          </Typography>
        </Box>
      </Box>
    </>
  );
};

const calculatePasswordStrength = (password: any) => {
  const uppercaseCount = (password.match(/[A-Z]/g) || []).length;
  const digitCount = (password.match(/[0-9]/g) || []).length;
  const specialCharCount = (password.match(/[#@$!%*?&]/g) || []).length;
  const lowerCase = (password.match(/[a-z]/g) || []).length;

  const regexMatch =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[#@$!%*?&])(?=.*[0-9])[A-Za-z\d#@$!%*?&]{8,}/.test(
      password
    );

  const totalCharacters = password.length;
  const strengthPercentage =
    (uppercaseCount / totalCharacters) * 40 +
    (digitCount / totalCharacters) * 40 +
    (specialCharCount / totalCharacters) * 40 +
    (lowerCase / totalCharacters) * 20 +
    (regexMatch ? 100 : 0);
  return Math.min(strengthPercentage, 100);
};
