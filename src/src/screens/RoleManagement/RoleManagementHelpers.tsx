import { cloneDeep } from "lodash";
import strings from "global/constants/StringConstants";

export const rolesTableHeader = [
  {
    name: "Role Name",
    field: "name",
  },
  {
    name: "Resources And Permission",
    field: "resources",
  },
  {
    name: "Edit",
    field: "action",
  },
];

export const initialRoleData = {
  account: "",
  name: "",
  resources: [{ name: "", permissions: [] }],
};

export const createErrorObj = (roleDetails: any, name?: any) => {
  if (name == strings.createRole)
    return {
      isValid: true,
      errorObj: {
        name: "",
        resources: [
          {
            name: "",
            permissions: "",
          },
        ],
      },
    };

  let isValid = true;
  let errorObj: any = cloneDeep(roleDetails);

  errorObj.name = "";
  if (!roleDetails.name) {
    isValid = false;
    errorObj.name = "Please enter a role name!";
  }

  roleDetails.resources.forEach((role: any, index: number) => {
    errorObj.resources[index].name = "";
    if (!role.name) {
      isValid = false;
      errorObj.resources[index].name = "Select a resource type!";
    }

    errorObj.resources[index].permissions = "";
    if (role.permissions.length == 0) {
      isValid = false;
      errorObj.resources[index].permissions = "Select atleast one permission!";
    }
  });

  return { errorObj, isValid };
};

export const createErrorObjForTypeAndPermission = (
  roleDetails: any,
  name?: any
) => {
  if (name == strings.createRole)
    return {
      isValid: true,
      errorObj: {
        name: "",
        resources: [
          {
            name: "",
            permissions: "",
          },
        ],
      },
    };

  let isValid = true;
  let errorObj: any = cloneDeep(roleDetails);

  roleDetails.resources.forEach((role: any, index: number) => {
    errorObj.resources[index].name = "";
    if (!role.name) {
      isValid = false;
      errorObj.resources[index].name = "Select a resource type!";
    }

    errorObj.resources[index].permissions = [];
    if (role.permissions.length == 0) {
      isValid = false;
      errorObj.resources[index].permissions = "Select atleast one permission!";
    }
  });

  return { errorObj, isValid };
};
