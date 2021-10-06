import { all, call } from 'redux-saga/effects';

import calculateWatcher from "./calculateSaga";
import createCartWatcher from "./createCartSaga";
import getSubscriptionsWatcher from "./getSubscriptions";


export default function* mainSaga() {
    yield all([
        call(calculateWatcher),
        call(createCartWatcher),
        call(getSubscriptionsWatcher),
    ]);
}