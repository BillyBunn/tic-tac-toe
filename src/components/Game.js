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
          move: { col: null, row: null }
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

    const moveMap = {
      0: [1, 1],
      1: [2, 1],
      2: [3, 1],
      3: [1, 2],
      4: [2, 2],
      5: [3, 2],
      6: [1, 3],
      7: [2, 3],
      8: [3, 3]
    };
    let [col, row] = moveMap[i];
    let move = { col, row };

    this.setState({
      history: [...history, { squares, move }],
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext
    });
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: step % 2 === 0
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
      const { col, row } = step.move;
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

    let status = winner
      ? `Winner: ${winner}`
      : `Next player: ${this.state.xIsNext ? 'X' : 'O'}`;

    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={current.squares}
            onClick={i => this.handleClick(i)}
            status={status}
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
