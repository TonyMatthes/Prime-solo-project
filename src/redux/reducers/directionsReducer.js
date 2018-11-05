const directions = (state = {polyline:[],steps:[]}, action) => {
  switch (action.type) {
    case 'SET_DIRECTIONS':
      return action.payload;
    case 'CLEAR_DIRECTIONS':
      return {polyline:[],steps:[]};
    default:
      return state;
  }
}

export default directions