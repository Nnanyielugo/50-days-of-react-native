import React from 'react';
import { View, StyleSheet } from 'react-native';

import { BOARD_HEIGHT, BOARD_WIDTH } from '../constants';
import Row from './row';

import type { FunctionComponent } from 'react';
import type { BrickObj, RowObj } from '../types';

interface BoardProps {
  board: RowObj[];
  updateBrickPos: (
    brick: BrickObj,
    left: number,
    rowIndex: number,
    brickIndex: number,
  ) => void;
}

const Board: FunctionComponent<BoardProps> = ({ board, updateBrickPos }) => {
  return (
    <View style={styles.container}>
      {board.map((row, index) => (
        <Row
          row={row}
          key={row.id}
          rowIndex={index}
          updateBrickPos={updateBrickPos}
        />
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
