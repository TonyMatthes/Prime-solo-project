const selectedBathroom = (state = {}, action) => {
    switch (action.type) {
      case 'SET_SELECTED_BATHROOM':
        return action.payload;
      case 'CLEAR_SELECTED_BATHROOM':
        return {};
      default:
        return state;
    }
  }
  
  export default selectedBathroom