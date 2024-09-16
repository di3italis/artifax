// redux/comment.js
import { getCookie } from "./utils";


// --------------CONSTANTS----------------
const GET_COMMENTS = "comments/GET_COMMENTS";
const ADD_COMMENT = "comments/ADD_COMMENT";
const DELETE_COMMENT = "comments/DELETE_COMMENT";
const EDIT_COMMENT = "comments/EDIT_COMMENT";
const LOADING = "comments/LOADING";
const ERROR = "comments/ERROR";

// --------------ACTIONS----------------

// --------------GET COMMENTS ACTION----------------
export const getCommentsAction = (payload) => {
    return {
        type: GET_COMMENTS,
        payload,
    };
};

// --------------ADD COMMENT ACTION----------------
export const addCommentAction = (payload) => {
    return {
        type: ADD_COMMENT,
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

// --------------LOADING ACTION----------------
export const loadingAction = () => {
    return {
        type: LOADING,
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

            if (data && data.comments) {
                console.log("comments data.comments", data.comments);
                dispatch(getCommentsAction(data.comments));
            } else {
                console.error("Invalid comments data:", data);
                dispatch(errorAction("Invalid comments data"));
            }
        } else {
            const errorData = await res.json();
            console.log("Failed to add comments:", errorData);
            dispatch(errorAction(errorData));
        }
    } catch (error) {
        console.error("ERROR IN getCOMMENTS", error);
        dispatch(errorAction(error));
    }
};

// --------------ADD COMMENT THUNK----------------
export const addComment = (formData) => async (dispatch) => {
    dispatch(loadingAction());
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
            dispatch(addCommentAction(data.comment));
            console.log("flask comment data", data.comment)
        } else {
            const errorData = await res.json();
            console.log("Failed to add comment:", errorData);
        }
    } catch (error) {
        console.error("ERROR IN addCOMMENT", error);
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
        case LOADING: {
            return { ...state, loading: true };
        }
        // --------------GET COMMENTS----------------
        case GET_COMMENTS: {
            const newState = {...state, loading: false};
            action.payload.forEach((comment) => {
                if (comment && comment.id) {
                    newState[comment.id] = comment;
                }
            });
            return newState;
        }
        // --------------ADD COMMENT----------------
        case ADD_COMMENT: {
            // const newState = structuredClone(state);
            const newState = { ...state, loading: false};
            const comment = action.payload;
            if (comment && comment.id) {
                newState[comment.id] = comment;
            } else {
                console.error("Invalid comment data:", comment);
                return { ...state, loading: false, error: "Invalid comment data" };
            }
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
