import { Avatar, Box, Grid, TextField, Typography } from "@mui/material";
import CompetitiveStyle from "../Competitive.styel";
import { CustomButton, CustomTable } from "global/components";
import { useAppSelector } from "utils/hooks";
import { selectBackgroundColor } from "redux/themeChangeSlice";
import moment from "moment";
interface RFPProps {
  setAddCompetitiveValue: any;
  addCompetitiveValue: any;
  joiData: any;
  collectUpdateProposalData: any;
  handleBackStep: any;
}
const AddComents = (props: RFPProps) => {
  const bgcolor = useAppSelector(selectBackgroundColor);
  const classes = CompetitiveStyle;
  const onChangeHandler = (e: any) => {
    props.setAddCompetitiveValue({
      ...props.addCompetitiveValue,
      [e.target.name]: {
        ...props.addCompetitiveValue[e.target.name],
        value: e.target?.value,
        error: "",
      },
    });
  };
  const commentTableData = () => {
    const data = props.joiData?.map((item: any, index: number) => {
      const text = document.createElement("div");
      text.innerHTML = item.text;
      return {
        on: (
          <>
            <Box display={"flex"}>
              <Box>
                <Avatar>{item?.by?.charAt(0)}</Avatar>
              </Box>
              <Box>
                <Typography
                  sx={{ fontSize: "18px", fontWeight: 600, marginLeft: 2 }}
                  variant="h2"
                >
                  {item.by}
                </Typography>
              </Box>
              <Box>
                <Typography
                  sx={{ fontSize: "", fontWeight: 400, marginLeft: 4 }}
                  variant="h5"
                >
                  {moment(item.on).format("MM/DD/YYYY")}
                </Typography>
                <Typography
                  sx={{
                    fontSize: "16px",
                    fontWeight: 400,
                    marginLeft: 6,
                    color: "#6F7190",
                  }}
                  variant="h5"
                >
                  {moment(item.on).format("hh:mm:ss")}
                </Typography>
              </Box>
            </Box>
          </>
        ),
        text: (
          <>
            <Typography
              sx={{
                fontWeight: "400",
                cursor: "pointer",
              }}
              variant="h5"
            >
              {text.innerText}
            </Typography>
          </>
        ),
        by: item.by,
      };
    });
    return data;
  };
  return (
    <>
      <Box borderRadius={"36px"}>
        <Grid
          container
          sx={{ backgroundColor: bgcolor ? "#282844" : "#ffffff" }}
          px={4}
        >
          <Grid
            item
            xs={12}
            sx={{ backgroundColor: bgcolor ? "#282844" : "#ffffff" }}
            marginTop={5}
          >
            {/* <Box>
            <Typography sx={classes.label}>Comment:</Typography>
          </Box> */}
            <TextField
              multiline
              minRows={3}
              inputProps={{ maxLength: 500 }}
              sx={
                bgcolor
                  ? classes.testAreaStyleComment
                  : classes.testAreaStyleComment1
              }
              name="comment"
              id="comment"
              placeholder="Enter your comment"
              value={props.addCompetitiveValue.comment?.value}
              onChange={(event: any) => onChangeHandler(event)}
            />
          </Grid>
          <Grid
            item
            xs={12}
            sx={{ backgroundColor: bgcolor ? "#282844" : "#ffffff" }}
            mt={1}
          >
            <CustomTable
              headers={[
                {
                  name: "Comment By",
                  field: "on",
                },
                {
                  name: "Comment",
                  field: "text",
                },
              ]}
              rows={commentTableData()}
              paginationCount={props.joiData?.length}
              isRowPerPageEnable={true}
              paginationHideShow={true}
              noDataImageHeightHide={true}
            />
          </Grid>
        </Grid>
        <Box
          display={"flex"}
          alignItems={"center"}
          alignContent={"center"}
          justifyContent={"center"}
          gap={3}
          py={3}
          sx={bgcolor ? classes.commentInfo : classes.commentInfo1}
        >
          <CustomButton
            label="Back"
            onClick={() => props.handleBackStep()}
            customClasses={{ width: "110px" }}
            buttonType={"outlined"}
          />
          <CustomButton
            label="Submit"
            onClick={() => props.collectUpdateProposalData()}
            customClasses={{ width: "110px" }}
            buttonType={"contained"}
          />
        </Box>
      </Box>
    </>
  );
};
export default AddComents;
