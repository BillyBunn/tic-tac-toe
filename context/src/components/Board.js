import React from 'react';
import Square from './Square';
import { Context } from '../Context';

class Board extends React.Component {
  static contextType = Context;
  renderSquare(i) {
    const winner =
      this.context.winner() && this.context.winner().winningSquares.includes(i);
    return (
      <Square
        key={i}
        value={this.context.history[this.context.stepNumber].squares[i]}
        onClick={() => this.context.handleClick(i)}
        winningSquare={winner}
      />
    );
  }
  render() {
    let board = [];
    for (let i = 0; i < 3; i++) {
      let row = [];
      for (let j = 0; j < 3; j++) {
        row.push(this.renderSquare(i * 3 + j));
      }
      board.push(
        <div key={i} className="board-row">
          {row}
        </div>
      );
    }

    return <div>{board}</div>;
  }
}

export default Board;
