import { GET_TASKS, ADD_TASK, UPDATE_TASK, DELETE_TASK } from "../actions/types";

const initialState = {
  tasks: [],
  isLoading: true
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_TASKS:
      return {
        ...state,
        tasks: action.payload,
        isLoading: false
      };
    case ADD_TASK:
      return {
        ...state
      }
    case UPDATE_TASK:
      return {
        ...state
      }
    case DELETE_TASK:
      return {
        ...state
      }
    default:
      return state;
  }
}
