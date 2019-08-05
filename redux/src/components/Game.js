import React from 'react';
import { connect } from 'react-redux';
import '../styles/Game.css';
import Board from './Board';
import calculateWinner from '../lib/calculateWinner';
import * as actions from '../store/actions';

class Game extends React.Component {

  jumpTo(step) {
    this.props.dispatch({
      type: 'TIME_TRAVEL',
      payload: step
    });
  }

  toggleAscending() {
    this.props.dispatch({
      type: 'TOGGLE_ASCENDING'
    });
  }

  render() {
    const history = this.props.history;
    const current = history[this.props.stepNumber];
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

    let draw = !winner && this.props.stepNumber >= 9;

    let status = draw
      ? `Tie game`
      : winner
      ? `Winner: ${winner.winner}`
      : `Next player: ${this.props.xIsNext ? 'X' : 'O'}`;

    return (
      <>
        <h1>React Tic-Tac-Toe: Redux</h1>
        <h3>
          <a href="https://github.com/BillyBunn/tic-tac-toe">
            See the source code & other design patterns
          </a>
        </h3>
        <div className="game">
          <div className="game-board">
            <Board
              squares={current.squares}
              status={status}
              winningSquares={winner && winner.winningSquares}
            />
          </div>
          <div className="game-info">
            <div>{status}</div>
            <button onClick={() => this.toggleAscending()}>
              {this.props.ascending ? 'ascending' : 'descending'}
            </button>
            <div className="moves">
              <div>
                <span>#</span>
                <span>Time Travel</span>
                <span>Column</span>
                <span>Row</span>
              </div>
              {this.props.ascending ? moves : moves.reverse()}
            </div>
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  let { ascending, history, stepNumber, xIsNext } = state;
  return { ascending, history, stepNumber, xIsNext };
};

export default connect(
  mapStateToProps,
  null
)(Game);
