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
    case userType.delUser:
      const filteredUsers = state.users.filter(
        (user) => user.id !== action.payload
      );
      return { ...state, users: filteredUsers };
    case userType.editUser:
      const editedUser = state.users.map((item) => {
        if (item.id === action.payload.id) {
          return action.payload;
        }
        return item;
      });
      return { ...state, users: [...editedUser] };


      
    default:
      return state;
  }
}

const componentRedux = combineReducers({ UsersReducer: userReducer });

export const store = createStore(componentRedux);
