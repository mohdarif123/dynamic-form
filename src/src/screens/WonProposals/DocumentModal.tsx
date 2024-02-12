import { useEffect, useState } from "react";
import { CustomDialog, CustomTable } from "global/components";
import { Typography } from "@mui/material";

interface CustomProps {
  data: any;
  setDocumentModal?: any;
  documentModal?: any;
  indexDocument?: any;
}
const DocumentModal = (props: CustomProps) => {
  const [tableData, setTableData] = useState<any>([]);
  const documentHeader = [
    {
      name: "Title",
      field: "title",
    },
    {
      name: "Type",
      field: "type",
    },
    {
      name: "Issue Date",
      field: "issueDate",
    },
    {
      name: "Expiry Date",
      field: "expiryDate",
    },
  ];
  useEffect(() => {
    setTableData(convertDataToTableFormat());
  }, [props.documentModal]);

  const convertDataToTableFormat = () => {
    return props?.data[props.indexDocument]?.documents?.tooltip?.map(
      (items: any, index: any) => {
        return {
          ...items,
          title: items?.title,
          type: items?.type,
          issueDate: items.issueDate ? (
            <Typography>{items.issueDate}</Typography>
          ) : (
            ""
          ),
          expiryDate:
            items.expiryDate && items.expiryDate != "12/31/9999" ? (
              <Typography>{items.expiryDate}</Typography>
            ) : (
              ""
            ),
        };
      }
    );
  };
  const handleCloseModel = () => {
    props.setDocumentModal(false);
  };
  const documentData = () => {
    return (
      <CustomTable
        headers={documentHeader}
        rows={tableData}
        isRowPerPageEnable={true}
        paginationHideShow={true}
        tableRowsDataCenter={true}
      />
    );
  };
  const customDialog = () => {
    return (
      <CustomDialog
        isDialogOpen={props.documentModal}
        closable
        handleDialogClose={handleCloseModel}
        dialogBodyContent={documentData()}
        width="600px"
        closeButtonVisibility
        borderRadius="33px"
      />
    );
  };
  return customDialog();
};
export default DocumentModal;
