export class StringConstants {
  applicationJSON = { "Content-Type": "application/json" };
  multipartForm = { "Content-Type": "multipart/form-data" };

  RFP = "rfp";
  notification = "notification";
  error = "error";
  success = "success";
  warning = "warning";
  info = "info";
  autoHideDuration = 600 * 1000; //in milliseconds
  SEARCH_TIME_OUT = 1000;
  regex =
    /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
  regexPassword =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&*?]{8,100}$/;
  DATE_FORMAT = "MM/DD/YYYY";
  websiteRegex = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/;
  postalCodeRegex = /^-?[0-9]+$/;
  nameRegex = /^[a-zA-Z ]*$/;
  passwordValidationRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[#@$!%*?&])(?=.*[0-9])[A-Za-z\d#@$!%*?&]{8,}/;

  siteKey = "6LcfPTQiAAAAAEiV_UD6vAZCy2RkJ1heocnrPFSq";

  LOGIN = "login";
  LOGINTITLE = "Login";
  REGISTER = "register";
  REGISTER_TITLE = "Register";
  FORGOT_PASSWORD = "forgot-password";
  FORGOT_PASSWORD_TITLE = "Forgot-Password";
  RESET_PASSWORD = "changepwd";
  PLAN = "plan";

  PERSON = "Person";
  ORGANIZATION = "Organization";
  PROFILE = "Profile";
  CONSULTANT = "Consultant";
  DASHBOARD = "Dashboard";
  EMPLOYEE = "Employee";
  CLIENT = "Client";
  VENDOR = "Vendor";
  TIMESHEET = "Timesheet";
  INVOICE = "Invoice";
  LEAVE = "Leave";

  HIRED = "Hired";
  ACTIVE = "Active";
  INACTIVE = "Inactive";

  US = "United States";
  BASE64_ENCODING_PREFIX = "data =image/png;base64;";

  PROPOSALS = "All RFPs";
  REGISTERSUCCESSFULLY = "Registered";

  TASKS = "Tasks";
  WONPROPOSALS = "WonRFPs";
  DUEPROPOSALS = "DueRFPs";
  KNOWLEDGEBASE = "KnowledgeBase";
  ADMIN = "Admin";
  ACCOUNTADMIN = "Account Admin";
  USER = "Users";
  LEARNING = "Lost RFP Details";
  COMPETITIVE = "Comparison";
  AddUser = "Add User";
  STATUSCONTENT = "Content";
  RESPONSES = "Content Library";
  RESPONSEEDIT = "EditResponse";
  CONTENT = "content";
  ADDRESPONSE = "addResponse";
  VIEWCOMPETITIVE = "ViewCompetitive";
  ADDCOMPETITIVE = "Add Competitive";
  CONTANTS = "Contants";
  COMMENTS = "Comments";
  REPORTS = "Reports";
  MONTHLYREPORTS = "MonthlyReports";
  USERRFPREPORTS = "UserRfpReports";
  Proposal = "Proposals";
  AddProposal = "Add Proposal";
  ViewProposal = "ViewProposal";
  createRole = "Create Role";
  editRole = "Edit Role";
  rolesTable = "Roles Table";
  ROLEMANAGEMENT = "roles";
  Profile = "profile";
  Userprofile = "userprofile";
  BillingDetails = "billingDetails";
  PAGENOTFOUND = "pageNotFound";

  // tab value
  myTasks = "My Tasks";
  openTasks = "Open Tasks";
  MY = "my";
  OPEN = "Open";
  PROCESSADMIN = "Process Admin";
  // button text
  CANCEL = "Cancel";
  SUBMIT = "Submit";
  SAVE = "Save";
  COMPLETE = "Complete";
  Open = "open";
  APPROVED = "Approved";
  PENDING = "Pending";
  APP = "app";
  NEXT = "Next";
  adminPermission = "admin";
  ACCOUNT = "account";
  PAID = "PAID";

  // Resource List
  PROPOSAL = "proposal";
  RESPONSE = "response";

  // Permission List
  FETCH = "fetch";
  ADD = "add";
  UPDATE = "update";
  DELETE = "delete";
  TICKETS = "Tickets";

  //  for ticket
  assignData = "assignData";
  RaisedData = "RaisedData";
  OnboardTitle = "Let's get started | RFPPro";
  openData = "openData";
  completedData = "completedData";
  Reassign = "Reassign";
  DrawerTitle = "Ticket Details";
  ReassignTitleValue = "New Assignee";
  //ticketTabs
  assignedToMe = "Assigned To Me";
  raisedByMe = "Raised By Me";
  completedTickets = "Completed Tickets";
  openTickets = "Open Tickets";
  USER_DESCRIPTION_LIMIT = 500;
  TICKET_USER_TITLE_LIMIT = 50;
  reject = "reject";
}
let strings = new StringConstants();
export default strings;
