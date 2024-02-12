import { StringConstants } from "./StringConstants";

class NotificationConstants extends StringConstants {
  GENERIC_ERROR =
    "Something went wrong on our end. Our team has been notified, and we're working to fix it. Please try again later.";
  UNAUTHORIZES_REQUEST =
    "You're logged out due to inactivity. Please log in to continue.";
  UNAUTHORIZES_REQUEST_FORBIDDEN =
    "You don't have permission to access this resource. Please contact the administrator for assistance.";
  INTERNET_SLOW =
    "We're experiencing connectivity issues. Please bear with us while we sort things out.";
  INTERNAL_SERVER_ERROR_NO_RESPONSE =
    "Something went wrong on our end. Our team has been notified, and we're working to fix it. Please try again later.";
  INTERNAL_SERVER_ERROR =
    "We can't provide the requested content in a format acceptable to your browser. Please try a different format or contact support for assistance.";
  BAD_REQUEST =
    "The server couldn't understand your request. Please check your input and try again.";
  EXHAUSTED_API_REQUEST =
    "You've exceeded the limit for accessing this resource. Please try again later.";
  URL_NOT_FOUND = "The resource you requested may have been moved or deleted.";
  VALIDDETAILS = "Please fill valid details.";
  LOGGEDOUT = "You're logged out due to inactivity. Please log in to continue.";
  LOGGEDIN = "Login Successful.";
  LOGIN_ERROR = "Backend server not responding please try after sometime";
}

let notifiers = new NotificationConstants();
export default notifiers;
