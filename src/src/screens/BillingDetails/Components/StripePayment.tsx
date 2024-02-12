import React from "react";
import { Grid, Typography, Checkbox } from "@mui/material";
import { Box, Stack } from "@mui/system";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import { useState } from "react";
import { CustomButton, CustomDialog } from "global/components";
import notifiers from "global/constants/NotificationConstants";
import { openSuccessNotification } from "helpers/methods";
import { selectBackgroundColor } from "redux/themeChangeSlice";
import { useAppSelector } from "utils/hooks";
import { addCardDetails } from "../BillingDetail.service";
import { billingDetailsStyle as classes } from "../BillingDetail.style";
import CustomLoader from "global/components/CustomLoader/CustomLoader";
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

interface stripePaymentProps {
  openModal: boolean;
  setOpenModal: Function;
  fetchCardDetailHandler: Function;
}

const StripePayment = ({
  openModal,
  setOpenModal,
  fetchCardDetailHandler,
}: stripePaymentProps) => {
  const bgcolor = useAppSelector(selectBackgroundColor);
  const [loading, setLoading] = useState<boolean>(false);
  const [defaultCardStatus, setDefaultCardStatus] = useState<boolean>(false);
  const stripe = useStripe();
  const elements = useElements();

  const dialogContent = () => {
    return (
      <>
        <Grid
          container
          spacing={0}
          xl={11}
          lg={11}
          ml={2}
          mt={5}
          sx={{ backgroundColor: bgcolor ? "#14142D" : "#ffffff" }}
        >
          <Grid item xl={12} xs={12} lg={11.5}>
            <Grid item xs={12} sm={12} md={12} xl={12} lg={12}>
              <Stack display={"flex"} direction={"row"}>
                <Typography
                  sx={{
                    fontFamily: "Verdana !important",
                    color: bgcolor ? "#ffffff" : "#000000",
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
                  border: bgcolor
                    ? "1.5px solid #C1C1C1"
                    : "1.5px solid #C1C1C1",
                  borderColor: bgcolor ? "" : "1.5px solid #FFFFFF1A",
                  borderRadius: "33px",
                  padding: "12px",

                  backgroundColor: bgcolor ? "#282945" : "#ffffff",
                }}
              >
                {bgcolor ? (
                  <CardElement options={cardStyle} />
                ) : (
                  <CardElement options={cardStyleLight} />
                )}
              </Box>

              <Grid container xs={12} mt={2}>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    width: "100%",
                    flexDirection: "row",
                  }}
                >
                  <Checkbox
                    onChange={(e: any) => {
                      setDefaultCardStatus(e.target.checked);
                    }}
                    checked={defaultCardStatus}
                    sx={{
                      "&.Mui-checked": {
                        color: bgcolor ? "#CBCBCB" : "#000000",
                      },
                      "&.MuiCheckbox-root": {
                        color: bgcolor
                          ? "#CBCBCB !important"
                          : "#000000 !important",
                      },
                    }}
                  />
                  <Typography color={bgcolor ? "#ffffff" : "#000000"}>
                    Set as Default Card
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </Grid>
          <CustomLoader isLoading={loading} />
        </Grid>
      </>
    );
  };

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
          await addCardHandler(paymentMethod?.id);
        }
      }
    } catch (error: any) {
      setLoading(false);
      getCustomError(error);
    }
  };

  const addCardHandler = async (id: any) => {
    try {
      setLoading(true);
      await addCardDetails(id, defaultCardStatus);
      openSuccessNotification("Add Card Successfully");
      handleCloseModel();
      await fetchCardDetailHandler();
      setLoading(false);
    } catch (error: any) {
      setLoading(false);
      getCustomError(error);
    }
  };

  const addEmailsDialogFooter = () => {
    return (
      <>
        <Box sx={classes.deleteDialogFooter}>
          <CustomButton
            label={"Submit"}
            onClick={(e: any) => handleSubmit(e)}
            customClasses={{ width: "110px" }}
            buttonType={"contained"}
          />
        </Box>
      </>
    );
  };
  const handleCloseModel = () => {
    setOpenModal(false);
  };
  const handleAddModal = () => {
    return (
      <CustomDialog
        isDialogOpen={openModal}
        handleDialogClose={handleCloseModel}
        dialogHeaderContent={dialogContent()}
        dialogHeaderWidth={"100%"}
        dialogBodyContent={addEmailsDialogFooter()}
        dialogHeaderContentClass={true}
        width="600px"
        closable={true}
        closeIcon
        borderRadius={"33px"}
      />
    );
  };
  return handleAddModal();
};
export default React.memo(StripePayment);
