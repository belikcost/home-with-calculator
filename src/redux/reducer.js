import {
    CALCULATE_SUCCESS,
    CREATE_CART_FAIL,
    CREATE_CART_REQUEST,
    CREATE_CART_SUCCESS,
    GET_SUBSCRIPTIONS_SUCCESS
} from "../constants";


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
                    totalCost: calculatedResult.total_cost,
                    productAmount: calculatedResult.product_amount,
                    subscriptionPeriod: calculatedResult.subscription_period,
                    subscriptionCostPerMonth: calculatedResult.subscription_cost_per_month,
                    subscriptionCostTotal: calculatedResult.subscription_cost_total,
                    encodingAmount: calculatedResult.encoding_amount,
                    encodingCostPerUnit: calculatedResult.encoding_cost_per_unit,
                    encodingCostTotal: calculatedResult.encoding_cost_total
                }};
        case CREATE_CART_REQUEST:
            return {...state, error: false, success: false};
        case CREATE_CART_FAIL:
            return {...state, error: true};
        case CREATE_CART_SUCCESS:
            return {...state, success: true};
        case GET_SUBSCRIPTIONS_SUCCESS:
            return {...state, subscriptions: action.payload.map(({tag_limit, ...subscription}) => ({
                    tagLimit: tag_limit,
                    ...subscription,
            }))};
        default:
            return state;
    }
}