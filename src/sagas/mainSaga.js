import { all, call } from 'redux-saga/effects';

import calculateWatcher from "./calculateSaga";
import createCartWatcher from "./createCartSaga";


export default function* mainSaga() {
    yield all([
        call(calculateWatcher),
        call(createCartWatcher),
    ]);
}