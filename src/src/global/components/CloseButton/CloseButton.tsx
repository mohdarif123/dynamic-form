import { Box } from "@mui/material";
import { CustomIcon } from "..";
import closeButtonStyles from "./CloseButton.styles";
import ClearIcon from "@mui/icons-material/Clear";
import { selectBackgroundColor } from "redux/themeChangeSlice";
import { useAppSelector } from "utils/hooks";
import { primaryBlackColor, pureWhiteColor } from "utils/styles";

type Props = {
  onClick: Function;
  customClasses?: string;
};

const CloseButton: React.FC<Props> = ({ onClick, customClasses }) => {
  const classes = closeButtonStyles();
  const bgcolor = useAppSelector(selectBackgroundColor);
  const appliedClass = customClasses ? customClasses : classes.closeBtn;

  const getCloseButton = () => {
    return (
      <Box
        className={appliedClass}
        onClick={() => onClick()}
        style={{ color: bgcolor ? pureWhiteColor : primaryBlackColor }}
      >
        <CustomIcon icon={<ClearIcon fontSize="large" />} />
      </Box>
    );
  };

  return getCloseButton();
};

export default CloseButton;
