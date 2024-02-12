import {
  Divider,
  Grid,
  Step,
  StepLabel,
  Stepper,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useAppSelector } from "utils/hooks";
import { selectEmail } from "redux/authSlice";
import CompetitiveStyle from "../Competitive.styel";
import {
  isPhoneValid,
  isTruthy,
  openSuccessNotification,
} from "helpers/methods";
import notifiers from "global/constants/NotificationConstants";
import RfpinformartionScreen from "./RfpInformation";
import AgencyInformartionScreen from "./AgencyInformartionScreen";
import CustomLoader from "global/components/CustomLoader/CustomLoader";
import {
  agencyValidation,
  stepOneFormDataInitialState,
  tabConfig,
  validateForStepOne,
} from "./AddCompetitiveValidation";
import {
  addCompetitive,
  getDomain,
  getRegion,
  getSource,
  getType,
} from "./AddCompetitive.service";
import { CompetitiveRequest } from "./AddCompettitives.Modal";
import { countries } from "./CountryData";
import { useLocation } from "react-router-dom";
import {
  getCompetitiveData,
  getDocumentData,
} from "../ViewCompetitive/ViewCompetitiveData.service";
import DocumentAddCompetitve from "./DocumentAddCompetitve";
import AddComents from "./AddComents";
import { updateComptitve } from "../Competitive.service";
import history from "utils/history";
import urls from "global/constants/UrlConstants";
import { useTitle } from "utils/UseTitle";
import strings from "global/constants/StringConstants";
import { CustomDialog } from "global/components";
import CustomTabs from "global/components/CustomTabs/CustomTabs";
import { selectBackgroundColor } from "redux/themeChangeSlice";
import { appColor } from "utils/styles";
import { Box } from "@mui/system";
import { getCustomError } from "utils/customError";

interface CustomProps {
  data?: any;
  setEditCompetitiveModal?: any;
  editComeptitiveModal?: any;
  editId?: any;
  fetchData?: any;
}

const AddCompetitives = (props: CustomProps) => {
  useTitle(strings.COMPETITIVE);
  const classes = CompetitiveStyle;
  const loggedInUserEmail = useAppSelector(selectEmail);
  const [isVisitedContactField, setVisitedContactFelid] =
    useState<boolean>(false);
  const [activeStep, setActiveStep] = useState(0);
  const [loading, setLoading] = useState<boolean>(false);
  const bgcolor = useAppSelector(selectBackgroundColor);
  const [addProposalValue, setAddProposalValue] = useState<any>(
    stepOneFormDataInitialState
  );
  const [newValueAttribute, setNewvalueAttribute] =
    useState<any>("RFP Information");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [regionValue, setRegionValue] = useState<any>("US");
  const [typeValue, setTypeValue] = useState([]);
  const [sourceValue, setSourceValue] = useState([]);
  const [user, setUser] = useState([]);
  const [regionType, setRegionType] = useState<any>([]);
  const [domianType, setDomainType] = useState<any>([]);
  const [subDomianType, setSubDomainType] = useState<any>([]);
  const [state, seState] = useState([]);

  const [completed, setCompleted] = useState<{
    [k: number]: boolean;
  }>({});
  const [dropdownValue, setDropDownValue] = useState<any>({
    type: [],
    domain: [],
    region: [],
    status: [],
  });

  const [joiData, setJoiData] = useState<any>([]);
  const urlParams = useLocation().search;
  const competitiveId = props.editId;
  const competitivePayload = new CompetitiveRequest();
  const [contactDetail, setContactDetail] = useState([]);
  const [editState, setEditState] = useState(false);
  const stepsData = [
    {
      id: 0,
      StepLabel: "RFP Information",
    },

    {
      id: 1,
      StepLabel: "Agency Information",
    },
  ];
  const EditStepsData = [
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
      StepLabel: "Document",
    },
    {
      id: 3,
      StepLabel: "Comment",
    },
  ];
  useEffect(() => {
    if (competitiveId && !!props.editComeptitiveModal) {
      editCompetitve();
    }
  }, [competitiveId, props.editComeptitiveModal]);

  const totalSteps = () => {
    return editState ? EditStepsData.length : stepsData.length;
  };

  const isLastStep = () => {
    return activeStep === totalSteps() - 1;
  };

  const completedSteps = () => {
    return Object.keys(completed).length;
  };

  const allStepsCompleted = () => {
    return completedSteps() === totalSteps();
  };
  const attributeValue = (activeStep: any) => {
    switch (activeStep) {
      case 0: {
        setNewvalueAttribute("RFP Information");
        break;
      }
      case 1: {
        setNewvalueAttribute("Agency Information");
        break;
      }
      case 2: {
        setNewvalueAttribute("Documents");
        break;
      }
      case 3: {
        setNewvalueAttribute("Comments");
      }
    }
  };
  const handleBackStep = () => {
    attributeValue(activeStep - 1);
    setActiveStep(activeStep - 1);
  };
  const nextStep = () => {
    if (
      (handleStepOneValidation() && !addProposalValue.agencyContactNo.error) ||
      addProposalValue.agencyContactNo.value === ""
    ) {
      attributeValue(activeStep + 1);
      const newActiveStep =
        isLastStep() && !allStepsCompleted()
          ? stepsData.findIndex((step, i) => !(i in completed))
          : activeStep + 1;
      setActiveStep(newActiveStep);
    }
  };
  const collectAddProposalData = () => {
    if (handleStepOneValidation()) {
      const joiValue: any[] = [];
      joiValue.push({
        text: addProposalValue?.comment?.value,
      });
      const data = {
        requestId: addProposalValue.requestId?.value,
        source: addProposalValue.source?.value,
        title: addProposalValue.title?.value,
        agency: {
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
        },
        price: addProposalValue.price.value,
        type: addProposalValue.type?.value,
        domain: addProposalValue.domain?.value,
        comments:
          addProposalValue?.comment?.value?.length > 1 ? joiValue : joiData,
        region: addProposalValue.region?.value,
      };
      submitProposal(data);
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
      default:
        break;
    }
  };

  useEffect(() => {
    competitiveApiHandler();
  }, []);

  const submitProposal = async (data: any) => {
    try {
      setLoading(true);
      const res = await addCompetitive(data);
      openSuccessNotification("Comparison Edit Successfully");
      setNewvalueAttribute("RFP Information");
      history.push(urls.COMPETITIVE);
      setLoading(false);
    } catch (error: any) {
      setLoading(false);
    }
  };
  const competitiveApiHandler = async () => {
    try {
      setLoading(true);
      const [domain, region, type, source] = await Promise.all([
        getDomain(regionValue),
        getRegion(),
        getType(),
        getSource(),
      ]);
      setDropDownValue({
        type: type,
        domain: domain,
        region: region,
        status: source,
      });
      setRegionType(region);
      setDomainType(domain);
      setSourceValue(source);
      setTypeValue(type);
      setLoading(false);
    } catch (error: any) {
      setLoading(false);
      getCustomError(error);
    }
  };
  const editCompetitve = async () => {
    try {
      if (competitiveId !== null) {
        setLoading(true);
        const [res, documentData] = await Promise.all([
          getCompetitiveData(competitiveId),
          getDocumentData(competitiveId),
        ]);
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

  const addUserHeaderContent = () => {
    return (
      <Typography variant="h2" sx={{ color: "white" }}>
        Edit Comparison
      </Typography>
    );
  };
  const collectUpdateProposalData = () => {
    const joiValue: any[] = [];
    joiValue.push({
      text: addProposalValue?.comment?.value,
    });
    const data = {
      requestId: addProposalValue.requestId?.value,
      source: addProposalValue.source?.value,
      title: addProposalValue.title?.value,
      agency: {
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
      },
      price: addProposalValue.price?.value,
      type: addProposalValue.type?.value,
      id: competitiveId,
      domain: addProposalValue.domain?.value,
      comments:
        addProposalValue?.comment?.value?.length > 1 ? joiValue : joiData,
      region: addProposalValue.region?.value,
    };
    updateCompititve(data);
  };

  const updateCompititve = async (data: any) => {
    try {
      setLoading(true);
      await updateComptitve(data);
      openSuccessNotification("Comparison has been updated successfully");
      props?.fetchData();
      // history.push(`/detialsCompetitve?id=${competitiveId}`);
      setActiveStep(0);
      handleClose();
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
          xs={12}
          sm={12}
          md={12}
          lg={12}
          xl={12}
          container
          justifyContent="flex-start"
          alignItems="center"
          sx={classes.stepHeader}
          mt={7}
        >
          {competitiveId ? (
            <Grid item xs={7} sm={10} md={10} lg={10} xl={12}>
              <Stepper activeStep={activeStep}>
                {EditStepsData.map((item: any) => {
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
          ) : (
            <Grid item xs={7} sm={10} md={10} lg={10} xl={12}>
              <Stepper activeStep={activeStep}>
                {stepsData.map((item: any) => {
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
          )}
        </Grid>
        <Divider />
      </>
    );
  };
  const getAllContent = () => {
    switch (activeStep) {
      case 0:
        return (
          <>
            <Box sx={{ borderBottom: "0.8px solid #7A81FD" }}>
              <CustomTabs
                changeValue={() => {}}
                sx={classes.button}
                selected={newValueAttribute}
                tabConfig={tabConfig["Admin"]}
                redirectTabValue={newValueAttribute}
                disabled={true}
                classes={{ width: "100%" }}
                width={classes.tabWidth1}
              />
            </Box>
            <Grid sx={bgcolor ? classes.agencyInfo : classes.agencyInfo1}>
              <RfpinformartionScreen
                regionType={regionType}
                user={user}
                type={typeValue}
                source={sourceValue}
                setEditCompetitiveModal={props.setEditCompetitiveModal}
                setAddCompetitiveValue={setAddProposalValue}
                addCompetitiveValue={addProposalValue}
                domainType={domianType}
                subDomain={subDomianType}
                activeStep={activeStep}
                nextStep={nextStep}
                editState={editState}
              />
            </Grid>
          </>
        );
      case 1:
        return (
          <>
            <Box sx={{ borderBottom: "0.8px solid #7A81FD" }}>
              <CustomTabs
                changeValue={() => {}}
                sx={classes.button}
                selected={newValueAttribute}
                tabConfig={tabConfig["Admin"]}
                redirectTabValue={newValueAttribute}
                disabled={true}
                classes={{ width: "100%" }}
                width={classes.tabWidth1}
              />
            </Box>
            <AgencyInformartionScreen
              setAddProposalValue={setAddProposalValue}
              addProposalValue={addProposalValue}
              country={countries}
              state={state}
              handleBackStep={handleBackStep}
              nextStep={nextStep}
              collectAddProposalData={collectAddProposalData}
              editState={editState}
              isVisitedContactField={isVisitedContactField}
              setVisitedContactFelid={setVisitedContactFelid}
            />
          </>
        );
      case 2:
        return (
          <>
            <Box sx={{ borderBottom: "0.8px solid #7A81FD" }}>
              <CustomTabs
                changeValue={() => {}}
                sx={classes.button}
                disabled={true}
                selected={newValueAttribute}
                redirectTabValue={newValueAttribute}
                tabConfig={tabConfig["Admin"]}
                classes={{ width: "100%" }}
                width={classes.tabWidth1}
              />
            </Box>
            <DocumentAddCompetitve
              nextStep={() => {
                setActiveStep(() => activeStep + 1);
                attributeValue(activeStep + 1);
              }}
              handleBackStep={handleBackStep}
            />
          </>
        );
      case 3:
        return (
          <>
            <Box sx={{ borderBottom: "0.8px solid #7A81FD" }}>
              <CustomTabs
                changeValue={() => {}}
                sx={classes.button}
                disabled={true}
                selected={newValueAttribute}
                tabConfig={tabConfig["Admin"]}
                redirectTabValue={newValueAttribute}
                classes={{ width: "100%" }}
                width={classes.tabWidth1}
              />
            </Box>
            <Grid sx={bgcolor ? classes.agencyInfo : classes.agencyInfo1}>
              <AddComents
                setAddCompetitiveValue={setAddProposalValue}
                addCompetitiveValue={addProposalValue}
                joiData={joiData}
                collectUpdateProposalData={collectUpdateProposalData}
                handleBackStep={handleBackStep}
              />
            </Grid>
          </>
        );
      default:
        break;
    }
  };
  const handleClose = () => {
    props.setEditCompetitiveModal!(false);
    setNewvalueAttribute("RFP Information");
    setActiveStep(0);
  };

  const addProposal = () => {
    return (
      <>
        <CustomDialog
          isDialogOpen={props.editComeptitiveModal}
          closeButtonVisibility
          closable
          dialogHeaderContent={addUserHeaderContent()}
          dialogBodyContent={getAllContent()}
          comparisonBodyColor={true}
          bodyBackgroundColor={true}
          handleDialogClose={handleClose}
          width={"1000px"}
          borderRadius="33px"
          addCompetitiveColor={"true"}
        />
        <CustomLoader isLoading={loading} />
      </>
    );
  };
  return addProposal();
};

export default AddCompetitives;
