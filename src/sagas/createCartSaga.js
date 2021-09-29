import { takeEvery, call, put } from 'redux-saga/effects';

import { API_URL, CREATE_CART_REQUEST, } from "../constants";
import { createCartFail, createCartSuccess } from "../redux/actions";

import { getProductCode, getSubscriptionPlan } from "../utils";


const createCartFetch = async (data) => {

    return await fetch(`${API_URL}/vcard-landing/carts`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({
            product_code: getProductCode(data.type, data.design, data.options),
            product_amount: +data.productAmount,
            product_amount_unique: +data.personAmount,
            encoding_type: data.encodingType,
            subscription_plan: getSubscriptionPlan(data.subscriptionPlan),
            subscription_period: +data.subscriptionPeriod
        })
    }).then(response => response.json());
}

function* createCartSaga(action) {
    const result = yield call(createCartFetch, action.payload);
    if (result.id) {
        yield put(createCartSuccess(result));
    } else {
        yield put(createCartFail(result));
    }
}

export default function* createCartWatcher() {
    yield takeEvery(CREATE_CART_REQUEST, createCartSaga);
}