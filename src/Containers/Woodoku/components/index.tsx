import React from 'react';
import { View, StyleSheet } from 'react-native';
import Board from './board';

import { generateRow, generateBoard, canDropDown } from '../functions';
import type { BrickObj, RowObj } from '../types';

const Woodoku = () => {
  const [board, setBoard] = React.useState<RowObj[]>([]);

  React.useEffect(() => {
    setBoard(generateBoard());
  }, []);

  React.useEffect(() => {
    // console.log('board', board);
    checkForDroppable();
  }, [board]);

  const checkForDroppable = () => {
    let duplicateBoard: RowObj[] = [...board];

    for (let i = 1; i < duplicateBoard.length; i++) {
      let row = duplicateBoard[i];
      for (let j = 0; j < row.row.length; j++) {
        let brick = row.row[j];
        canDropDown(brick, j, duplicateBoard[i - 1]);
      }
    }
  };

  const updateBrickPos = (
    brick: BrickObj,
    left: number,
    rowIndex: number,
    brickIndex: number,
  ) => {
    let duplicateBoard: RowObj[] = [...board];
    duplicateBoard[rowIndex].row.splice(brickIndex, 1, {
      ...brick,
      pos: {
        left,
        right: left + brick.width,
      },
    });
    setBoard(duplicateBoard);
  };

  const moveBrick = (
    brick: BrickObj,
    left: number,
    rowIndex: number,
    brickIndex: number,
  ) => {
    let duplicateBoard: RowObj[] = JSON.parse(JSON.stringify(board));
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
