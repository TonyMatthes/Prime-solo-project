import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* getAmenities() {
  try {
    const response = yield axios.get('api/amenities');


    yield put({ type: 'SET_AMENITIES', payload: response.data });
  } catch (error) {
    console.log('amenities get request failed', error);
  }
}

function* amenitiesSaga() {
    yield takeLatest('GET_AMENITIES', getAmenities);
  }
  
  export default amenitiesSaga;