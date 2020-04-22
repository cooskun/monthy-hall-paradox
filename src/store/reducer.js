const reducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_SIMULATIONS':
      return [...state, ...action.payload]

    default:
      return state
  }
}

export default reducer
