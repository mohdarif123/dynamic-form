import React from "react";
import { useEffect, useState } from "react";
import { CustomDialog } from "global/components";
import { selectBackgroundColor } from "redux/themeChangeSlice";
import { useAppSelector } from "utils/hooks";
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import StarRateIcon from "@mui/icons-material/StarRate";
import { getPlans } from "../BillingDetail.service";
import { planStyle as classes } from "../../Plan/plan.styles";
import ConfirmPlanModal from "./ConfirmPlanModal";
import notifiers from "global/constants/NotificationConstants";
import urls from "global/constants/UrlConstants";
import { primaryBlackColor, pureWhiteColor } from "utils/styles";
import { getCustomError } from "utils/customError";

interface planModalProps {
  setOpenModal: Function;
  openModal: boolean;
  handleConfirmPlan: (planInfo: any) => void;
}
const PlansModal = ({
  setOpenModal,
  openModal,
  handleConfirmPlan,
}: planModalProps) => {
  const bgcolor = useAppSelector(selectBackgroundColor);
  const [planData, setPlanData] = useState<any>([]);
  const [openConfirmModal, setOpenConfirmModal] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<any>({});

  useEffect(() => {
    viewAllPlans();
  }, []);

  const viewAllPlans = async () => {
    try {
      const res = await getPlans();
      setPlanData(res);
    } catch (error: any) {
      getCustomError(error);
    }
  };

  const dialogHeaderContent = () => {
    return (
      <>
        <Box>
          <Box marginTop={3} textAlign={"center"}>
            <Typography
              sx={{
                color: bgcolor ? "#CBCBCB" : "#000000",
              }}
              variant="h1"
            >
              Plans Details
            </Typography>
          </Box>
        </Box>
      </>
    );
  };

  const handleCloseModel = () => {
    setOpenModal(false);
  };

  const handleConfirmModal = async () => {
    setOpenConfirmModal(true);
  };

  const confirmModal = () => {
    return (
      <>
        <ConfirmPlanModal
          openConfrimModal={openConfirmModal}
          setOpenConfirmModal={setOpenConfirmModal}
          handleConfirmSubmit={handleConfirmPlan}
          selectedPlan={selectedPlan}
          setOpenPlanModal={setOpenModal}
        />
      </>
    );
  };

  const dialogContent = () => (
    <>
      <Grid container direction={"row"} justifyContent={"center"}>
        <Grid item xs={11.5} sm={11.5} md={11.4} lg={11} xl={11}>
          <Typography
            variant="h1"
            sx={{ color: bgcolor ? "#CBCBCB" : primaryBlackColor }}
          >
            Pricing
          </Typography>
          <Typography
            variant="h3"
            sx={{ color: bgcolor ? "#CBCBCB" : primaryBlackColor }}
            mb={3}
            mt={2}
          >
            Provide company background, project scope, requirements, timelines,
            budget, evaluation criteria, and contact information in the RFP
            plan.
          </Typography>
        </Grid>
      </Grid>
      <Grid container spacing={3} direction={"row"} justifyContent={"center"}>
        {planData.map((planInfo: any) => (
          <>
            {planInfo.name !== "Free" ? (
              <Grid item xs={11.5} sm={11.5} md={3.8} lg={3.7} xl={3.7} mb={3}>
                <Card
                  sx={{
                    borderRadius: "10px",
                    height: "100%",
                    border: planInfo.id
                      ? "4px solid rgb(122, 129, 253);"
                      : "1px solid #DDDDDD",
                    boxShadow: "2px 7px 19px rgba(0, 0, 0, 0.1)",
                  }}
                >
                  <Box
                    sx={{
                      cursor: "pointer",
                      height: "100%",
                    }}
                    onClick={() => {
                      setSelectedPlan(planInfo);
                      handleConfirmModal();
                    }}
                  >
                    {planInfo?.id === urls.planId ? (
                      <>
                        <Stack
                          direction={"row"}
                          justifyContent="center"
                          alignItems="center"
                        >
                          <Grid>
                            <StarRateIcon color="primary"></StarRateIcon>
                          </Grid>
                          <Grid>
                            <CardHeader
                              title={" RFP Recommends"}
                              sx={classes.cardRecommends}
                            ></CardHeader>
                          </Grid>
                        </Stack>
                      </>
                    ) : (
                      <CardHeader
                        title={planInfo?.recommends}
                        sx={
                          bgcolor
                            ? classes.WihtoutcontenetCard
                            : classes.WihtoutcontenetCard1
                        }
                      />
                    )}
                    <CardHeader
                      title={planInfo?.name}
                      sx={bgcolor ? classes.cardTitle : classes.cardTitle1}
                    />
                    <CardHeader
                      title={
                        planInfo?.price > 0
                          ? `Price: $${planInfo?.price}`
                          : "Contact Us"
                      }
                      sx={bgcolor ? classes.cardPrice : classes.cardPrice1}
                    />

                    <CardContent
                      sx={bgcolor ? classes.cardBody : classes.cardBody1}
                    >
                      <Box px={1}>
                        <Stack>
                          <ul>
                            {planInfo?.feature?.map((info: string) => (
                              <li>
                                <Stack
                                  direction="row"
                                  alignItems="center"
                                  gap={1}
                                >
                                  <Typography variant="body1">
                                    {info}
                                  </Typography>
                                </Stack>
                              </li>
                            ))}
                          </ul>
                        </Stack>
                      </Box>
                    </CardContent>
                  </Box>
                </Card>
              </Grid>
            ) : null}
          </>
        ))}
      </Grid>
      {confirmModal()}
    </>
  );

  return (
    <>
      <CustomDialog
        dialogTitleContent={dialogHeaderContent()}
        isDialogOpen={openModal}
        handleDialogClose={handleCloseModel}
        dialogBodyContent={dialogContent()}
        dialogFooterClass={[{ ...classes.dialogFooterClass }]}
        width="1200px"
        closable={true}
        closeIcon={true}
        closeButtonVisibility
        titleContentBgColor={true}
        borderRadius="33px"
        addCompetitiveColor={bgcolor ? "#14142D" : "#ffffff"}
      />
    </>
  );
};
export default React.memo(PlansModal);
