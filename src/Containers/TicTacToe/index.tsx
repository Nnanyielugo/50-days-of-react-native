import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import Board from './components/Board';

interface ComponentState {
  xIsNext: boolean;
  squares: string[];
}

interface ComponentProps {}
class TickTacToe extends Component<ComponentProps, ComponentState> {
  constructor(props: ComponentProps) {
    super(props);
    this.state = {
      xIsNext: true,
      squares: Array(9).fill(''),
    };
  }

  tapSquare = (index: number) => {
    const squares = [...this.state.squares];
    if (squares[index]) {
      return;
    }

    squares[index] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      xIsNext: !this.state.xIsNext,
      squares,
    });
  };
  render() {
    return (
      <View style={styles.container}>
        <Board
          tapSquare={this.tapSquare}
          squares={this.state.squares}
          xIsNext={this.state.xIsNext}
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

export default TickTacToe;
