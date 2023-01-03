import React from 'react';
import { View, StyleSheet } from 'react-native';

import { BOARD_HEIGHT, BOARD_WIDTH } from '../constants';
import Row from './row';

import type { FunctionComponent } from 'react';
import type { BrickObj, RowObj } from '../types';

interface BoardProps {
  rows: RowObj[];
}

const Board: FunctionComponent<BoardProps> = ({ rows }) => {
  return (
    <View style={styles.container}>
      {rows.map(row => (
        <Row row={row.row} key={row.id} />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: BOARD_WIDTH,
    height: BOARD_HEIGHT,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: 'whitesmoke',
    justifyContent: 'flex-end',
  },
});

export default Board;
