//Commented out code is for a working geolocation saga, ended up being redundant,
//but may be useful later

import { put, /*call,*/ takeLatest } from 'redux-saga/effects';
import axios from 'axios'
function* getBathrooms() {
    try {
        const response = yield axios.get('api/bathroom');
        yield put({ type: 'SET_BATHROOMS', payload: response.data });
    } catch (error) {
        console.log('Error getting bathrooms', error);
    }
}


function* addBathroom(action) {
    try {
        yield axios.post('api/bathroom', action.payload);
        yield put({ type: 'GET_BATHROOMS' });
    } catch (error) {
        console.log('Error adding bathroom', error);
    }
}
// const getUserLocation = () => new Promise((resolve, reject) => {
//     navigator.geolocation.getCurrentPosition(
//      location => resolve(location),
//      error => reject(error),
//     )
//    })
// function* getLocation() {
//     try {
//         const location = yield call(getUserLocation)
//         yield put({type:'SET_LOCATION', payload: location.coords})
//     } catch (error) {
//         console.log('Couldn\'t get location', error)
//     }
// }


function* bathroomSaga() {
    yield takeLatest('GET_BATHROOMS', getBathrooms);
    yield takeLatest('ADD_BATHROOM', addBathroom);
    // yield takeLatest('GET_LOCATION', getLocation)
}

export default bathroomSaga;