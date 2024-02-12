import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Grid,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import { CustomButton, CustomInput } from "global/components";
import OnboardingStyles from "../Onboard.styles";
import { useState } from "react";
import CustomLoader from "global/components/CustomLoader/CustomLoader";
import { isTruthy } from "helpers/methods";
import notifiers from "global/constants/NotificationConstants";
import { KeyboardBackspace } from "@mui/icons-material";
import StarRateIcon from "@mui/icons-material/StarRate";
import step1background from "assets/icons/step1background.svg";
import DoneRoundedIcon from "@mui/icons-material/DoneRounded";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { pureWhiteColor } from "utils/styles";
import { getCustomError } from "utils/customError";

const cardStyle = {
  style: {
    base: {
      color: "#ffffff",
      fontFamily: "Arial, sans-serif",
      fontSmoothing: "antialiased",
      fontSize: "16px",
      "::placeholder": {
        color: "#ffffff",
      },
    },
    invalid: {
      color: "#fa755a",
      iconColor: "#fa755a",
    },
  },
};

interface CustomProps {
  nextStep?: () => void | undefined;
  back?: () => void | undefined;
  chosenPlan: any;
  activeUser: any;
  onboardUser: Function;
}

const OnboardStep3 = (props: CustomProps) => {
  const classes = OnboardingStyles;
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);

  // handle submit method
  const handleSubmit = async (event: any) => {
    try {
      setLoading(true);
      if (stripe !== null && elements !== null) {
        const { error, paymentMethod } = await stripe.createPaymentMethod({
          type: "card",
          card: elements.getElement(CardElement)!,
        });
        if (error) {
          getCustomError(error);
          setLoading(false);
        } else {
          setLoading(false);
          await props.onboardUser(paymentMethod.id);
          props.nextStep?.();
        }
      }
    } catch (error: any) {
      getCustomError(error);
    }
  };

  return (
    <>
      <Grid
        container
        sx={{
          backgroundColor: "rgba(131, 136, 255, 1)",
          height: "100%",
          backgroundImage: `url('${step1background}')`,
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
      >
        <Grid container direction={"row"} ml={28}>
          <Grid>
            <Box display={"flex"} mt={12}>
              <IconButton>
                <KeyboardBackspace htmlColor="#ffffff" />
              </IconButton>
              <Typography variant="h1" sx={classes.testStyle}>
                Payment
              </Typography>
            </Box>
          </Grid>
        </Grid>
        <Grid container direction={"row"} justifyContent={"center"} gap={2}>
          <Box sx={classes.borderBox}>
            <Grid item xs={12} sm={12} md={12} xl={12} lg={12} mt={2}>
              <Typography sx={classes.inputLabels}>Name</Typography>
              <CustomInput
                id="name"
                value={props.activeUser?.name ?? ""}
                disabled
                customInputClasses={{
                  background: "rgba(40, 41, 69, 1)",
                  border: "1px solid rgba(255, 255, 255, 0.1)",
                  borderRadius: "8px",
                }}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={12} xl={12} lg={12} mt={2}>
              <Typography sx={classes.inputLabels}>Email</Typography>
              <CustomInput
                id="email"
                value={props.activeUser?.email ?? ""}
                disabled
                customInputClasses={{
                  background: "rgba(40, 41, 69, 1)",
                  border: "1px solid rgba(255, 255, 255, 0.1)",
                  borderRadius: "8px",
                }}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={12} xl={12} lg={12} mt={2}>
              <Typography sx={classes.inputLabels}>Card Number</Typography>
              <Box sx={classes.cardElementStyle}>
                <CardElement options={cardStyle} />
              </Box>
            </Grid>
          </Box>
          <Card
            sx={{
              borderRadius: "10px",
              background: "#282945",
              width: "350px",
              height: "550px",
            }}
          >
            {props.chosenPlan.recommends ? (
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
                      title={props.chosenPlan.recommends}
                      sx={classes.cardRecommends}
                    />
                  </Grid>
                </Stack>
              </>
            ) : (
              <CardHeader
                title={props.chosenPlan.recommends}
                sx={classes.WihtoutcontenetCard}
              />
            )}
            <CardHeader
              title={props.chosenPlan.plan}
              sx={classes.cardTitle}
              subheader={props.chosenPlan.subheader}
            />
            <CardContent sx={classes.cardBody}>
              <Stack sx={classes.cardTitleStyle}>
                <ul>
                  {props.chosenPlan.fetures.map((info: string) => (
                    <li>
                      <Box style={{ display: "flex", alignItems: "start" }}>
                        <Typography
                          variant="h5"
                          sx={{ wordBreak: "break-all" }}
                        >
                          {info}
                        </Typography>
                      </Box>
                    </li>
                  ))}
                </ul>
              </Stack>
            </CardContent>
          </Card>
        </Grid>
        <Box width={"100%"} display={"flex"} justifyContent={"center"}>
          <CustomButton
            label="Next"
            onClick={(e: any) => handleSubmit(e)}
            customClasses={{ width: "110px", background: "black" }}
            buttonType={"outlined"}
          />
        </Box>
      </Grid>
      <CustomLoader isLoading={loading} />
    </>
  );
};

export default OnboardStep3;
