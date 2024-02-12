import React from "react";
import { CustomButton, CustomDialog } from "global/components";
import ProposalStyles from "../Proppsals.style";
import { Box } from "@mui/system";
import { FormHelperText, Grid, Typography } from "@mui/material";
import JoditEditor from "jodit-react";
import { isTruthy } from "helpers/methods";
import strings from "global/constants/StringConstants";
import { useSelector } from "react-redux";
import { selectBackgroundColor } from "redux/themeChangeSlice";
import { appColor, primaryBlackColor, pureWhiteColor } from "utils/styles";
interface customProps {
  setOpenModal: Function;
  openModal: boolean;
  handlerSave: any;
  setAddProposalValue: any;
  addProposalValue: any;
  commentError?: string;
  setCommentError?: any;
}
const AddCommentModal = (props: customProps) => {
  const classes = ProposalStyles;
  const bgcolor = useSelector(selectBackgroundColor);
  const handleCloseModel = () => {
    props.setOpenModal(false);
    props.setCommentError("");
    props.setAddProposalValue({
      ...props.addProposalValue,
      text: {
        ...props.addProposalValue["text"],
        value: "",
      },
    });
  };

  const dialogTitleContent = () => {
    return (
      <>
        <Box sx={classes.dialogTitleWrapper}>
          <Typography sx={classes.titleRight} variant="h2">
            Add Comment
          </Typography>
        </Box>
      </>
    );
  };

  const handlerChange = (e: any) => {
    props.setAddProposalValue({
      ...props.addProposalValue,
      text: {
        ...props.addProposalValue["text"],
        value: e,
      },
    });
  };

  const dialogBody = () => {
    return (
      <>
        <Grid container spacing={2}>
          <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
            <Box sx={classes.inputLable}>
              <Typography
                variant="h6"
                sx={{ fontWeight: 500 }}
                style={{ color: !bgcolor ? primaryBlackColor : pureWhiteColor }}
              >
                Comment
              </Typography>
              <Typography sx={classes.star}>*</Typography>
            </Box>
            <JoditEditor
              value={props?.addProposalValue?.text?.value}
              onChange={handlerChange}
            />
          </Grid>
        </Grid>
        {!isTruthy(props?.addProposalValue?.text?.value) && (
          <FormHelperText error>{props.commentError}</FormHelperText>
        )}
      </>
    );
  };
  const dialogContent = () => {
    return (
      <>
        <Grid
          container
          style={{
            justifyContent: "center",
            display: "flex",
            backgroundColor: !bgcolor ? pureWhiteColor : "#282844",
          }}
        >
          <Grid item py={2}>
            <Box sx={classes.buttonWrapper}>
              <CustomButton
                label={strings.CANCEL}
                onClick={() => handleCloseModel()}
                customClasses={{
                  width: "110px",
                  [`@media screen and (max-width: ${320}px)`]: {
                    width: "190px",
                  },
                }}
                buttonType={"outlined"}
              />
              <CustomButton
                label={strings.SUBMIT}
                onClick={() => props.handlerSave()}
                customClasses={{
                  width: "110px",
                  [`@media screen and (max-width: ${320}px)`]: {
                    width: "190px",
                  },
                }}
                buttonType={"contained"}
              />
            </Box>
          </Grid>
        </Grid>
      </>
    );
  };
  return (
    <>
      <CustomDialog
        dialogHeaderContent={dialogTitleContent()}
        isDialogOpen={props.openModal}
        closable
        closeButtonVisibility
        handleDialogClose={handleCloseModel}
        dialogBodyContent={dialogBody()}
        dialogFooterContent={dialogContent()}
        width="1200px"
        borderRadius="33px"
        cancelIconColor
        hideBgColor={true}
        dialogFooterClass={true}
      />
    </>
  );
};

export default React.memo(AddCommentModal);
