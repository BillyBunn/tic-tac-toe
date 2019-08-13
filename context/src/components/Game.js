import React from 'react';
import { Context } from '../Context';
import Board from './Board';
import '../styles/Game.css';

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

  render() {
    const history = this.context.history;
    const current = history[this.context.stepNumber];
    const winner = this.context.winner();

    const moves = history.map((step, move) => {
      const desc = move ? `Go to move # ${move}` : `Go to game start`;
      const [col, row] = step.move;
      return (
        <div key={move} className={current === step ? 'current-move' : null}>
          <span>{move}</span>
          <button onClick={() => this.context.jumpTo(move)}>{desc}</button>
          <span>{col && col}</span>
          <span>{row && row}</span>
        </div>
      );
    });

    let draw = !winner && this.context.stepNumber >= 9;

    let status = draw
      ? `Tie game`
      : winner
      ? `Winner: ${winner.winner}`
      : `Next player: ${this.context.xIsNext ? 'X' : 'O'}`;

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
            <Board />
          </div>
          <div className="game-info">
            <div>{status}</div>
            <button onClick={() => this.context.toggleAscending()}>
              {this.context.ascending ? 'ascending' : 'descending'}
            </button>
            <div className="moves">
              <div>
                <span>#</span>
                <span>Time Travel</span>
                <span>Column</span>
                <span>Row</span>
              </div>
              {this.context.ascending ? moves : moves.reverse()}
            </div>
          </div>
        </div>
      </>
    );
  }
}

Game.contextType = Context;

export default Game;
