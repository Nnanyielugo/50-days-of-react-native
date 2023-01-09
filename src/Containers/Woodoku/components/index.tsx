import React from 'react';
import { View, StyleSheet } from 'react-native';
import Board from './board';

import { generateRow, generateBoard } from '../functions';
import type { BrickObj, RowObj } from '../types';

const Woodoku = () => {
  const [board, setBoard] = React.useState<RowObj[]>([]);

  React.useEffect(() => {
    setBoard(generateBoard());
  }, []);

  React.useEffect(() => {
    console.log('board', board);
  }, [board]);

  const updateBrickPos = (
    brick: BrickObj,
    left: number,
    rowIndex: number,
    brickIndex: number,
  ) => {
    let duplicateBoard: RowObj[] = JSON.parse(JSON.stringify(board));
    // let brickInBoard = duplicateBoard[rowIndex].row[brickIndex];
    duplicateBoard[rowIndex].row.splice(brickIndex, 1, {
      ...brick,
      pos: {
        left,
        right: left + brick.width,
      },
    });
    setBoard(duplicateBoard);
  };

  return (
    <View style={styles.container}>
      <Board board={board} updateBrickPos={updateBrickPos} />
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
});

export default Woodoku;
