import { takeEvery, call, put } from 'redux-saga/effects';

import { API_URL, CALCULATE_REQUEST, } from "../constants";
import { calculateSuccess } from "../redux/actions";

import { getProductCode, getSubscriptionPlan } from "../utils";


const calculateFetch = async (data) => {

    return await fetch(`${API_URL}/vcard-landing/calc`, {
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

function* calculateSaga(action) {
    const result = yield call(calculateFetch, action.payload);
    yield put(calculateSuccess(result));
}

export default function* calculateWatcher() {
    yield takeEvery(CALCULATE_REQUEST, calculateSaga);
}