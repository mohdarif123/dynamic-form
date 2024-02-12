import { Box, Grid, Stack, Typography } from "@mui/material";
import { CustomButton, CustomInput } from "global/components";
import { isTruthy, openInfoNotification } from "helpers/methods";
import { store } from "utils/store";
import strings from "global/constants/StringConstants";
import CustomLoader from "global/components/CustomLoader/CustomLoader";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useAppSelector } from "utils/hooks";
import { selectBackgroundColor } from "redux/themeChangeSlice";
import React, { useState } from "react";
import { billingDetailsStyle as classes } from "../BillingDetail.style";
import notifiers from "global/constants/NotificationConstants";
import { changePlanService } from "../BillingDetail.service";
import { getCustomError } from "utils/customError";

const cardStyle = {
  style: {
    base: {
      color: "#fff",
      fontFamily: "Arial, sans-serif",
      fontSmoothing: "antialiased",
      fontSize: "16px",
      "::placeholder": {
        color: "#C1C1C1",
      },
    },
    invalid: {
      color: "#fff",
      iconColor: "#fff",
    },
  },
};
const cardStyleLight = {
  style: {
    base: {
      color: "#000",
      fontFamily: "Arial, sans-serif",
      fontSmoothing: "antialiased",
      fontSize: "16px",
      "::placeholder": {
        color: "#C1C1C1",
      },
    },
    invalid: {
      color: "#000",
      iconColor: "#000",
    },
  },
};
interface PaymentIntentProps {
  fetchCardDetailHandler: Function;
  planInfo: any;
  setButtonHide: any;
}
const PaymentIntent = ({
  fetchCardDetailHandler,
  planInfo,
  setButtonHide,
}: PaymentIntentProps) => {
  const bgcolor = useAppSelector(selectBackgroundColor);
  const [loading, setLoading] = useState<boolean>(false);
  const stripe = useStripe();
  const elements = useElements();
  const accountName = store.getState().auth.userAccount;
  const app = "rfppro";

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
          const data = {
            account: accountName,
            email: store.getState().auth.userEmail,
            name: store.getState().auth.userName,
            contactNo: "",
            planId: planInfo.id,
            paymentMethodId: paymentMethod.id,
            app: app,
          };
          setLoading(true);
          await changePlanService(data);
          openInfoNotification(
            "Payment has been completed successfully, Please refresh the page to see updated details"
          );
          setButtonHide(false);
          await fetchCardDetailHandler();
          setLoading(false);
        }
      }
    } catch (error: any) {
      setLoading(false);
      getCustomError(error);
    }
  };

  return (
    <Grid
      container
      spacing={2}
      xl={11}
      lg={11}
      ml={2}
      sx={{ backgroundColor: bgcolor ? "#282945" : "#ffffff" }}
    >
      <Grid item xl={12} xs={12} lg={11.5}>
        <CustomInput
          disabled
          label="Name"
          propsToInputElement={{ maxLength: 49 }}
          placeHolder="Enter Name"
          required
          name="name"
          id="name"
          value={store.getState().auth.userName}
          error={!isTruthy(store.getState().auth.userName)}
          customInputClasses={{
            borderRadius: "20px",
            borderColor: bgcolor ? "" : "1.5px solid #FFFFFF1A",
            background: bgcolor ? "#14142D" : "#E6E7FF",
            "& .MuiInputBase-input": {
              color: bgcolor ? "#CBCBCB" : "#000000",
            },
          }}
        />
      </Grid>
      <Grid item xl={12} xs={12} lg={11.5}>
        <Box>
          <CustomInput
            id="email"
            disabled
            propsToInputElement={{ maxLength: 100 }}
            label="Email"
            placeHolder="Enter your email!"
            type="text"
            name="email"
            value={store.getState().auth.userEmail}
            error={
              isTruthy(store.getState().auth.userEmail) &&
              !strings.regex.test(store.getState().auth.userEmail)
            }
            customInputClasses={{
              borderRadius: "20px",
              borderColor: bgcolor ? "" : "1.5px solid #FFFFFF1A",
              background: bgcolor ? "#14142D" : "#E6E7FF",
              "& .MuiInputBase-input": {
                color: bgcolor ? "#CBCBCB" : "#000000",
              },
            }}
          />
        </Box>
      </Grid>
      <Grid item xl={12} xs={12} lg={11.5}>
        <Grid item xs={12} sm={12} md={12} xl={12} lg={12}>
          <Stack display={"flex"} direction={"row"}>
            <Typography
              sx={{
                fontFamily: "Verdana !important",
                color: bgcolor ? "#CBCBCB" : "#000000",
                display: "inline-flex",
              }}
            >
              Card Number
            </Typography>
            <Typography
              sx={{
                color: "red",
                marginLeft: "5px",
                verticalAlign: "middle",
                fontSize: "inherit",
              }}
            >
              *
            </Typography>
          </Stack>
          <Box
            sx={{
              marginTop: "10px",
              borderColor: bgcolor ? "" : "1.5px solid #FFFFFF1A",
              borderRadius: "20px",
              padding: "12px",

              backgroundColor: bgcolor ? "#14142D" : "#E6E7FF",
            }}
          >
            {bgcolor ? (
              <CardElement options={cardStyle} />
            ) : (
              <CardElement options={cardStyleLight} />
            )}
          </Box>
        </Grid>
        <Box sx={classes.buttonWrapper} mb={3} mt={3} gap={3}>
          <CustomButton
            label={"Payment"}
            onClick={(e: any) => handleSubmit(e)}
            customClasses={{ width: "110px" }}
            buttonType={"contained"}
          />
        </Box>
      </Grid>
      <CustomLoader isLoading={loading} />
    </Grid>
  );
};
export default React.memo(PaymentIntent);
