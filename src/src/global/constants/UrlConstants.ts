import { StringConstants } from "./StringConstants";

class UrlConstants extends StringConstants {
  PROD = false;

  PROD_BASE_URL = "https://services.softsages.com";
  DEV_BASE_URL = "https://api-uat.softsages.com";

  PROD_ERP_URL = `${this.PROD_BASE_URL}/erp`;
  PROD_CORE_URL = `${this.PROD_BASE_URL}/core`;
  // DEV_ERP_URL = `${this.DEV_BASE_URL}/erp`;
  // DEV_CORE_URL = `${this.DEV_BASE_URL}/core`;
  DEV_ERP_URL = "http://localhost:6010/erp";
  DEV_CORE_URL = "http://localhost:6040/core";

  ERP_SERVICE_URL = this.PROD ? this.PROD_ERP_URL : this.DEV_ERP_URL;
  CORE_SERVICE_URL = this.PROD ? this.PROD_CORE_URL : this.DEV_CORE_URL;

  STRIPE_PUBLIC_KEY = this.PROD
    ? "pk_live_51HaFc2LLGo9KaP036hbUAWNOSUa9RKxWxzk6czp2XV6tn1pQlK3CatOsSrKZgD7lGEMFCe6Rx81Zy9G1AzBKZjIX003pMWYXfc"
    : "pk_test_51OKDeGB85q5cvqk6nN1tX2jUwkRKbHvOrWorpZnxqbcc3lIIXITBywrpVHnu0LjdEy7ZU3OWGgmE6It0Wd1vJhZy00Zu3QMrXa";

  //VIEW PATHs
  planId = "b44ce0cd392a5b0b8dedc66c25213599";
  professional = "Professional";
  DEMO_HOSTNAME = "bid-demo.rfppro.app";
  LANDING_VIEW_PATH = "/";
  LOGIN_VIEW_PATH = "/login";
  FORGOT_PASSWORD_VIEW_PATH = "/forgot-password";
  REGISTER_VIEW_PATH = "/register";
  RESET_PASSWORD_VIEW_PATH = "/changepwd";
  TICKET_VIEW_PATH = "/tickets";
  DASHBOARD_VIEW_PATH = "/dashboard";
  PROPOSAL_VIEW_PATH = "/allrfp";
  TASK_VIEW_PATH = "/tasks";
  VIEW_PROPOSAL_VIEW_PATH = "/view-rfp";
  WON_PROPOSAL_VIEW_PATH = "/wonrfp";
  RESPONSE_VIEW_PATH = "/contents";
  RESPONSE_EDIT_PATH = "/edit-content";
  RESPONSE_ADD_PATH = "/add-content";
  RESPONSE_HISTORY_VIEW_PATH = "/contents-history";
  ADD_RESPONSE_VIEW_PATH = "/add-contents";
  CONTENT_VIEW_PATH = "/contents";
  DETAILS_COMPETITIVE_VIEW_PATH = "/detialsComparison";
  USERS_VIEW_PATH = "/users";
  ADMIN_VIEW_PATH = "/admin";
  ROLE_MANAGEMENT_VIEW_PATH = "/roles";
  USER_PROPOSAL_REPORTS = "/userrfpreports";
  DUE_PROPOSAL_VIEW_PATH = "/duerfp";
  PROPOSAL_MONTHLY_REPORTS = "/monthlyreports";
  USER_PROPOSAL_HISTORY_REPORT = "/userRfpReports-history";
  KNOWLEDGE_BASE_VIEW_PATH = "/KnowledgeBase";
  LEARNING_VIEW_PATH = "/lostRFPDetails";
  COMPETITIVE_VIEW_PATH = "/comparison";
  PROFILE_VIEW_PATH = "/profile";
  USER_PROFILE_VIEW_PATH = "/userProfile";
  RESPONSE_TEMPLATE_VIEW_PATH = "/responseTemplate";
  USER_REGISTERED_SUCCESSFUL_VIEW_PATH = "/registered";
  PROPOSAL_OWNER_EMAIL = "ownerEmail";
  PROPOSAL_OWNER_NAME = "ownerName";
  viewBillingDetails = "/billing-Details";

  LOGIN = `${this.CORE_SERVICE_URL}/public/user/login`;
  FORGET = `${this.CORE_SERVICE_URL}/public/user/pwd/reset`;
  REGISTER_USER = `${this.CORE_SERVICE_URL}/public/register`;
  VERIFY_TEMP_PWD = `${this.CORE_SERVICE_URL}/public/user/pwd/verify`;
  GET_PLANS = `${this.CORE_SERVICE_URL}/public/plans/rfppro`;
  VERIFY_TEMP_PWD_FOR_ACTIVATE_ACCOUNT = `${this.CORE_SERVICE_URL}/public/user/pwd/verify/activate`;
  UPDATE_PASSWORD = `${this.CORE_SERVICE_URL}/secure/user/pwd/update`;
  ACTIVATE_USER = `${this.ERP_SERVICE_URL}/secure/proposal/user/activate`;

  //DASHBOARD APIs
  GET_PROPOSAL_METRICS_BY_DATE_RANGE = `${this.ERP_SERVICE_URL}/proposal/fetch/metrics/total/region`;
  GET_TOTAL_PROPOSAL_METRICS = `${this.ERP_SERVICE_URL}/proposal/fetch/metrics/total`;
  getRfpDueCountwithDomain = `${this.ERP_SERVICE_URL}/proposal/fetch/metrics/due/region`;
  getRfpTotalWithDomain = `${this.ERP_SERVICE_URL}/proposal/fetch/metrics/totalWithDomain/region`;
  getRfpByStatusWithDomain = `${this.ERP_SERVICE_URL}/proposal/fetch/metrics/statusWithDomain/region`;
  getRfpByTypeWithDomain = `${this.ERP_SERVICE_URL}/proposal/fetch/metrics/typeWithDomain/region`;
  getRfpByDomainWithDomain = `${this.ERP_SERVICE_URL}/proposal/fetch/metrics/region`;
  getDomain = `${this.ERP_SERVICE_URL}/secure/proposal/domain`;
  getProjectTop = `${this.ERP_SERVICE_URL}/proposal/fetch/status/due/assignee`;
  getProjectTopCount = `${this.ERP_SERVICE_URL}/proposal/fetch/status/due/count/assignee`;
  getProjectTopSearch = `${this.ERP_SERVICE_URL}/proposal/fetch/status/due/search/assignee`;
  getProjectTopCountSearch = `${this.ERP_SERVICE_URL}/proposal/fetch/status/due/search/count/assignee`;
  getLostRfData = `${this.ERP_SERVICE_URL}/proposal/fetch/report/lost/reason`;
  getprojectVolumn = `${this.ERP_SERVICE_URL}/proposal/fetch/metrics/total`;
  getRegion = `${this.ERP_SERVICE_URL}/secure/proposal/region`;
  getRfpMetricsByAttribute = `${this.ERP_SERVICE_URL}/proposal/fetch/metrics`;
  getRfpTotal = `${this.ERP_SERVICE_URL}/proposal/fetch/metrics/total/interval`;
  getRfpTask = `${this.CORE_SERVICE_URL}/secure/workflow/tasks/my/metrics`;
  getRfpTaskOpen = `${this.CORE_SERVICE_URL}/secure/workflow/tasks/metrics`;
  getRfpByAttribute = `${this.ERP_SERVICE_URL}/secure/proposal`;
  getAnalytical = `${this.ERP_SERVICE_URL}/proposal/fetch/report`;
  getWeekReport = `${this.ERP_SERVICE_URL}/proposal/fetch/report/weekly`;
  getLastWonProposal = `${this.ERP_SERVICE_URL}/proposal/fetch/lastWon`;
  getMyTasksCount = `${this.CORE_SERVICE_URL}/secure/workflow/tasks/my/assigned/metrics`;
  getOpenTasksCount = `${this.CORE_SERVICE_URL}/secure/workflow/tasks/metrics`;
  getDocumentExpiry = `${this.CORE_SERVICE_URL}/secure/document/type`;
  getDomainValueForChart = `${this.ERP_SERVICE_URL}/proposal/fetch/metrics/domain/from`;
  getDomainValue = `${this.ERP_SERVICE_URL}/secure/proposal/domain/US`;
  getDomainAll = `${this.ERP_SERVICE_URL}/secure/proposal/domain/All`;
  getProposalType = `${this.ERP_SERVICE_URL}/secure/proposal/type`;
  getContract = `${this.ERP_SERVICE_URL}/secure/proposal/contract`;
  getAction = `${this.ERP_SERVICE_URL}/secure/proposal/action`;
  getSubmission = `${this.ERP_SERVICE_URL}/secure/proposal/submission`;
  getReason = `${this.ERP_SERVICE_URL}/secure/proposal/reason`;
  getPropsalStatus = `${this.ERP_SERVICE_URL}/secure/proposal/status`;
  getProposalData = `${this.ERP_SERVICE_URL}/proposal/fetch`;
  getProposalCount = `${this.ERP_SERVICE_URL}/proposal/fetch`;
  deleteProposal = `${this.ERP_SERVICE_URL}/proposal/delete`;

  //PROPOSAL APIs
  getSource = `${this.ERP_SERVICE_URL}/secure/proposal/source`;
  getProposalDomain = `${this.ERP_SERVICE_URL}/secure/proposal/domain`;
  getUserPage = `${this.CORE_SERVICE_URL}/secure/users/limit/All/page/-1`;
  getCountries = `${this.CORE_SERVICE_URL}/secure/location/countries`;
  getSubdomain = `${this.ERP_SERVICE_URL}/secure/proposal/subDomain`;
  getStateValue = `${this.CORE_SERVICE_URL}/secure/location/country`;
  viewProposal = `${this.ERP_SERVICE_URL}/proposal/fetch`;
  responseTabProposal = `${this.ERP_SERVICE_URL}/proposal/response/fetch/content/proposal`;
  fetchDocument = `${this.CORE_SERVICE_URL}/secure/documents/owner`;
  DOWNLOAD_FILE = `${this.CORE_SERVICE_URL}/secure/document/download`;
  uploadDocument = `${this.CORE_SERVICE_URL}/secure/document/upload/owner`;
  uploadLogoFile = `${this.ERP_SERVICE_URL}/secure/document/upload/folder/logos`;
  addTask = `${this.CORE_SERVICE_URL}/secure/workflow/task/add`;
  updateProposal = `${this.ERP_SERVICE_URL}/proposal/update`;
  documentAdd = `${this.CORE_SERVICE_URL}/secure/document/add`;
  downLoadZip = `${this.CORE_SERVICE_URL}/secure/document/download/zip`;
  deleteDocument = `${this.CORE_SERVICE_URL}/secure/document/delete`;
  wonProposalUpdate = `${this.ERP_SERVICE_URL}/proposal/competitive/add`;
  followUpPropsal = `${this.ERP_SERVICE_URL}/proposal/update/followUp`;
  searchingProspsal = `${this.ERP_SERVICE_URL}/proposal/fetch/search`;
  competitiveAdd = `${this.ERP_SERVICE_URL}/proposal/competitive/add`;
  competitiveDelete = `${this.ERP_SERVICE_URL}/proposal/response/competitive/delete`;
  responseAdd = `${this.ERP_SERVICE_URL}/proposal/response/add`;
  responseOrderChange = `${this.ERP_SERVICE_URL}/proposal/response/order/update`;
  responseExport = `${this.ERP_SERVICE_URL}/proposal/response/fetch/content/export`;
  completeTaskAction = `${this.ERP_SERVICE_URL}/proposal/task/update/action`;

  //TASK APIs
  getMyTasks = `${this.CORE_SERVICE_URL}/secure/workflow/tasks`;
  getOpenTasks = `${this.CORE_SERVICE_URL}/secure/workflow/tasks`;
  getMyTasksSearch = `${this.CORE_SERVICE_URL}/secure/workflow/tasks`;
  getOpenTasksSearch = `${this.CORE_SERVICE_URL}/secure/workflow/tasks/search/status`;
  getOpenCount = `${this.CORE_SERVICE_URL}/secure/workflow/tasks/metrics`;
  getMyCount = `${this.CORE_SERVICE_URL}/secure/workflow/tasks/my/assigned/metrics`;
  changeDueByDate = `${this.CORE_SERVICE_URL}/secure/workflow/task/due/update`;
  updateAssignTo = `${this.CORE_SERVICE_URL}/secure/workflow/task/assign`;
  isProcessAdmin = `${this.CORE_SERVICE_URL}/secure/workflow/isProcessAdmin`;

  //SUPPORT TICKET APIs
  ASSIGNED = `${this.CORE_SERVICE_URL}/secure/workflow/tasks/`;
  ASSIGNED_SEARCH_DATA = `${this.CORE_SERVICE_URL}/secure/workflow/myTasks`;
  ASSIGNED_SEARCH_COUNT = `${this.CORE_SERVICE_URL}/secure/workflow/myTasks/count`;
  RAISED = `${this.CORE_SERVICE_URL}/secure/workflow/tasks/my/created`;
  RAISED_COUNT = `${this.CORE_SERVICE_URL}/secure/workflow/tasks/count/my/created`;
  RAISED_SEARCH_DATA = `${this.CORE_SERVICE_URL}/secure/workflow/myTasks/created`;
  RAISED_SEARCH_COUNT = `${this.CORE_SERVICE_URL}/secure/workflow/myTasks/count/created`;
  COMPLETED = `${this.CORE_SERVICE_URL}/secure/workflow/tasks/completed`;
  COMPLETED_COUNT = `${this.CORE_SERVICE_URL}/secure/workflow/tasks/count/completed`;
  COMPLETED_SEARCH_DATA = `${this.CORE_SERVICE_URL}/secure/workflow/tasks/completed`;
  COMPLETED_SEARCH_COUNT = `${this.CORE_SERVICE_URL}/secure/workflow/tasks/count/completed`;
  OPEN = `${this.CORE_SERVICE_URL}/secure/workflow/tasks/status/Open`;
  OPEN_COUNT = `${this.CORE_SERVICE_URL}/secure/workflow/tasks/count/open`;
  OPEN_SEARCH_DATA = `${this.CORE_SERVICE_URL}/secure/workflow/tasks`;
  OPEN_SEARCH_COUNT = `${this.CORE_SERVICE_URL}/secure/workflow/tasks/count`;
  GET_TASK_BY_ID = `${this.CORE_SERVICE_URL}/secure/workflow/task`;
  UPDATE_TASK = `${this.CORE_SERVICE_URL}/secure/workflow/task/update`;
  COMPLETE = `${this.CORE_SERVICE_URL}/secure/workflow/task/complete/true`;
  ASSIGNEE_GROUP_NAME = `${this.CORE_SERVICE_URL}/secure/workflow/task/group/Workforce%20Support%20Process`;
  REASSIGN_TICKET = `${this.CORE_SERVICE_URL}/secure/workflow/task/assign`;
  ASSIGNED_COUNT = `${this.CORE_SERVICE_URL}/secure/workflow/tasks/count/my`;
  PROCESS_DEFINITIONS = `${this.CORE_SERVICE_URL}/secure/workflow/process/def`;
  CREATE_TICKET = `${this.CORE_SERVICE_URL}/secure/support/ticket/add`;
  UPLOAD_DOCUMENT = `${this.ERP_SERVICE_URL}/secure/document/upload/owner`;
  PREVIEW_DOCUMENT = `${this.CORE_SERVICE_URL}/secure/document/view`;
  UPDATE_DOCUMENT = `${this.CORE_SERVICE_URL}/secure/document/inactivate`;
  DOWNLOAD_DOCUMENT = `${this.ERP_SERVICE_URL}/secure/document/download`;
  Add_Support = `${this.CORE_SERVICE_URL}/secure/support/ticket/add`;
  attachFileUpload = `${this.ERP_SERVICE_URL}/secure/document/upload/owner/entityId`;

  //WON PROPOSAL APIs
  getExpiredWon = `${this.ERP_SERVICE_URL}/proposal/fetch/status/won/expired`;
  getExpiredWonCount = `${this.ERP_SERVICE_URL}/proposal/fetch/status/won/expired`;
  getExpiredWonSearch = `${this.ERP_SERVICE_URL}/proposal/fetch/status/won/expired/search`;
  getExpiredWonCountSearch = `${this.ERP_SERVICE_URL}/proposal/fetch/status/won/expired/search`;
  getContinueWon = `${this.ERP_SERVICE_URL}/proposal/fetch/status/won`;
  getContinueWonSearch = `${this.ERP_SERVICE_URL}/proposal/fetch/status/won/search`;
  getContinueWonCount = `${this.ERP_SERVICE_URL}/proposal/fetch/status/won`;
  getContinueWonCountSearch = `${this.ERP_SERVICE_URL}/proposal/fetch/status/won/search`;
  getStateData = `${this.CORE_SERVICE_URL}/secure/location`;
  getWon = `${this.ERP_SERVICE_URL}/proposal/fetch/status/won/all`;
  onBoardViewPath = "/onboard";
  getWonCount = `${this.ERP_SERVICE_URL}/proposal/fetch/status/won/all`;
  getWonSearch = `${this.ERP_SERVICE_URL}/proposal/fetch/status/won/all/search`;
  getWonCountSearch = `${this.ERP_SERVICE_URL}/proposal/fetch/status/won/all/search`;

  //ADMIN APIs
  getProcessDef = `${this.CORE_SERVICE_URL}/secure/workflow/process/def`;
  getStatus = `${this.ERP_SERVICE_URL}/secure/proposal/status`;
  getType = `${this.ERP_SERVICE_URL}/secure/proposal/type`;
  getContact = `${this.ERP_SERVICE_URL}/secure/proposal/contract`;
  getSubDomain = `${this.ERP_SERVICE_URL}/secure/proposal/subDomain`;
  addAttribute = `${this.ERP_SERVICE_URL}/proposal`;
  deleteAttribute = `${this.ERP_SERVICE_URL}/proposal`;

  //MONTHLY REPORT APIs
  getMonthlyReport = `${this.ERP_SERVICE_URL}/proposal/fetch/report`;
  submitProposal = `${this.ERP_SERVICE_URL}/proposal/add`;

  //USER APIs
  getUsers = `${this.CORE_SERVICE_URL}/secure/users`;
  getUsersEdit = `${this.CORE_SERVICE_URL}/secure/user`;
  getUsersData = `${this.CORE_SERVICE_URL}/secure/users/limit/All/page`;
  getUserSearch = `${this.CORE_SERVICE_URL}/secure/user/search`;
  usersCount = `${this.CORE_SERVICE_URL}/secure/users/metrics`;
  usersCountSearch = `${this.CORE_SERVICE_URL}/secure/user/search/count`;
  getUserRole = `${this.CORE_SERVICE_URL}/roles`;
  addUser = `${this.CORE_SERVICE_URL}/secure/user/add`;
  updateUser = `${this.CORE_SERVICE_URL}/secure/user/update`;
  updateUserProfile = `${this.CORE_SERVICE_URL}/secure/user/profile/update`;
  deleteUser = `${this.CORE_SERVICE_URL}/secure/user/delete`;
  updateProfile = `${this.CORE_SERVICE_URL}/user/account/details/update`;
  getUser = `${this.CORE_SERVICE_URL}/secure/user/email`;
  getCompanyProfile = `${this.CORE_SERVICE_URL}/secure/account/details`;

  //RESPONSE APIs
  getResponsesData = `${this.ERP_SERVICE_URL}/proposal/response/fetch/content`;
  getResponsesDataCount = `${this.ERP_SERVICE_URL}/proposal/response/fetch/content/count`;
  getResponsesSearchData = `${this.ERP_SERVICE_URL}/proposal/response/fetch/content/search`;
  getResponse = `${this.ERP_SERVICE_URL}/proposal/response/fetch/content`;
  addResponses = `${this.ERP_SERVICE_URL}/proposal/response/content/add`;
  getHistory = `${this.ERP_SERVICE_URL}/proposal/response/fetch/content/child`;
  getOldContent = `${this.ERP_SERVICE_URL}/proposal/response/fetch/content/parentId`;
  getNewContent = `${this.ERP_SERVICE_URL}/proposal/response/fetch/content`;
  getContentReject = `${this.ERP_SERVICE_URL}/proposal/response/content/reject`;
  getContentApproved = `${this.ERP_SERVICE_URL}/proposal/response/content/update`;
  deleteResponse = `${this.ERP_SERVICE_URL}/proposal/response/content/delete`;
  addResponseContent = `${this.ERP_SERVICE_URL}/proposal/response/fetch/content`;
  getApprovedResponseContent = `${this.ERP_SERVICE_URL}/proposal/response/fetch/content/status/approved`;

  //COMPETITIVE APIs
  getCompetitiveData = `${this.ERP_SERVICE_URL}/proposal/response/fetch/competitive`;
  getSearchCompetitiveData = `${this.ERP_SERVICE_URL}/proposal/response/fetch/competitive/search`;
  getCompetitiveCount = `${this.ERP_SERVICE_URL}/proposal/response/fetch/competitive/count`;
  getSearchCompetitiveCount = `${this.ERP_SERVICE_URL}/proposal/response/fetch/competitive/search/count`;
  addCompetitive = `${this.ERP_SERVICE_URL}/proposal/response/competitive/add`;
  viewCompetitive = `${this.ERP_SERVICE_URL}/proposal/response/fetch/competitive`;
  updateComptetive = `${this.ERP_SERVICE_URL}/proposal/response/competitive/update`;

  //LEARNING APIs
  getLearningData = `${this.ERP_SERVICE_URL}/proposal/fetch/competitive/comment`;
  getSearchData = `${this.ERP_SERVICE_URL}/proposal/fetch/competitive/comment/search`;

  //ROLES MANAGEMENT
  GET_RESOURCES_BY_DOMAIN = `${this.ERP_SERVICE_URL}/resources/`;
  GET_ROLES_BY_DOMAIN = `${this.ERP_SERVICE_URL}/roles`;
  GET_ROLES_BY_DOMAIN_COUNT = `${this.ERP_SERVICE_URL}/roles/count`;
  GET_ROLES_SEARCH = `${this.ERP_SERVICE_URL}/roles/search`;
  GET_ROLES_SEARCH_COUNT = `${this.ERP_SERVICE_URL}/roles/count/search`;
  ADD_ROLE = `${this.ERP_SERVICE_URL}/role/add`;
  UPDATE_ROLE = `${this.ERP_SERVICE_URL}/role/update`;

  //EXPORT REPORT APIs
  Export_FILE = `${this.ERP_SERVICE_URL}/proposal/fetch/report/download`;
  EXORT_FILE_USER = `${this.ERP_SERVICE_URL}/proposal/fetch/report/download/statusHistory/ByDateWithAction`;
  EXPORT_FILE_LOST_RFP = `${this.ERP_SERVICE_URL}/proposal/fetch/report/download/competitive/comment`;

  //billing details
  BILLING_URL = `${this.CORE_SERVICE_URL}/billing`;
  getPlanDetail = `${this.BILLING_URL}/fetch/planLimit`;
  getCardDetail = `${this.BILLING_URL}/fetch/paymentMethod`;
  addCard = `${this.BILLING_URL}/${this.ADD}/paymentMethod`;
  changePlan = `${this.BILLING_URL}/${this.ADD}/paidCustomer`;
  deleteCard = `${this.BILLING_URL}/${this.DELETE}/paymentMethod`;
  updatePlan = `${this.BILLING_URL}/${this.UPDATE}/plan`;
  viewPlans = `${this.CORE_SERVICE_URL}/public/plans`;
  featurePlan = `${this.CORE_SERVICE_URL}/public/plan/account`;
  isActiveCancelSubscription = `${this.BILLING_URL}/fetch/subscription/status`;
  cancelSubscription = `${this.BILLING_URL}/${this.DELETE}/subscription`;
  setPrimaryCard = `${this.BILLING_URL}/${this.UPDATE}/paymentMethod`;
  getInvoice = `${this.BILLING_URL}/fetch/invoice/page`;
  getInvoiceCount = `${this.BILLING_URL}/fetch`;
}

let urls = new UrlConstants();
export default urls;
