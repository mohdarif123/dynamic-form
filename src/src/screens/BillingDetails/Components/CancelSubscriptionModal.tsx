import { Grid, Typography } from "@mui/material";
import { Box, color } from "@mui/system";
import React, { useState } from "react";
import { CustomButton, CustomDialog } from "global/components";
import CancelPlan from "../../../assets/icons/CancelPlan.svg";
import { billingDetailsStyle as classes } from "../BillingDetail.style";
import { useAppSelector } from "utils/hooks";
import { selectUserName } from "redux/authSlice";
import { selectBackgroundColor } from "redux/themeChangeSlice";
import CustomLoader from "global/components/CustomLoader/CustomLoader";
import { primaryBlackColor, pureWhiteColor } from "utils/styles";

interface cancelSubscriptionModalProps {
  setOpenModal: Function;
  openModal: boolean;
  handleConfirm: () => void;
}
const CancelSubscriptionModal = ({
  openModal,
  setOpenModal,
  handleConfirm,
}: cancelSubscriptionModalProps) => {
  const bgcolor = useAppSelector(selectBackgroundColor);
  const userName = useAppSelector(selectUserName);
  const [loading, setLoading] = useState<boolean>(false);

  const handleCloseModel = () => {
    setOpenModal(false);
  };

  const dialogHeaderContent = () => {
    return (
      <>
        <Box>
          <Box display={"flex"} justifyContent={"center"}>
            <img src={CancelPlan} alt="delete Image" />
          </Box>

          <Box marginTop={3} textAlign={"center"}>
            <Typography
              sx={{
                color: !bgcolor ? primaryBlackColor : pureWhiteColor,
                fontWeight: 600,
              }}
              variant="h2"
            >
              Cancel Plan
            </Typography>
          </Box>
        </Box>
      </>
    );
  };

  const dialogContent = () => (
    <>
      <Grid
        container
        spacing={2}
        xl={11}
        lg={11}
        px={2.5}
        mt={2}
        sx={{ backgroundColor: bgcolor ? "#14142D" : "#ffffff" }}
      >
        <Box>
          <Typography
            sx={{
              fontSize: "20px",
              color: bgcolor ? "#CBCBCB" : "#000000",
              fontWeight: 700,
            }}
          >
            Hey {userName}!
          </Typography>
          <br />
          <Typography
            sx={{
              color: bgcolor ? "#CBCBCB" : "#000000",
              fontSize: "16px",
              lineHeight: "26px",
              fontWeight: 400,
              fontFamily: "Source Sans 3",
            }}
          >
            We are happy to have you on our platform.
            <br />
            Are you sure you want to opt for cancellation?
          </Typography>
          <br />
          <Typography
            color={bgcolor ? "#CBCBCB" : "#000000"}
            fontSize={"16px"}
            sx={{ fontWeight: 550 }}
          >
            <span
              style={{
                color: "rgb(122, 129, 253)",
                fontSize: "18px",
                fontWeight: 700,
                marginRight: "10px",
              }}
            >
              Note:
            </span>{" "}
            On cancellation your plan will cancelled but you can use the
            application for remaining days of your plan.
          </Typography>
        </Box>
        <CustomLoader isLoading={loading} />
      </Grid>
    </>
  );

  const dialogFooter = () => {
    return (
      <>
        <Box
          width={"100%"}
          display={"flex"}
          sx={{ backgroundColor: bgcolor ? "#14142D" : "#ffffff" }}
          justifyContent={"center"}
        >
          <Box sx={classes.buttonWrapper} mb={2} mt={3} gap={3}>
            <Box sx={classes.deleteDialogFooter}>
              <CustomButton
                label="No"
                onClick={handleCloseModel}
                buttonType={"outlined"}
              />
              <CustomButton
                label="Yes"
                onClick={handleConfirm}
                buttonType={"contained"}
              />
            </Box>
          </Box>
        </Box>
      </>
    );
  };

  return (
    <>
      <CustomDialog
        dialogTitleContent={dialogHeaderContent()}
        isDialogOpen={openModal}
        handleDialogClose={handleCloseModel}
        dialogBodyContent={dialogContent()}
        dialogFooterClass={[{ ...classes.deleteDialogFooter }]}
        dialogFooterContent={dialogFooter()}
        width="600px"
        closable={true}
        closeIcon={true}
        closeButtonVisibility
        borderRadius="33px"
        addCompetitiveColor={bgcolor ? "#14142D" : "#ffffff"}
        titleContentBgColor={true}
      />
    </>
  );
};

export default React.memo(CancelSubscriptionModal);
