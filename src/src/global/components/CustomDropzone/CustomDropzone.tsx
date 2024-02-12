import { useState } from "react";
import CustomDropzoneStyle from "./CustomDropzone.style";
import { Box, Chip, Typography } from "@mui/material";
import { openWarningNotification } from "helpers/methods";
import { useAppSelector } from "utils/hooks";
import { selectBackgroundColor } from "redux/themeChangeSlice";
import DropzoneIconWhite from "../../../assets/icons/uploadpaymentIcon.svg";
import { primaryActiveTabBgColor } from "utils/styles";

type Props = {
  acceptedFileTypes: any;
  dropzoneIcon: any;
  dropzoneIconStyle?: boolean;
  onAdd: any;
  index?: any;
  maxFileSize: any;
  uploadedFileName?: any;
  removeUploadedFileName?: any;
  customIconStyle?: any;
  dropzoneCustomClasses?: any;
  iconWrapperStyle?: any;
  labelText?: any;
};
const CustomDropzone: React.FC<Props> = ({
  acceptedFileTypes,
  dropzoneIcon,
  dropzoneIconStyle,
  maxFileSize,
  onAdd,
  children,
  customIconStyle,
  dropzoneCustomClasses,
  iconWrapperStyle,
  index,
  removeUploadedFileName,
  uploadedFileName,
  labelText,
}) => {
  const classes = CustomDropzoneStyle;
  const bgcolor = useAppSelector(selectBackgroundColor);
  const [isDragOver, setIsDragOver] = useState(false);
  const maxFileSizeValue = maxFileSize ? maxFileSize : 10485760;
  const acceptedFile = acceptedFileTypes
    ? acceptedFileTypes
    : [".doc", ".docx", ".txt", ".xls"];

  const handleFileChange = (event: any) => {
    const fileData = event.target?.files[0];

    if (fileData) {
      const fileExtension =
        "." + fileData?.name?.split(".")?.pop()?.toLowerCase();
      if (acceptedFile?.includes(fileExtension)) {
        if (fileData.size <= maxFileSizeValue) {
          {
            onAdd([{ file: fileData }]);
          }
        } else {
          openWarningNotification("Document size cannot be more than 10 MB");
        }
      } else {
        openWarningNotification(
          "Please upload document with allowed file format"
        );
      }
    }
  };
  const handleDragFileChange = (event: any) => {
    const fileData = event;

    if (fileData) {
      const fileExtension =
        "." + fileData?.name?.split(".")?.pop()?.toLowerCase();
      if (acceptedFile?.includes(fileExtension)) {
        if (fileData?.size <= maxFileSizeValue) {
          {
            onAdd([{ file: fileData }]);
          }
        } else {
          openWarningNotification("Document size cannot be more than 10 MB");
        }
      } else {
        openWarningNotification(
          "Please upload document with allowed file format"
        );
      }
    }
  };

  const truncateFileName = (fileName: any, maxLength: number) => {
    if (fileName?.length <= maxLength) {
      return fileName;
    } else {
      const extension = fileName?.split(".")?.pop();
      const truncatedName = fileName?.slice(
        0,
        maxLength - extension?.length - 4
      );
      return truncatedName + "..." + extension;
    }
  };

  const appliedClasses = {
    ...classes.customDropzoneWrapper,
    ...(dropzoneCustomClasses ?? {}),
  };

  const iconWrapperClasses = {
    ...classes.iconWrapperStyle,
    ...(iconWrapperStyle ?? {}),
  };
  const onDragEnter = (e: any) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const onDragOver = (e: any) => {
    e.preventDefault();
  };

  const onDragLeave = (e: any) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const onDrop = (e: any) => {
    e.preventDefault();
    setIsDragOver(false);
    const files = e.dataTransfer?.files;
    handleDragFileChange(files[0]);
  };
  const getCustomDropzone = () => {
    return (
      <>
        <Box>
          <input
            id={`drag&drop-${index}`}
            type="file"
            accept={acceptedFileTypes?.join(",")}
            onChange={(event) => {
              if (isDragOver) {
                handleDragFileChange(event);
              } else {
                handleFileChange(event);
              }
            }}
            style={{ display: "none" }}
          />
          <label
            htmlFor={`drag&drop-${index}`}
            onDragEnter={(e) => onDragEnter(e)}
            onDragOver={(e) => onDragOver(e)}
            onDragLeave={(e) => onDragLeave(e)}
            onDrop={(e) => onDrop(e)}
          >
            <Box sx={[appliedClasses]}>
              <Box sx={[iconWrapperClasses]}>
                <Box
                  component={"img"}
                  src={dropzoneIcon ? dropzoneIcon : DropzoneIconWhite}
                  style={customIconStyle}
                  sx={
                    dropzoneIconStyle ? classes.iconStyle1 : classes.iconStyle
                  }
                />
              </Box>
              <Typography variant="h6" mt={0.5}>
                {labelText}
              </Typography>
            </Box>
          </label>
        </Box>
        {uploadedFileName && (
          <>
            <Box mt={1}>
              <Chip
                label={truncateFileName(uploadedFileName, 20)}
                variant="filled"
                style={{
                  color: "#000000",
                  background: primaryActiveTabBgColor,
                  fontWeight: 500,
                }}
                sx={classes.previewChip}
                onDelete={removeUploadedFileName}
              />
            </Box>
          </>
        )}
      </>
    );
  };

  return getCustomDropzone();
};
export default CustomDropzone;
