import { legacy_createStore, applyMiddleware } from "redux";
import { reducer as userReducer } from "./users/reducer";
import thunk from "redux-thunk";

export const store = legacy_createStore(userReducer, applyMiddleware(thunk));
