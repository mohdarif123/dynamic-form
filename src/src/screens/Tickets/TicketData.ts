import strings from "global/constants/StringConstants";
import { tabInterface } from "models/interfaces";

export const assignedTicketHeader = [
  {
    name: "Title",
    field: "name",
  },
  {
    name: "Process",
    field: "process",
  },
  {
    name: "Ticket #",
    field: "id",
  },
  {
    name: "Description",
    field: "description",
  },

  {
    name: "Assignee to",
    field: "assigneeName",
  },
  {
    name: "Status",
    field: "status",
  },
  {
    name: "Due By",
    field: "dueDate",
  },
  {
    name: "Action",
    field: "actionComplete",
  },
];

export const RaisedTicketHeader = [
  {
    name: "Title",
    field: "name",
  },
  {
    name: "Process",
    field: "process",
  },
  {
    name: "Ticket #",
    field: "id",
  },
  {
    name: "Description",
    field: "description",
  },

  {
    name: "Assignee(s)",
    field: "assigneeName",
  },
  {
    name: "Status",
    field: "status",
  },
  {
    name: "Due By",
    field: "dueDate",
  },
];

export const completeTicketHeader = [
  {
    name: "Title",
    field: "name",
  },
  {
    name: "Process",
    field: "process",
  },
  {
    name: "Ticket #",
    field: "id",
  },
  {
    name: "Description",
    field: "description",
  },

  {
    name: "Assigned to",
    field: "assigneeName",
  },

  {
    name: "Due By",
    field: "dueDate",
  },
];

export const openTicketHeader = [
  {
    name: "Title",
    field: "name",
  },
  {
    name: "Process",
    field: "process",
  },
  {
    name: "Ticket #",
    field: "id",
  },
  {
    name: "Description",
    field: "description",
  },

  {
    name: "Assignee(s)",
    field: "assigneeName",
  },

  {
    name: "Due By",
    field: "dueDate",
  },

  // {
  //   name: "Action",
  //   field: "action",
  // },
];

export const fileFormate = [
  "jpeg",
  "gif",
  "png",
  "jpeg",
  "jpg",
  "pdf",
  "png",
  "txt",
];

export const TicketTabContent = {
  assignedToMee: {
    label: strings.assignedToMe,
    count: "",
  },
  raisedByMe: {
    label: strings.raisedByMe,
    count: 0,
  },
  openTickets: {
    label: strings.openTickets,
    count: 0,
  },
  completedTickets: {
    label: strings.completedTickets,
    count: 0,
  },
};

const { assignedToMee, raisedByMe, openTickets, completedTickets } =
  TicketTabContent;

export const tabConfig = {
  Admin: [assignedToMee, raisedByMe, openTickets, completedTickets],
  Reviewer: [assignedToMee, raisedByMe],
  Creator: [assignedToMee, raisedByMe],
  Owner: [assignedToMee, raisedByMe],
  Manager: [assignedToMee, raisedByMe],
  NetworkingBidDecisionMaker: [assignedToMee, raisedByMe],
  TechBidDecisionMaker: [assignedToMee, raisedByMe],
  StaffingBidDecisionMaker: [assignedToMee, raisedByMe],
  SecurityBidDecisionMaker: [assignedToMee, raisedByMe],
  "Account Admin": [assignedToMee, raisedByMe, openTickets, completedTickets],
  "Process Admin": [assignedToMee, raisedByMe, openTickets, completedTickets],
} as { [key: string]: tabInterface[] };
