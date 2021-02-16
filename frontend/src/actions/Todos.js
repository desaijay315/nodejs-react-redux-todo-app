import * as actions from './types';
import axios from 'axios';

export const addBucket = bucketItem => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    const body = {
        title: bucketItem
    }

    try {
        const res = await axios.post('/api/bucket', body, config);

        dispatch({
            type: actions.ADD_BUCKET,
            payload: res.data
        });
    } catch (err) {
        console.log(err);
    }
}

export const getBucket = () => async dispatch => {
    try {
        const res = await axios.get('/api/buckets');

        dispatch({
            type: actions.GET_BUCKETS,
            payload: res.data
        });
    } catch (err) {
        console.log(err)
    }
};

export const getTodos = (bucketID) => async dispatch => {
    try {
        const res = await axios.get(`/api/bucket/${bucketID}/todos`);

        dispatch({
            type: actions.GET_TODOS,
            payload: res.data
        });
    } catch (err) {
        console.log(err)
    }
};

export const addTodo = (todoItem, bucketID) => async dispatch => {

    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    const body = {
        title: todoItem
    }

    try {
        const res = await axios.post(`/api/bucket/${bucketID}/todo`, body, config);

        dispatch({
            type: actions.ADD_TODO,
            payload: res.data
        });
    } catch (err) {
        console.log(err);
    }
};

export const getTodo = (todoID) => async dispatch => {
    try {
        const res = await axios.get(`/api/todo/${todoID}`);

        dispatch({
            type: actions.GET_TODO,
            payload: res.data
        });
    } catch (err) {
        console.log(err)
    }
};

export const updateTodo = (title, todoId, history) => async dispatch => {

    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    const body = {
        title: title
    }

    try {
        const res = await axios.patch(`/api/todo/${todoId}`, body, config);

        dispatch({
            type: actions.UPDATE_TODO,
            payload: res.data
        });

        history.goBack();
    } catch (err) {
        console.log(err);
    }
}


export const changeStatus = (status, todoId) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    const body = {
        completed: status
    }

    try {
        const res = await axios.patch(`/api/todo/status/${todoId}`, body, config);

        dispatch({
            type: actions.UPDATE_TODO,
            payload: { todoId, todos: res.data }
        });
    } catch (err) {
        console.log(err);
    }
}

export const deleteTodo = id => async dispatch => {
    try {
        await axios.delete(`/api/todo/${id}`);

        dispatch({
            type: actions.DELETE_TODO,
            payload: id
        });
    } catch (err) {
        console.log(err)
    }
}

export const filteredTodo = (filter, bucketID) => async dispatch => {

    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    const body = {
        filter: filter
    }

    try {
        const res = await axios.post(`/api/bucket/filter/${bucketID}/todos`, body, config);

        dispatch({
            type: actions.FILTERED_TODO,
            payload: res.data
        });
    } catch (err) {
        console.log(err);
    }
}

export const deleteBucket = id => async dispatch => {
    try {
        await axios.delete(`/api/bucket/${id}`);

        dispatch({
            type: actions.DELETE_BUCKET,
            payload: id
        });
    } catch (err) {
        console.log(err)
    }
}