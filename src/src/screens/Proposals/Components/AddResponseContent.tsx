import React, { useState } from "react";
import {
  Box,
  Checkbox,
  Chip,
  ListItemText,
  MenuItem,
  Select,
  SelectChangeEvent,
  Typography,
} from "@mui/material";
import ModalStyle from "../../KnowledgeBased/Responses/Components/Modal.Style";
import { CustomButton, CustomDialog } from "global/components";
import {
  lightDropDownColor,
  primaryBlackColor,
  primaryGray,
  pureWhiteColor,
} from "utils/styles";
import {
  isTruthy,
  openSuccessNotification,
  openWarningNotification,
} from "helpers/methods";
import notifiers from "global/constants/NotificationConstants";
import { addResponse } from "../Proposals.service";
import CustomLoader from "global/components/CustomLoader/CustomLoader";
import { useAppSelector } from "utils/hooks";
import { Grid } from "@mui/material";

import { selectBackgroundColor } from "redux/themeChangeSlice";
import { getCustomError } from "utils/customError";

interface customProps {
  openViewModal: boolean;
  setOpenViewModal: Function;
  rowData?: any;
  viewData: any;
  fetchAddResponseContent: any;
}
const AddResponseContentModal = (props: customProps) => {
  const [personName, setPersonName] = React.useState<any>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [addContent, setAddContent] = useState<any>([]);
  const classes = ModalStyle;
  const bgcolor = useAppSelector(selectBackgroundColor);
  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;

  const removeItemIsSelect = (selectValue: any) => {
    setPersonName(
      personName.filter((item: any) => {
        return item !== selectValue;
      })
    );
    setAddContent(
      addContent.filter((item: any) => {
        return item.id !== selectValue;
      })
    );
  };
  const handleChange = (event: SelectChangeEvent<typeof personName>) => {
    const {
      target: { value },
    } = event;
    const arr: any[] = [];
    props.rowData.forEach((item: any) => {
      if (value.includes(item.id)) {
        arr.push(item);
      }
    });
    setAddContent(arr);
    setPersonName(value);
  };
  const dialogBodyContent = () => {
    return (
      <>
        <Box mb={2} sx={{ display: "flex", flexWrap: "wrap" }}>
          {addContent?.map((item: any, index: number) => {
            return (
              <>
                <Chip
                  label={addContent[index]?.question}
                  variant="filled"
                  style={{
                    color: "#ffffff",
                    background: "#7A81FD",
                    fontWeight: 500,
                  }}
                  sx={classes.previewChip}
                  onDelete={() => removeItemIsSelect(item.id)}
                />
              </>
            );
          })}
        </Box>
        <Select
          name="permissions"
          id="permissions"
          sx={bgcolor ? classes.dropDownStyle : classes.dropDownLight}
          value={personName}
          multiple
          disabled={props.rowData.length === 0}
          onChange={handleChange}
          displayEmpty
          MenuProps={{
            PaperProps: {
              sx: {
                "& .MuiMenuItem-root": {
                  margin: "4px 0",
                },
                "& .MuiMenuItem-root.Mui-selected": {
                  backgroundColor: !bgcolor ? "#969AFF" : "#2F3052",
                  borderRadius: "40px !important",
                  color: pureWhiteColor,
                },
                "& .MuiMenuItem-root:hover": {
                  color: pureWhiteColor,
                  backgroundColor: bgcolor ? "#7A81FD" : "#7A81FD",
                  borderRadius: "40px",
                },
                "& .MuiMenuItem-root.Mui-selected:hover": {
                  backgroundColor: !bgcolor ? "#969AFF" : "#2F3052",
                  color: pureWhiteColor,
                },
                borderRadius: "34px",
                backgroundColor: !bgcolor ? lightDropDownColor : "#373854",
                "&::-webkit-scrollbar": {
                  width: "4px",
                },
                "&::-webkit-scrollbar-thumb": {
                  background: "#7A81FD",
                  borderRadius: "10px",
                  width: "4px",
                },
                "&::-webkit-scrollbar-button:start": { display: "block" },
                "&::-webkit-scrollbar-button:end": { display: "block" },
              },
              style: {
                maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
                width: 190,
              },
            },
            MenuListProps: {
              sx: {
                backgroundColor: bgcolor ? "#373854" : lightDropDownColor,
                borderRadius: "34px",
              },
            },
          }}
          renderValue={() => (
            <Typography
              sx={{ color: bgcolor ? "#CBCBCB" : "#7A7A7A" }}
              variant="h5"
            >
              {props.rowData.length === 0 ? (
                <Typography
                  sx={{ color: bgcolor ? "#CBCBCB" : "#7A7A7A" }}
                  variant="h5"
                >
                  No data available
                </Typography>
              ) : personName?.length > 0 ? (
                <Typography
                  sx={{ color: bgcolor ? "#CBCBCB" : "#7A7A7A" }}
                  variant="h5"
                >
                  Select content
                </Typography>
              ) : (
                <Typography
                  sx={{ color: bgcolor ? "#CBCBCB" : "#7A7A7A" }}
                  variant="h5"
                >
                  Select content
                </Typography>
              )}
            </Typography>
          )}
        >
          {props.rowData?.map((item: any, index: number) => (
            <MenuItem
              key={index}
              value={item.id}
              sx={{
                color: bgcolor ? pureWhiteColor : primaryBlackColor,
                backgroundColor: bgcolor ? "#373854" : lightDropDownColor,
              }}
            >
              <Checkbox
                checked={personName.indexOf(item.id) > -1}
                sx={{ color: bgcolor ? pureWhiteColor : primaryBlackColor }}
              />
              <ListItemText>
                <Typography variant="h5">{item.question}</Typography>
              </ListItemText>
            </MenuItem>
          ))}
        </Select>
      </>
    );
  };

  const dialogTitleContent = () => {
    return (
      <>
        <Typography variant="h2" sx={classes.textStyle}>
          Existing Content
        </Typography>
      </>
    );
  };
  const handleClose = () => {
    props.setOpenViewModal!(false);
    setPersonName([]);
    setAddContent([]);
  };
  const dialogContent = () => {
    return (
      <>
        <Grid
          container
          sx={{
            background: !bgcolor ? pureWhiteColor : "#282844",
          }}
        >
          <Box
            sx={{
              width: "100%",
              display: "flex",
              alignItem: "center",
              justifyContent: "center",
              marginBottom: "20px",
              gap: "10px",
              "& button": {
                width: "120px",
              },
            }}
          >
            <CustomButton
              label="Add"
              onClick={() => responseAdd()}
              disabled={props.rowData.length === 0}
            />
          </Box>
        </Grid>
      </>
    );
  };
  const responseAdd = async () => {
    if (addContent?.length > 0) {
      try {
        const data = {
          proposalId: props.viewData.id,
          proposalTitle: props.viewData.title,
          region: props.viewData.region,
          domain: props.viewData.domain,
          subDomain: props.viewData.domain,
          order: 0,
          content: addContent,
          audit: {
            fromZ: new Date(),
            thruZ: new Date(),
            createdBy: "",
            updatedBy: "",
          },
        };
        setLoading(true);
        const res = await addResponse(data);
        openSuccessNotification("Response has been added in RFP successfully");
        setPersonName([]);
        setAddContent([]);
        await props.fetchAddResponseContent();
        props.setOpenViewModal(false);
        setLoading(false);
      } catch (error: any) {
        setPersonName([]);
        setAddContent([]);
        setLoading(false);
        props.setOpenViewModal(false);
        getCustomError(error);
      }
    } else {
      openWarningNotification("Please select at least one response");
    }
  };

  return (
    <>
      <CustomDialog
        isDialogOpen={props.openViewModal}
        closable
        handleDialogClose={handleClose}
        closeButtonVisibility
        width={"640px"}
        borderRadius="33px"
        dialogHeaderContent={dialogTitleContent()}
        dialogBodyContent={dialogBodyContent()}
        dialogFooterContent={dialogContent()}
        cancelIconColor
        hideBgColor
        dialogFooterClass
      />
      <CustomLoader isLoading={loading} />
    </>
  );
};

export default React.memo(AddResponseContentModal);
