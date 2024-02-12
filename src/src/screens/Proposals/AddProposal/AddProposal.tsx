import {
  Box,
  Divider,
  Grid,
  Stack,
  Step,
  StepLabel,
  Stepper,
  Typography,
  useMediaQuery,
} from "@mui/material";
import React, { memo, useEffect, useState } from "react";
import ProposalStyles from "../Proppsals.style";
import CustomLoader from "global/components/CustomLoader/CustomLoader";
import RfpinformartionScreen from "./RfpinformartionScreen";
import AgencyInformartionScreen from "./AgencyInformartionScreen";
import ContactInfromationScreen from "./ContactInfromationScreen";
import ContactInfromationScreen2 from "./ContactInfromationScreen2";
import {
  getAddProposalContract,
  getAddProposalCountries,
  getAddProposalDomain,
  getAddProposalRegion,
  getAddProposalSource,
  getAddProposalSubmission,
  getAddProposalType,
  getAddProposalUserPage,
  getAddSubdomain,
  getState,
  addProposals,
  viewProposal,
  updateProposalService,
  fetchResponseProposal,
} from "./AddProposal.service";
import {
  stepOneFormDataInitialState,
  validateForStepOne,
  agencyValidation,
  contractValidation,
} from "../ProposalValidationType";
import { useAppSelector } from "utils/hooks";
import { selectEmail } from "redux/authSlice";
import moment from "moment";
import { ProposalRequest } from "./AddProposal.model";
import {
  isPhoneValid,
  isTruthy,
  openSuccessNotification,
} from "helpers/methods";
import notifiers from "global/constants/NotificationConstants";
import {
  addResponse,
  getProposalAction,
  getProposalStatus,
} from "../Proposals.service";
import history from "utils/history";
import { useTitle } from "utils/UseTitle";
import strings from "global/constants/StringConstants";
import { CustomDialog } from "global/components";
import { appColor, centerItemFlex, theme } from "utils/styles";
import { selectBackgroundColor } from "redux/themeChangeSlice";
import urls from "global/constants/UrlConstants";
import { getCustomError } from "utils/customError";

interface CustomProps {
  proposalId?: any;
  setAddProposalModal?: any;
  addProposalModal?: any;
  fetchViewProposal?: any;
  rfpCloneTableRowData?: any;
  setRfpCloneTableRowData?: any;
}

const AddProposal = (props: CustomProps) => {
  useTitle(strings.PROPOSALS);
  const classes = ProposalStyles;
  const [activeStep, setActiveStep] = useState(0);
  const [isVisitedContactField, setVisitedContactFelid] =
    useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [addProposalValue, setAddProposalValue] = useState<any>(
    stepOneFormDataInitialState
  );
  const [typeValue, setTypeValue] = useState([]);
  const [sourceValue, setSourceValue] = useState([]);
  const [user, setUser] = useState([]);
  const isDesktop = useMediaQuery(theme.breakpoints.up("lg"));
  const [regionType, setRegionType] = useState<any>([]);
  const [submissionType, setSubmissionType] = useState<any>([]);
  const [contratType, setContractType] = useState<any>([]);
  const [domianType, setDomainType] = useState<any>([]);
  const [subDomianType, setSubDomainType] = useState<any>([]);
  const [country, setCountry] = useState([]);
  const [state, setState] = useState([]);
  const [city, setCity] = useState([]);
  const [completed, setCompleted] = useState<{
    [k: number]: boolean;
  }>({});
  const proposalId = props.proposalId;
  const [editState, setEditState] = useState(false);
  const [joiData, setJoiData] = useState<any>([]);
  const proposalPayload = new ProposalRequest();
  const [contactDetail, setContactDetail] = useState([]);
  const [actionData, setActionData] = useState([]);
  const [statusData, setStatusData] = useState([]);
  const bgcolor = useAppSelector(selectBackgroundColor);
  const stepsData = [
    {
      id: 0,
      StepLabel: "RFP Information",
    },

    {
      id: 1,
      StepLabel: "Agency Information",
    },

    {
      id: 2,
      StepLabel: "Contract Information",
    },

    {
      id: 3,
      StepLabel: "Contact Information",
    },
  ];

  const updateData = {
    ...addProposalValue,
    contractType: {
      value: props?.rfpCloneTableRowData?.contractType,
      error: "",
    },
    submissionType: {
      value: props?.rfpCloneTableRowData?.submissionType,
      error: "",
    },
    contractDetailsUrl: {
      value: "", //empty
      error: "",
    },
    dueDate: {
      value: "", //empty
      error: "",
    },
    issueDate: {
      value: "",
      error: "",
    },
    contractPrice: {
      value: "", //empty
      error: "",
    },
    agencyName: {
      value: "", // empty
      error: "",
    },
    agencyEmail: {
      value: "", // empty
      error: "",
    },
    agencyWebsite: {
      value: "", // empty
      error: "",
    },
    agencyContactNo: {
      value: "", // empty
      error: "",
    },
    line1: {
      value: "", // empty
      error: "",
    },
    line2: {
      value: "", // empty
      error: "",
    },
    line3: {
      value: "", // empty
      error: "",
    },
    country: {
      value: props?.rfpCloneTableRowData?.agency?.address?.country, // empty
      error: "",
    },
    state: {
      value: props?.rfpCloneTableRowData?.agency?.address?.state, // empty
      error: "",
    },
    city: {
      value: props?.rfpCloneTableRowData?.agency?.address?.city, // empty
      error: "",
    },
    postalCode: {
      value: props?.rfpCloneTableRowData?.agency?.address?.pinCode, // empty
      error: "",
    },
    requestId: {
      value: "",
      error: "",
    },
    type: {
      value: props?.rfpCloneTableRowData?.type,
      error: "",
    },
    owner: {
      value: props?.rfpCloneTableRowData?.ownerName,
      error: "",
    },
    ownerEmail: {
      value: props?.rfpCloneTableRowData?.ownerEmail,
      error: "",
    },
    region: {
      value: props?.rfpCloneTableRowData?.region,
      error: "",
    },
    complexity: {
      value: props?.rfpCloneTableRowData?.complexity,
      error: "",
    },
    competitionType: {
      value: props?.rfpCloneTableRowData?.competitionType,
      error: "",
    },
    title: {
      value: "", //empty
      error: "",
    },
    domain: {
      value: props?.rfpCloneTableRowData?.domain,
      error: "",
    },
    subDomain: {
      value: props?.rfpCloneTableRowData?.subDomain,
      error: "",
    },
    source: {
      value: props?.rfpCloneTableRowData?.source,
      error: "",
    },
    status: {
      value: "Created",
      error: "",
    },
    bidDecision: {
      value: "Pending", //empty
      error: "",
    },
    text: {
      value: "",
    },
  };

  useEffect(() => {
    if (props?.rfpCloneTableRowData) {
      setAddProposalValue(updateData);
    }
  }, [props?.rfpCloneTableRowData]);

  useEffect(() => {
    if (proposalId && !!props.addProposalModal) {
      editProposal();
    }
  }, [proposalId, props.addProposalModal]);

  useEffect(() => {
    addProposalApiHandler();
  }, []);

  const editProposal = async () => {
    try {
      if (proposalId !== null) {
        setLoading(true);
        const [res] = await Promise.all([viewProposal(proposalId)]);
        setEditState(true);
        setAddProposalValue(stepOneFormDataInitialState(res));
        // eslint-disable-next-line array-callback-return
        res?.comments?.map((item: any) => {
          joiData?.push(item);
        });
        setContactDetail(res.contacts);
        setLoading(false);
      }
    } catch (error: any) {
      setLoading(false);
      getCustomError(error);
    }
  };
  const handleClose = () => {
    // setAddProposalValue(addProposalValue);
    setActiveStep(0);
    setContactDetail([]);
    props.setAddProposalModal(false);
    setAddProposalValue(stepOneFormDataInitialState());
    if (props?.rfpCloneTableRowData) {
      props.setRfpCloneTableRowData("");
    }
  };

  const totalSteps = () => {
    return stepsData.length;
  };

  const isLastStep = () => {
    return activeStep === totalSteps() - 1;
  };
  const handleBackStep = () => {
    setActiveStep(activeStep - 1);
  };
  const completedSteps = () => {
    return Object.keys(completed).length;
  };

  const allStepsCompleted = () => {
    return completedSteps() === totalSteps();
  };
  const nextStep = () => {
    if (
      handleStepOneValidation() &&
      (!addProposalValue.agencyContactNo?.error ||
        addProposalValue.agencyContactNo?.value === "")
    ) {
      const newActiveStep =
        isLastStep() && !allStepsCompleted()
          ? stepsData.findIndex((step, i) => !(i in completed))
          : activeStep + 1;
      setActiveStep(newActiveStep);
    }
  };

  const handleStepOneValidation = () => {
    switch (activeStep) {
      case 0: {
        const { isValid, errors }: any = validateForStepOne(addProposalValue);
        setAddProposalValue({ ...errors });
        return isValid;
      }
      case 1: {
        const { isValid, errors }: any = agencyValidation(addProposalValue);
        setAddProposalValue({ ...errors });
        return isValid;
      }
      case 2: {
        const { isValid, errors }: any = contractValidation(addProposalValue);
        setAddProposalValue({ ...errors });
        return isValid;
      }

      default:
        break;
    }
  };

  useEffect(() => {
    if (addProposalValue.region?.value) {
      domainApiHandler();
    }
  }, [addProposalValue.region?.value]);

  useEffect(() => {
    if (addProposalValue.domain?.value) {
      fetchSubDomain();
    }
  }, [addProposalValue.domain?.value]);

  useEffect(() => {
    if (addProposalValue.region?.value) {
      fetchState();
    }
  }, [addProposalValue.country?.value]);

  const submitProposal = async () => {
    try {
      setLoading(true);
      const res = await addProposals(proposalPayload);
      if (res.id) {
        let data = [];
        if (props.rfpCloneTableRowData) {
          data = await fetchResponseProposal(
            props.rfpCloneTableRowData.id,
            "-1",
            "All"
          );
          await handleAddResponse(res, data);
        } else {
          openSuccessNotification("RFP has been added successfully");
          history.push(`${urls.VIEW_PROPOSAL_VIEW_PATH}?id=${res.id}`);
          setLoading(false);
        }
        handleClose();
      }
    } catch (error: any) {
      setLoading(false);
      getCustomError(error);
    }
  };

  const handleAddResponse = async (res: any, contentRes: any) => {
    try {
      setLoading(true);
      const data = {
        proposalId: res.id,
        proposalTitle: res.title,
        region: res.region,
        domain: res.domain,
        subDomain: res.domain,
        order: 0,
        content: contentRes,
        audit: {
          fromZ: new Date(),
          thruZ: new Date(),
          createdBy: "",
          updatedBy: "",
        },
      };
      if (res) {
        await addResponse(data);
        handleClose();
        history.push(`${urls.VIEW_PROPOSAL_VIEW_PATH}?id=${res.id}`);
      }
      setLoading(false);
    } catch (error: any) {
      setLoading(false);
      getCustomError(error);
    }
  };

  const collectAddProposalData = async () => {
    const joiValue: any[] = [];
    joiValue.push({
      text: addProposalValue?.text?.value,
    });

    proposalPayload.requestId = addProposalValue.requestId?.value;
    proposalPayload.action = addProposalValue.bidDecision?.value;
    proposalPayload.source = addProposalValue.source?.value;
    proposalPayload.title = addProposalValue.title?.value;
    proposalPayload.agency = {
      name: addProposalValue.agencyName?.value,
      email: addProposalValue.agencyEmail?.value,
      webSite: addProposalValue.agencyWebsite?.value,
      contactNo:
        isPhoneValid(addProposalValue.agencyContactNo?.value) &&
        isVisitedContactField
          ? addProposalValue.agencyContactNo?.value
          : "",
      address: {
        line1: addProposalValue.line1?.value,
        line2: addProposalValue.line2?.value,
        line3: addProposalValue.line3?.value,
        line4: addProposalValue.line4?.value,
        city: addProposalValue.city?.value,
        country: addProposalValue.country?.value,
        pinCode: addProposalValue.postalCode?.value,
        state: addProposalValue.state?.value,
      },
    };
    proposalPayload.price = addProposalValue.contractPrice.value;
    proposalPayload.contacts = contactDetail;
    proposalPayload.contractDetailsUrl =
      addProposalValue.contractDetailsUrl?.value;
    proposalPayload.type = addProposalValue.type?.value;
    proposalPayload.domain = addProposalValue.domain?.value;
    proposalPayload.subDomain = addProposalValue.subDomain?.value;
    proposalPayload.contractType = addProposalValue.contractType?.value;
    proposalPayload.submissionType = addProposalValue.submissionType?.value;
    proposalPayload.dueDate = moment(addProposalValue.dueDate?.value).format(
      "MM/DD/YYYY"
    );
    proposalPayload.comments =
      addProposalValue?.text?.value?.length > 1 ? joiValue : [];
    proposalPayload.region = addProposalValue.region?.value;
    proposalPayload.competitionType = addProposalValue.competitionType?.value;
    proposalPayload.ownerName = addProposalValue.owner?.value;
    proposalPayload.ownerEmail = addProposalValue.ownerEmail.value;
    proposalPayload.assigneeName = addProposalValue.owner?.value;
    proposalPayload.assigneeId = addProposalValue.ownerEmail.value;
    proposalPayload.complexity = addProposalValue.complexity?.value;
    await submitProposal();
  };
  const collectUpdateProposalData = async () => {
    const updateJoiData: any[] = [
      {
        text: addProposalValue?.text?.value,
      },
    ];
    proposalPayload.id = proposalId!;
    proposalPayload.action = addProposalValue.bidDecision?.value;
    proposalPayload.status = addProposalValue.status?.value;
    proposalPayload.requestId = addProposalValue.requestId?.value;
    proposalPayload.source = addProposalValue.source?.value;
    proposalPayload.title = addProposalValue.title?.value;
    proposalPayload.agency = {
      name: addProposalValue.agencyName?.value,
      email: addProposalValue.agencyEmail?.value,
      webSite: addProposalValue.agencyWebsite?.value,
      contactNo:
        isPhoneValid(addProposalValue.agencyContactNo?.value) &&
        isVisitedContactField
          ? addProposalValue.agencyContactNo?.value
          : "",
      address: {
        line1: addProposalValue.line1?.value,
        line2: addProposalValue.line2?.value,
        line3: addProposalValue.line3?.value,
        line4: addProposalValue.line4?.value,
        city: addProposalValue.city?.value,
        country: addProposalValue.country?.value,
        pinCode: addProposalValue.postalCode?.value,
        state: addProposalValue.state?.value,
      },
    };
    proposalPayload.price = addProposalValue.contractPrice.value;
    proposalPayload.contacts = contactDetail;
    proposalPayload.type = addProposalValue.type?.value;
    proposalPayload.contractDetailsUrl =
      addProposalValue.contractDetailsUrl?.value;
    proposalPayload.competitionType = addProposalValue.competitionType?.value;
    proposalPayload.domain = addProposalValue.domain?.value;
    proposalPayload.subDomain = addProposalValue.subDomain?.value;
    proposalPayload.contractType = addProposalValue.contractType?.value;
    proposalPayload.submissionType = addProposalValue.submissionType?.value;
    proposalPayload.dueDate = moment(addProposalValue.dueDate?.value).format(
      "MM/DD/YYYY"
    );
    proposalPayload.issueDate = moment(
      addProposalValue.issueDate?.value
    ).format("MM/DD/YYYY");
    proposalPayload.comments =
      addProposalValue?.text?.value?.length > 1 ? updateJoiData : joiData;
    proposalPayload.region = addProposalValue.region?.value;
    proposalPayload.ownerName = addProposalValue.owner?.value;
    proposalPayload.ownerEmail = addProposalValue.ownerEmail?.value;
    proposalPayload.assigneeName = addProposalValue.owner?.value;
    proposalPayload.assigneeId = addProposalValue.ownerEmail.value;
    proposalPayload.complexity = addProposalValue.complexity?.value;
    await updatePropsalHandler();
  };

  const fetchState = async () => {
    try {
      setLoading(true);
      const res = await getState(addProposalValue.country?.value);
      setState(res);
      setLoading(false);
    } catch (error: any) {
      setLoading(false);
      getCustomError(error);
    }
  };

  const domainApiHandler = async () => {
    try {
      setLoading(true);
      const res = await getAddProposalDomain(addProposalValue.region?.value);
      setDomainType(res);
      if (!editProposal) {
        setAddProposalValue({
          ...addProposalValue,
          domain: {
            value: res[0]?.name,
            error: "",
          },
        });
      }
      setLoading(false);
    } catch (error: any) {
      setLoading(false);
      getCustomError(error);
    }
  };

  const updatePropsalHandler = async () => {
    try {
      setLoading(true);
      await updateProposalService(proposalPayload);
      openSuccessNotification("RFP has been updated successfully");
      await props.fetchViewProposal();
      handleClose();
      setLoading(false);
      setJoiData([]);
      history.push(`${urls.VIEW_PROPOSAL_VIEW_PATH}?id=${proposalId}`);
    } catch (error: any) {
      setLoading(false);
      getCustomError(error);
    }
  };

  const fetchSubDomain = async () => {
    try {
      setLoading(true);
      const res = await getAddSubdomain(addProposalValue.domain?.value);
      setSubDomainType(res);
      if (!editState) {
        setAddProposalValue({
          ...addProposalValue,
          subDomain: {
            value: props?.rfpCloneTableRowData?.subDomain
              ? props?.rfpCloneTableRowData?.subDomain
              : res[0]?.name,
            error: "",
          },
        });
      }
      setLoading(false);
    } catch (error: any) {
      setLoading(false);
      getCustomError(error);
    }
  };

  const addProposalApiHandler = async () => {
    try {
      setLoading(true);
      const [
        type,
        souceValue,
        userValue,
        regionValue,
        submissionValue,
        contractValue,
        countryValue,
        action,
        status,
      ] = await Promise.all([
        getAddProposalType(),
        getAddProposalSource(),
        getAddProposalUserPage(),
        getAddProposalRegion(),
        getAddProposalSubmission(),
        getAddProposalContract(),
        getAddProposalCountries(),
        getProposalAction(),
        getProposalStatus(),
      ]);
      setTypeValue(type);
      setSourceValue(souceValue);
      setUser(userValue);
      setRegionType(regionValue);
      setSubmissionType(submissionValue);
      setContractType(contractValue);
      setCountry(countryValue);
      setActionData(action);
      setStatusData(status);
      setLoading(false);
    } catch (error: any) {
      setLoading(false);
      getCustomError(error);
    }
  };

  const getStepHeader = () => {
    return (
      <>
        <Grid
          container
          xs={12}
          sm={12}
          md={12}
          lg={12}
          xl={12}
          sx={classes.stepHeader}
        >
          <Grid item xs={7} sm={10} md={10} lg={10} xl={12}>
            <Stepper activeStep={activeStep}>
              {stepsData.map((item: any, index: any) => {
                return (
                  <Step key={item.id}>
                    <StepLabel sx={classes.stepperResponsive}>
                      <Typography variant="h6">{item.StepLabel}</Typography>
                    </StepLabel>
                  </Step>
                );
              })}
            </Stepper>
          </Grid>
        </Grid>
        <Divider />
      </>
    );
  };

  const getStepper = () => {
    return (
      <Stepper
        activeStep={activeStep}
        orientation={isDesktop ? "vertical" : "horizontal"}
      >
        {stepsData.map((step, index) => (
          <Step key={step.StepLabel} sx={classes.stepColors}>
            <StepLabel>
              <Stack direction="column">
                {/* <img
                  src={index === activeStep ? activeIcons[index] : icons[index]}
                  alt={step.label}
                  height={isDesktop ? "100px" : "auto"}
                  width={isDesktop ? "100px" : "auto"}
                /> */}
                {/* <Typography sx={classes.stepperHeading}>{step.id}</Typography> */}
                <Typography sx={classes.stepperDesc} variant="h5">
                  {step.StepLabel}
                </Typography>
              </Stack>
            </StepLabel>
          </Step>
        ))}
      </Stepper>
    );
  };

  const getAllContent = () => {
    switch (activeStep) {
      case 0:
        return (
          <Box sx={{ backgroundColor: "#ffffff" }}>
            <RfpinformartionScreen
              regionType={regionType}
              user={user}
              type={typeValue}
              source={sourceValue}
              setAddProposalValue={setAddProposalValue}
              addProposalValue={addProposalValue}
              domainType={domianType}
              subDomain={subDomianType}
              activeStep={activeStep}
              nextStep={nextStep}
              editState={editState}
              handleClose={handleClose}
            />
          </Box>
        );
      case 1:
        return (
          <AgencyInformartionScreen
            setAddProposalValue={setAddProposalValue}
            addProposalValue={addProposalValue}
            country={country}
            state={state}
            city={city}
            handleBackStep={handleBackStep}
            nextStep={nextStep}
            handleClose={handleClose}
            isVisitedContactField={isVisitedContactField}
            setVisitedContactFelid={setVisitedContactFelid}
          />
        );
      case 2:
        return (
          <ContactInfromationScreen
            setAddProposalValue={setAddProposalValue}
            addProposalValue={addProposalValue}
            contractType={contratType}
            submissionType={submissionType}
            nextStep={nextStep}
            handleBackStep={handleBackStep}
            editState={editState}
            action={actionData}
            status={statusData}
            handleClose={handleClose}
            rfpCloneTableRowData={props?.rfpCloneTableRowData}
          />
        );
      case 3:
        return (
          <ContactInfromationScreen2
            addProposalValue={addProposalValue}
            joiData={joiData}
            setJoiData={setJoiData}
            handleBackStep={handleBackStep}
            setContactDetail={setContactDetail}
            contactDetail={contactDetail}
            proposalId={proposalId}
            collectAddProposalData={collectAddProposalData}
            editState={editState}
            // contactErrorDetails={contactErrorDetails}
            collectUpdateProposalData={collectUpdateProposalData}
            setAddProposalValue={setAddProposalValue}
            handleClose={handleClose}
            isVisitedContactField={isVisitedContactField}
            setVisitedContactFelid={setVisitedContactFelid}
          />
        );
      default:
        break;
    }
  };
  const addProposalData = () => {
    return (
      <>
        <CustomDialog
          isDialogOpen={props.addProposalModal}
          closeButtonVisibility
          closable
          dialogBodyContent={bodyData()}
          outSideCloseHide
          handleDialogClose={handleClose}
          width={"1500px"}
          borderRadius="33px"
          editproposal={"true"}
          cancelIcon={true}
          hideBgColor={true}
        />
      </>
    );
  };

  const bodyData = () => {
    return (
      <Grid container sx={{ backgroundColor: bgcolor ? appColor : "none" }}>
        <Grid
          item
          xs={12}
          sm={12}
          md={12}
          lg={2}
          xl={3}
          sx={classes.stepperWrapper}
        >
          {getStepper()}
        </Grid>
        <Grid
          item
          xs={12}
          sm={12}
          md={12}
          lg={8.5}
          xl={8}
          margin={{ xl: 7, lg: 7, md: 7, sm: 7, xs: 0 }}
          marginTop={{ xl: 3, lg: 3, md: 3, sm: 3, xs: 3 }}
          marginBottom={{ xl: 2, lg: 2, md: 2, sm: 2, xs: 2 }}
          sx={{ backgroundColor: bgcolor ? appColor : "#ffffff" }}
        >
          {getAllContent()}
        </Grid>
      </Grid>
    );
  };

  const addProposal = () => {
    return (
      <>
        <Grid xs={12} sx={classes.mainContainer} mt={5}>
          <Grid xs={12} sx={classes.createCampaignInnerWrapper}>
            {/* {getStepHeader()} */}
            {addProposalData()}
          </Grid>
        </Grid>
        <CustomLoader isLoading={loading} />
      </>
    );
  };
  return addProposal();
};

export default memo(AddProposal);
