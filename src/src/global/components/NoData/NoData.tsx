import { Box, Typography } from "@mui/material";
import NoDataImage from "../../../assets/images/NoDataImage.svg";
import NoDataLight from "../../../assets/images/NoDataLight.svg";
import { useAppSelector } from "../../../utils/hooks";
import { selectBackgroundColor } from "../../../redux/themeChangeSlice";
import { pureWhiteColor } from "../../../utils/styles";
import noDataStyles from "./NoData.styles";

const NoData = () => {
  const bgcolor = useAppSelector(selectBackgroundColor);
  const classes = noDataStyles;

  return (
    <>
      <Box sx={{...classes.noDataImageWrapper,background: !bgcolor ? pureWhiteColor : "#282945"}}>
        <Box
          component="img"
          src={!bgcolor ? NoDataLight : NoDataImage}
          overflow="auto"
          height="200px"
          width="100%"
        />
        <Typography variant="h4" sx={classes.noDataTextStyle}>
          We've got nothing for you, sorry!
        </Typography>
      </Box>
    </>
  );
};

export default NoData;
