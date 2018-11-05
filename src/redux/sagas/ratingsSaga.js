import axios from 'axios'
import { put, takeLatest } from 'redux-saga/effects'

function * postRatings (action) {
  try {
    yield axios.post('api/ratings', action.payload)
    yield put({type:'GET_LOCATION'})
  } catch (error) {
    console.log('amenities get request failed', error)
  }
}

function * amenitiesSaga () {
  yield takeLatest('RATE_BATHROOM', postRatings)
}

export default amenitiesSaga
