import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';

import Board from './components/Board';
import { calculateWinner, returnWinningTiles } from './utils';

export interface History {
  squares: string[];
  currentSelection: number | null;
}
interface ComponentState {
  xIsNext: boolean;
  isGameOver: boolean;
  winner: string;
  winningTiles: number[] | null;
  isFreshGame: boolean;
  history: History[];
  stepNumber: number;
}

const stateObject: ComponentState = {
  xIsNext: true,
  history: [
    {
      squares: Array(9).fill(''),
      currentSelection: null,
    },
  ],
  isGameOver: false,
  winner: '',
  winningTiles: null,
  isFreshGame: true,
  stepNumber: 0,
};

interface ComponentProps {}
class TicTacToe extends Component<ComponentProps, ComponentState> {
  constructor(props: ComponentProps) {
    super(props);
    this.state = stateObject;
  }

  resetState = () => {
    this.setState(stateObject);
  };

  tapSquare = (index: number) => {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    if (squares[index] || this.state.isGameOver) {
      return;
    }

    squares[index] = this.state.xIsNext ? 'X' : 'O';

    this.setState(
      {
        xIsNext: !this.state.xIsNext,
        history: history.concat([
          {
            squares,
            currentSelection: index,
          },
        ]),
        isFreshGame: false,
        stepNumber: history.length,
      },
      this.checkFilledSquares,
    );
  };

  jumpTo = (step: number) => {
    this.setState({
      stepNumber: step,
      xIsNext: step % 2 === 0,
    });
  };

  checkFilledSquares = () => {
    const current = this.state.history[this.state.stepNumber];
    const squares = current.squares;
    const allFilled = squares.every(square => !!square);
    if (allFilled) {
      this.setState({
        isGameOver: true,
      });
    }

    this.handleCalculateWinner();
  };

  handleCalculateWinner = () => {
    const current = this.state.history[this.state.stepNumber];
    const squares = current.squares;
    const winner = calculateWinner(squares);
    if (winner) {
      this.setState({
        winner,
        isGameOver: true,
        winningTiles: returnWinningTiles(squares),
      });
    }
  };

  render() {
    const current = this.state.history[this.state.stepNumber];
    return (
      <View style={styles.container}>
        <Board
          tapSquare={this.tapSquare}
          squares={current.squares}
          xIsNext={this.state.xIsNext}
          isGameOver={this.state.isGameOver}
          winner={this.state.winner}
          resetState={this.resetState}
          winningTiles={this.state.winningTiles}
          currentSelection={current.currentSelection}
          isFreshgame={this.state.isFreshGame}
          history={this.state.history}
          jumpTo={this.jumpTo}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#333',
  },
});

export default TicTacToe;
