//will be used for directions

const directions = (state = {}, action) => {
    switch (action.type) {
      case 'SET_DIRECTIONS':
        return action.payload;
      default:
        return state;
    }
  }
  
  export default directions