const bathrooms = (state = [], action) => {
  switch (action.type) {
    case 'SET_BATHROOMS':
      return action.payload;
    default:
      return state;
  }
}

export default bathrooms