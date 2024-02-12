import { CSSProperties } from "@mui/styles";

export interface OTPInputProps {
  length: number;
  onChangeOTP: (otp: string) => any;

  autoFocus?: boolean;
  isNumberInput?: boolean;
  disabled?: boolean;

  style?: CSSProperties;
  className?: string;

  inputStyle?: CSSProperties;
  inputClassName?: string;
}

export interface SwitchButtonProps {
  text: string;
  onClick: Function;
}
export interface ForgotPasswordFields {
  [key: string]: {
    value: string;
    error: any;
  };
}

export interface RegistrationFeild {
  [key: string]: {
    value: string;
    error: string;
  };
}

export interface LoginFormFields {
  [key: string]: {
    value: string;
    label: string;
    type: string;
    icon?: JSX.Element;
  };
}
export interface LoginFields {
  [key: string]: {
    value: string;
    error: any;
  };
}
export interface User {
  id: string;
  pwd: string;
  newPwd: string;
  authToken: string;
  name: string;
  contactNo: string;
  email: string;
  address: string;
  role: string;
  resources: string[];
  apps: App[];
  account: string;
  // lastLogin: Date;
  pwdType: string;
  roleLevel: number;
  firstName: string;
  lastName: string;
  company: string;
  planId?: string;
  paymentMethodId?: string;
  captchaToken?: string;
  category?: string;
}
export interface App {
  app: string;
  role: string;
}
export interface paidValidate {
  account: string;
  captchaToken?: any;
  contactNo: string;
  email: string;
  firstName: string;
  lastName: string;
  planId: string | null;
  paymentMethodId: string;
}

export interface FormattedResources {
  [key: string]: string[];
}
export interface PricingData {
  id: string;
  name: string;
  app: string;
  price: number;
  currency: string;
  validityInDays: number;
  limits: planLimits[];
  features: [];
}
export interface planLimits {
  entity: string;
  limit: number;
}

export interface Resources {
  name: string;
  path: string;
  permissions: string[];
}

export interface tabInterface {
  label: string;
  count: number;
}
export interface ticketDownload {
  id: null;
  app: string;
  type: null;
  audit: null;
  title: null;
  status: string;
  ownerId: null;
  ownerEmail: null;
  ownerName: null;
  ownerType: null;
  contextId: null;
  path: string;
  metadata: null;
  content: null;
  tagss: null;
  issueDate: "";
  expiryDate: "";
  expriyMandatory: null;
  issueMandatory: null;
}
