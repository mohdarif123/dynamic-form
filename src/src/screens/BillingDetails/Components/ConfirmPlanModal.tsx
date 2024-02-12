import React from "react";
import { CustomButton, CustomDialogs2 } from "global/components";
import { Box, Typography, Grid } from "@mui/material";
import { selectBackgroundColor } from "redux/themeChangeSlice";
import { useAppSelector } from "utils/hooks";
import { primaryBlackColor, pureWhiteColor } from "utils/styles";
import contactUs from "../../../assets/icons/contactus.svg";
import confirmPlan from "../../../assets/icons/confirmplan.svg";
import { billingDetailsStyle as classes } from "../BillingDetail.style";
import urls from "global/constants/UrlConstants";

interface confirmPlanProps {
  setOpenConfirmModal: Function;
  openConfrimModal: boolean;
  handleConfirmSubmit?: any;
  selectedPlan?: any;
  setOpenPlanModal: Function;
}
const ConfirmPlanModal = ({
  setOpenConfirmModal,
  openConfrimModal,
  handleConfirmSubmit,
  selectedPlan,
  setOpenPlanModal,
}: confirmPlanProps) => {
  const bgcolor = useAppSelector(selectBackgroundColor);

  const handleCotactUs = () => {
    window.open("https://rfppro.app/", "_blank");
  };

  const dialogBodyContent = () => {
    if (selectedPlan.name === urls.professional) {
      return (
        <>
          <Grid container mt={2}>
            <Box sx={classes.deleteDialogFooter}>
              <CustomButton
                label="Close"
                onClick={handleConfirmClose}
                buttonType={"outlined"}
              />
              <CustomButton
                label="Contact Us"
                onClick={() => {
                  handleCotactUs();
                  setOpenConfirmModal(false);
                  setOpenPlanModal(false);
                }}
                buttonType={"contained"}
              />
            </Box>
          </Grid>
        </>
      );
    } else {
      return (
        <>
          <Grid container mt={2}>
            <Box sx={classes.deleteDialogFooter}>
              <CustomButton
                label="No"
                onClick={handleConfirmClose}
                buttonType={"outlined"}
              />
              <CustomButton
                label="Yes"
                onClick={() => {
                  handleConfirmSubmit(selectedPlan);
                  setOpenConfirmModal(false);
                  setOpenPlanModal(false);
                }}
                buttonType={"contained"}
              />
            </Box>
          </Grid>
        </>
      );
    }
  };

  const dialogHeaderContent = () => {
    if (selectedPlan.name === urls.professional) {
      return (
        <Box
          display={"flex"}
          justifyContent={"center"}
          alignContent={"center"}
          style={{ flexDirection: "column" }}
        >
          <img
            src={contactUs}
            alt="deleteImage"
            height={"180px"}
            width={"320px"}
          />
          <Typography
            sx={{ color: !bgcolor ? "#000000" : "white" }}
            variant="h2"
            mt={3}
          >
            Contact Us
          </Typography>
          <Typography
            sx={classes.fontText}
            variant="h5"
            mt={1}
            style={{ color: !bgcolor ? primaryBlackColor : pureWhiteColor }}
          >
            Please contact us at support@rfppro.app
          </Typography>
        </Box>
      );
    } else {
      return (
        <Box
          display={"flex"}
          justifyContent={"center"}
          alignContent={"center"}
          style={{ flexDirection: "column" }}
        >
          <img
            src={confirmPlan}
            alt="deleteImage"
            height={"180px"}
            width={"320px"}
          />
          <Typography
            sx={{ color: !bgcolor ? "#000000" : "white" }}
            variant="h2"
            mt={3}
          >
            Confirm Plan
          </Typography>
          <Typography
            sx={classes.fontText}
            variant="h5"
            mt={1}
            style={{ color: !bgcolor ? primaryBlackColor : pureWhiteColor }}
          >
            Are you sure you want to proceed with {selectedPlan?.name} plan?
          </Typography>
        </Box>
      );
    }
  };
  const handleConfirmClose = () => {
    setOpenConfirmModal(false);
  };
  return (
    <>
      <CustomDialogs2
        isDialogOpen={openConfrimModal}
        closable
        handleDialogClose={handleConfirmClose}
        dialogHeaderContentClass={true}
        dialogHeaderContent={dialogHeaderContent()}
        closeButtonVisibility
        width={"500px"}
        borderRadius="20px"
        dialogBodyContent={dialogBodyContent()}
      />
    </>
  );
};

export default React.memo(ConfirmPlanModal);
