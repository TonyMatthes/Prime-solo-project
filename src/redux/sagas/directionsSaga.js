import decodePolyLine from 'decode-google-map-polyline'
import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios'

//strips html from google maps directions
function strip(html)
{
   const tmp = document.createElement("DIV");
   tmp.innerHTML = html;
   return tmp.textContent || tmp.innerText || "";
}
//puts spaces in directions where html strip leaves smashed together camelcased words
function unCamelCase (str){
    return str
        // insert a space between lower & upper
        .replace(/([a-z])([A-Z])/g, '$1 $2')
        // space before last upper in a sequence followed by lower
        .replace(/\b([A-Z]+)([A-Z])([a-z])/, '$1 $2$3')
}

//get directions from maps api
function* getDirections(action) {
    try {
        const response = 
        yield axios.get(`https://maps.googleapis.com/maps/api/directions/json?origin=${action.payload.origin.latitude},${action.payload.origin.longitude}&destination=${action.payload.destination.lat},${action.payload.destination.lng}`,
         {params:{
             key:'AIzaSyB675LdwmXlgKaIpAvXeOUIjlZU8Zl1TkQ',
             mode:'walking' // maybe change modes in the future
         }});
        yield put({ type: 'SET_DIRECTIONS',
                     payload:
                      {
                          //polyline is an array of Lat/Lng points used to draw navigation lines,
                          //google sends them encoded, so a decoder was neccessary
                          polyline: decodePolyLine(response.data.routes[0].overview_polyline.points),
                          //steps are html formatted directions, this map strips the html elements and adds spaces where
                          //words are mashed together, then dispatches the formatted array to the bathroom finder
                          steps: response.data.routes[0].legs[0].steps.map(step=>unCamelCase(strip(step.html_instructions)))} 
                        });
    } catch (error) {
        console.log('Error getting directions', error);
    }
}
function* directionSaga() {
    yield takeLatest('GET_DIRECTIONS', getDirections);
}

export default directionSaga;