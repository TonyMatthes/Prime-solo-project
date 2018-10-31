const gottaGo = (state = false, action) => {
    switch (action.type) {
      case 'CLEAR_GOTTA_GO':
        return false;
      case 'GOTTA_GO_TOGGLE':
        return !state;
      case 'FORCE_GOTTA_GO':
        return true;
      default:
        return state;
    }
  }
  
  export default gottaGo