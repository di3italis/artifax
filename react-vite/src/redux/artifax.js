// redux/artifax.js
import axios from "axios";
import { getCookie } from "./utils";

// --------------CONSTANTS----------------
const GET_ARTIFAX = "artifax/GET_ARTIFAX";
const GET_ARTIFAX_DETAILS = "artifax/GET_ARTIFAX_DETAILS";
const CREATE_ARTIFAX = "artifax/CREATE_ARTIFAX";
const UPDATE_ARTIFAX = "artifax/EDIT_ARTIFAX";
const DELETE_ARTIFAX = "artifax/DELETE_ARTIFAX";
const ERROR = "artifax/ERROR";

// --------------ACTIONS----------------
//

// --------------GET ARTIFAX ACTION----------------
export const getAction= (payload) => {
    return {
        type: GET_ARTIFAX,
        payload,
    };
}

// --------------GET ARTIFAX DETAILS ACTION----------------
export const detailAction = (payload) => {
    return {
        type: GET_ARTIFAX_DETAILS,
        payload,
    };
}

// --------------CREATE ARTIFAX ACTION----------------
export const createAction = (payload) => {
    return {
        type: CREATE_ARTIFAX,
        payload,
    };
}

// --------------UPDATE ARTIFAX ACTION----------------
export const editAction = (payload) => {
    return {
        type: UPDATE_ARTIFAX,
        payload,
    };
}

// --------------DELETE ARTIFAX ACTION----------------
export const deleteAction = (faxId) => {
    return {
        type: DELETE_ARTIFAX,
        faxId,
    };
}

// --------------ERROR ACTION----------------
export const errorAction = (payload) => {
    return {
        type: ERROR,
        payload,
    };
}

// --------------THUNKS----------------
//

// --------------GET ARTIFAX THUNK----------------
export const getArtifax = () => async (dispatch) => {
    try {
        const res = await fetch("/api/artifax/", {
            headers: {
                "Content-Type": "application/json",
                "X-CSRFToken": getCookie("csrftoken"),
            }
        });
        if (res.ok) {
            const data = await res.json();
            console.log("Fetched data.artifax:", data.artifax)
            console.log("Fetched data:", data)
            dispatch(getAction(data.artifax));
        }
    }
    catch (error) {
        console.error("ERROR IN getARTIFAX", error);
        dispatch(errorAction(error));
    }
 
}

// --------------GET ARTIFAX DETAILS THUNK----------------
export const getArtifaxDetails = (faxId) => async (dispatch) => {
    try {
        console.log("enter try block")
        const res = await fetch(`/api/artifax/${faxId}`, {
            headers: {
                "Content-Type": "application/json",
                "X-CSRFToken": getCookie("csrftoken"),
            }
        });
        if (res.ok) {
            const data = await res.json();
            console.log("get deets data:", data)
            dispatch(detailAction(data.fax));
        }
    }
    catch (error) {
        console.error("ERROR IN getARTIFAXDETAILS", error);
        dispatch(errorAction(error));
    }
}

// --------------CREATE ARTIFAX THUNK----------------
export const createArtifax = (formData) => async (dispatch) => {
    try {
        // const apiKey = import.meta.env.IMG_HIPPO_API_KEY;
        // formData["file"] = image;
        // formData["api_key"] = "9W1YwT4VSelIHJyR3RYeKKmMlrGGiHJf";
        // // formData["api_key"] = apiKey;
        console.log("formData title:", formData.title);

         const imageUploadResponse = await fetch("/api/artifax/upload_image", {
            method: "POST",
            body: formData,
        });

        const imageUploadData = await imageUploadResponse.json();  // Parse the response as JSON


        if (imageUploadData.ok && imageUploadData.success) {
            const imageUrl = imageUploadData.data.url;
            
            formData.append("image", imageUrl);

            const artifaxData = {
                title: formData.title,
                description: formData.description,
                image: imageUrl
            };
            const res = await fetch("api/artifax", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "X-CSRFToken": getCookie("csrftoken"),
                },
                body: JSON.stringify(artifaxData)
            });
            if (res.ok) {
                const data = await res.json();
                dispatch(createAction(data));
                return data;
            } else {
                const errorData = await res.json();
                console.log("Failed to create fax:", errorData);
            }
        }
        else {
            console.log("Failed to upload image:", imageUploadData);
        }

        
        // const res = await fetch("/api/artifax/", {
        //     method: "POST",
        //     headers: {
        //         "X-CSRFToken": getCookie("csrftoken"),
        //     },
        //     body: formData
        // });
        // if (res.ok) {
        //     const data = await res.json();
        //     dispatch(createAction(data));
        // } else {
        //     const errorData = await res.json();
        //     console.log("Failed to create fax:", errorData);
        // }
    }
    catch (error) {
        console.error("ERROR IN createARTIFAX", error);
        dispatch(errorAction(error));
        throw error;
    }
}

// --------------DELETE ARTIFAX THUNK----------------
export const deleteArtifax = (faxId) => async (dispatch) => {
    try {
        const res = await fetch(`/api/artifax/${faxId}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "X-CSRFToken": getCookie("csrftoken"),
            }
        });
        if (res.ok) {
            dispatch(deleteAction(faxId));
        } else {
            const errorData = await res.json();
            console.log(`Failed to delete fax ${faxId}:`, errorData)
        }
    }
    catch (error) {
        console.error("ERROR IN deleteARTIFAX", error);
        dispatch(errorAction(error));
    }
}

// --------------EDIT ARTIFAX THUNK----------------

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
            console.log("deet reducer", action.payload)
            const id = action.payload.id;
            return { ...state, [id]: action.payload };
        }
        // --------------CREATE ARTIFAX----------------
        case CREATE_ARTIFAX: {
            const newState = structuredClone(state);
            newState[action.payload.id] = action.payload;
            return newState;
        }
        // // --------------DELETE ARTIFAX----------------
        case DELETE_ARTIFAX: {
            const newState = structuredClone(state);
            delete newState[action.faxId];
            return newState;
        }
        // // --------------EDIT ARTIFAX----------------
        // case EDIT_ARTIFAX: {
        //     const newState = structuredClone(state);
        //     newState[action.payload.id] = action.payload;
        //     return newState;
        // }
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

