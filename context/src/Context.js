import React from 'react';
import calculateWinner from './lib/calculateWinner';

// Creates a context object
export const Context = React.createContext();

class Provider extends React.Component {
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
      xIsNext: true,
      jumpTo: this.jumpTo,
      handleClick: this.handleClick,
      toggleAscending: this.toggleAscending,
      winner: this.calcWinner
    };
  }

  calcWinner = () =>
    calculateWinner(this.state.history[this.state.stepNumber].squares);

  handleClick = i => {
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
  };

  jumpTo = step => {
    this.setState({
      stepNumber: step,
      xIsNext: step % 2 === 0 // X is next on all even moves
    });
  };

  toggleAscending = () => {
    this.setState({ ascending: !this.state.ascending });
  };

  render() {
    return (
      <Context.Provider value={this.state}>
        {this.props.children}
      </Context.Provider>
    );
  }
}

export default Provider;
