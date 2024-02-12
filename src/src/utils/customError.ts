import notifiers from "../global/constants/NotificationConstants";
import urls from "../global/constants/UrlConstants";
import { openErrorNotification } from "../helpers/methods";
import { logOutAction } from "../redux/authSlice";
import history from "./history";
import { store } from "./store";

export function getCustomError(error: any) {
  if (!error?.message) {
    if (error?.status === 403) {
      store.dispatch(logOutAction());
      return openErrorNotification(notifiers.UNAUTHORIZES_REQUEST_FORBIDDEN);
    }
    if (error?.status === 404) {
      return openErrorNotification(notifiers.URL_NOT_FOUND);
    }
    if (error?.status === 401) {
      return openErrorNotification(notifiers.UNAUTHORIZES_REQUEST);
    }
    if (error?.status === 400) {
      return openErrorNotification(notifiers.BAD_REQUEST);
    }
    if (error?.status === 500) {
      return openErrorNotification(notifiers.INTERNAL_SERVER_ERROR_NO_RESPONSE);
    }
    if (error?.status === 406) {
      return openErrorNotification(notifiers.INTERNAL_SERVER_ERROR);
    }
    if (error?.status === 502) {
      return openErrorNotification(notifiers.INTERNET_SLOW);
    }
    if (error?.status === 429) {
      return openErrorNotification(notifiers.EXHAUSTED_API_REQUEST);
    } else {
      return openErrorNotification(notifiers.GENERIC_ERROR);
    }
  } else {
    return openErrorNotification(error.message);
  }
}
