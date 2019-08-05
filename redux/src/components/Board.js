import React from 'react';
import Square from './Square';

class Board extends React.Component {
  renderSquare(i) {
    const winner =
      this.props.winningSquares && this.props.winningSquares.includes(i);
    return (
      <Square
        key={i}
        squareId={i}
        value={this.props.squares[i]}
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
