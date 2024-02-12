import React, { useEffect, useState } from "react";
import {
  createErrorObj,
  createErrorObjForTypeAndPermission,
} from "./RoleManagementHelpers";
import { addRole, fetchResources, updateRole } from "./RoleManagementService";
import roleManagement from "./RoleManagement.styles";
import {
  Box,
  Checkbox,
  Container,
  FormHelperText,
  Grid,
  InputLabel,
  ListItemText,
  MenuItem,
  Select,
  Stack,
  Typography,
} from "@mui/material";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { isTruthy, openSuccessNotification } from "helpers/methods";
import notifiers from "global/constants/NotificationConstants";
import strings from "global/constants/StringConstants";
import CustomLoader from "global/components/CustomLoader/CustomLoader";
import { CustomButton, CustomInput } from "global/components";
import { errorStyling } from "utils/styles";
import { getCustomError } from "utils/customError";

interface AddUpdateRolesProps {
  modeName: string;
  setButtonClick: any;
  rowData: any;
  fetchResourceHandler: any;
}

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const AddUpdateRoles = (props: AddUpdateRolesProps) => {
  const classes = roleManagement;
  const [roleData, setRoleData] = useState<any>(props.rowData);
  const { errorObj } = createErrorObj(props.rowData, props.modeName);
  const [errors, setErrors] = useState<any>(errorObj);
  const [loading, setLoading] = useState<boolean>(false);
  const [resources, setResources] = useState<any>([]);
  const [allowSubmit, setAllowSubmit] = useState(false);
  let availableResources: any[];

  useEffect(() => {
    getResource();
    checkModeName();
  }, []);

  const checkModeName = () => {
    if (props.modeName === "Edit Role") {
      setAllowSubmit(true);
    }
  };

  const getResource = async () => {
    try {
      setLoading(true);
      const response = await fetchResources();
      setResources(response);
      setLoading(false);
    } catch (error: any) {
      setLoading(false);
      getCustomError(error);
    }
  };

  const handleAdd = () => {
    const { errorObj, isValid } = createErrorObjForTypeAndPermission(roleData);
    const roles = roleData.resources[roleData?.resources?.length - 1];
    if ((roles.name !== "" && roles.permissions.length < 0) || isValid) {
      let tempRole: any = { ...roleData };
      tempRole.resources = [
        {
          name: "",
          permissions: [],
        },
        ...tempRole.resources,
      ];
      setRoleData(tempRole);
      setErrors({
        resources: [
          {
            name: "",
            permissions: "",
          },
        ],
      });
    } else {
      setErrors(errorObj);
    }
  };

  const deleteRoleHandler = (index: number) => {
    if (roleData.resources.length > 1) {
      let tempRole = { ...roleData };
      let tempError = { ...errors };
      tempRole.resources.splice(index, 1);
      tempError.resources.splice(index, 1);
      setRoleData(tempRole);
      setErrors(tempError);
    }
  };

  const handleValidation = () => {
    const { errorObj, isValid } = createErrorObj(roleData);
    setErrors(errorObj);
    return isValid;
  };

  const handleRoleNameChange = (event: any) => {
    setAllowSubmit(true);
    setRoleData({
      ...roleData,
      name: event.target.value,
    });
    setErrors({ ...errors, name: "" });
  };

  const handleResourceTypeChange = (e: any, resourceIndex: number) => {
    let tempRole = { ...roleData };
    tempRole.resources[resourceIndex].name = e.target.value;
    tempRole.resources[resourceIndex].permissions = [];
    setRoleData(tempRole);
  };

  const handlePermissionChange = (e: any, resourceIndex: number) => {
    let tempRole = { ...roleData };
    tempRole.resources[resourceIndex].permissions = e.target.value;
    setRoleData(tempRole);
  };

  const addUpdateRolesHandler = async () => {
    try {
      if (handleValidation()) {
        setLoading(true);
        if (props.modeName === strings.editRole) {
          await updateRole({ ...roleData, account: "SSProposal" });
        } else {
          await addRole({ ...roleData, account: "SSProposal" });
        }
        openSuccessNotification(
          props.modeName === strings.editRole
            ? `${roleData.name} has been updated`
            : "New Role has been added successfully"
        );
        props.setButtonClick(strings.rolesTable);
        await props.fetchResourceHandler();
        setLoading(false);
      }
    } catch (error: any) {
      setLoading(false);
      getCustomError(error);
    }
  };

  const handleSubmit = () => {
    return (
      <>
        <Grid container sx={classes.centerItem} mt={2}>
          <Stack direction="row" spacing={2} mb={2}>
            <CustomButton
              disabled={!allowSubmit}
              customClasses={{ width: "150px" }}
              label={props.modeName === strings.editRole ? "Update" : "Submit"}
              onClick={() => {
                addUpdateRolesHandler();
              }}
            />
            <CustomButton
              customClasses={{ width: "150px" }}
              label="Cancel"
              onClick={() => {
                props.setButtonClick(strings.rolesTable);
              }}
            />
          </Stack>
        </Grid>
      </>
    );
  };

  const getAddUpdateRoleFields = () => {
    return (
      <Box sx={{ marginTop: "80px" }}>
        <Container maxWidth="md">
          <Stack
            direction={{ lg: "row", md: "row", sm: "row", xs: "column" }}
            justifyContent={{
              lg: "space-between",
              md: "space-between",
              sm: "space-between",
              xs: "flex-start",
            }}
            alignItems={{ lg: "center", sm: "center" }}
          >
            <Typography my={2} sx={classes.heading}>
              {props.modeName}
            </Typography>
            <Stack direction="row" justifyContent="flex-end" spacing={1}>
              {handleSubmit()}
            </Stack>
          </Stack>
          <Grid item xl={12} lg={12} md={12} sm={12} xs={12} mt={2}>
            <CustomInput
              required
              type="text"
              placeHolder="Enter role name"
              propsToInputElement={{ maxLength: 100 }}
              label="Role Name"
              name="name"
              id="name"
              value={roleData?.name}
              onChange={handleRoleNameChange}
              error={(!isTruthy(roleData?.name) && errors.name) ?? ""}
            />
          </Grid>
          <Grid
            container
            sx={{
              display: "flex",
            }}
            spacing={2}
            mt={1}
          >
            {roleData?.resources?.map((item: any, resourceIndex: any) => {
              availableResources = resources.filter(
                (res: any) =>
                  !roleData.resources.some(
                    (resourceName: any) =>
                      resourceName.name === res.name && resourceName !== item
                  )
              );
              return (
                <>
                  <Grid item xs={12} sm={12} md={5.5} lg={5.5} xl={5.5}>
                    <Stack direction="column" style={{ width: "100%" }}>
                      <Box mb={1}>
                        <InputLabel>
                          <Typography variant="h5" sx={classes.inputLabel}>
                            Type
                            <Box component={"span"} sx={classes.CustomRequired}>
                              *
                            </Box>
                          </Typography>
                        </InputLabel>
                      </Box>
                      <Select
                        sx={classes.select}
                        value={item?.name}
                        onChange={(e: any) => {
                          handleResourceTypeChange(e, resourceIndex);
                        }}
                        displayEmpty
                        renderValue={
                          item?.name
                            ? undefined
                            : () => (
                                <Typography sx={classes.placeholderText}>
                                  Select Type
                                </Typography>
                              )
                        }
                        error={
                          !isTruthy(item.name) &&
                          errors.resources[resourceIndex]?.name
                        }
                      >
                        {availableResources.map((intervalData: any) => (
                          <MenuItem
                            key={intervalData.name}
                            value={intervalData.name}
                            sx={classes.optionStyle}
                          >
                            {intervalData.name}
                          </MenuItem>
                        ))}
                      </Select>
                      {!isTruthy(item.name) && (
                        <FormHelperText error sx={{ ...errorStyling }}>
                          {errors.resources[resourceIndex]?.name}
                        </FormHelperText>
                      )}
                    </Stack>
                  </Grid>
                  <Grid item xs={12} sm={12} md={5.5} lg={5.5} xl={5.5}>
                    <Box mb={1}>
                      <InputLabel>
                        <Typography variant="h5" sx={classes.inputLabel}>
                          Permission
                          <Box component={"span"} sx={classes.CustomRequired}>
                            *
                          </Box>
                        </Typography>
                      </InputLabel>
                    </Box>
                    <Select
                      sx={classes.select}
                      value={item.permissions}
                      multiple
                      onChange={(e: any) =>
                        handlePermissionChange(e, resourceIndex)
                      }
                      displayEmpty
                      renderValue={() =>
                        item?.permissions?.join(",") || (
                          <Typography sx={classes.placeholderText}>
                            Select Permission
                          </Typography>
                        )
                      }
                      error={
                        !isTruthy(item.permissions[0]) &&
                        errors.resources[resourceIndex]?.permissions.length !==
                          0
                      }
                      MenuProps={MenuProps}
                    >
                      {item.name &&
                        resources
                          .find((resource: any) => resource.name === item.name)
                          ?.permissions.map((permission: any) => (
                            <MenuItem
                              key={permission}
                              value={permission}
                              sx={classes.optionStyle}
                            >
                              <Checkbox
                                checked={item?.permissions?.includes(
                                  permission
                                )}
                                sx={classes.checkbox}
                              />
                              <ListItemText primary={permission} />
                            </MenuItem>
                          ))}
                    </Select>
                    {!isTruthy(item.permissions[0]) && (
                      <FormHelperText error sx={classes.errorStyling}>
                        {errors.resources[resourceIndex]?.permissions}
                      </FormHelperText>
                    )}
                  </Grid>
                  <Grid item xs={12} sm={12} md={1} lg={1} xl={1}>
                    <Box
                      onClick={() => deleteRoleHandler(resourceIndex)}
                      sx={classes.deleteButton}
                    >
                      <DeleteOutlineIcon />
                    </Box>
                  </Grid>
                </>
              );
            })}
            {availableResources.length > 1 && (
              <Grid
                item
                xs={12}
                sm={12}
                md={12}
                lg={12}
                xl={12}
                display="flex"
                justifyContent="center"
              >
                <CustomButton
                  label="Add"
                  customClasses={{ width: "150px" }}
                  onClick={handleAdd}
                />
              </Grid>
            )}
          </Grid>
          <CustomLoader isLoading={loading} />
        </Container>
      </Box>
    );
  };
  return getAddUpdateRoleFields();
};

export default React.memo(AddUpdateRoles);
