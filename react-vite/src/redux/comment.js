// redux/comment.js
import { getCookie } from "./utils";


// --------------CONSTANTS----------------
const GET_COMMENTS = "comments/GET_COMMENTS";
const CREATE_COMMENT = "comments/CREATE_COMMENT";
const DELETE_COMMENT = "comments/DELETE_COMMENT";
const EDIT_COMMENT = "comments/EDIT_COMMENT";
const ERROR = "comments/ERROR";

// --------------ACTIONS----------------

// --------------GET COMMENTS ACTION----------------
export const getCommentsAction = (payload) => {
    return {
        type: GET_COMMENTS,
        payload,
    };
};

// --------------CREATE COMMENT ACTION----------------
export const createCommentAction = (payload) => {
    return {
        type: CREATE_COMMENT,
        payload,
    };
};

// --------------DELETE COMMENT ACTION----------------
export const deleteCommentAction = (commentId) => {
    return {
        type: DELETE_COMMENT,
        commentId,
    };
};

// --------------EDIT COMMENT ACTION----------------
export const editCommentAction = (payload) => {
    return {
        type: EDIT_COMMENT,
        payload,
    };
};

// --------------ERROR ACTION----------------
export const errorAction = (payload) => {
    return {
        type: ERROR,
        payload,
    };
};

// --------------THUNKS----------------

// --------------GET COMMENTS THUNK----------------
export const getComments = (faxId) => async (dispatch) => {
    try {
        const res = await fetch(`/api/comments/${faxId}`, {
            headers: {
                "Content-Type": "application/json",
                "X-CSRFToken": getCookie("csrftoken"),
            },
        });
        if (res.ok) {
            const data = await res.json();
            console.log("comments data.comments", data.comments);
            dispatch(getCommentsAction(data.comments));
        }
    } catch (error) {
        console.error("ERROR IN getCOMMENTS", error);
        dispatch(errorAction(error));
    }
};

// --------------CREATE COMMENT THUNK----------------
export const createComment = (formData) => async (dispatch) => {
    try {
        const res = await fetch(`/api/comments/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-CSRFToken": getCookie("csrftoken"),
            },
            body: JSON.stringify(formData),
        });
        if (res.ok) {
            const data = await res.json();
            dispatch(createCommentAction(data.comment));
        } else {
            const errorData = await res.json();
            console.log("Failed to create comment:", errorData);
        }
    } catch (error) {
        console.error("ERROR IN createCOMMENT", error);
        dispatch(errorAction(error));
    }
};

// --------------DELETE COMMENT THUNK----------------
export const deleteComment = (commentId) => async (dispatch) => {
    try {
        const res = await fetch(`/api/comments/${commentId}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "X-CSRFToken": getCookie("csrftoken"),
            },
        });
        if (res.ok) {
            dispatch(deleteCommentAction(commentId));
        } else {
            const errorData = await res.json();
            console.log(`Failed to delete comment ${commentId}:`, errorData);
        }
    } catch (error) {
        console.error("ERROR IN deleteCOMMENT", error);
        dispatch(errorAction(error));
    }
};

// --------------EDIT COMMENT THUNK----------------
export const editComment = (formData) => async (dispatch) => {
    const { commentId, text } = formData;
    const updatedData = { text };
    try {
        const res = await fetch(`/api/comments/${commentId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "X-CSRFToken": getCookie("csrftoken"),
            },
            body: JSON.stringify(updatedData),
        });
        if (res.ok) {
            const data = await res.json();
            dispatch(editCommentAction(data));
        }
    } catch (error) {
        console.error("ERROR IN editCOMMENT", error);
        dispatch(errorAction(error));
    }
};

// --------------REDUCER----------------
const initialState = {};

export default function commentsReducer(state = initialState, action) {
    switch (action.type) {
        // --------------GET COMMENTS----------------
        case GET_COMMENTS: {
            const newState = {};
            action.payload.forEach((comment) => {
                newState[comment.id] = comment;
            });
            return newState;
        }
        // --------------CREATE COMMENT----------------
        case CREATE_COMMENT: {
            const newState = structuredClone(state);
            newState[action.payload.id] = action.payload;
            return newState;
        }
        // --------------DELETE COMMENT----------------
        case DELETE_COMMENT: {
            const newState = structuredClone(state);
            delete newState[action.commentId];
            return newState;
        }
        // --------------EDIT COMMENT----------------
        case EDIT_COMMENT: {
            const newState = structuredClone(state);
            newState[action.payload.id] = action.payload;
            return newState;
        }
        // --------------ERROR----------------
        case ERROR: {
            return {
                ...state,
                error: action.payload,
            };
        }
        default:
            return state;
    }
}
