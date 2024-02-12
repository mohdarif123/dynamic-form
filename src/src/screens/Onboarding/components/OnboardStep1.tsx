import { Box, Typography } from "@mui/material";
import { CustomButton } from "global/components";
import OnboardingStyles from "../Onboard.styles";
import step1img from "assets/icons/step1img.svg";
import step1background from "assets/icons/step1background.svg";

interface CustomProps {
  nextStep?: () => void | undefined;
  activateUser: any;
}

const OnboardStep1 = (props: CustomProps) => {
  const classes = OnboardingStyles;

  const handleNextStep = () => {
    props.nextStep?.();
  };

  return (
    <Box
      sx={{
        backgroundColor: "rgba(131, 136, 255, 1)",
        height: "100%",
        backgroundImage: `url('${step1background}')`,
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <Box
          component={"img"}
          src={step1img}
          sx={{
            height: { xl: "400px", lg: "350px", md: "350px" },
            width: { xl: "400px", lg: "350px", md: "350px" },
          }}
        />
        <Typography variant="h1" sx={{ color: "black" }}>
          Hello {props?.activateUser?.name}
        </Typography>
        <Typography variant="h1" sx={{ color: "white" }} mt={1}>
          Successfully Activate your account!      {" "}
        </Typography>
        <Typography variant="h5" sx={{ color: "white" }} mt={2}>
          We Promise to keep you up-to-date with the RFP, tell you about our
          awesome plans the odd
        </Typography>
        <Typography variant="h5" sx={{ color: "white" }} mt={0.5}>
          surprise and special offer
        </Typography>
        <Box mt={2}>
          <CustomButton
            label="Next"
            onClick={() => handleNextStep()}
            customClasses={{
              width: "110px",
              background: "black !important",
              borderRadius: "34px",
            }}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default OnboardStep1;
