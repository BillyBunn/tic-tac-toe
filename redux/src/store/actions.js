export const toggleAscending = () => {
  return {
    type: 'TOGGLE_ASCENDING'
  };
};

export const jumpTo = payload => {
  return {
    type: 'TIME_TRAVEL',
    payload
  };
};
