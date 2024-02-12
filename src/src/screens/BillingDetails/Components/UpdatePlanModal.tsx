import React, { useState } from "react";
import { CustomButton, CustomDialog } from "global/components";
import { Box, Grid, Typography } from "@mui/material";
import CustomLoader from "global/components/CustomLoader/CustomLoader";
import { billingDetailsStyle as classes } from "../BillingDetail.style";
import { useAppSelector } from "utils/hooks";
import { selectBackgroundColor } from "redux/themeChangeSlice";
import { selectUserName } from "redux/authSlice";
import UpdatePlan from "../../../assets/icons/updateplan.svg";
import moment from "moment";
import { primaryBlackColor, pureWhiteColor } from "utils/styles";

interface updatePlanModalProps {
  setOpenModal: Function;
  openModal: boolean;
  handleConfirm: Function;
  planDetail: any;
  setPlanModal: Function;
}

const UpdatePlanModal = ({
  setOpenModal,
  openModal,
  handleConfirm,
  planDetail,
  setPlanModal,
}: updatePlanModalProps) => {
  const bgcolor = useAppSelector(selectBackgroundColor);
  const [loading, setLoading] = useState<boolean>(false);
  const userName = useAppSelector(selectUserName);
  const handleCloseModel = () => {
    setOpenModal(false);
  };

  const getPlanDetail = () => {
    return planDetail.appPlanLimitList
      ?.filter((item: any) => item.entity !== "entity")
      ?.map((item: any) => {
        const subtractionResult = item.limit - (item.current ?? 0);
        return (
          <>
            <span
              style={{
                textTransform: "capitalize",
                margin: "10px",
                fontSize: "16px",
                fontWeight: 550,
              }}
            >
              {item.entity} {subtractionResult} | Current RFP {item.current}
            </span>
          </>
        );
      });
  };

  const dialogContent = () => {
    const todayDate = moment();
    const targetDate = moment(planDetail.validTill);
    const daysDifference = targetDate.diff(todayDate, "days");
    return (
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
              You can update your plan as per your requirement.
              <br />
              However, we would like to inform you that upon upgrading your
              current plan as show below will be deactivate with immediate
              effect and your new plan will be activate.
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
                Remaining:
              </span>{" "}
              Days {daysDifference} | {getPlanDetail()}
            </Typography>
          </Box>
          <CustomLoader isLoading={loading} />
        </Grid>
      </>
    );
  };

  const handleClose = () => {
    setOpenModal(false);
  };

  const addEmailsDialogFooter = () => {
    return (
      <>
        <Box
          width={"100%"}
          display={"flex"}
          sx={{ backgroundColor: bgcolor ? "#14142D" : "#ffffff" }}
          justifyContent={"center"}
        >
          <Box sx={classes.buttonWrapper} mb={2} mt={2} gap={3}>
            <Box sx={classes.deleteDialogFooter} mt={2}>
              <CustomButton
                label="No"
                onClick={handleClose}
                buttonType={"outlined"}
              />
              <CustomButton
                label="Yes"
                onClick={() => {
                  setPlanModal(true);
                  handleClose();
                }}
                buttonType={"contained"}
              />
            </Box>
          </Box>
        </Box>
      </>
    );
  };

  const dialogHeaderContent = () => {
    return (
      <>
        <Box>
          <Box display={"flex"} justifyContent={"center"}>
            <img src={UpdatePlan} alt="delete Image" />
          </Box>

          <Box marginTop={3} textAlign={"center"}>
            <Typography
              sx={{
                color: !bgcolor ? primaryBlackColor : pureWhiteColor,
                fontWeight: 600,
              }}
              variant="h2"
            >
              Update Plan
            </Typography>
          </Box>
        </Box>
      </>
    );
  };

  const handleUpdatePlanModal = () => {
    return (
      <>
        <CustomDialog
          dialogTitleContent={dialogHeaderContent()}
          isDialogOpen={openModal}
          handleDialogClose={handleCloseModel}
          dialogBodyContent={dialogContent()}
          dialogFooterClass={[{ ...classes.deleteDialogFooter }]}
          dialogFooterContent={addEmailsDialogFooter()}
          width="600px"
          closable={true}
          closeIcon={true}
          closeButtonVisibility
          borderRadius="33px"
          titleContentBgColor={true}
          addCompetitiveColor={bgcolor ? "#14142D" : "#ffffff"}
        />
      </>
    );
  };

  return handleUpdatePlanModal();
};
export default React.memo(UpdatePlanModal);
