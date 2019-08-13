import React from 'react';
import { Context } from '../Context';

function Square({ squareId }) {
  const winnerStyle = {
    background: `#000`,
    color: `#fff`
  };

  return (
    <Context.Consumer>
      {context => {
        const winner =
          context.winner() &&
          context.winner().winningSquares.includes(squareId);

        return (
          <button
            className="square"
            style={winner ? winnerStyle : null}
            onClick={() => context.handleClick(squareId)}
          >
            {context.history[context.stepNumber].squares[squareId]}
          </button>
        );
      }}
    </Context.Consumer>
  );
}

export default Square;
