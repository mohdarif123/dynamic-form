import {
  Box,
  Stepper,
  Step,
  StepLabel,
  Typography,
  Stack,
  Grid,
  useMediaQuery,
  StepConnector,
  stepConnectorClasses,
  styled,
  StepIconProps,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import onboarding from "assets/images/onboardActive.svg";
import choosePlan from "assets/images/choosePlan.png";
import cardDetails from "assets/images/cardDetails.png";
import choosePlanActive from "assets/images/choosePlanActive.png";
import cardDetailsActive from "assets/images/cardDetailsActive.png";
import CustomLoader from "global/components/CustomLoader/CustomLoader";
import OnboardStep1 from "./components/OnboardStep1";
import OnboardStep2 from "./components/OnboardStep2";
import OnboardStep3 from "./components/OnboardStep3";
import OnboardStep4 from "./components/OnboardStep4";
import { centerItemFlex, pureWhiteColor, theme } from "utils/styles";
import OnboardingStyles from "./Onboard.styles";
import { PricingData } from "models/interfaces";
import { isTruthy } from "helpers/methods";
import {
  activateUser,
  getPlanDetails,
  getUserDetails,
} from "./OnboardServices";
import notifiers from "global/constants/NotificationConstants";
import { useLocation } from "react-router-dom";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import strings from "global/constants/StringConstants";
import { useTitle } from "utils/UseTitle";
import urls from "global/constants/UrlConstants";
import OnboardStep5 from "./components/OnboardStep5";
import { useAppDispatch, useAppSelector } from "utils/hooks";
import history from "utils/history";
import { selectBackgroundColor } from "redux/themeChangeSlice";
import AppDrawerLogo from "assets/icons/AppDrawerLogo.svg";
import { Check } from "@mui/icons-material";
import { profileInitialState } from "screens/Profile/ProfileTypeAndValidation";
import { getCustomError } from "utils/customError";

const getYear = () => {
  return new Date().getFullYear();
};
const steps = [
  {
    label: "Activate your account",
    description: "Account",
  },
  {
    label: "Choose your plan",
    description: "Pricing plan",
  },
  // {
  //   label: "Payment Method",
  //   description: "Required card details if you select paid plan",
  // },
  {
    label: "Company Details",
    description: "Required company details",
  },
];

const Onboard = () => {
  useTitle(strings.OnboardTitle);
  const classes = OnboardingStyles;
  const promise = loadStripe(urls.STRIPE_PUBLIC_KEY);
  const [activeStep, setActiveStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<any>();
  const isDesktop = useMediaQuery(theme.breakpoints.up("md"));
  const [planListData, setPlanListData] = useState<any>([]);
  const context = new URLSearchParams(useLocation().search).get("context");
  const [companyDetails, setCompanyDetails] = useState<any>(
    profileInitialState()
  );
  const [selectedPlan, setSelectedPlanData] = useState<PricingData>(
    {} as PricingData
  );
  const [selectPlanId, setSelectPlanId] = useState<any>("");
  useEffect(() => {
    getUser(context!);
    getPlanList();
  }, []);
  const getUser = async (token: string) => {
    try {
      const response: any = await getUserDetails(token);
      setUser(response);
      history.push(urls.onBoardViewPath);
    } catch (error: any) {
      history.push(urls.LOGIN_VIEW_PATH);
      getCustomError(error);
    }
  };

  const getPlanList = async () => {
    try {
      const response: any = await getPlanDetails();
      response.sort(
        (a: any, b: any) => a?.limits[0]?.limit - b?.limits[0]?.limit
      );
      setPlanListData(response);
    } catch (error: any) {
      getCustomError(error);
    }
  };

  const activateUserServices = async (pmId?: any) => {
    try {
      setLoading(true);
      const token = user.authToken;
      const finalUserDetails: any = {
        id: user.id,
        pwd: user.pwd,
        authToken: token,
        name: user.name,
        contactNo: user.contactNo,
        email: user.email,
        app: "RFPPro",
        address: "",
        role: "",
        resources: [],
        company: "",
        planId: pmId?.id && pmId?.id,
        paymentMethodId: pmId ?? "",
      };
      await activateUser(finalUserDetails, token);
      setLoading(false);
    } catch (error: any) {
      setLoading(false);
      getCustomError(error);
    }
  };

  const handleNext = () => {
    setActiveStep((prevActiveStep: number) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep: number) => prevActiveStep - 1);
  };

  const QontoConnector = styled(StepConnector)(({ theme: any }) => ({
    [`&.${stepConnectorClasses.active}`]: {
      [`& .${stepConnectorClasses.line}`]: {
        borderColor: "#8569BB", // active line color
        borderWidth: "2px",
      },
    },
    [`&.${stepConnectorClasses.completed}`]: {
      [`& .${stepConnectorClasses.line}`]: {
        borderColor: "#8569BB", // completed line color
        borderWidth: "2px",
      },
    },
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: "#D5D5D5", //inactive or uncomplete line color
      borderWidth: "2px",
    },
  }));

  const QontoStepIcon = (props: StepIconProps) => {
    const { active, completed, icon } = props;
    return (
      <Box
        sx={{
          height: "24px",
          width: "24px",
          borderRadius: "50%",
          ...centerItemFlex,
          background: completed || active ? "#8569BB" : "white",
        }}
      >
        {(icon === 1 && !completed) || completed ? (
          <Check
            className="QontoStepIcon-completedIcon"
            sx={{
              height: "17px",
              width: "17px",
              color: "white !important",
            }}
          />
        ) : null}
      </Box>
    );
  };

  const getStepper = () => {
    return (
      <>
        <Stepper
          activeStep={activeStep}
          orientation={isDesktop ? "vertical" : "horizontal"}
          sx={{
            "& .MuiStepConnector-line": {
              minHeight: {
                xl: "90px",
                lg: "65px",
                md: "65px",
                sm: "65px",
                xs: "65px",
              },
            },
            "& .MuiStepLabel-root": {
              padding: "0",
              margin: "-5px 0",
            },
          }}
          connector={<QontoConnector />}
        >
          {steps.map((step, index) => (
            <Step key={step.label} sx={classes.stepColors}>
              <StepLabel StepIconComponent={QontoStepIcon}>
                <Stack direction="column">
                  <Typography
                    sx={{
                      ...classes.stepperDesc2,
                      color: index <= activeStep ? pureWhiteColor : "#696988",
                    }}
                    variant="h5"
                  >
                    {step.label}
                  </Typography>
                  <Typography
                    sx={{
                      ...classes.stepperDesc2,
                      color: index <= activeStep ? pureWhiteColor : "#696988",
                    }}
                    variant="subtitle2"
                  >
                    {step.description}
                  </Typography>
                </Stack>
              </StepLabel>
            </Step>
          ))}
        </Stepper>
      </>
    );
  };

  const handleChoosePlan = async (planPrice: any, planInfo: any) => {
    if (planPrice !== "Free") {
      setActiveStep(3);
    } else {
      if (!isTruthy(selectPlanId)) {
        await activateUserServices(planInfo);
      }
      setActiveStep(3);
    }
  };
  // back method when we want to skip payment page
  const handleBackStep = () => {
    setActiveStep(1);
  };

  const getContent = () => {
    switch (activeStep) {
      case 0:
        return (
          <Box height={"100%"}>
            <OnboardStep1 nextStep={handleNext} activateUser={user} />
          </Box>
        );
      case 1:
        return (
          <Box height={"100%"}>
            <OnboardStep2
              nextStep={handleChoosePlan}
              setSelectedPlan={setSelectedPlanData}
              setSelectPlanId={setSelectPlanId}
              selectPlanId={selectPlanId}
              selectedPlan={selectedPlan}
              planListData={planListData}
            />
          </Box>
        );
      case 2:
        return (
          <Box height={"100%"}>
            <Elements stripe={promise}>
              <OnboardStep3
                nextStep={handleNext}
                back={handleBack}
                chosenPlan={selectedPlan}
                activeUser={user}
                onboardUser={activateUserServices}
              />
            </Elements>
          </Box>
        );
      case 3:
        return (
          <OnboardStep4
            nextStep={handleNext}
            user={user}
            paymentFormData={companyDetails}
            setPaymentFormData={setCompanyDetails}
            back={handleBackStep}
            token={user?.authToken}
          />
        );
      case 4:
        return <OnboardStep5 activeUser={user} />;
      default:
        break;
    }
  };

  const getCopyRightFooter = () => {
    return (
      <>
        <Box sx={classes.copyRightFooterStyle}>
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
        <Box sx={{ display: "flex", alignItems: "center" }} pt={3} pl={3}>
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

  return (
    <>
      <Grid container>
        <Grid
          item
          xs={12}
          sm={12}
          md={3}
          lg={3}
          xl={3}
          sx={classes.mainWrapper}
        >
          {getRfpLogo()}
          <Box sx={classes.stepperMainBox}>{getStepper()}</Box>
        </Grid>
        <Grid
          item
          xs={12}
          sm={12}
          md={9}
          lg={9}
          xl={9}
          sx={{ position: "relative", height: "100vh" }}
        >
          {getContent()}
          {getCopyRightFooter()}
        </Grid>
      </Grid>
      <CustomLoader isLoading={loading} />
    </>
  );
};

export default React.memo(Onboard);
