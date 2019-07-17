import React from 'react';
import '../styles/Game.css';
import Board from './Board';
import calculateWinner from '../lib/calculateWinner';

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
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
  }

  handleClick(i) {
    let history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = [...current.squares];

    // If there's a winner, do nothing
    if (calculateWinner(squares) || squares[i]) return;

    squares[i] = this.state.xIsNext ? 'X' : 'O'; // fill square

    // column and row of the move
    let move = [Math.floor((i % 3) + 1), Math.floor(i / 3 + 1)];

    this.setState({
      history: [...history, { squares, move }],
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext
    });
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: step % 2 === 0 // X is next on all even moves
    });
  }

  toggleAscending() {
    this.setState({ ascending: !this.state.ascending });
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);

    const moves = history.map((step, move) => {
      const desc = move ? `Go to move # ${move}` : `Go to game start`;
      const [col, row] = step.move;
      return (
        <li key={move} className={current === step ? 'current-move' : null}>
          <button onClick={() => this.jumpTo(move)}>{desc}</button>
          <p>
            {col && `col: ${col}`}
            {row && `, row: ${row}`}
          </p>
        </li>
      );
    });

    let draw = !winner && this.state.stepNumber >= 9;

    let status = draw
      ? `Tie game`
      : winner
      ? `Winner: ${winner.winner}`
      : `Next player: ${this.state.xIsNext ? 'X' : 'O'}`;

    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={current.squares}
            onClick={i => this.handleClick(i)}
            status={status}
            winningSquares={winner && winner.winningSquares}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <button onClick={() => this.toggleAscending()}>
            {this.state.ascending ? 'ascending' : 'descending'}
          </button>
          <ol>{this.state.ascending ? moves : moves.reverse()}</ol>
        </div>
      </div>
    );
  }
}

export default Game;
