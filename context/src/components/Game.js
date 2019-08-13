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
        <div key={move} className={current === step ? 'current-move' : null}>
          <span>{move}</span>
          <button onClick={() => this.jumpTo(move)}>{desc}</button>
          <span>{col && col}</span>
          <span>{row && row}</span>
        </div>
      );
    });

    let draw = !winner && this.state.stepNumber >= 9;

    let status = draw
      ? `Tie game`
      : winner
      ? `Winner: ${winner.winner}`
      : `Next player: ${this.state.xIsNext ? 'X' : 'O'}`;

    return (
      <>
        <h1>React Tic-Tac-Toe: Context API</h1>
        <h3>
          <a href="https://github.com/BillyBunn/tic-tac-toe">
            See the source code & other design patterns
          </a>
        </h3>
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
            <div className="moves">
              <div>
                <span>#</span>
                <span>Time Travel</span>
                <span>Column</span>
                <span>Row</span>
              </div>
              {this.state.ascending ? moves : moves.reverse()}
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default Game;
