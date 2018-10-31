import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios'
function* getAllBathrooms() {
    try {
        const response = yield axios.get('api/bathroom')
        yield put({ type: 'SET_BATHROOMS', payload: response.data });
    } catch (error) {
        console.log('Error getting bathrooms', error);
    }
}

function* getClosestBathroom(action) {
    try {
        const response = yield axios.get('api/bathroom/closest', {params:{
            latitude:action.payload.latitude,
            longitude:action.payload.longitude,
            limit:action.payload.limit,
        }});
        yield put({ type: 'SET_BATHROOMS', payload: response.data });
        yield put({ type: 'CLEAR_DIRECTIONS'});
    } catch (error) {
        console.log('Error getting bathrooms', error);
    }
}


function* addBathroom(action) {
    try {
        yield axios.post('api/bathroom', action.payload);
        yield put({ type: 'GET_CLOSEST_BATHROOM' });
    } catch (error) {
        console.log('Error adding bathroom', error);
    }
}

function* bathroomSaga() {
    yield takeLatest('GET_ALL_BATHROOMS', getAllBathrooms);
    yield takeLatest('GET_CLOSEST_BATHROOM', getClosestBathroom);
    yield takeLatest('ADD_BATHROOM', addBathroom);
}

export default bathroomSaga;