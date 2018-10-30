import { put, call, takeLatest } from 'redux-saga/effects';

const getUserLocation = () => new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
     location => resolve(location),
     error => reject(error),
    )
   })
function* getLocation() {
    try {
        const location = yield call(getUserLocation)
        yield put({type:'SET_LOCATION', payload: location.coords})
    } catch (error) {
        console.log('Couldn\'t get location', error)
    }
}

function* locationSaga() {
    yield takeLatest('GET_LOCATION', getLocation);
  }
  
  export default locationSaga;