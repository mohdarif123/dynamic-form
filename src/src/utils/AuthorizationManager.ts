/* eslint-disable no-sparse-arrays */
import strings from "global/constants/StringConstants";
import urls from "global/constants/UrlConstants";
import { store } from "./store";
import { FormattedResources } from "models/interfaces";
import Dashboard from "assets/icons/sidebaricon/Dashboard.svg";
import DashboardLight from "assets/unSelecte/DashboardInactiveLight.svg";
import DashboardActive from "assets/icons/sidebaricon/DashboardActive.svg";
import DashboardLightActive from "assets/selected/DashboardLightActive.svg";
import Admin from "assets/icons/sidebaricon/Admin.svg";
import AdminLight from "assets/unSelecte/AdminInactiveLight.svg";
import AdminActive from "assets/icons/sidebaricon/AdminActive.svg";
import AdminLightActiveOld from "assets/icons/AdminLightActiveOld.svg";
import Comparison from "assets/icons/sidebaricon/Comparison.svg";
import ComparisonLight from "assets/unSelecte/ComparisonInactiveLight.svg";
import ComparisonActive from "assets/icons/sidebaricon/ComparisonActive.svg";
import ComparisonLightActive from "assets/selected/ComparisonLightActive.svg";
import Content from "assets/icons/sidebaricon/Content.svg";
import ContentLight from "assets/unSelecte/ContentLiberaryInactiveIcon.svg";
import ContentLightActive from "assets/selected/ContentLibraryLightActive.svg";
import LostRfp from "assets/icons/sidebaricon/LostRfp.svg";
import LostRfpLight from "assets/unSelecte/LostRfpInactiveLight.svg";
import LostRfpActive from "assets/icons/sidebaricon/LostRfpActive.svg";
import LostRfpLightActive from "assets/selected/LostRfpDetailsLightActive.svg";
import MonthlyReport from "assets/icons/sidebaricon/MonthlyReport.svg";
import MonthlyReportLight from "assets/unSelecte/MonthlyReportinactiveLight.svg";
import MonthlyReportActive from "assets/icons/sidebaricon/MonthlyReportActive.svg";
import MonthlyReportLightActive from "assets/selected/MonthlyReportLightActive.svg";
import Proposal from "assets/icons/sidebaricon/Proposal.svg";
import ProposalLight from "assets/unSelecte/ProposalInactiveLight.svg";
import ProposalActive from "assets/icons/sidebaricon/ProposalActive.svg";
import ProposalLightActive from "assets/selected/ProposalLightActive.svg";
import AllRfpDarkInActive from "assets/icons/AllrfpDarkInActive.svg";
import AllRfpDarkActive from "assets/icons/AllrfpDarkActive.svg";
import AllRfpLightInActive from "assets/icons/AllrfpLightInActive.svg";
import AllRfpLightActive from "assets/icons/AllrfpLightActive.svg";
import DueRfpDarkInActive from "assets/icons/DuerfpDarkInActive.svg";
import DueRfpDarkActive from "assets/icons/DuerfpDarkActive.svg";
import DueRfpLightInActive from "assets/icons/DuerfpLightInActive.svg";
import DueRfpLightActive from "assets/icons/DuerfpLightActive.svg";
import reportDarkInActive from "assets/icons/ReportDarkInActive.svg";
import reportDarkActive from "assets/icons/ReportDarkActive.svg";
import reportLightInActive from "assets/icons/ReportLightInActive.svg";
import reportLightActive from "assets/icons/ReportLightActive.svg";
import ContentLibraryDarkInActive from "assets/icons/ContentLibraryDarkInActive.svg";
import ContentLibraryDarkActive from "assets/icons/ContentLibraryDarkActive.svg";
import ContentLibraryLightInActive from "assets/icons/ContentLibraryLightInActive.svg";
import ContentLibraryLightActive from "assets/icons/ContentLibraryLightActive.svg";
import AdminDarkInActive from "assets/icons/AdminDarkInActive.svg";
import AdminLightInActive from "assets/icons/AdminLightInActive.svg";
import AdminLightActive from "assets/icons/AdminLightActive.svg";
import Tasks from "assets/icons/sidebaricon/Tasks.svg";
import TasksLight from "assets/unSelecte/TasksInactiveLight.svg";
import TasksActive from "assets/icons/sidebaricon/TasksActive.svg";
import TasksLightActive from "assets/selected/TasksLightActive.svg";
import UserRfpReport from "assets/icons/sidebaricon/UserRfpReport.svg";
import UserRfpReportLight from "assets/unSelecte/UserRfpReportsInactiveLight.svg";
import UserRfpReportActive from "assets/icons/sidebaricon/UserRfpReportActive.svg";
import UserRfpReportLightActive from "assets/selected/UserRfpReportLightActive.svg";
import Users from "assets/icons/sidebaricon/Users.svg";
import UserLight from "assets/unSelecte/UsersInactiveLight.svg";
import UsersActive from "assets/icons/sidebaricon/UsersActive.svg";
import UserlightActive from "assets/selected/UserLightActive.svg";
import WonProposal from "assets/icons/sidebaricon/WonProposal.svg";
import WonProposalLight from "assets/unSelecte/WonInactiveLight.svg";
import WonProposalActive from "assets/icons/sidebaricon/WonProposalActive.svg";
import WonProposallightActive from "assets/selected/WonProposalLightActiv.svg";

export interface MainMenusTypes {
  icon: string;
  lightIcon: string;
  activeIcon: string;
  lightActiveIcon: string;
  text: string;
  key: string;
  link: string;
  pageName: string;
  accessToResource: string[];
  permissions: string[];
  sidebarMapping: SideBarMapping[];
}

export type SideBarMapping = {
  resource: string;
  permissions: string[];
  allPermissionRequired: boolean;
};

const ListOfMenus: any[] = [
  {
    icon: Dashboard,
    lightIcon: DashboardLight,
    activeIcon: DashboardActive,
    lightActiveIcon: DashboardLightActive,
    text: "Dashboard",
    key: "dashboard",
    link: urls.DASHBOARD_VIEW_PATH,
    pageName: strings.DASHBOARD,
    sidebarMapping: [
      {
        resource: strings.PROPOSAL,
        permissions: [strings.FETCH],
        allPermissionRequired: true,
      },
      {
        resource: strings.RESPONSE,
        permissions: [strings.FETCH],
        allPermissionRequired: true,
      },
    ],
  },
  {
    icon: Proposal,
    lightIcon: ProposalLight,
    activeIcon: ProposalActive,
    lightActiveIcon: ProposalLightActive,
    text: "RFPs",
    key: "allrfp",
    sidebarMapping: [
      {
        resource: strings.PROPOSAL,
        permissions: [strings.FETCH],
        allPermissionRequired: true,
      },
    ],
    subMenu: [
      {
        icon: AllRfpDarkInActive,
        lightIcon: AllRfpLightInActive,
        activeIcon: AllRfpDarkActive,
        lightActiveIcon: AllRfpLightActive,
        text: "All RFPs",
        key: "allrfp",
        link: urls.PROPOSAL_VIEW_PATH,
        pageName: strings.Proposal,
        sidebarMapping: [
          {
            resource: strings.PROPOSAL,
            permissions: [strings.FETCH],
            allPermissionRequired: true,
          },
        ],
      },
      {
        icon: DueRfpDarkInActive,
        lightIcon: DueRfpLightInActive,
        activeIcon: DueRfpDarkActive,
        lightActiveIcon: DueRfpLightActive,
        text: "Due RFPs",
        key: "duerfp",
        link: urls.DUE_PROPOSAL_VIEW_PATH,
        pageName: strings.DUEPROPOSALS,
        sidebarMapping: [
          {
            resource: strings.PROPOSAL,
            permissions: [strings.FETCH],
            allPermissionRequired: true,
          },
        ],
      },
      {
        icon: WonProposal,
        lightIcon: WonProposalLight,
        activeIcon: WonProposalActive,
        lightActiveIcon: WonProposallightActive,
        text: "Won RFPs",
        key: "wonrfp",
        link: urls.WON_PROPOSAL_VIEW_PATH,
        pageName: strings.WONPROPOSALS,
        sidebarMapping: [
          {
            resource: strings.PROPOSAL,
            permissions: [strings.FETCH],
            allPermissionRequired: true,
          },
        ],
      },
    ],
  },
  {
    icon: Tasks,
    lightIcon: TasksLight,
    activeIcon: TasksActive,
    lightActiveIcon: TasksLightActive,
    text: "Tasks",
    key: "tasks",
    link: urls.TASK_VIEW_PATH,
    pageName: strings.TASKS,
    sidebarMapping: [
      {
        resource: strings.PROPOSAL,
        permissions: [strings.FETCH],
        allPermissionRequired: true,
      },
      {
        resource: strings.RESPONSE,
        permissions: [strings.FETCH],
        allPermissionRequired: true,
      },
    ],
  },

  {
    icon: Content,
    lightIcon: ContentLight,
    activeIcon: ProposalActive,
    lightActiveIcon: ContentLightActive,
    text: "Knowledge Base",
    key: "contents",
    sidebarMapping: [
      {
        resource: strings.RESPONSE,
        permissions: [strings.FETCH],
        allPermissionRequired: true,
      },
    ],
    subMenu: [
      {
        icon: ContentLibraryDarkInActive,
        lightIcon: ContentLibraryLightInActive,
        activeIcon: ContentLibraryDarkActive,
        lightActiveIcon: ContentLibraryLightActive,
        text: "Content Library",
        key: "contents",
        link: urls.RESPONSE_VIEW_PATH,
        pageName: strings.CONTENT,
        sidebarMapping: [
          {
            resource: strings.RESPONSE,
            permissions: [strings.FETCH],
            allPermissionRequired: true,
          },
        ],
      },
      {
        icon: LostRfp,
        lightIcon: LostRfpLight,
        activeIcon: LostRfpActive,
        lightActiveIcon: LostRfpLightActive,
        text: "Lost RFP Details",
        key: "lostRFPDetails",
        link: urls.LEARNING_VIEW_PATH,
        pageName: strings.LEARNING,
        sidebarMapping: [
          {
            resource: strings.PROPOSAL,
            permissions: [strings.FETCH],
            allPermissionRequired: true,
          },
        ],
      },
      {
        icon: Comparison,
        lightIcon: ComparisonLight,
        activeIcon: ComparisonActive,
        lightActiveIcon: ComparisonLightActive,
        text: "Comparison",
        key: "comparison",
        link: urls.COMPETITIVE_VIEW_PATH,
        pageName: strings.COMPETITIVE,
        sidebarMapping: [
          {
            resource: strings.PROPOSAL,
            permissions: [strings.FETCH],
            allPermissionRequired: true,
          },
        ],
      },
    ],
  },

  {
    icon: AdminDarkInActive,
    lightIcon: AdminLightInActive,
    activeIcon: AdminDarkInActive,
    lightActiveIcon: AdminLightActive,
    text: "Admin",
    key: "admin",
    sidebarMapping: [
      {
        resource: strings.APP,
        permissions: [strings.adminPermission],
        allPermissionRequired: true,
      },
      {
        resource: strings.ACCOUNT,
        permissions: [strings.adminPermission],
        allPermissionRequired: true,
      },
    ],
    subMenu: [
      {
        icon: Admin,
        lightIcon: AdminLight,
        activeIcon: AdminActive,
        lightActiveIcon: AdminLightActiveOld,
        text: "Admin",
        key: "admin",
        link: urls.ADMIN_VIEW_PATH,
        pageName: strings.ADMIN,
        sidebarMapping: [
          {
            resource: strings.APP,
            permissions: [strings.adminPermission],
            allPermissionRequired: true,
          },
          {
            resource: strings.ACCOUNT,
            permissions: [strings.adminPermission],
            allPermissionRequired: true,
          },
        ],
      },
      {
        icon: Users,
        lightIcon: UserLight,
        activeIcon: UsersActive,
        lightActiveIcon: UserlightActive,
        text: "Users",
        key: "users",
        link: urls.USERS_VIEW_PATH,
        pageName: strings.USER,
        sidebarMapping: [
          {
            resource: strings.APP,
            permissions: [strings.adminPermission],
            allPermissionRequired: true,
          },
          {
            resource: strings.ACCOUNT,
            permissions: [strings.adminPermission],
            allPermissionRequired: true,
          },
        ],
      },
    ],
  },

  // {
  //   icon: Role,
  //   activeIcon: RoleActive,
  //   text: "Role Management",
  //   key: "roles",
  //   link: urls.RoleManagementPageViewPath,
  //   pageName: strings.ROLEMANAGEMENT,
  //   sidebarMapping: [
  //     {
  //       resource: strings.APP,
  //       permissions: [strings.adminPermission],
  //       allPermissionRequired: true,
  //     },
  //     {
  //       resource: strings.ACCOUNT,
  //       permissions: [strings.adminPermission],
  //       allPermissionRequired: true,
  //     },
  //   ],
  // },

  {
    icon: reportDarkInActive,
    lightIcon: reportLightInActive,
    activeIcon: reportDarkActive,
    lightActiveIcon: reportLightActive,
    text: "Reports",
    key: "monthlyreports",
    sidebarMapping: [
      {
        resource: strings.PROPOSAL,
        permissions: [strings.FETCH],
        allPermissionRequired: true,
      },
    ],
    subMenu: [
      {
        icon: MonthlyReport,
        lightIcon: MonthlyReportLight,
        activeIcon: MonthlyReportActive,
        lightActiveIcon: MonthlyReportLightActive,
        text: "Monthly Reports",
        key: "monthlyreports",
        link: urls.PROPOSAL_MONTHLY_REPORTS,
        pageName: strings.MONTHLYREPORTS,
        sidebarMapping: [
          {
            resource: strings.PROPOSAL,
            permissions: [strings.FETCH],
            allPermissionRequired: true,
          },
        ],
      },
      {
        icon: UserRfpReport,
        lightIcon: UserRfpReportLight,
        activeIcon: UserRfpReportActive,
        lightActiveIcon: UserRfpReportLightActive,
        text: "User RFP Reports",
        key: "userrfpreports",
        link: urls.USER_PROPOSAL_REPORTS,
        pageName: strings.USERRFPREPORTS,
        sidebarMapping: [
          {
            resource: strings.PROPOSAL,
            permissions: [strings.FETCH],
            allPermissionRequired: true,
          },
        ],
      },
    ],
  },
] as MainMenusTypes[];

export const ticket = () => {
  return {
    icon: Tasks,
    activeIcon: TasksActive,
    lightIcon: TasksLight,
    lightActiveIcon: TasksLightActive,
    text: "Tickets",
    key: "/tickets",
    link: urls.TICKET_VIEW_PATH,
    pageName: strings.TICKETS,
  };
};
export const GenerateMainMenu = (mainMenus: MainMenusTypes[] = ListOfMenus) => {
  // const bgcolor = useAppSelector(selectBackgroundColor);
  const resources = store.getState().auth.resources;
  const generatedMenu: MainMenusTypes[] = [];
  mainMenus.forEach((menu: MainMenusTypes) => {
    const hasAccess = menu?.sidebarMapping?.some(
      (sideBarAccess: SideBarMapping) => {
        if (
          resources[strings.APP]?.includes(strings.adminPermission) ||
          resources[strings.ACCOUNT]?.includes(strings.adminPermission)
        ) {
          return true;
        }

        if (!resources.hasOwnProperty(sideBarAccess.resource)) {
          return false;
        }

        const permissions = resources[sideBarAccess.resource];
        const hasAllPermissions = sideBarAccess.permissions?.every(
          (indPermission: string) => permissions.includes(indPermission)
        );

        if (sideBarAccess.allPermissionRequired && hasAllPermissions) {
          return true;
        }

        return sideBarAccess.permissions?.some((indPermission: string) =>
          permissions.includes(indPermission)
        );
      }
    );

    if (hasAccess) {
      generatedMenu.push(menu);
    }
  });

  return generatedMenu;
};

export const doesUserHasAccessToMenuItem = (
  componentName: string,
  userMenu: MainMenusTypes[]
) => {
  const menus = GenerateMainMenu()?.map((menu: MainMenusTypes) => menu.text);
  const resources = store.getState().auth.resources;
  return true;
};

export const doesLoggedInUserHasAccess = (
  buttonName: string,
  resourceName: string
) => {
  const resources: FormattedResources = store.getState().auth.resources ?? [];
  if (resources.hasOwnProperty(resourceName)) {
    if (resources[resourceName].indexOf(buttonName) !== -1) {
      return true;
    }
  }
  return false;
};

export const appAdminUserSpecificPermission = () => {
  const resources: FormattedResources = store.getState().auth.resources ?? [];
  if (resources.hasOwnProperty(strings.APP.toLocaleLowerCase())) {
    if (
      resources[strings.APP.toLocaleLowerCase()].indexOf(
        strings.adminPermission.toLocaleLowerCase()
      ) !== -1
    ) {
      return true;
    }
  }
  return false;
};
export const accountAdminUserSpecificPermission = () => {
  const resources: FormattedResources = store.getState().auth.resources ?? [];
  if (resources.hasOwnProperty(strings.ACCOUNT.toLocaleLowerCase())) {
    if (
      resources[strings.ACCOUNT.toLocaleLowerCase()].indexOf(
        strings.adminPermission.toLocaleLowerCase()
      ) !== -1
    ) {
      return true;
    }
  }
  return false;
};
export const appAndAccountAdminCommonUserSpecificPermission = () => {
  const resources: FormattedResources = store.getState().auth.resources ?? [];
  if (
    resources.hasOwnProperty(strings.ACCOUNT.toLocaleLowerCase()) &&
    resources.hasOwnProperty(strings.APP.toLocaleLowerCase())
  ) {
    if (
      resources[strings.ACCOUNT.toLocaleLowerCase()].indexOf(
        strings.adminPermission.toLocaleLowerCase()
      ) !== -1 &&
      resources[strings.APP.toLocaleLowerCase()].indexOf(
        strings.adminPermission.toLocaleLowerCase()
      ) !== -1
    ) {
      return true;
    }
  }
  return false;
};
export const appOrAccountAdminCommonUserSpecificPermission = () => {
  const resources: FormattedResources = store.getState().auth.resources ?? [];
  if (
    resources.hasOwnProperty(strings.ACCOUNT.toLocaleLowerCase()) ||
    resources.hasOwnProperty(strings.APP.toLocaleLowerCase())
  ) {
    if (
      resources[strings.ACCOUNT.toLocaleLowerCase()].indexOf(
        strings.adminPermission.toLocaleLowerCase()
      ) !== -1 ||
      resources[strings.APP.toLocaleLowerCase()].indexOf(
        strings.adminPermission.toLocaleLowerCase()
      ) !== -1
    ) {
      return true;
    }
  }
  return false;
};
export const doesLoggedInUserHasAccessToResource = (
  buttonName: string,
  resourceName: string
) => {
  if (
    [
      doesLoggedInUserHasAccess(buttonName, resourceName),
      appAdminUserSpecificPermission(),
      accountAdminUserSpecificPermission(),
      appAndAccountAdminCommonUserSpecificPermission(),
    ].includes(true)
  ) {
    return true;
  }
  return false;
};
