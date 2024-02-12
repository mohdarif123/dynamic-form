import React, { useState } from "react";
import { Box, Grid, Typography, Avatar } from "@mui/material";
import { CustomButton } from "global/components";
import ViewProposalStyles from "./ViewProposal.styles";
import ViewAnswerModal from "../Components/ViewAnswerModal";
import moment from "moment";
import {
  cornflowerBlueColor,
  primaryBlackColor,
  pureWhiteColor,
  semiTransparentBlack,
  semiTransparentWhite,
} from "utils/styles";
import { useAppSelector } from "utils/hooks";
import { selectBackgroundColor } from "redux/themeChangeSlice";
import ProposalCommentCustom from "global/components/ProposalCommentTable/ProposalCommentTable";
interface GeneralProps {
  data: any;
}
const GeneralTab = (props: GeneralProps) => {
  const classes = ViewProposalStyles;
  const [pageSize, setPageSize] = useState(10);
  const [indexContect, setIndex] = useState(0);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [rowData, setRowData] = useState<any>();
  const [page, setPage] = useState(1);
  const pageVisited = (page - 1) * pageSize;
  const displayRows = props?.data?.comments?.slice(
    pageVisited,
    pageVisited + pageSize
  );
  const bgcolor = useAppSelector(selectBackgroundColor);

  const agencyInformation = () => {
    return (
      <>
        <Box sx={classes.mainWrapper}>
          <Box sx={bgcolor ? classes.innerWrapper : classes.innerWrapper1}>
            <Typography
              sx={bgcolor ? classes.awardTextStyle : classes.awardTextStyle1}
              variant="h2"
            >
              Agency Information
            </Typography>
          </Box>
          <Box sx={{ padding: "10px" }} mt={4}>
            <Box component={"div"} display={"flex"} gap={2}>
              <Typography
                sx={
                  bgcolor
                    ? classes.cardTextStyleHeaders
                    : classes.cardTextStyleHeaders1
                }
                variant="h5"
              >
                Name :
              </Typography>
              <Typography
                variant="h5"
                sx={{
                  color: bgcolor ? pureWhiteColor : primaryBlackColor,
                  wordBreak: "break-all",
                }}
              >
                {props?.data?.agency?.name}
              </Typography>
            </Box>
            <Box component={"div"} display={"flex"} gap={2} mt={4}>
              <Typography
                sx={
                  bgcolor
                    ? classes.cardTextStyleHeaders
                    : classes.cardTextStyleHeaders1
                }
                variant="h5"
              >
                Address :
              </Typography>
              <Typography
                variant="h5"
                style={{
                  wordBreak: "break-all",
                  color: bgcolor ? pureWhiteColor : primaryBlackColor,
                }}
              >
                {props?.data?.agency?.address === undefined
                  ? ""
                  : `${props?.data?.agency?.address?.line1}
                ${props?.data?.agency?.address?.line2}
                ${props?.data?.agency?.address?.line3}
                ${props?.data?.agency?.address?.city}
                ${props?.data?.agency?.address?.state}
                ${props?.data?.agency?.address?.pinCode}
                ${props?.data?.agency?.address?.country}`}
              </Typography>
            </Box>
          </Box>
        </Box>
      </>
    );
  };
  const handleDetailsUrl = () => {
    const detailsUrl = props.data?.contractDetailsUrl.includes("http")
      ? props.data?.contractDetailsUrl
      : `https://${props.data?.contractDetailsUrl}`;
    window.open(detailsUrl, "_blank");
  };

  const contractInformation = () => {
    return (
      <>
        <Box sx={classes.mainWrapper}>
          <Box sx={bgcolor ? classes.innerWrapper : classes.innerWrapper1}>
            <Typography
              sx={bgcolor ? classes.awardTextStyle : classes.awardTextStyle1}
              variant="h2"
            >
              Contract Information
            </Typography>
          </Box>
          <Box sx={{ padding: "10px" }} mt={4}>
            <Box component={"div"} display={"flex"} gap={2}>
              <Typography
                sx={
                  bgcolor
                    ? classes.cardTextStyleHeaders
                    : classes.cardTextStyleHeaders1
                }
                variant="h5"
              >
                Type :
              </Typography>
              <Typography
                variant="h5"
                sx={{
                  color: bgcolor ? pureWhiteColor : "#000000",
                  wordBreak: "break-all",
                }}
              >
                {props?.data?.contractType}
              </Typography>
            </Box>
            <Box component={"div"} display={"flex"} gap={2} mt={4}>
              <Typography
                sx={
                  bgcolor
                    ? classes.cardTextStyleHeaders
                    : classes.cardTextStyleHeaders1
                }
                variant="h5"
              >
                Submission Type :
              </Typography>
              <Typography
                variant="h5"
                sx={{
                  color: bgcolor ? pureWhiteColor : "#000000",
                  wordBreak: "break-all",
                }}
              >
                {props.data?.submissionType}
              </Typography>
            </Box>
            <Box component={"div"} display={"flex"} gap={2} mt={4}>
              <Typography
                sx={
                  bgcolor
                    ? classes.cardTextStyleHeaders
                    : classes.cardTextStyleHeaders1
                }
                variant="h5"
              >
                Detail Url :
              </Typography>
              <Typography
                variant="h5"
                sx={{
                  color: cornflowerBlueColor,
                  wordBreak: "break-all",
                  cursor: "pointer",
                }}
                onClick={handleDetailsUrl}
              >
                {props.data?.contractDetailsUrl}
              </Typography>
            </Box>
            <Box component={"div"} display={"flex"} gap={2} mt={4}>
              <Typography
                sx={
                  bgcolor
                    ? classes.cardTextStyleHeaders
                    : classes.cardTextStyleHeaders1
                }
                variant="h5"
              >
                Contract Price :
              </Typography>
              <Typography
                variant="h5"
                sx={{
                  color: bgcolor ? pureWhiteColor : "#000000",
                  wordBreak: "break-all",
                }}
              >
                {props.data?.price}
              </Typography>
            </Box>
            <Box component={"div"} display={"flex"} gap={2} mt={4}>
              <Typography
                sx={
                  bgcolor
                    ? classes.cardTextStyleHeaders
                    : classes.cardTextStyleHeaders1
                }
                variant="h5"
              >
                Issue Date :
              </Typography>
              <Typography
                variant="h5"
                sx={{
                  color: bgcolor ? pureWhiteColor : "#000000",
                  wordBreak: "break-all",
                }}
              >
                {moment(props.data?.issueDate).format("MM/DD/YYYY")}
              </Typography>
            </Box>
            <Box component={"div"} display={"flex"} gap={2} mt={4}>
              <Typography
                sx={
                  bgcolor
                    ? classes.cardTextStyleHeaders
                    : classes.cardTextStyleHeaders1
                }
                variant="h5"
              >
                Due Date :
              </Typography>
              <Typography
                variant="h5"
                sx={{ color: bgcolor ? pureWhiteColor : "#000000" }}
              >
                {moment(props.data?.dueDate).format("MM/DD/YYYY")}
              </Typography>
            </Box>
          </Box>
        </Box>
      </>
    );
  };

  const contactInformation = () => {
    return (
      <>
        <Box sx={classes.mainWrapper}>
          <Box
            sx={bgcolor ? classes.innerWrapper : classes.innerWrapper1}
            display={"flex"}
          >
            <Typography
              sx={bgcolor ? classes.awardTextStyle : classes.awardTextStyle1}
              variant="h2"
            >
              Contact Information
            </Typography>
          </Box>
          <Box sx={classes.tableStyle}>
            <Box sx={{ padding: "8px" }}>
              <Box sx={classes.contactInformationButtonStyle}>
                {props.data?.contacts?.map((items: any, index: any) => {
                  return (
                    <>
                      <CustomButton
                        label={`Contact ${index + 1}`}
                        onClick={() => {
                          setIndex(index);
                        }}
                        customClasses={{ maxWidth: "110px" }}
                        buttonType={"outlined"}
                      />
                    </>
                  );
                })}
              </Box>
              <Box component={"div"} display={"flex"} gap={2} mt={4}>
                <Typography
                  sx={
                    bgcolor
                      ? classes.cardTextStyleHeaders
                      : classes.cardTextStyleHeaders1
                  }
                  variant="h5"
                >
                  Title :
                </Typography>
                <Typography
                  variant="h5"
                  sx={{
                    color: bgcolor ? pureWhiteColor : "#000000",
                    wordBreak: "break-all",
                  }}
                >
                  {props.data?.contacts[indexContect]?.title}
                </Typography>
              </Box>
              <Box component={"div"} display={"flex"} gap={2} mt={4}>
                <Typography
                  sx={
                    bgcolor
                      ? classes.cardTextStyleHeaders
                      : classes.cardTextStyleHeaders1
                  }
                  variant="h5"
                >
                  Name :
                </Typography>
                <Typography
                  variant="h5"
                  sx={{
                    color: bgcolor ? pureWhiteColor : "#000000",
                    wordBreak: "break-all",
                  }}
                >
                  {props.data?.contacts[indexContect]?.name}
                </Typography>
              </Box>
              <Box component={"div"} display={"flex"} gap={2} mt={4}>
                <Typography
                  sx={
                    bgcolor
                      ? classes.cardTextStyleHeaders
                      : classes.cardTextStyleHeaders1
                  }
                  variant="h5"
                >
                  Email :
                </Typography>
                <Typography
                  variant="h5"
                  sx={{
                    color: bgcolor ? pureWhiteColor : "#000000",
                    wordBreak: "break-all",
                  }}
                >
                  {props.data?.contacts[indexContect]?.email}
                </Typography>
              </Box>
              <Box component={"div"} display={"flex"} gap={2} mt={4}>
                <Typography
                  sx={
                    bgcolor
                      ? classes.cardTextStyleHeaders
                      : classes.cardTextStyleHeaders1
                  }
                  variant="h5"
                >
                  Contact :
                </Typography>
                <Typography
                  variant="h5"
                  sx={{ color: bgcolor ? pureWhiteColor : "#000000" }}
                >
                  {props.data?.contacts[indexContect]?.contactNo}
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>
      </>
    );
  };
  const handleViewAnswer = (answer: string) => {
    setOpenDeleteModal(true);
    setRowData(answer);
  };

  const commentTableData = () => {
    const data = displayRows?.map((item: any, index: number) => {
      const text = document.createElement("div");
      text.innerHTML = item.text;
      return {
        by: (
          <>
            <Box display={"flex"} alignItems={"center"}>
              <Box>
                <Avatar
                  sx={{
                    background: cornflowerBlueColor,
                    textTransform: "capitalize",
                  }}
                >
                  {item?.by?.charAt(0)}
                </Avatar>
              </Box>
              <Box>
                <Typography
                  sx={{ color: bgcolor ? "#ffffff" : "000000" }}
                  variant="h4"
                  pl={1}
                >
                  {item.by}
                </Typography>
              </Box>
            </Box>
          </>
        ),

        on: (
          <Box>
            <Typography
              sx={{
                fontSize: "",
                fontWeight: 400,
                color: bgcolor ? "#ffffff" : "#000000",
              }}
              variant="h5"
            >
              {moment(item.on).format("MM/DD/YYYY")}
              <Typography
                component={"span"}
                sx={{
                  fontSize: "16px",
                  fontWeight: 400,
                  color: "#6F7190",
                  marginLeft: "10px",
                }}
                variant="h5"
              >
                {moment(item.on).format("hh:mm:ss")}
              </Typography>
            </Typography>
          </Box>
        ),
        text: (
          <Typography
            variant="h5"
            sx={{
              color: bgcolor ? "#ffffff" : "000000",
              wordBreak: "break-all",
            }}
          >
            {text.innerText}
          </Typography>
        ),
        // by: item.by,
      };
    });
    return data;
  };
  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const viewTextModal = () => {
    return (
      <>
        <ViewAnswerModal
          openViewModal={openDeleteModal}
          setOpenViewModal={setOpenDeleteModal}
          rowData={rowData}
        />
      </>
    );
  };
  const commentText = () => {
    return (
      <>
        <Typography
          variant="h1"
          sx={{ color: bgcolor ? "#ffffff" : "#000000" }}
        >
          Comments
        </Typography>
      </>
    );
  };
  const commentTable = () => {
    return (
      <>
        <Box mt={2}>
          <Box sx={classes.tasksTableStyle}>
            <ProposalCommentCustom
              headers={[
                {
                  name: "Comment By",
                  field: "by",
                },
                {
                  name: "Comment On",
                  field: "on",
                },
                {
                  name: "Comment",
                  field: "text",
                },
              ]}
              rows={commentTableData()}
              paginationCount={props?.data?.comments?.length}
              isRowPerPageEnable={true}
              pageNumber={page}
              setPage={setPage}
              setPageSize={setPageSize}
              pageSize={pageSize}
              handlePageChange={handleChangePage}
              rowsPerPage={pageSize}
              headerData={commentText()}
              tableHeaderTextStart
            />
          </Box>
        </Box>
      </>
    );
  };
  return (
    <>
      <Grid
        container
        xl={12}
        lg={12}
        md={12}
        sx={bgcolor ? classes.cardStyleGeneral : classes.cardStyleGeneral1}
      >
        <Grid
          item
          xl={4}
          lg={4}
          md={6}
          sm={12}
          xs={12}
          sx={{
            borderRight: bgcolor
              ? `1px solid ${semiTransparentWhite}`
              : `1px solid ${semiTransparentBlack}`,
          }}
        >
          {agencyInformation()}
        </Grid>
        <Grid
          item
          xl={4}
          lg={4}
          md={6}
          sm={12}
          xs={12}
          sx={{
            borderRight: bgcolor
              ? `1px solid ${semiTransparentWhite}`
              : `1px solid ${semiTransparentBlack}`,
          }}
        >
          {contractInformation()}
        </Grid>
        <Grid
          item
          xl={4}
          lg={4}
          md={6}
          sm={12}
          xs={12}
          sx={classes.contactCardStyle}
        >
          {contactInformation()}
        </Grid>
      </Grid>
      {commentTable()}
      {viewTextModal()}
    </>
  );
};
export default React.memo(GeneralTab);
