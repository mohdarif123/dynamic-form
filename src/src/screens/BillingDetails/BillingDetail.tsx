import React from "react";
import { useEffect, useState } from "react";
import { billingDetailsStyle as classes } from "./BillingDetail.style";
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
import { customScrollCssInner } from "utils/styles";
import { useAppSelector } from "utils/hooks";
import { selectBackgroundColor } from "redux/themeChangeSlice";
import { CustomButton, CustomIcon, CustomTable } from "global/components";
import viewIcon from "assets/icons/viewdoc.svg";
import urls from "global/constants/UrlConstants";
import { isTruthy, openSuccessNotification } from "helpers/methods";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import notifiers from "global/constants/NotificationConstants";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  cancelSubscription,
  checkActivePlan,
  deleteCard,
  featurePlan,
  getAccountPlanDetail,
  getCard,
  invoice,
  invoiceCount,
  setDefaultCard,
  updatePlan,
} from "./BillingDetail.service";
import PrimaryIcon from "../../assets/icons/PrimaryIcon.svg";
import StripePayment from "./Components/StripePayment";
import DeleteModal from "./Components/DeleteModal";
import CustomLoader from "global/components/CustomLoader/CustomLoader";
import { store } from "utils/store";
import UpdatePlanModal from "./Components/UpdatePlanModal";
import NoDataImage from "assets/images/NoDataImage.svg";
import NoDataLight from "assets/images/NoDataLight.svg";
import PaymentIntent from "./Components/PaymentIntent";
import CancelSubscriptionModal from "./Components/CancelSubscriptionModal";
import PlansModal from "./Components/PlansModal";
import { billingHeader } from "./Components/BillingHistoryTableHeader";
import {
  primaryBlackColor,
  primaryColorBlack,
  pureWhiteColor,
} from "utils/styles";
import StringConstants from "global/constants/StringConstants";
import { getCustomError } from "utils/customError";

const BillingDetails = () => {
  const bgcolor = useAppSelector(selectBackgroundColor);
  const [invoicesData, setInvoicesData] = useState<[]>([]);
  const [tableCount, setTableCount] = useState<number>(0);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const [openModal, setOpenModal] = useState(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [accountPlan, setAccountPlan] = useState<any>({});
  const [cardData, setCardData] = useState([]);
  const stripePromise = loadStripe(urls.STRIPE_PUBLIC_KEY);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [cardId, setCardId] = useState<string>("");
  const [cardBody, setCardBody] = useState<number>(0);
  const [featurePlanDetail, setFeaturePlan] = useState<any>({});
  const accountName = store.getState().auth.userAccount;
  const [updatePlanModal, setUpdatePlanModal] = useState(false);
  const [isSubscriptionCancel, setIsSubscriptionCancel] =
    useState<boolean>(false);
  const [planModal, setPlanModal] = useState<boolean>(false);
  const [cancelSubscriptionModalBox, setCancelSubscriptionModalBox] =
    useState<boolean>(false);
  const [buttonsHide, setButtonsHide] = useState<boolean>(true);

  useEffect(() => {
    billingUsageApiHandler();
    setButtonsHide(true);
  }, []);

  useEffect(() => {
    getInvoices();
  }, [page]);

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const getWebsiteInfo = (data: string) => {
    return data.includes("http")
      ? window.open(data, "_blank")
      : window.open(`http://${data}`, "_blank");
  };

  const convertDataToTableFormat = (invoiceData: any) => {
    return invoiceData.map((items: any) => {
      return {
        invoiceNumber: items.invoiceNumber,
        planName: items.planName,
        startDate: items.startDate,
        endDate: items.endDate,
        paymentStatus:
          items.paymentStatus === StringConstants.PAID ? (
            <Typography variant="h5" sx={classes.statusTextStyle}>
              {items.paymentStatus}
            </Typography>
          ) : (
            <Typography variant="h5" sx={classes.statusTextStyle}>
              {items.paymentStatus}
            </Typography>
          ),
        action: (
          <>
            <Box sx={classes.icon}>
              <CustomIcon
                icon={
                  <img
                    src={viewIcon}
                    alt="viewIcon"
                    style={{ marginRight: "5px", cursor: "pointer" }}
                  />
                }
                onClick={() => getWebsiteInfo(items.invoiceUrl)}
              />
            </Box>
          </>
        ),
      };
    });
  };

  const billingUsageApiHandler = async () => {
    try {
      setLoading(true);
      const [accountDetail, featureResponse, cardResponse, res] =
        await Promise.all([
          getAccountPlanDetail(),
          featurePlan(accountName),
          getCard(),
          checkActivePlan(),
        ]);
      setAccountPlan(accountDetail);
      setFeaturePlan(featureResponse);
      if (isTruthy(cardResponse)) {
        setCardData(cardResponse);
        setCardBody(1);
      }
      setIsSubscriptionCancel(res);
      setLoading(false);
    } catch (error: any) {
      setLoading(false);
      getCustomError(error);
    }
  };

  const getInvoices = async () => {
    try {
      setLoading(true);
      const invoiceResponse = await invoice(page, pageSize);
      const count = await invoiceCount();
      const formatedData = convertDataToTableFormat(invoiceResponse);
      setTableCount(count);
      setInvoicesData(formatedData);
      setLoading(false);
    } catch (error: any) {
      setLoading(false);
      getCustomError(error);
    }
  };

  const handleOpen = () => {
    setOpenModal(true);
  };

  const billingCardBody = () => {
    switch (cardBody) {
      case 1:
        return (
          <Stack
            direction={"column"}
            sx={{
              minHeight: "370px",
              maxHeight: "370px",
              overflowY: "auto",
              ...customScrollCssInner,
            }}
          >
            {cardData.map((item: any, index: number) => {
              return (
                <>
                  <Stack direction={"row"}>
                    <Box
                      key={index}
                      sx={{
                        ...classes.billingCardBodyWrapper,
                        background: bgcolor ? "#373854" : "#ffffff",
                        border: !bgcolor ? "1px solid #C1C1C1" : "none",
                      }}
                    >
                      <Box
                        display={"flex"}
                        minHeight={"35px"}
                        m={{ sm: 1, xs: 1, xl: 0, lg: 0, md: 0 }}
                      >
                        <Typography
                          sx={{ color: bgcolor ? "#CBCBCB" : "#000000" }}
                          marginTop={0.8}
                        >
                          XXXX-XXXX-XXXX-
                        </Typography>
                        <Typography
                          marginTop={0.8}
                          sx={{ color: bgcolor ? "#CBCBCB" : "#000000" }}
                        >
                          {item.number}
                        </Typography>
                        {item.default && (
                          <Typography sx={classes.cardNumber} marginTop={0.8}>
                            (Primary)
                          </Typography>
                        )}
                      </Box>
                      <Box
                        display={{
                          xl: "flex",
                          lg: "flex",
                          md: "flex",
                          sm: "block",
                          xs: "block",
                        }}
                        mb={{ sm: 1, xs: 1, xl: 0, lg: 0, md: 0 }}
                      >
                        {!item.default && (
                          <>
                            <Box
                              mr={2}
                              mt={{ xl: 0, lg: 0, md: 0, sm: 1, xs: 1 }}
                            >
                              <CustomButton
                                label="Set Primary"
                                onClick={() => {
                                  setDefaultCardHandler(item.id);
                                  setCardId(item.id);
                                }}
                                customClasses={classes.cardBtn}
                                icon={<img src={PrimaryIcon} alt="" />}
                                buttonType={"outlined"}
                              />
                            </Box>
                            <Box mt={{ xl: 0, lg: 0, md: 0, sm: 1, xs: 1 }}>
                              <CustomButton
                                label="Delete"
                                onClick={() => {
                                  handleDeleteModal();
                                  setCardId(item.id);
                                }}
                                icon={<DeleteIcon htmlColor="#7A81FD" />}
                                customClasses={classes.cardBtn}
                                buttonType={"outlined"}
                              />
                            </Box>
                          </>
                        )}
                      </Box>
                    </Box>
                  </Stack>
                </>
              );
            })}
          </Stack>
        );
      case 2:
        return (
          <Stack direction={"column"} sx={classes.billingCardBody}>
            <PaymentIntent
              fetchCardDetailHandler={billingUsageApiHandler}
              planInfo={featurePlanDetail}
              setButtonHide={setButtonsHide}
            ></PaymentIntent>
          </Stack>
        );
      default:
      case 0:
        return (
          !loading && (
            <Box textAlign="center" sx={classes.billingCardBody}>
              <Box
                component="img"
                src={!bgcolor ? NoDataLight : NoDataImage}
                overflow="auto"
                height={"200px"}
                width="100%"
              />
              <Typography
                mt={1}
                variant="h4"
                style={{
                  color: !bgcolor ? primaryColorBlack : pureWhiteColor,
                }}
              >
                No Payment Details We guess this is your first time! Select a
                Plan now
              </Typography>
            </Box>
          )
        );
    }
  };

  const cardHeaders = () => {
    return (
      <>
        <Stack direction="row" justifyContent={"space-between"} spacing={2}>
          <Stack>
            <Typography
              variant="h2"
              sx={{
                color: !bgcolor ? primaryBlackColor : pureWhiteColor,
                width: "100%",
              }}
              mt={3}
              mb={3}
            >
              Card Details
            </Typography>
          </Stack>
          <Stack>
            <Box mb={2} sx={{ ...customScrollCssInner }}>
              {cardData?.length > 0 && (
                <CustomButton
                  label={"Add Card"}
                  onClick={handleOpen}
                  customClasses={classes.addCardBtn}
                />
              )}
            </Box>
          </Stack>
        </Stack>
        {billingCardBody()}
      </>
    );
  };

  const billingHeaders = () => {
    return (
      <Typography
        variant="h1"
        style={{
          color: !bgcolor ? primaryBlackColor : pureWhiteColor,
          marginLeft: "22px",
        }}
        mb={2}
        mt={2}
      >
        Billing History
      </Typography>
    );
  };

  const handleDeleteModal = () => {
    setOpenDeleteModal(true);
  };

  const deleteModal = () => {
    return (
      <>
        <DeleteModal
          openDeleteModal={openDeleteModal}
          setOpenDeleteModal={setOpenDeleteModal}
          handleDeleteSubmit={deleteCardHandler}
        />
      </>
    );
  };

  const deleteCardHandler = async () => {
    try {
      setLoading(true);
      await deleteCard(cardId);
      openSuccessNotification("Card has been deleted successfully");
      setOpenDeleteModal(false);
      await billingUsageApiHandler();
      setLoading(false);
    } catch (error: any) {
      setOpenDeleteModal(false);
      setLoading(false);
      getCustomError(error);
    }
  };

  const handleUpdateCloseModel = () => {
    setUpdatePlanModal(false);
  };

  const updatePlanDialog = () => {
    return (
      <UpdatePlanModal
        setOpenModal={setUpdatePlanModal}
        openModal={updatePlanModal}
        handleConfirm={handleUpdateCloseModel}
        planDetail={accountPlan}
        setPlanModal={setPlanModal}
      />
    );
  };

  const getTable = () => {
    return (
      <Box sx={classes.tasksTableStyle}>
        <CustomTable
          headers={billingHeader}
          rows={invoicesData}
          checkboxSelection={false}
          paginationCount={tableCount}
          isRowPerPageEnable={true}
          pageNumber={page}
          handlePageChange={handleChangePage}
          isLoading={loading}
          tableHeaderTextStart
          setPage={setPage}
          headerData={billingHeaders()}
          setPageSize={setPageSize}
          rowsPerPage={pageSize}
          pageSize={pageSize}
          noDataImageHeightHide={true}
        />
      </Box>
    );
  };

  const planHandler = (planInfo: any) => {
    if (cardData.length > 0) {
      updatePlanHandler(planInfo);
    } else {
      setCardBody(2);
      setFeaturePlan(planInfo);
    }
  };

  const updatePlanHandler = async (planInfo: any) => {
    try {
      setLoading(true);
      await updatePlan(planInfo.id);
      openSuccessNotification(
        "Plas has been updated successfully. Pleae refresh page to get updated plan details"
      );
      setButtonsHide(false);
      await billingUsageApiHandler();
      setLoading(false);
    } catch (error: any) {
      setLoading(false);
      getCustomError(error);
    }
  };

  const cancelSubscriptionHandler = async () => {
    try {
      setLoading(true);
      await cancelSubscription();
      const [active, _] = await Promise.all([
        checkActivePlan(),
        billingUsageApiHandler(),
      ]);
      openSuccessNotification(
        "Subscription has been cancelled successfully. Pleae refresh page to get updated Subscription details"
      );
      setButtonsHide(false);
      setIsSubscriptionCancel(active);
      setCancelSubscriptionModalBox(false);
      setLoading(false);
    } catch (error: any) {
      setLoading(false);
      getCustomError(error);
    }
  };

  const cancelSubscriptionModel = () => {
    return (
      <CancelSubscriptionModal
        openModal={cancelSubscriptionModalBox}
        setOpenModal={setCancelSubscriptionModalBox}
        handleConfirm={cancelSubscriptionHandler}
      />
    );
  };

  const planDetailsModal = () => {
    return (
      <PlansModal
        openModal={planModal}
        setOpenModal={setPlanModal}
        handleConfirmPlan={planHandler}
      />
    );
  };

  const setDefaultCardHandler = async (cardId: any) => {
    try {
      setLoading(true);
      const res = await setDefaultCard(cardId);
      openSuccessNotification(res?.message);
      await billingUsageApiHandler();
      setLoading(false);
    } catch (error: any) {
      setLoading(false);
      getCustomError(error);
    }
  };

  const planBtnHandle = () => {
    return featurePlanDetail?.name === "Free" && isSubscriptionCancel ? (
      <>
        {buttonsHide && (
          <CustomButton
            label={"Change Plan"}
            onClick={(e: any) => {
              setPlanModal(true);
            }}
            customClasses={{ width: "280px" }}
            buttonType={"contained"}
          />
        )}
      </>
    ) : !(cardData.length > 0) ? (
      <></>
    ) : (
      <>
        {!isSubscriptionCancel
          ? buttonsHide && (
              <Box sx={{ textAlign: "-webkit-center" }}>
                <CustomButton
                  label={"Upgrade Plan"}
                  onClick={(e: any) => {
                    setPlanModal(true);
                  }}
                  customClasses={{ width: "280px" }}
                  buttonType={"contained"}
                />
              </Box>
            )
          : buttonsHide && (
              <Box display={"flex"} justifyContent={"center"} mt={2} gap={2}>
                <CustomButton
                  label={"Cancel Plan"}
                  onClick={() => setCancelSubscriptionModalBox(true)}
                  customClasses={{ width: "200px" }}
                  buttonType={"contained"}
                />
                <CustomButton
                  label={"Upgrade Plan"}
                  onClick={() => {
                    setUpdatePlanModal(true);
                  }}
                  customClasses={{ width: "200px" }}
                  buttonType={"contained"}
                />
              </Box>
            )}
      </>
    );
  };

  const getElementStripeMethod = () => {
    return (
      <>
        <Elements stripe={stripePromise}>
          <StripePayment
            openModal={openModal}
            setOpenModal={setOpenModal}
            fetchCardDetailHandler={billingUsageApiHandler}
          />
        </Elements>
      </>
    );
  };

  const getBillingDetailsTable = () => {
    return (
      <>
        <Grid container sx={classes.billingDetailsTableWrapper}>
          <Grid item xl={11} lg={11} md={10} sm={11} xs={11} mt={2}>
            {getTable()}
            {deleteModal()}
            {updatePlanDialog()}
            {cancelSubscriptionModel()}
            {planDetailsModal()}
          </Grid>
        </Grid>
      </>
    );
  };

  const getBillingDetails = () => {
    return (
      <>
        <Grid container sx={classes.mainContainer}>
          <Grid container sx={classes.secondMainContainer}>
            <Grid item xs={11} sm={11} md={10} lg={6} xl={7}>
              <Box
                sx={[
                  {
                    ...classes.billingDetailsBox,
                    background: bgcolor ? "#282945" : pureWhiteColor,
                  },
                ]}
              >
                <Grid item xs={12} sm={12} lg={12} md={12} xl={12} ml={5}>
                  <Elements stripe={stripePromise}>{cardHeaders()}</Elements>
                </Grid>
              </Box>
            </Grid>
            <Grid item xs={11} sm={11} md={10} lg={5} xl={4}>
              {!loading && (
                <Card
                  sx={[
                    {
                      ...classes.planCard,
                      background: "none",
                      boxShadow: "0px 8px 30px 0px #00000012",
                    },
                  ]}
                >
                  {!isSubscriptionCancel && cardData?.length === 0 ? (
                    <>
                      <Box
                        textAlign="center"
                        sx={{
                          ...classes.billingCardBody,
                          background: !bgcolor ? "white" : "#282945",
                          justifyContent: "center",
                        }}
                        pt={8}
                      >
                        <Box
                          component="img"
                          src={!bgcolor ? NoDataLight : NoDataImage}
                          overflow="auto"
                          height={"200px"}
                          width="100%"
                        />
                        <Typography
                          mt={1}
                          variant="h4"
                          style={{
                            color: !bgcolor
                              ? primaryColorBlack
                              : pureWhiteColor,
                          }}
                        >
                          You don't have any active plan. Please Update your
                          plan.
                        </Typography>
                        {planBtnHandle()}
                      </Box>
                    </>
                  ) : (
                    <>
                      {featurePlanDetail?.id === urls.planId ? (
                        <>
                          <Stack
                            direction={"row"}
                            justifyContent="center"
                            alignItems="center"
                            sx={{
                              backgroundColor: bgcolor
                                ? "#FFFFFF"
                                : "rgb(122, 129, 253)",
                            }}
                          >
                            <Grid>
                              <StarRateIcon
                                sx={{
                                  color: bgcolor
                                    ? "rgb(122, 129, 253)"
                                    : pureWhiteColor,
                                }}
                              ></StarRateIcon>
                            </Grid>
                            <Grid>
                              <CardHeader
                                title={" RFP Recommends"}
                                sx={[
                                  {
                                    ...classes.cardRecommends,
                                    color: bgcolor
                                      ? "rgb(122, 129, 253)"
                                      : pureWhiteColor,
                                    background: !bgcolor
                                      ? "rgb(122, 129, 253)"
                                      : pureWhiteColor,
                                  },
                                ]}
                              ></CardHeader>
                            </Grid>
                          </Stack>
                        </>
                      ) : (
                        <CardHeader
                          title={""}
                          sx={[
                            {
                              ...classes.WihtoutcontenetCard,
                              color: bgcolor
                                ? "rgb(122, 129, 253)"
                                : pureWhiteColor,
                              background: !bgcolor
                                ? "rgb(122, 129, 253)"
                                : pureWhiteColor,
                            },
                          ]}
                        />
                      )}
                      <CardHeader
                        title={featurePlanDetail?.name}
                        sx={[
                          {
                            ...classes.cardTitle,
                            backgroundColor: !bgcolor ? "#E6E7FF" : "#373854",
                            color: !bgcolor ? "#000000" : "#FFFFFF",
                          },
                        ]}
                      />
                      <Stack
                        sx={{
                          backgroundColor: !bgcolor ? "#E6E7FF" : "#373854",
                          paddingBottom: "20px",
                        }}
                      ></Stack>
                      <CardContent
                        sx={[
                          {
                            ...classes.cardBody,
                            backgroundColor: !bgcolor ? "#FFFFFF" : "#282945",
                            color: !bgcolor ? "#000000" : "#FFFFFF",
                          },
                        ]}
                      >
                        <Box px={1}>
                          <Stack>
                            <ul>
                              {featurePlanDetail?.feature?.map(
                                (info: string) => (
                                  <li>
                                    <Stack
                                      direction="row"
                                      alignItems="center"
                                      gap={1}
                                    >
                                      <Typography
                                        sx={classes.cardFont}
                                        variant="body1"
                                      >
                                        {info}
                                      </Typography>
                                    </Stack>
                                  </li>
                                )
                              )}
                            </ul>
                          </Stack>
                          <Box mt={2}>{planBtnHandle()}</Box>
                        </Box>
                      </CardContent>
                    </>
                  )}
                </Card>
              )}
            </Grid>
          </Grid>
          {getBillingDetailsTable()}
        </Grid>
        {getElementStripeMethod()}
        <CustomLoader isLoading={loading} />
      </>
    );
  };
  return getBillingDetails();
};
export default React.memo(BillingDetails);
