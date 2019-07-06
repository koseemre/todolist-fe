import { ADD_TASK, GET_ERRORS, GET_TASKS, UPDATE_TASK, DELETE_TASK } from "./types";
import task_api from '../api/task';


export const getTasks = (userId) => async dispatch => {
    console.log("inside of getTasks action");
    const responseTasks = await task_api.get(`/getTasks/{userId}?userId=${userId}`);
    dispatch({
        type: GET_TASKS,
        payload: responseTasks.data,
    });
};

export const addTask = (userId, taskDetail) => async dispatch => {

    const response = await task_api.post(`/addTask/{userId}?userId=${userId}`, {
        taskDetail
    });
    console.log(response);
    dispatch({
        type: ADD_TASK,
        payload: response.data,
    });
    const responseTasks = await task_api.get(`/getTasks/{userId}?userId=${userId}`);
    dispatch({
        type: GET_TASKS,
        payload: responseTasks.data,
    });
};

export const updateTask = (taskId, taskDetail, userId) => async dispatch => {

    const response = await task_api.put(`/updateTask/{id}?taskId=${taskId}`, taskDetail);
    dispatch({
        type: UPDATE_TASK,
        payload: response.data
    });

    const responseTasks = await task_api.get(`/getTasks/{userId}?userId=${userId}`);
    dispatch({
        type: GET_TASKS,
        payload: responseTasks.data,
    });
};

export const deleteTask = (taskId, userId) => async dispatch => {

    await task_api.delete(`/deleteTask/{id}?taskId=${taskId}`);
    dispatch({
        type: DELETE_TASK
    });

    const responseTasks = await task_api.get(`/getTasks/{userId}?userId=${userId}`);
    dispatch({
        type: GET_TASKS,
        payload: responseTasks.data,
    });
};
