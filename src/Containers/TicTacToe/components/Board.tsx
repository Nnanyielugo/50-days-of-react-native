import React from 'react';
import { View, StyleSheet } from 'react-native';

import Square from './Square';

import type { FunctionComponent } from 'react';

interface BoardProps {}

const Board: FunctionComponent<BoardProps> = () => {
  const renderSquare = (index: number) => {
    return <Square key={index} index={index} />;
  };

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        {[1, 2, 3].map((row: number) => {
          return renderSquare(row);
        })}
      </View>

      <View style={styles.row}>
        {[4, 5, 6].map((row: number) => {
          return renderSquare(row);
        })}
      </View>

      <View style={styles.row}>
        {[7, 8, 9].map((row: number) => {
          return renderSquare(row);
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2c3e50',
  },
  row: {
    flexDirection: 'row',
  },
});

export default Board;
