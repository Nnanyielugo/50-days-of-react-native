import React, { useCallback, useRef } from 'react';
import { View, StyleSheet } from 'react-native';
import Row from './row';

import { generateBoard, canDropDown, moveBrick } from '../functions';
import type { BrickObj, RowObj } from '../types';
import { BOARD_WIDTH, BOARD_HEIGHT } from '../constants';

type UpdatedBrickInfo = {
  brick: BrickObj;
  rowIndex: number;
  brickIndex: number;
};

const Woodoku = () => {
  const [board, setBoard] = React.useState<RowObj[]>(generateBoard());
  // const [alternateBoard, setAlternateBoard] = React.useState<RowObj[]>(board);
  const boardRef = useRef(board);
  boardRef.current = board;

  const handleMoveBrick = useCallback(
    (brick: BrickObj, rowIndex: number, brickIndex: number) => {
      let duplicateBoard: RowObj[] = JSON.parse(JSON.stringify(board));
      const modifiedBoard = moveBrick(
        brick,
        rowIndex,
        brickIndex,
        duplicateBoard,
      );
      const stringifiedBoard = JSON.stringify(board);
      const stringifiedModBoard = JSON.stringify(modifiedBoard);
      const areBoardsEqual = stringifiedBoard === stringifiedModBoard;
      console.log('modified board', modifiedBoard, areBoardsEqual);

      if (!areBoardsEqual) {
        setBoard(modifiedBoard);
      }
    },
    [board],
  );

  const handleAlignment = useCallback(() => {
    let duplicateBoard: RowObj[] = JSON.parse(JSON.stringify(board));
    duplicateBoard.forEach((row, rowIndex) => {
      // console.log(rowIndex);
      row.row.forEach((brick, brickIndex) => {
        if (rowIndex === 0) {
          const canDrop = canDropDown(brick, duplicateBoard[rowIndex]);
          // console.log('can drop', canDrop);
          if (canDrop) {
            handleMoveBrick(brick, rowIndex + 1, brickIndex);
          }
        } else {
          const canDrop = canDropDown(brick, duplicateBoard[rowIndex - 1]);
          // console.log('can drop', canDrop);

          if (canDrop) {
            handleMoveBrick(brick, rowIndex, brickIndex);
          }
        }
      });
    });
    // console.log('call here');
    // filterOutFilledAndEmpty();
  }, [board, handleMoveBrick]);

  const filterOutFilledAndEmpty = useCallback(() => {
    const duplicateBoard = [...boardRef.current];
    let output: RowObj[] = [];
    for (let rowIndex = 0; rowIndex < duplicateBoard.length; rowIndex++) {
      let row = duplicateBoard[rowIndex];
      if (!row.row.length) {
        continue;
      }
      const rowWidth = row.row.reduce((acc, curr) => {
        return acc + curr.width;
      }, 0);
      if (rowWidth >= BOARD_WIDTH) {
        continue;
      }
      output.push(row);
    }
    if (output.length !== duplicateBoard.length) {
      setBoard(output);
    }
  }, []);

  React.useEffect(() => {
    handleAlignment();
    // filterOutFilledAndEmpty();
  }, [board, handleAlignment]);

  React.useEffect(() => {
    setTimeout(() => {
      filterOutFilledAndEmpty();
    }, 300);
  }, [board, filterOutFilledAndEmpty]);

  const updateBrickPos = (
    brick: BrickObj,
    left: number,
    rowIndex: number,
    brickIndex: number,
  ) => {
    const duplicateBoard: RowObj[] = [...board];
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
      <View style={styles.board}>
        {board.map((row, rowIndex) => (
          <Row
            row={row}
            key={row.id}
            rowIndex={rowIndex}
            updateBrickPos={updateBrickPos}
          />
        ))}
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
  board: {
    width: BOARD_WIDTH,
    height: BOARD_HEIGHT,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: 'whitesmoke',
    justifyContent: 'flex-end',
  },
  row: {
    flexDirection: 'row',
  },
});

export default Woodoku;
