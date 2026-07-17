import axios from "axios";
import {
  ALL_ROLES_REQUEST,
  ALL_ROLES_SUCCESS,
  ALL_ROLES_FAIL,

  // CREATE_ROLE_REQUEST,
  // CREATE_ROLE_SUCCESS,
  // CREATE_ROLE_FAIL,

  UPDATE_ROLE_REQUEST,
  UPDATE_ROLE_SUCCESS,
  UPDATE_ROLE_FAIL,

  DELETE_ROLE_REQUEST,
  DELETE_ROLE_SUCCESS,
  DELETE_ROLE_FAIL,

  ROLE_DETAILS_REQUEST,
  ROLE_DETAILS_SUCCESS,
  ROLE_DETAILS_FAIL,

  NEW_ROLE_REQUEST,
  NEW_ROLE_SUCCESS,
  NEW_ROLE_FAIL,

  CLEAR_ERRORS
} from "../constants/rolesConstants";

// Get all roles
// Get all roles
export const getAllRoles = () => async (dispatch) => {
  console.log("getAllRoles Called");

  try {
    dispatch({ type: ALL_ROLES_REQUEST });

    const response = await axios.get(
      "/api/v1/roles"
    );

    console.log("Requested URL:", response.request?.responseURL);
    console.log("Response:", response.data);

    dispatch({
      type: ALL_ROLES_SUCCESS,
      payload: response.data.roles,
    });

  } catch (error) {
    console.log(error);

    dispatch({
      type: ALL_ROLES_FAIL,
      payload: error.response?.data?.message || error.message,
    });
  }
};

// Get role details by ID
export const getRoleDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: ROLE_DETAILS_REQUEST });

    const { data } = await axios.put(`/api/v1/admin/role/${id}`);

    dispatch({ type: ROLE_DETAILS_SUCCESS, payload: data.role });
  } catch (error) {
    dispatch({
      type: ROLE_DETAILS_FAIL,
      payload: error.response?.data?.message || error.message,
    });
  }
};

// Create new role
export const createRole = (roleData) => async (dispatch) => {
  try {
    dispatch({ type: NEW_ROLE_REQUEST });

    const config = { headers: { "Content-Type": "application/json" } };

    const { data } = await axios.post("/api/v1/admin/role/new", roleData, config);

    dispatch({ type: NEW_ROLE_SUCCESS, payload: data.role });

  } catch (error) {
    dispatch({
      type: NEW_ROLE_FAIL,
      payload: error.response?.data?.message || error.message,
    });
  }
};

// Update role
export const updateRole = (id, roleData) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_ROLE_REQUEST });

    const config = { headers: { "Content-Type": "application/json" } };

    const { data } = await axios.put(`/api/v1/admin/role/${id}`, roleData, config);

    dispatch({ type: UPDATE_ROLE_SUCCESS, payload: data.success });

  } catch (error) {
    dispatch({
      type: UPDATE_ROLE_FAIL,
      payload: error.response?.data?.message || error.message,
    });
  }
};


// Delete role

export const deleteRole = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_ROLE_REQUEST });

    const { data } = await axios.delete(`/api/v1/admin/role/${id}`);

    dispatch({ type: DELETE_ROLE_SUCCESS, payload: data.success });

  } catch (error) {
    dispatch({
      type: DELETE_ROLE_FAIL,
      payload: error.response?.data?.message || error.message,
    });
  }
};

// Clear errors

export const clearErrors = () => (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};

