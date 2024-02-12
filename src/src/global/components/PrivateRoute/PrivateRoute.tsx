import { Route, Redirect, RouteProps } from "react-router-dom";
import PageNotFound from "../../../screens/PageNotFound/PageNotFound";
import {
  GenerateMainMenu,
  doesUserHasAccessToMenuItem,
} from "../../../utils/AuthorizationManager";
import { useAppSelector } from "../../../utils/hooks";
import { selectBackgroundColor } from "../../../redux/themeChangeSlice";

interface CustomProps extends RouteProps {
  component?: any;
  isLoggedIn: boolean;
  componentName: string;
}

const PrivateRoute = (props: CustomProps) => {
  const { component: Component, isLoggedIn, componentName, ...rest } = props;
  const bgcolor = useAppSelector(selectBackgroundColor);

  return (
    <Route
      {...rest}
      render={(routeProps) =>
        isLoggedIn ? (
          doesUserHasAccessToMenuItem(componentName, GenerateMainMenu()) ? (
            <Component {...routeProps} />
          ) : (
            <PageNotFound />
          )
        ) : (
          <Redirect
            to={{
              pathname: "/",
              state: {
                from: routeProps.location,
                search: routeProps.location.search,
              },
            }}
          />
        )
      }
    />
  );
};

export default PrivateRoute;
