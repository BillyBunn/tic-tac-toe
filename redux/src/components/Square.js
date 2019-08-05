import React from 'react';
import { connect } from 'react-redux';
import calculateWinner from '../lib/calculateWinner';

function Square(props) {
  const winnerStyle = {
    background: `#000`,
    color: `#fff`
  };

  const handleClick = (i) => {
    let history = props.history.slice(0, props.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = [...current.squares];

    // If there's a winner, do nothing
    if (calculateWinner(squares) || squares[i]) return;

    squares[i] = props.xIsNext ? 'X' : 'O'; // fill square

    // column and row of the move
    let move = [Math.floor((i % 3) + 1), Math.floor(i / 3 + 1)];

    props.dispatch({
      type: 'SQUARE_CLICK',
      payload: {
        history: [...history, { squares, move }],
        stepNumber: history.length,
        xIsNext: !props.xIsNext
      }
    });
  }

  return (
    <button
      className="square"
      style={props.winningSquare ? winnerStyle : null}
      onClick={() => handleClick(props.squareId)}
    >
      {props.value}
    </button>
  );
}

const mapStateToProps = (state, ownProps) => {
  let { ascending, history, stepNumber, xIsNext } = state;
  return { ascending, history, stepNumber, xIsNext };
};

export default connect(
  mapStateToProps,
  null
)(Square);