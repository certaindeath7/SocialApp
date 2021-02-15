import axios from 'axios';
import { setAlert } from './alert';
import {
    GET_POSTS,
    POST_ERROR,
    UPDATE_LIKES,
    DELETE_POST,
    ADD_POSTS,
    GET_POST,
    ADD_COMMENT,
    REMOVE_COMMENT
} from './types';
import post from '../reducers/post';

//Get posts
export const getPosts = () => async dispatch => {
    try {
        const res = await axios.get('/api/post');

        // forward the action to the Reducer in order to update the state
        dispatch({
            type: GET_POSTS,
            payload: res.data
        })
    } catch (err) {
        dispatch({
            type: POST_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });

    }
}

//add likes
export const addLike = id => async dispatch => {
    try {
        const res = await axios.put(`/api/post/likes/${id}`);

        // forward the action to the Reducer in order to update the state
        dispatch({
            type: UPDATE_LIKES,
            payload: { id, likes: res.data }
        })
    } catch (err) {
        dispatch({
            type: POST_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });

    }
}

//remove likes
export const removeLike = id => async dispatch => {
    try {
        const res = await axios.delete(`/api/post/likes/${id}`);

        // forward the action to the Reducer in order to update the state
        dispatch({
            type: UPDATE_LIKES,
            payload: { id, likes: res.data }
        });

        dispatch(setAlert('Post Removed', 'success'));
    } catch (err) {
        dispatch({
            type: POST_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });

    }
}

//remove posts
export const deletePost = id => async dispatch => {
    try {
        await axios.delete(`/api/post/${id}`);

        // forward the action to the Reducer in order to update the state
        dispatch({
            type: DELETE_POST,
            payload: id
        });

        dispatch(setAlert('Post Removed', 'success'));
    } catch (err) {
        dispatch({
            type: POST_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });

    }
}

//add posts
export const addPosts = (formData) => async dispatch => {

    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    try {
        const res = await axios.post(`/api/post/`, formData, config);

        // forward the action to the Reducer in order to update the state
        dispatch({
            type: ADD_POSTS,
            payload: res.data
        });

        dispatch(setAlert('Post Added', 'success'));
    } catch (err) {
        dispatch({
            type: POST_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });

    }
}

//Get posts
export const getPost = (id) => async dispatch => {
    try {
        const res = await axios.get(`/api/post/${id}`);

        // forward the action to the Reducer in order to update the state
        dispatch({
            type: GET_POST,
            payload: res.data
        })
    } catch (err) {
        dispatch({
            type: POST_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });

    }
}

//add comment
export const addComment = (postId, formData) => async dispatch => {

    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    try {
        const res = await axios.post(`/api/post/comment/${postId}`, formData, config);

        // forward the action to the Reducer in order to update the state
        dispatch({
            type: ADD_COMMENT,
            payload: res.data
        });

        dispatch(setAlert('Comment Added', 'success'));
    } catch (err) {
        dispatch({
            type: POST_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });

    }
}

//delete comment
export const deleteComment = (postId, commentId) => async dispatch => {

    try {
        const res = await axios.delete(`/api/post/comment/${postId}/${commentId}`);

        // forward the action to the Reducer in order to update the state
        dispatch({
            type: REMOVE_COMMENT,
            payload: commentId
        });

        dispatch(setAlert('Comment Removed', 'success'));
    } catch (err) {
        dispatch({
            type: POST_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });

    }
}