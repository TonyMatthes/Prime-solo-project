import axios from 'axios'
import { takeLatest } from 'redux-saga/effects'

function * postRatings (action) {
  try {
    yield axios.post('api/ratings', action.payload)
  } catch (error) {
    console.log('amenities get request failed', error)
  }
}

function * amenitiesSaga () {
  yield takeLatest('RATE_BATHROOM', postRatings)
}

export default amenitiesSaga
