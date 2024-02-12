import { Box, Typography } from "@mui/material";
import PageNotFoundStyles from "./PageNotFound.styles";
import { CustomButton } from "global/components";
import notFoundIcon from "assets/icons/notFoundIcon.svg";
import notFoundDark from "assets/icons/notFoundDark.svg";
import { useAppSelector } from "utils/hooks";
import { selectBackgroundColor } from "redux/themeChangeSlice";
import history from "utils/history";
import urls from "global/constants/UrlConstants";

const PageNotFound = () => {
  const classes = PageNotFoundStyles;
  const bgcolor = useAppSelector(selectBackgroundColor);

  const getBody = () => {
    return (
      <Box sx={bgcolor ? classes.mainContainer : classes.mainContainer1}>
        <Box
          component={"img"}
          style={{ height: "auto", maxWidth: "450px", overflow: "auto" }}
          src={bgcolor ? notFoundDark : notFoundIcon}
          alt="Not Found"
        />
        <Typography
          sx={{
            fontSize: {
              xl: "45px",
              lg: "30px",
              md: "30px",
              sm: "24px",
              xs: "20px",
            },
            color: bgcolor ? "#ffffff" : "#000000",
            fontWeight: 800,
          }}
          variant="h1"
        >
          Page Not Found
        </Typography>
        <Box mt={3}>
          <CustomButton
            label={"Go Home"}
            onClick={() => {
              history.push(urls.DASHBOARD_VIEW_PATH);
            }}
            customClasses={{
              width: {
                xl: "110px",
                lg: "110px",
                md: "110px",
                sm: "100px",
                xs: "100px",
              },
              height: {
                xl: "47px",
                lg: "40px",
                md: "38px",
                sm: "38px",
                xs: "38px",
              },
              border: "none",
              background: "rgba(38, 49, 96, 1)",
            }}
            buttonType={"contained"}
          />
        </Box>
      </Box>
    );
  };

  return <>{getBody()}</>;
};

export default PageNotFound;
