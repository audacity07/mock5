import {
  DELETE_USER_SUCCESS,
  GET_USER_SUCCESS,
  PATCH_USER_SUCCESS,
  POST_USER_SUCCESS,
  USER_FAILURE,
  USER_REQUEST,
} from "./actionTypes";

const initState = {
  isLoading: false,
  isError: false,
  users: [],
};

export const reducer = (state = initState, { type, payload }) => {
  switch (type) {
    case USER_REQUEST: {
      return {
        ...state,
        isLoading: true,
        isError: false,
      };
    }

    case USER_FAILURE: {
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
    }
    case GET_USER_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        isError: false,
        state: payload,
      };
    }

    case POST_USER_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        isError: false,
        state: payload,
      };
    }

    case PATCH_USER_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        isError: false,
        state: payload,
      };
    }

    case DELETE_USER_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        isError: false,
        state: payload,
      };
    }

    default: {
      return state;
    }
  }
};
