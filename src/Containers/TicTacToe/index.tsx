import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';

import Board from './components/Board';
import { calculateWinner, returnWinningTiles } from './utils';

interface ComponentState {
  xIsNext: boolean;
  squares: string[];
  isGameOver: boolean;
  winner: string;
  winningTiles: number[] | null;
}

const stateObject = {
  xIsNext: true,
  squares: Array(9).fill(''),
  isGameOver: false,
  winner: '',
  winningTiles: null,
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
    const squares = [...this.state.squares];
    if (this.state.isGameOver) {
      return;
    }

    squares[index] = this.state.xIsNext ? 'X' : 'O';
    this.setState(
      {
        xIsNext: !this.state.xIsNext,
        squares,
      },
      this.checkFilledSquares,
    );
  };

  checkFilledSquares = () => {
    const { squares } = this.state;
    const allFilled = squares.every(square => !!square);
    if (allFilled) {
      this.setState({
        isGameOver: true,
      });
    }

    this.handleCalculateWinner();
  };

  handleCalculateWinner = () => {
    const { squares } = this.state;
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
    return (
      <View style={styles.container}>
        <Board
          tapSquare={this.tapSquare}
          squares={this.state.squares}
          xIsNext={this.state.xIsNext}
          isGameOver={this.state.isGameOver}
          winner={this.state.winner}
          resetState={this.resetState}
          winningTiles={this.state.winningTiles}
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
    backgroundColor: '#2c3e50',
  },
});

export default TicTacToe;
