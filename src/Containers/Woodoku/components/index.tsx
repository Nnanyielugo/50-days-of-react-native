import React from 'react';
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
  // const [updatedBrickInfo, updateBrickInfo] =
  //   React.useState<UpdatedBrickInfo | null>();

  const handleAlignment = () => {
    let duplicateBoard = [...board];
    // let unAligned = false;
    duplicateBoard.forEach((row, rowIndex) => {
      // console.log('row here', rowIndex, row);
      row.row.forEach((brick, brickIndex) => {
        if (rowIndex === 0) {
          const canDrop = canDropDown(
            brick,
            brickIndex,
            duplicateBoard[rowIndex],
          );
          if (canDrop) {
            handleMoveBrick(brick, rowIndex + 1, brickIndex);
          }
        } else {
          const canDrop = canDropDown(
            brick,
            brickIndex,
            duplicateBoard[rowIndex - 1],
          );

          if (canDrop) {
            handleMoveBrick(brick, rowIndex, brickIndex);
          }
        }
      });
    });
  };

  React.useEffect(() => {
    handleAlignment();
  }, [board]); // eslint-disable-line react-hooks/exhaustive-deps

  React.useEffect(() => {
    // filter all rows that are filled with bricks and all rows that are empty
    // set a delay so that there is a visual presentation
    // before the row gets removed
    const duplicateBoard = [...board];
    setTimeout(() => {
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
    }, 500);
  }, [board]);

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

  const handleMoveBrick = (
    brick: BrickObj,
    rowIndex: number,
    brickIndex: number,
  ) => {
    const modifiedBoard = moveBrick(brick, rowIndex, brickIndex, board);
    setBoard(modifiedBoard);
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
