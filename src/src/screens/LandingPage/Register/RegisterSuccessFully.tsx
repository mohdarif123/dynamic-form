import { Typography, Box, Grid, Divider } from "@mui/material";
import registerImage from "assets/images/Layer_1.svg";
import { pureWhiteColor } from "utils/styles";
import registerSuccessFullyStyles from "./registerSuccessFully.styles";
import AppDrawerLogo from "assets/icons/AppDrawerLogo.svg";
import { useTitle } from "utils/UseTitle";
import strings from "global/constants/StringConstants";

const RegisterSuccessFully = () => {
  useTitle(strings.REGISTERSUCCESSFULLY);
  const classes = registerSuccessFullyStyles;

  const getModalDesign = () => {
    return (
      <>
        <Box
          sx={{
            maxWidth: "450px",
            width: "450px",
          }}
          mb={{ xl: 4, lg: 1, md: 1, sm: 1, xs: 1 }}
          mt={{ xl: 3 }}
        >
          <Box p={2}>
            <Typography sx={classes.modalTitle} variant="h1">
              Check your email!
            </Typography>
            <Typography sx={classes.fontText} variant="h5">
              We’ve sent a message to your inbox with a link to activate your
              account.
            </Typography>
          </Box>
        </Box>
        <img
          src={registerImage}
          alt="Registration successful!"
          width={"300px"}
          height={"230px"}
        />
      </>
    );
  };

  const getDidntGetEmailSection = () => {
    return (
      <Box
        sx={{
          maxWidth: "450px",
          mt: { xl: 4, lg: 1, md: 1, sm: 1, xs: 1 },
        }}
      >
        <Typography sx={classes.instructions} variant="h5">
          Didn’t get an email?
        </Typography>
        <ul style={{ color: "#fff" }}>
          <li>
            Please check your spam or junk folder to see if the email ended up
          </li>
          <li>
            There by mistake. If you find it there, you can mark it as "not
            spam"
          </li>
          <li>
            To ensure future emails from that sender are delivered to your
            inbox.
          </li>
        </ul>
      </Box>
    );
  };

  const getYear = () => {
    return new Date().getFullYear();
  };

  const getCopyRightFooter = () => {
    return (
      <>
        <Box sx={classes.coypRightFooterStyle}>
          <Typography variant="h5" sx={classes.footerText}>
            &copy; {getYear()} RFPPro. All Rights Reserved
          </Typography>
        </Box>
      </>
    );
  };

  const getRfpLogo = () => {
    return (
      <>
        <Box
          sx={{ display: "flex", alignItems: "center" }}
          mt={{ xl: 8, lg: 2, md: 2, sm: 2, xs: 2 }}
        >
          <Box
            component={"img"}
            src={AppDrawerLogo}
            sx={{ maxWidth: "37px" }}
          />
          <Typography
            variant="h1"
            sx={classes.rfpTextStyle}
            style={{ color: pureWhiteColor }}
          >
            RFP
            <Typography
              component={"span"}
              variant="h1"
              sx={classes.proTextStyle}
            >
              PRO
            </Typography>
          </Typography>
        </Box>
      </>
    );
  };

  const getRegisterSuccessfully = () => {
    return (
      <>
        <Box sx={classes.mianContainer}>
          <Grid container direction={"row"} justifyContent={"center"}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                width: "100%",
              }}
              // mt={{ xl: 6, lg: 3, md: 3, sm: 3, xs: 3 }}
            >
              {getRfpLogo()}
              {getModalDesign()}
              <Divider sx={classes.line} />
              {getDidntGetEmailSection()}
              {getCopyRightFooter()}
            </Box>
          </Grid>
        </Box>
      </>
    );
  };

  return getRegisterSuccessfully();
};

export default RegisterSuccessFully;
