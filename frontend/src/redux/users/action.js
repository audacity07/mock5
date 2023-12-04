import {
  GET_USER_SUCCESS,
  PATCH_USER_SUCCESS,
  POST_USER_SUCCESS,
  USER_FAILURE,
  USER_REQUEST,
} from "./actionTypes";
import axios from "axios";

let URL = `http://localhost:4500/contacts`;

export function postUser(paramObj) {
  return async function (dispatch) {
    dispatch({ type: USER_REQUEST });
    try {
      let res = await axios.post(`${URL}`, paramObj);
      dispatch({ type: POST_USER_SUCCESS, payload: res.data.users });
    } catch (error) {
      console.log(error);
      dispatch({ type: USER_FAILURE });
    }
  };
}

export function getUsers() {
  return async function (dispatch) {
    dispatch({ type: USER_REQUEST });
    try {
      let res = await axios.get(`${URL}`);
      // console.log("get user data", res.data.users);
      dispatch({ type: GET_USER_SUCCESS, payload: res.data.users });
    } catch (error) {
      console.log(error);
      dispatch({ type: USER_FAILURE });
    }
  };
}

export function patchUser(id, paramObj) {
  return async function (dispatch) {
    dispatch({ type: USER_REQUEST });
    try {
      let res = await axios.patch(`${URL}/${id}`, paramObj);
      dispatch({ type: PATCH_USER_SUCCESS, payload: res.data.users });
    } catch (error) {
      console.log(error);
      dispatch({ type: USER_FAILURE });
    }
  };
}

export function deleteUser(id) {
  return async function (dispatch) {
    dispatch({ type: USER_REQUEST });
    try {
      let res = await axios.delete(`${URL}/${id}`);
      dispatch({ type: PATCH_USER_SUCCESS, payload: res.data.users });
    } catch (error) {
      console.log(error);
      dispatch({ type: USER_FAILURE });
    }
  };
}
