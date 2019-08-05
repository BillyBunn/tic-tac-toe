let initialState = {
  ascending: true,
  history: [
    {
      squares: Array(9).fill(null),
      move: Array(2).fill(null)
    }
  ],
  stepNumber: 0,
  xIsNext: true
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'SQUARE_CLICK':
      let { history, stepNumber, xIsNext } = action.payload;
      return { ...state, history, stepNumber, xIsNext };

    case 'TIME_TRAVEL':
      let step = action.payload;
      return {
        ...state,
        stepNumber: step,
        xIsNext: step % 2 === 0 // X is next on all even moves
      };

    case 'TOGGLE_ASCENDING':
      return { ...state, ascending: !state.ascending };
    default:
      return state;
  }
};
