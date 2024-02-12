export const AdminContent = {
  Status: {
    label: "Status",
    count: 0,
  },
  Type: {
    label: "Type",
    count: 0,
  },
  Region: {
    label: "Region",
    count: 0,
  },
  Domain: {
    label: "Domain",
    count: 0,
  },
  SubDomain: {
    label: "SubDomain",
    count: 0,
  },
  Source: {
    label: "Source",
    count: 0,
  },
  Contract: {
    label: "Contract",
    count: 0,
  },
  Submission: {
    label: "Submission",
    count: 0,
  },
  Reason: {
    label: "Reason",
    count: 0,
  },
};
export const AdminContentFirst = {
  Attributes: {
    label: "Attributes",
    count: 0,
  },
  WorkFlow: {
    label: "WorkFlow",
    count: 0,
  },
};

const {
  Status,
  Type,
  Region,
  Domain,
  SubDomain,
  Source,
  Contract,
  Submission,
  Reason,
} = AdminContent;
const { Attributes, WorkFlow } = AdminContentFirst;
export const tabConfig = {
  Admin: [
    Status,
    Type,
    Region,
    Domain,
    SubDomain,
    Source,
    Contract,
    Submission,
    Reason,
  ],
};
export const tabConfig1 = {
  Admin: [Attributes, WorkFlow],
};

export const adminValidation = (
  adminDetails: any,
  dropDownValue: any,
  newValueAttribute: any
) => {
  let errors = adminDetails;
  let isValid = true;
  const admindropdown = adminDetails.dropdown;
  const adminDetail = adminDetails;
  const text = adminDetails.text.value;
  const dropdown = adminDetails.dropdown.value;
  if (!text && (!dropdown || dropDownValue.length > 0)) {
    errors.text.error = `Please enter ${newValueAttribute}!`;
    errors.dropdown.error = `Please select ${
      newValueAttribute === "Domain" ? "region" : "domain"
    }`;

    isValid = false;
  }
  if (!text) {
    errors.text.error = `Please enter ${newValueAttribute}!`;
    isValid = false;
  }
  if (!dropdown && dropDownValue.length > 0) {
    errors.dropdown.error = `Please select ${
      newValueAttribute === "Domain" ? "region" : "domain"
    }`;
    isValid = false;
  }
  return { errors, isValid };
};



export const tableDataInterface = {
  status: [],
  type: [],
  region: [],
  domain: [],
  subDomain: [],
  source: [],
  contact: [],
  submission: [],
  workflow: [],
};

export const tasksTabContent = [
  {
    label: "Attributes",
    count: 0,
  },
  {
    label: "WorkFlow",
    count: 0,
  },
];
