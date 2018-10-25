const location = (state = {}, action) => {
    switch (action.type) {
      case 'SET_LOCATION':
      const lat=action.payload.latitude
      const lng=action.payload.longitude
        return {latitude: lat,longitude: lng}
      default:
        return state;
    }
  }

  export default location;