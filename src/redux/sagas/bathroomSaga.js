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
        const response = yield axios.get('api/bathroom/closest', {
            params: {
                latitude: action.payload.latitude,
                longitude: action.payload.longitude,
                limit: action.payload.limit,
            }
        });
        yield put({ type: 'SET_BATHROOMS', payload: response.data });
        yield put({ type: 'CLEAR_DIRECTIONS' });
    } catch (error) {
        console.log('Error getting bathrooms', error);
    }
}

function* getFilteredBathrooms(action) {
    try {
        //get keys from sent object of {(amenity):(Boolean)...} and filter out the false ones
        const filterFeatures = Object.keys(action.payload.filterProps).filter(present => action.payload.filterProps[present])
        // declare an array to set as the new list of bathrooms
        let filteredArray = []
        //check for bathrooms that contain every amenity chosen.
        for (let bathroom of action.payload.bathrooms) {
            let matches = 0
            for (let amenity of filterFeatures) {
                if (bathroom.amenities_present.indexOf(amenity) === -1) {
                    matches--
                } else {
                    matches++
                }//and push them into the array if they fit
                if (matches === filterFeatures.length) {
                    filteredArray.push(bathroom)
                }
            }
        }
        yield put({ type: 'SET_BATHROOMS', payload: filteredArray });
        yield put({ type: 'CLEAR_DIRECTIONS' });
    } catch (error) {
        console.log('Error getting bathrooms', error);
    }
}


function* addBathroom(action) {
    try {
        yield axios.post('api/bathroom', action.payload);

        yield put({ type: 'GET_LOCATION' });
    } catch (error) {
        console.log('Error adding bathroom', error);
    }
}
function* deleteBathroom(action) {
    try {
        yield axios.delete(`api/bathroom/${action.payload}`);
        yield put({ type: 'GET_ALL_BATHROOMS' });
    } catch (error) {
        console.log('Error deleting bathroom', error);
    }
}

function* bathroomSaga() {
    yield takeLatest('GET_ALL_BATHROOMS', getAllBathrooms);
    yield takeLatest('GET_CLOSEST_BATHROOM', getClosestBathroom);
    yield takeLatest('GET_FILTERED_BATHROOMS', getFilteredBathrooms);
    yield takeLatest('ADD_BATHROOM', addBathroom);
    yield takeLatest('DELETE_BATHROOM', deleteBathroom);
}

export default bathroomSaga;