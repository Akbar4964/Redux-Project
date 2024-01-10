import { combineReducers, createStore } from "redux";
import { userType } from "../Const/usetTypes";

const initialState = {
  isUserGetLoading: true,
  users: [],
  userGetError: null,
  isUserAddLoading: true,
  userAddError: null,
};

function userReducer(state = initialState, action) {
  switch (action.type) {
    case userType.user:
      return {
        ...state,
        users: action.payload.reverse(),
        isUserGetLoading: false,
      };
    case userType.addUser:
      return {
        ...state,
        users: [action.payload, ...state.users],
      };
    default:
      return state;
  }
}

const componentRedux = combineReducers({ UsersReducer: userReducer });

export const store = createStore(componentRedux);
