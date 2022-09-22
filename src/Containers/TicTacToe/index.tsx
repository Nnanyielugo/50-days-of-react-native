import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import Board from './components/Board';

class TickTacToe extends Component<{}, {}> {
  render() {
    return (
      <View style={styles.container}>
        <Board />
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
