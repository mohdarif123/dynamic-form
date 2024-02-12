import { Box, Typography } from "@mui/material";
import React, { useState, useEffect } from "react";
import { CustomInput, CustomTable } from "global/components";
import { useLocation } from "react-router-dom";
import { fetchResponseProposal } from "../AddProposal/AddProposal.service";
import CustomLoader from "global/components/CustomLoader/CustomLoader";
import {
  isTruthy,
  openInfoNotification,
  openSuccessNotification,
  openWarningNotification,
} from "helpers/methods";
import notifiers from "global/constants/NotificationConstants";
import {
  getAppprovedResponseContent,
  responseOrder,
} from "../Proposals.service";
import AddResponseContentModal from "../Components/AddResponseContent";

import { useAppSelector } from "../../../utils/hooks";
import { selectBackgroundColor } from "../../../redux/themeChangeSlice";
import { ResponseTabStyles as classes } from "./ResponseTab.styles";

import urls from "../../../global/constants/UrlConstants";
import history from "../../../utils/history";
import SSTemplate from "../../../assets/images/softsagesRFPCoverTemplate.png";
import SSTemplateMedical from "../../../assets/images/softSagesMedicalTemplate.png";
import SSTemplateCommon from "../../../assets/images/softsagesRFPCommonTemplate.png";
import _ from "lodash";
import { getCustomError } from "utils/customError";

interface ResponseProps {
  setOpenResponse: any;
  response: any;
  viewData: any;
  setSelectedResponse?: any;
  responseSelect?: any;
  setTemplateData?: any;
  templateData: any;
  openModalTemplate?: any;
  setOpenModalTemplate: any;
  selectedResponse?: any;
  interval?: any;
  typeData?: any;
  regionData?: any;
  domainData?: any;
  statusValue?: any;
  searchValue?: any;
  page?: any;
  redirect?: any;
}

const ResponseTab = (props: ResponseProps) => {
  const [loading, setLoading] = useState<boolean>(false);
  const urlParams = useLocation().search;
  const proposalId = new URLSearchParams(urlParams).get("id");
  const [tableData, setTableData] = useState<any>([]);
  const [pageSize, setPageSize] = useState(10);
  const [page, setPage] = useState(1);
  const userPerPage = 10;
  const pageVisited = (page - 1) * pageSize;
  const bgcolor = useAppSelector(selectBackgroundColor);
  const displayRows = tableData?.slice(pageVisited, pageVisited + pageSize);
  const [responseContent, setResponseContent] = useState([]);

  const tableHeader = [
    {
      name: "Title",
      field: "question",
    },
    {
      name: "Content",
      field: "answer",
    },
    {
      name: "Document Order",
      field: "order",
    },
  ];

  const existingDropdownValue = _.differenceBy(
    responseContent,
    tableData,
    "id"
  );

  useEffect(() => {
    if (proposalId) {
      fetchResponseTable();
      fetchAddResponseContent();
    }
  }, [proposalId]);

  useEffect(() => {
    if (props.responseSelect) {
      props.setSelectedResponse([]);
    }
  }, [props.responseSelect]);
  const fetchResponseTable = async () => {
    try {
      setLoading(true);
      const res = await fetchResponseProposal(proposalId, page, pageSize);
      const finalData = res.map((item: any, index: any) => {
        const text = document.createElement("div");
        text.innerHTML = item.answer;
        return {
          id: item.id,
          question: item.question,
          answer: text.innerText,
          order: item.order,
          audit: item.audit,
        };
      });

      setTableData(res);
      setLoading(false);
    } catch (error: any) {
      setLoading(false);
      getCustomError(error);
    }
  };
  const handleOnchange = async (data: any, event: any) => {
    if (event.target.value > 0 && event.target.value < 10000) {
      const addUserPayload = {
        audit: {
          createdBy: "",
          createdOn: data.audit.createdOn,
          thruZ: new Date(),
          updatedBy: "",
          updatedOn: null,
        },
        content: [
          {
            id: data.id,
            parentId: data.parentId,
            count: data.count,
            audit: null,
            order: event.target.value,
          },
        ],
        domain: "",
        order: event.target.value,
        proposalId: proposalId,
        proposalTitle: "",
        region: "",
        subDomain: "",
      };
      try {
        setLoading(true);
        const response = await responseOrder(data.id, addUserPayload);
        openSuccessNotification("Response order has been updated successfully");
        fetchResponseTable();
        fetchAddResponseContent();
        setLoading(false);
      } catch (error: any) {
        setLoading(false);
        getCustomError(error);
      }
    } else {
      openWarningNotification(
        "RFP response order must be between from 0 to 10000"
      );
    }
  };

  const editTableData = (item: any) => {
    return item.map((item: any) => {
      const text = document.createElement("div");
      text.innerHTML = item.answer;
      return {
        id: item.id,
        answer: { tooltip: text.innerText },
        order: {
          component: (
            <>
              <CustomInput
                type="number"
                name="number"
                id="number"
                value={item.order}
                onChange={(e: any) => handleOnchange(item, e)}
                customInputClasses={{
                  background: bgcolor ? "#282945" : "#ffffff",
                  "& .MuiInputBase-input": {
                    color: bgcolor ? "#CBCBCB" : "#000000",
                  },
                }}
              />
            </>
          ),
        },
        question: { tooltip: item.question },
        answer2: { tooltip: item.answer },
      };
    });
  };

  const fetchAddResponseContent = async () => {
    try {
      setLoading(true);
      const res = await getAppprovedResponseContent(
        props.viewData?.region,
        props.viewData?.domain,
        props.viewData?.subDomain,
        10,
        -1
      );
      setResponseContent(res);
      setLoading(false);
    } catch (error: any) {
      setLoading(false);
      getCustomError(error);
    }
  };
  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };
  const isSelected = (id: any) => {
    const findValue = props.selectedResponse.map((item: any) => item.id);
    return findValue.indexOf(id) !== -1;
  };
  const singleCheckboxHandler = (event: any, row: any) => {
    const selectedCheckBoxValue: any[] = [];
    if (isSelected(row.id)) {
      const removeSelectedArrayValue = props.selectedResponse?.filter(
        (element: any) => {
          return element.id !== row.id;
        }
      );
      props.setSelectedResponse(removeSelectedArrayValue);
    } else {
      if (event?.target?.checked) {
        selectedCheckBoxValue.push(...props.selectedResponse, {
          ...row,
          id: row.id,
          order: 0,
          answer: row.answer2.tooltip,
          answer2: row.answer2.tooltip,
          question: row.question.tooltip,
        });
        props.setSelectedResponse(selectedCheckBoxValue);
      }
    }
  };

  const selectAllCheckBoxHandler = (event: any) => {
    let checkBoxValue: any[] = [];
    if (event.target.checked) {
      const newSelected = tableData.map((item: any) => {
        return {
          ...item,
          id: item.id,
          order: 0,
          answer: item.answer2.tooltip,
          answer2: item.answer2.tooltip,
          question: item.question.tooltip,
        };
      });
      props.setSelectedResponse(newSelected);
      checkBoxValue.push(...props.selectedResponse, ...newSelected);
      props.setSelectedResponse(checkBoxValue);
      return;
    }
    let newSelected = tableData.map((item: any) => item.id);
    let unCheckSelectAll = props.selectedResponse?.filter(
      (item: any) => !newSelected.includes(item.id)
    );
    props.setSelectedResponse(unCheckSelectAll);
  };

  props.setSelectedResponse(props.selectedResponse);

  const addResponseContentModal = () => {
    return (
      <>
        <AddResponseContentModal
          setOpenViewModal={props.setOpenResponse}
          openViewModal={props.response}
          rowData={existingDropdownValue}
          viewData={props.viewData}
          fetchAddResponseContent={fetchResponseTable}
        />
      </>
    );
  };

  const temaplateData = () => {
    history.push(`${urls.RESPONSE_TEMPLATE_VIEW_PATH}?id=${proposalId}`, {
      selectedResponse: props.selectedResponse,
      templateData: props.templateData,
      interval: props.interval,
      type: props.typeData,
      region: props.regionData,
      domain: props.domainData,
      status: props.statusValue,
      page: props.page,
      searchValue: props.searchValue,
      redirect: props.redirect,
      title: props.viewData?.title,
    });
  };

  return (
    <>
      <Box>
        <CustomTable
          headers={tableHeader}
          rows={editTableData(tableData)}
          paginationCount={tableData?.length}
          isRowPerPageEnable={true}
          checkboxSelection={true}
          pageNumber={page}
          handlePageChange={handleChangePage}
          rowsPerPage={pageSize}
          pageSize={pageSize}
          setPage={setPage}
          setPageSize={setPageSize}
          handleClick={singleCheckboxHandler}
          isSelected={isSelected}
          onSelectAllClick={selectAllCheckBoxHandler}
          isSelectAll={props.selectedResponse.map((item: any) => item.id)}
          paginationDirection={"down"}
          headerTopLeftRightRadius={true}
          tooltipEnabled
          tableHeaderTextStart
        />
      </Box>
      {addResponseContentModal()}
      {props.openModalTemplate && temaplateData()}
      <CustomLoader isLoading={loading} />
    </>
  );
};

export default React.memo(ResponseTab);
