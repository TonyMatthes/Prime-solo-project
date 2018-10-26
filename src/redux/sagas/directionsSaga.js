//don't know what call to make here, but eventually will be used for directions
import decodePolyLine from 'decode-google-map-polyline'
import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios'
function* getDirections(action) {
    try {
        const response = 
        yield axios.get(`https://cors.io/?https://maps.googleapis.com/maps/api/directions/json?origin=${action.payload.origin.latitude},${action.payload.origin.longitude}&destination=${action.payload.destination.lat},${action.payload.destination.lng}`,
         {params:{
             key:'AIzaSyB675LdwmXlgKaIpAvXeOUIjlZU8Zl1TkQ'
         }});
        yield put({ type: 'SET_DIRECTIONS', payload: decodePolyLine(response.data.routes[0].overview_polyline.points) });
    } catch (error) {
        console.log('Error getting directions', error);
    }
}
function* directionSaga() {
    yield takeLatest('GET_DIRECTIONS', getDirections);
}

export default directionSaga;