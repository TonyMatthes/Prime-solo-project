const amenities = (state = [], action) => {
    switch (action.type) {
      case 'SET_AMENITIES':
        return action.payload;
      default:
        return state;
    }
  }
  
  export default amenities