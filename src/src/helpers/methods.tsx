import moment from "moment";
import strings from "global/constants/StringConstants";
import { globalEmitter } from "utils/emitter";
import { store } from "utils/store";
import MomentHelpers from "./MomentHelpers";
import history from "utils/history";
import urls from "global/constants/UrlConstants";
import { logOutAction } from "redux/authSlice";
import { Resources } from "models/interfaces";
import { PhoneNumberUtil } from "google-libphonenumber";
import { Typography } from "@mui/material";

const methodsContext = this;

export const isTruthy = (value: any, shouldCheckByType: boolean = true) => {
  const validatedByType = shouldCheckByType
    ? customValidatorByType(value)
    : true;

  if (value !== null && value !== undefined && validatedByType) {
    return true;
  }
  return false;
};

const customValidatorByType = (value: any) => {
  if (value !== undefined && value !== null) {
    const type = typeof value;
    switch (type) {
      case "string":
        return value.trim() !== "";
      case "object":
        if (Array.isArray(value)) {
          return value.length > 0;
        } else {
          return Object.keys(value).length > 0;
        }
      default:
        return true;
    }
  }
};

export const compareStrings = (string1: string, string2: string) => {
  if (!(isTruthy(string1) || isTruthy(string2))) {
    return true;
  } else {
    if (string1 && string2) {
      if (string1.toLowerCase() === string2.toLowerCase()) {
        return true;
      }
    }
  }
  return false;
};

export const openInfoNotification = (message: any, title: string = "Info") => {
  globalEmitter.emit(strings.notification, {
    type: strings.info,
    message: message,
    title: title,
  });
};

export const openSuccessNotification = (
  message: any,
  title: string = "Success"
) => {
  globalEmitter.emit(strings.notification, {
    type: strings.success,
    message:
      message?.length <= 30 ? (
        <Typography style={{ whiteSpace: "nowrap" }}>{message}</Typography>
      ) : (
        message
      ),
    title: title,
  });
};

export const openWarningNotification = (
  message: any,
  title: string = "Warning"
) => {
  globalEmitter.emit(strings.notification, {
    type: strings.warning,
    message: message,
    title: title,
  });
};

export const openErrorNotification = (
  message: any,
  title: string = "Error"
) => {
  globalEmitter.emit(strings.notification, {
    type: strings.error,
    message: message,
    title: title,
  });
};

export const convertPriceToDollarFormat = (value: number) => {
  return `$${(value / 100).toFixed(2)}`;
};

export function debounce(func: Function, wait: number) {
  let timeout: any;
  return function (...args: any) {
    const context = methodsContext;
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(context, args), wait);
  };
}

export function debounceEventHandler(func: Function, wait: number) {
  const debounced = debounce(func, wait);
  return function (event: any) {
    event.persist();
    return debounced(event);
  };
}

export const getFormattedStatsCount = (value: number) => {
  return new Intl.NumberFormat("en-US").format(value);
};

export const getFormattedNumbers = (value: string) => {
  const matches = value.match(/\d+/g);
  let number = "";
  if (matches !== null) {
    matches.forEach((match) => {
      number = number + match;
    });
  }
  if (number.length === 10) {
    value = number.replace(/^(\d{3})(\d{3})(\d{4})/, "($1) $2-$3");
  }
  return { number: number, maskedNumber: value };
};

export const translateFirstAndLastName = (value: string) => {
  const userName = store.getState()?.auth?.userName ?? "";
  const name = userName.split(" ");
  if (!name.length) {
    let returnString = value.replace("$FIRST_NAME", "");
    returnString = returnString.replace("$LAST_NAME", "");
    return returnString;
  }
  const firstName = name[0];
  const lastName = name.length > 1 ? name[1] : "";
  let returnString = value.replace("$FIRST_NAME", firstName);
  returnString = returnString.replace("$LAST_NAME", lastName);
  return returnString;
};

export const convertESTtoUserLocalTime = (inputTime: string) => {
  const userTimeZone = MomentHelpers.guessTheTimeZone();
  const inputTimezone = "America/New_York";
  const inputTimeFormat = "YYYY-MM-DDTHH:mm:s";
  const outputTimeFormat = "hh:mm a";
  return moment
    .tz(inputTime, inputTimeFormat, inputTimezone)
    .tz(userTimeZone)
    .format(outputTimeFormat);
};

const isPathExitsInResorces = (resources: any) => {
  return resources.map((items: any) => {
    if (!items.path) {
      return { ...items, path: items.name.toLowerCase() };
    } else {
      return items;
    }
  });
};

export const convertResourceToObjectFormat = (resources: Resources[]) => {
  const rolePermissions: { [key: string]: string[] } = {};
  const updatedResorces = isPathExitsInResorces(resources);
  updatedResorces.forEach((resource: any) => {
    const { name, path, permissions } = resource;
    if (!rolePermissions[path]) {
      rolePermissions[path] = [];
    }
    rolePermissions[path].push(...permissions);
  });

  return rolePermissions;
};

export const doesResourcesExistInLocalStorage = (resources: Resources[]) => {
  if (!isTruthy(resources)) {
    store.dispatch(logOutAction());
    history.push(urls.LOGIN_VIEW_PATH);
    return false;
  }
  return true;
};

export const convertESTtoUserLocalDateAndTime = (inputTime: string) => {
  const userTimeZone = MomentHelpers.guessTheTimeZone();
  const inputTimezone = "America/New_York";
  const inputTimeFormat = "YYYY-MM-DDTHH:mm:s";
  const outputTimeFormat = "MMM DD, YYYY hh:mm a";
  return moment
    .tz(inputTime, inputTimeFormat, inputTimezone)
    .tz(userTimeZone)
    .format(outputTimeFormat);
};

export const handleSort = (sortArray: any) => {
  sortArray.sort((a: any, b: any) => {
    const nameA = a.name?.toUpperCase();
    const nameB = b.name?.toUpperCase();

    if (nameA < nameB) {
      return -1;
    } else if (nameA > nameB) {
      return 1;
    } else {
      return 0;
    }
  });
  return sortArray;
};

export const isPhoneValid = (phone: string) => {
  try {
    const phoneUtil = PhoneNumberUtil.getInstance();
    return phoneUtil.isValidNumber(phoneUtil.parseAndKeepRawInput(phone));
  } catch (error: any) {
    return false;
  }
};
