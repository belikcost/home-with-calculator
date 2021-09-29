import { CALCULATE_SUCCESS, CREATE_CART_FAIL, CREATE_CART_REQUEST, CREATE_CART_SUCCESS } from "../constants";


const initialState = {
    error: false,
    success: false
}

export const reducer = (state = initialState, action) => {
    switch (action.type) {
        case CALCULATE_SUCCESS:
            const calculatedResult = action.payload;
            return {...state, calculate: {
                    costPerUnit: calculatedResult.product_cost_per_unit,
                    totalCost: calculatedResult.total_cost
                }};
        case CREATE_CART_REQUEST:
            return {...state, error: false, success: false};
        case CREATE_CART_FAIL:
            return {...state, error: true};
        case CREATE_CART_SUCCESS:
            localStorage.setItem('cartId', action.payload.id);
            return {...state, success: true};
        default:
            return state;
    }
}