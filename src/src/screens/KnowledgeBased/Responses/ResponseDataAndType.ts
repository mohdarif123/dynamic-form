import { skyPrimaryColor, primaryBlackColor } from "utils/styles";

export const getColors = {
  Pending: skyPrimaryColor,
  Approved: primaryBlackColor,
} as { [key: string]: string };

export const initialState = () => {
  return {
    region: "All",
    domain: "All",
    subDomain: "All",
    searchValue: {
      value: "",
    },
  };
};

export const AdminContent = {
  Common: {
    label: "Common",
    count: 0,
  },
  Domain: {
    label: "Domain",
    count: 0,
  },
  Certificate: {
    label: "Certificate",
    count: 0,
  },
  Management: {
    label: "Management",
    count: 0,
  },
};
const { Common, Domain, Certificate, Management } = AdminContent;
export const tabConfig = {
  Admin: [Common, Domain, Certificate, Management],
};

export const categoryType = ["Common", "Domain", "Certificate", "Management"];
export const responseHeader = [
  {
    name: "Question",
    field: "question",
  },
];
