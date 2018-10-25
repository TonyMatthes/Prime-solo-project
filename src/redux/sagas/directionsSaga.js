//don't know what call to make here, but eventually will be used for directions

import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios'
function* getDirections(action) {
    try {
        const response = yield axios.post('/api/bathroom/directions', action.payload);
        yield put({ type: 'SET_DIRECTIONS', payload: response.data });
    } catch (error) {
        console.log('Error getting directions', error);
    }
}
function* directionSaga() {
    yield takeLatest('GET_DIRECTIONS', getDirections);
}

export default directionSaga;