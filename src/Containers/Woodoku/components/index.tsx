import React, { useCallback, useRef } from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import Row from './row';

import { generateBoard, canDropDown, moveBrick } from '../functions';
import type { BrickObj, RowObj } from '../types';
import { BOARD_WIDTH, BOARD_HEIGHT } from '../constants';

const Woodoku = () => {
  const [board, setBoard] = React.useState<RowObj[]>(generateBoard());
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

      // only update board if there was actual movement
      if (!areBoardsEqual) {
        setBoard(modifiedBoard);
      }
    },
    [board],
  );

  const handleRefresh = () => {
    setBoard(generateBoard());
  };

  const handleAlignment = useCallback(() => {
    let duplicateBoard: RowObj[] = JSON.parse(JSON.stringify(board));
    duplicateBoard.forEach((row, rowIndex) => {
      row.row.forEach((brick, brickIndex) => {
        if (rowIndex === 0) {
          const canDrop = canDropDown(brick, duplicateBoard[rowIndex]);
          if (canDrop) {
            handleMoveBrick(brick, rowIndex + 1, brickIndex);
          }
        } else {
          const canDrop = canDropDown(brick, duplicateBoard[rowIndex - 1]);
          if (canDrop) {
            handleMoveBrick(brick, rowIndex, brickIndex);
          }
        }
      });
    });
  }, [board, handleMoveBrick]);

  const filterOutFilledAndEmpty = useCallback(() => {
    // use most recent version of board,
    // rather than the version that existed at the beginning
    // of setTimeout in the calling effect callback.
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
      <View style={styles.refreshContainer}>
        <TouchableOpacity onPress={handleRefresh}>
          <View style={styles.refreshButton}>
            <Text style={styles.refreshText}>Refresh</Text>
          </View>
        </TouchableOpacity>
      </View>

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
  refreshContainer: {
    marginBottom: 20,
  },
  refreshText: {
    color: 'white',
  },
  refreshButton: {
    backgroundColor: '#476481',
    paddingVertical: 7,
    paddingHorizontal: 10,
    borderRadius: 4,
  },
});

export default Woodoku;
