import React from "react";
import { CustomModal } from "..";
import customTableStyles from "./customTable.styles";
import { Typography } from "@mui/material";
import { useAppSelector } from "utils/hooks";
import { selectBackgroundColor } from "redux/themeChangeSlice";

interface customProps {
  openViewMore: boolean;
  setOpenViewMore: Function;
  seeMoreData?: string;
  headerName?: string;
}
const ViewMoreModal = (props: customProps) => {
  const classes = customTableStyles;
  const bgcolor = useAppSelector(selectBackgroundColor);

  const handleClose = () => {
    props.setOpenViewMore!(false);
  };

  const dialogTitleContent = () => {
    return (
      <>
        <Typography variant="h2" sx={classes.seeMoreTextDarkStyle}>
          {props.headerName}
        </Typography>
      </>
    );
  };

  const dialogBodyContent = () => {
    return (
      <Typography
        variant="subtitle1"
        sx={
          bgcolor ? classes.seeMoreTextDarkStyle : classes.seeMoreTextLightStyle
        }
      >
        {props.seeMoreData}
      </Typography>
    );
  };

  return (
    <>
      <CustomModal
        isDialogOpen={props.openViewMore}
        closable
        closeButtonVisibility
        width={"640px"}
        borderRadius="20px"
        handleDialogClose={handleClose}
        dialogHeaderContent={dialogTitleContent()}
        dialogBodyContent={dialogBodyContent()}
        hideBgColor
      />
    </>
  );
};
export default React.memo(ViewMoreModal);
