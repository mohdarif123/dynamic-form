import { Box } from "@mui/material";
import CustomDialog from "../CustomDialog/CustomDialog";
import uploadGroupStyles from "./UploadGroups.styles";

interface CustomProps {
  showDialog: boolean;
  exitSignUp: Function;
  handleDialogClose: Function;
}
const UploadGroup = (props: CustomProps) => {
  const classes = uploadGroupStyles;
  const getDialogTitle = (): any => {
    return <Box sx={classes.header}>Upload Group</Box>;
  };

  const getDialogBody = (): any => {
    return (
      <Box>
        <Box>
          This is an irreversible process. Your data will be removed from our
          system.
        </Box>
        <Box>Are you sure you want to go ahead?</Box>
      </Box>
    );
  };

  return (
    <CustomDialog
      isDialogOpen={props.showDialog}
      closable
      handleDialogClose={props.handleDialogClose}
      dialogTitleContent={getDialogTitle()}
      dialogBodyContent={getDialogBody()}
      //dialogFooterContent={getDialogFooter()}
      //dialogFooterClass={classes.verificationDialogFooter}
      closeButtonVisibility={false}
      width="auto"
      borderRadius="33px"
      //displayInForm={true}
    />
  );
};

export default UploadGroup;
