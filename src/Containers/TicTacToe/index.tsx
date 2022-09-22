import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';

import Board from './components/Board';
import { calculateWinner } from './utils';

interface ComponentState {
  xIsNext: boolean;
  squares: string[];
  isGameOver: boolean;
  winner: string;
}

interface ComponentProps {}
class TicTacToe extends Component<ComponentProps, ComponentState> {
  constructor(props: ComponentProps) {
    super(props);
    this.state = {
      xIsNext: true,
      squares: Array(9).fill(''),
      isGameOver: false,
      winner: '',
    };
  }

  resetState = () => {
    this.setState({
      xIsNext: true,
      squares: Array(9).fill(''),
      isGameOver: false,
      winner: '',
    });
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
