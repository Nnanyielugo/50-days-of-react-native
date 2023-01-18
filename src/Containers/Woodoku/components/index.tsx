import React from 'react';
import { View, StyleSheet } from 'react-native';
import Row from './row';

import { generateRow, generateBoard, canDropDown } from '../functions';
import type { BrickObj, BrickPos, RowObj } from '../types';
import { BOARD_WIDTH, BOARD_HEIGHT } from '../constants';

type UpdatedBrickInfo = {
  brick: BrickObj;
  rowIndex: number;
  brickIndex: number;
};

const Woodoku = () => {
  const [board, setBoard] = React.useState<RowObj[]>(generateBoard());

  const handleAlignment = () => {
    let duplicateBoard = [...board];
    // let unAligned = false;
    board.forEach((row, rowIndex) => {
      row.row.forEach((brick, brickIndex) => {
        if (rowIndex === 0) {
          const canDrop = canDropDown(
            brick,
            brickIndex,
            duplicateBoard[rowIndex],
          );
          if (canDrop) {
            // setTimeout(() => {
            moveBrick(brick, rowIndex + 1, brickIndex);
            // }, 500);
          }
        } else {
          const canDrop = canDropDown(
            brick,
            brickIndex,
            duplicateBoard[rowIndex - 1],
          );

          if (canDrop) {
            // setTimeout(() => {
            moveBrick(brick, rowIndex, brickIndex);
            // }, 500);
          }
        }
      });
    });
  };

  // React.useEffect(() => {
  //   handleAlignment();
  // }, [board]);

  React.useEffect(() => {
    handleAlignment();

    // filter all rows that are filled with bricks
    // set a delay so that there is a visual presentation
    // before the row gets removed
    // setTimeout(() => {
    const duplicateBoard = [...board];
    setTimeout(() => {
      let output: RowObj[] = [];

      for (let i = 0; i < duplicateBoard.length; i++) {
        let row = duplicateBoard[i];
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

  const checkForDroppable = (
    brick: BrickObj,
    rowIndex: number,
    brickIndex: number,
  ) => {
    let duplicateBoard: RowObj[] = [...board];

    if (rowIndex !== 0) {
      const canDrop = canDropDown(
        brick,
        brickIndex,
        duplicateBoard[rowIndex - 1],
      );

      if (canDrop) {
        moveBrick(brick, rowIndex, brickIndex);
      }
    }
  };

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
    setTimeout(() => {
      checkForDroppable(
        duplicateBoard[rowIndex].row[brickIndex],
        rowIndex,
        brickIndex,
      );
    }, 200);

    setBoard(duplicateBoard);
  };

  const moveBrick = (brick: BrickObj, rowIndex: number, brickIndex: number) => {
    let duplicateBoard: RowObj[] = JSON.parse(JSON.stringify(board));
    const dropRowIndex = rowIndex - 1;
    let brickRow = duplicateBoard[rowIndex];
    let dropRow = duplicateBoard[dropRowIndex];
    if (brick.pos?.left === 0) {
      // case 1: lapping left border, simply drop at start..
      duplicateBoard[dropRowIndex].row.unshift(brick);
      duplicateBoard[rowIndex].row.splice(brickIndex, 1);
    } else if (brick.pos?.right === BOARD_WIDTH) {
      // case 2: brick lapping right border, simply drop at end
      duplicateBoard[dropRowIndex].row.push(brick);
      duplicateBoard[rowIndex].row.splice(brickIndex, 1);
    } else {
      // case 3: brick lapping neither border
      if (dropRow.row.length === 1) {
        // case 3.1: drop row only has 1 item
        if ((dropRow.row[0].pos as BrickPos).left >= brick.width) {
          // case 3.1.a: item can fit between left border and item in drop row
          // drop at start
          duplicateBoard[dropRowIndex].row.unshift(brick);
          duplicateBoard[rowIndex].row.splice(brickIndex, 1);
        } else if (
          BOARD_WIDTH - (dropRow.row[0].pos as BrickPos).right >=
          brick.width
        ) {
          // case 3.1.b: item can fit between right border and item in drop row
          // drop at end
          duplicateBoard[dropRowIndex].row.push(brick);
          duplicateBoard[rowIndex].row.splice(brickIndex, 1);
        }
      } else {
        // case 3.2: drop row has more than one item
        for (let i = 0; i < dropRow.row.length; i++) {
          const dropBrick = dropRow.row[i];
          const nextDropBrick = dropRow.row[i + 1];
          if (i === 0 && (dropBrick.pos as BrickPos).left >= brick.width) {
            // case 3.2.a: space between left and droprow's first brick can fit brick
            duplicateBoard[dropRowIndex].row.unshift(brick);
            duplicateBoard[rowIndex].row.splice(brickIndex, 1);
            break;
          } else if (
            i === dropRow.row.length - 1 &&
            BOARD_WIDTH - (dropBrick.pos as BrickPos).right >= brick.width
          ) {
            // case 3.2.b: space between right and droprow's last brick can fit brick
            duplicateBoard[dropRowIndex].row.push(brick);
            duplicateBoard[rowIndex].row.splice(brickIndex, 1);
            break;
          } else if (
            nextDropBrick &&
            (nextDropBrick.pos as BrickPos).left -
              (dropBrick.pos as BrickPos).right >=
              brick.width
          ) {
            // case 3.2.c: space between currently iteirated brick and the next one can fit moved brick
            // case 4: flush to left or right adjacent bricks
            let newBrick = { ...brick };
            if (
              (newBrick.pos as BrickPos).left <
              (dropBrick.pos as BrickPos).right
            ) {
              // case 4.1: brick's left pos is greater than lefthand's brick right pos. Adjust brick's left pos
              (newBrick.pos as BrickPos).left = (
                dropBrick.pos as BrickPos
              ).right;
            }

            if (
              (newBrick.pos as BrickPos).right >
              (nextDropBrick.pos as BrickPos).left
            ) {
              // case 4.2: brick's right pos is greater than righthand's brick right pos. Adjust brick's right pos
              (newBrick.pos as BrickPos).right = (
                nextDropBrick.pos as BrickPos
              ).left;
            }

            duplicateBoard[dropRowIndex].row[i + 1] = brick;
            duplicateBoard[dropRowIndex].row[i + 2] = nextDropBrick; // move next drop brick after moved brick
            duplicateBoard[rowIndex].row.splice(brickIndex, 1);
            break;
          }
        }
      }
    }

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
