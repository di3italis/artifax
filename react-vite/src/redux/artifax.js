// redux/artifax.js
import { getCookie } from "./utils";

// --------------CONSTANTS----------------
const GET_ARTIFAX = "artifax/GET_ARTIFAX";
const GET_ARTIFAX_DETAILS = "artifax/GET_ARTIFAX_DETAILS";
const IMAGE_GENERATE_REQUEST = "artifax/IMAGE_GENERATE_REQUEST";
// const IMAGE_GENERATE_SUCCESS = "artifax/IMAGE_GENERATE_SUCCESS";
// const IMAGE_GENERATE_FAILURE = "artifax/IMAGE_GENERATE_FAILURE";
const CREATE_ARTIFAX = "artifax/CREATE_ARTIFAX";
const MY_ARTIFAX = "artifax/MY_ARTIFAX";
const EDIT_ARTIFAX = "artifax/EDIT_ARTIFAX";
const DELETE_ARTIFAX = "artifax/DELETE_ARTIFAX";
const ERROR = "artifax/ERROR";

// --------------ACTIONS----------------
//

// --------------GET ARTIFAX ACTION----------------
export const getAction = (payload) => {
    return {
        type: GET_ARTIFAX,
        payload,
    };
};

// --------------GET ARTIFAX DETAILS ACTION----------------
export const detailAction = (payload) => {
    return {
        type: GET_ARTIFAX_DETAILS,
        payload,
    };
};

// --------------CREATE ARTIFAX ACTIONS----------------
export const createAction = (payload) => {
    return {
        type: CREATE_ARTIFAX,
        payload,
    };
};

export const imageReqAction = () => {
    return {
        type: IMAGE_GENERATE_REQUEST,
    };
};

// --------------MY ARTIFAX ACTION----------------
export const myArtifaxAction = (payload) => {
    return {
        type: MY_ARTIFAX,
        payload,
    };
};

// --------------EDIT ARTIFAX ACTION----------------
export const editAction = (payload) => {
    return {
        type: EDIT_ARTIFAX,
        payload,
    };
};

// --------------DELETE ARTIFAX ACTION----------------
export const deleteAction = (faxId) => {
    return {
        type: DELETE_ARTIFAX,
        faxId,
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
//

// --------------GET ARTIFAX THUNK----------------
export const getArtifax = () => async (dispatch) => {
    try {
        const res = await fetch("/api/artifax/", {
            headers: {
                "Content-Type": "application/json",
                "X-CSRFToken": getCookie("csrftoken"),
            },
        });
        if (res.ok) {
            const data = await res.json();
            console.log("Fetched data.artifax:", data.artifax);
            // console.log("Fetched data:", data);
            dispatch(getAction(data.artifax));
        }
    } catch (error) {
        console.error("ERROR IN getARTIFAX", error);
        dispatch(errorAction(error));
    }
};

// --------------GET ARTIFAX DETAILS THUNK----------------
export const getArtifaxDetails = (faxId) => async (dispatch) => {
    try {
        const res = await fetch(`/api/artifax/${faxId}`, {
            headers: {
                "Content-Type": "application/json",
                "X-CSRFToken": getCookie("csrftoken"),
            },
        });
        if (res.ok) {
            const data = await res.json();
            // console.log("get deets data:", data);
            dispatch(detailAction(data.fax));
        }
    } catch (error) {
        console.error("ERROR IN getARTIFAXDETAILS", error);
        dispatch(errorAction(error));
    }
};

// --------------CREATE ARTIFAX THUNK----------------
export const createArtifax = (formData) => async (dispatch) => {
    dispatch(imageReqAction());

    try {
        const printFormData = structuredClone(formData);
        console.log("formData:", printFormData);

        const res = await fetch("/api/artifax/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-CSRFToken": getCookie("csrftoken"),
            },
            body: JSON.stringify(formData),
        });
        if (res.ok) {
            const data = await res.json();
            dispatch(createAction(data));
            return data;
        } else {
            const errorData = await res.json();
            console.log("Failed to generate image:", errorData);
        }
    } catch (error) {
        console.error("ERROR IN createARTIFAX", error);
        dispatch(errorAction(error));
        throw error;
    }
};

// --------------MY ARTIFAX THUNK----------------
export const myArtifax = () => async (dispatch) => {
    try {
        const res = await fetch("/api/artifax/my-artifax", {
            headers: {
                "Content-Type": "application/json",
                "X-CSRFToken": getCookie("csrftoken"),
            },
        });
        if (res.ok) {
            const data = await res.json();
            dispatch(myArtifaxAction(data.artifax));
            return data.artifax;
        }
    } catch (error) {
        console.error("ERROR IN getMYARTIFAX", error);
        dispatch(errorAction(error));
    }
};

// --------------DELETE ARTIFAX THUNK----------------
export const deleteArtifax = (faxId) => async (dispatch) => {
    try {
        const res = await fetch(`/api/artifax/${faxId}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "X-CSRFToken": getCookie("csrftoken"),
            },
        });
        if (res.ok) {
            dispatch(deleteAction(faxId));
        } else {
            const errorData = await res.json();
            console.log(`Failed to delete fax ${faxId}:`, errorData);
        }
    } catch (error) {
        console.error("ERROR IN deleteARTIFAX", error);
        dispatch(errorAction(error));
    }
};

// --------------EDIT ARTIFAX THUNK----------------
export const editArtifax = (formData) => async (dispatch) => {
    const { faxId, title, description } = formData;
    const updatedData = { title, description };
    try {
        const res = await fetch(`/api/artifax/${faxId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "X-CSRFToken": getCookie("csrftoken"),
            },
            body: JSON.stringify(updatedData),
        });
        if (res.ok) {
            const data = await res.json();
            dispatch(editAction(data));
        }
    } catch (error) {
        console.error("ERROR IN editARTIFAX", error);
        dispatch(errorAction(error));
    }
};

// --------------REDUCER----------------
const initialState = {};

export default function artifaxReducer(state = initialState, action) {
    switch (action.type) {
        // --------------GET ARTIFAX----------------
        case GET_ARTIFAX: {
            const newState = { ...state };
            action.payload.forEach((artifax) => {
                newState[artifax.id] = artifax;
            });
            return newState;
        }
        // --------------GET ARTIFAX DETAILS----------------
        case GET_ARTIFAX_DETAILS: {
            const id = action.payload.id;
            return { ...state, [id]: action.payload };
        }
        // --------------CREATE ARTIFAX----------------
        case IMAGE_GENERATE_REQUEST: {
            return { ...state, loading: true };
        }
        case CREATE_ARTIFAX: {
            const newState = structuredClone(state);
            newState[action.payload.id] = action.payload;
            return { ...newState, loading: false, error: null };
        }
        // --------------MY ARTIFAX----------------
        case MY_ARTIFAX: {
            const newState = {};
            action.payload.forEach((artifax) => {
                newState[artifax.id] = artifax;
            });
            return newState;
        }
        // // --------------DELETE ARTIFAX----------------
        case DELETE_ARTIFAX: {
            const newState = structuredClone(state);
            delete newState[action.faxId];
            return newState;
        }
        // // --------------EDIT ARTIFAX----------------
        case EDIT_ARTIFAX: {
            const newState = structuredClone(state);
            newState[action.payload.id] = action.payload;
            return newState;
        }
        // --------------ERROR----------------
        case ERROR: {
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        }
        default:
            return state;
    }
}
