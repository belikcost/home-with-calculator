import { call, put, takeEvery } from "redux-saga/effects";

import { API_URL, GET_SUBSCRIPTIONS_REQUEST } from "../constants";
import { getSubscriptionsSuccess } from "../redux/actions";


const getSubscriptionsFetch = () => {
    return fetch(`${API_URL}/vcard-landing/subscriptions`).then(response => response.json());
}

function* getSubscriptions() {
    const result = yield call(getSubscriptionsFetch);
    yield put(getSubscriptionsSuccess(result));
}

export default function* getSubscriptionsWatcher() {
    yield takeEvery(GET_SUBSCRIPTIONS_REQUEST, getSubscriptions);
}