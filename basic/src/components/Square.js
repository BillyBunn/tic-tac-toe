import React from 'react';

function Square(props) {
  const winnerStyle = {
    background: `#000`,
    color: `#fff`
  };
  return (
    <button
      className="square"
      style={props.winningSquare ? winnerStyle : null}
      onClick={() => props.onClick()}
    >
      {props.value}
    </button>
  );
}

export default Square;
