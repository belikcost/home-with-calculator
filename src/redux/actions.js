import {
    CALCULATE_REQUEST,
    CALCULATE_SUCCESS,
    CREATE_CART_FAIL,
    CREATE_CART_REQUEST,
    CREATE_CART_SUCCESS
} from "../constants";


export const calculateRequest = (data) => ({type: CALCULATE_REQUEST, payload: data});
export const calculateSuccess = (data) => ({type: CALCULATE_SUCCESS, payload: data});

export const createCartRequest = (data) => ({type: CREATE_CART_REQUEST, payload: data});
export const createCartFail = (data) => ({type: CREATE_CART_FAIL, payload: data});
export const createCartSuccess = (data) => ({type: CREATE_CART_SUCCESS, payload: data});