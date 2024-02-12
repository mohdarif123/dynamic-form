import strings from "global/constants/StringConstants";

export const tasksHeader = [
  {
    name: "Title",
    field: "name",
  },
  {
    name: "Description",
    field: "description",
  },
  {
    name: "RFP Title",
    field: "rfpTitle",
  },
  {
    name: "Agency Name",
    field: "agencyName",
  },
  {
    name: "RFP Due Date",
    field: "rfpDueDate",
  },
  {
    name: "Assigned To",
    field: "assignorName",
  },
  {
    name: "Due By",
    field: "dueDate",
  },
  {
    name: "Action",
    field: "action",
  },
];

export const dicision = [
  {
    name: "Yes",
    value: "Yes",
  },
  {
    name: "No",
    value: "No",
  },
];

export const tasksTabContent = {
  myTasks: {
    label: strings.myTasks,
    value: strings.MY,
  },
  openTasks: {
    label: strings.openTasks,
    value: strings.OPEN,
  },
};

const { myTasks, openTasks } = tasksTabContent;

export const CustomTabConfig = {
  Admin: [myTasks],
  Manager: [myTasks],
  "Account Admin": [myTasks],
  Creator: [myTasks],
  Owner: [myTasks],
  Reviewer: [myTasks],
  StaffingBidDecisionMaker: [myTasks],
  SecurityBidDecisionMaker: [myTasks],
  TechBidDecisionMaker: [myTasks],
  NetworkingBidDecisionMaker: [myTasks],
  "Process Admin": [myTasks, openTasks],
} as any;
