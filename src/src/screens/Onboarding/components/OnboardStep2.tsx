import {
  Grid,
  Box,
  CardContent,
  CardHeader,
  Typography,
  Card,
  Stack,
} from "@mui/material";
import { CustomButton } from "global/components";
import OnboardingStyles from "../Onboard.styles";
import step1background from "assets/icons/step1background.svg";
import { pureWhiteColor, sidebarColor } from "utils/styles";
import StarRateIcon from "@mui/icons-material/StarRate";
import { useState } from "react";
import CustomLoader from "global/components/CustomLoader/CustomLoader";
import { PricingData } from "models/interfaces";
interface CustomProps {
  nextStep: Function;
  setSelectedPlan: any;
  selectedPlan: PricingData;
  planListData?: any;
  setSelectPlanId?: any;
  selectPlanId?: any;
}

const OnboardStep1 = (props: CustomProps) => {
  const classes = OnboardingStyles;
  const [isLoading, setIsLoading] = useState(false);

  const submit = async (planInfo: any) => {
    setIsLoading(true);
    props.setSelectPlanId(planInfo.id);
    if (planInfo.name === "Free") {
      handleNextStep(planInfo);
    } else {
      window.open("https://rfppro.app/", "_blank");
      setIsLoading(false);
    }
  };

  const handleNextStep = (planInfo: any) => {
    props.nextStep?.(planInfo.name, planInfo);
  };

  return (
    <>
      <Grid
        container
        sx={{
          backgroundColor: "rgba(131, 136, 255, 1)",
          height: "100%",
          overflowY: "auto",
          backgroundImage: `url('${step1background}')`,
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          "&::-webkit-scrollbar": {
            width: "10px",
            borderRadius: "10px",
            height: "4px",
          },
          "&::-webkit-scrollbar-thumb": {
            background: sidebarColor,
            borderRadius: "10px",
            width: "10px",
          },
        }}
        pb={6}
      >
        <Grid container direction={"row"} justifyContent={"center"}>
          <Grid item xl={11} lg={11} md={11} sm={11} xs={11}>
            <Typography
              variant="h1"
              sx={classes.testStyle}
              mt={{ xl: 8, lg: 4, md: 4, sm: 4, xs: 4 }}
            >
              Pricing
            </Typography>
            <Typography
              variant="h3"
              sx={{ color: "#fff", marginTop: "10px", maxWidth: "1200px" }}
            >
              The key command lets you have full control at your fingertips.
              Manage your portfolio, view transactions and execute real-time
              orders in seconds, all without ever touching your mouse.
            </Typography>
          </Grid>
        </Grid>
        <Grid
          container
          direction={"row"}
          justifyContent={"center"}
          spacing={2}
          mt={{ xl: 3, lg: 3, md: 3, sm: 3, xs: 3 }}
        >
          {props.planListData?.map((planInfo: any, index: any) => (
            <Grid item xs={11} sm={11} xl={2.7} lg={2.7} md={5.5}>
              <Card
                sx={{
                  borderRadius: "10px",
                  background: "none",
                }}
              >
                {planInfo?.recommends ? (
                  <>
                    <Stack
                      direction={"row"}
                      justifyContent="center"
                      alignItems="center"
                      sx={{ background: pureWhiteColor }}
                    >
                      <Grid>
                        <StarRateIcon color="primary"></StarRateIcon>
                      </Grid>
                      <Grid>
                        <CardHeader
                          title={planInfo?.recommends}
                          sx={classes.cardRecommends}
                        />
                      </Grid>
                    </Stack>
                  </>
                ) : (
                  <CardHeader
                    title={planInfo?.recommends}
                    sx={classes.WihtoutcontenetCard}
                  />
                )}
                <CardHeader title={planInfo?.name} sx={classes.cardTitle} />
                <CardContent sx={classes.cardBody}>
                  <Stack sx={classes.cardTitleStyle}>
                    <ul style={{ listStyleType: "disc", textAlign: "left" }}>
                      {planInfo?.feature?.map((info: string) => (
                        <li>
                          <Box style={{ display: "flex", alignItems: "start" }}>
                            <Typography
                              variant="h5"
                              sx={{ wordBreak: "break-word" }}
                            >
                              {info}
                            </Typography>
                          </Box>
                        </li>
                      ))}
                    </ul>
                  </Stack>

                  <CustomButton
                    label={planInfo.name === "Free" ? "Trial" : "Contact Us"}
                    onClick={() => submit(planInfo)}
                    customClasses={{
                      backgroundColor: "#13b4ca",
                      marginLeft: "auto",
                      marginRight: "auto",
                      marginTop: "20px",
                      marginBottom: "20px",
                    }}
                  />
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
        <Stack width={"100%"}></Stack>
      </Grid>

      <CustomLoader isLoading={isLoading} />
    </>
  );
};

export default OnboardStep1;
