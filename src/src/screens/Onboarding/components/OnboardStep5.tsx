import React from "react";
import { Box, Grid, Typography } from "@mui/material";
import boyIcon from "assets/icons/byIcon.svg";
import { CustomButton } from "global/components";
import step1background from "assets/icons/step1background.svg";
import OnboardingStyles from "../Onboard.styles";
import urls from "global/constants/UrlConstants";
import history from "utils/history";

interface CustomProps {
  activeUser: any;
}

const OnboardStep5 = ({ activeUser }: CustomProps) => {
  const classes = OnboardingStyles;

  const submit = async () => {
    history.push(`${urls.DASHBOARD_VIEW_PATH}`);
  };
  const getPayment = () => {
    return (
      <>
        <Grid
          container
          sx={{
            backgroundColor: "rgba(131, 136, 255, 1)",
            height: "100%",
            backgroundImage: `url('${step1background}')`,
            backgroundPosition: "center",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            display: "flex",
            justifyContent: "center",
            width: "100%",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              height: "100vh",
              width: "100%",
            }}
          >
            <Box component={"img"} src={boyIcon} />
            <Typography variant="h1" sx={classes.form4testHeading} mt={2}>
              Hey {activeUser?.name}!
            </Typography>
            <Typography variant="h5" sx={classes.form4test} mt={1.5}>
              WELCOME to RFP. IT'S GREAT TO MEET YOU!
            </Typography>
            <Typography
              variant="h5"
              sx={{
                color: "white",
                width: "600px",
                textAlign: "center",
                wordBreak: "break-all",
              }}
              mt={2}
            >
              We promise to keep you up-to-date with the RFP, tell you about our
              awesome plans the odd surprise and special offer.
            </Typography>

            <Box mt={4}>
              <CustomButton
                label="Let's Go!"
                onClick={() => submit()}
                customClasses={{
                  width: "110px",
                  background: "black !important",
                  borderRadius: "34px",
                }}
              />
            </Box>
          </Box>
        </Grid>
      </>
    );
  };
  return getPayment();
};

export default React.memo(OnboardStep5);
