import { BOARD_WIDTH, SAFE_MARGIN, getBoards } from './constants';
import type { RowObj, BrickObj, BrickPos } from './types';

export function generateId(): string {
  let id =
    (Math.random() * new Date().getTime()).toString() +
    '-' +
    (Math.random() * 1e4).toString() +
    '-' +
    (Math.random() * new Date().getTime()).toString() +
    '-' +
    (Math.random() * 1e5).toString();
  return id;
}

export function generateBoard(): RowObj[] {
  let board = [];
  let boardNum = Math.ceil(Math.random() * 12);

  board = getBoards(boardNum);

  for (let i = 0; i < board.length; i++) {
    const row = board[i];

    for (let j = 0; j < row.row.length; j++) {
      const brick = row.row[j];
      const pos = getBrickPosition(brick, row);
      board[i].row[j].pos = pos;
    }
  }

  // remove empty bricks
  for (let i = 0; i < board.length; i++) {
    let row = board[i];
    let visibleRow = row.row.filter(brick => !brick.transparent);
    board.splice(i, 1, {
      id: row.id,
      row: visibleRow,
    });
  }

  return board;
}

export function canDropDown(target: BrickObj, rowUnder: RowObj) {
  let targetPos = target.pos as BrickPos;
  const leftClears: boolean[] = [];
  const rightClears: boolean[] = [];

  let isClear = false;

  for (let i = 0; i < rowUnder.row.length; i++) {
    let brickPos = rowUnder.row[i].pos as BrickPos;
    let nextBrick = rowUnder.row[i + 1];
    let prevBrick = rowUnder.row[i - 1];

    if (targetPos.left === 0) {
      // case 1: target is at the left border of the board
      leftClears.push(
        targetPos.right <= brickPos.left ||
          targetPos.right - SAFE_MARGIN <= brickPos.left,
      );
    } else if (targetPos.right === BOARD_WIDTH) {
      //case 2: target is at the right border of the board
      rightClears.push(
        Boolean(
          targetPos.left >= brickPos.right ||
            targetPos.left + SAFE_MARGIN >= brickPos.right,
        ),
      );
    } else {
      if (!prevBrick && nextBrick) {
        // case 3: s this means the first brick on the under row where
        // target is neither extreme right nor extreme left
        // we need there to be enough space under the target,
        // and between brickPos and the next brixk's pos

        if (targetPos.right + SAFE_MARGIN <= brickPos.left) {
          isClear = true;
        } else if (
          (targetPos.left >= brickPos.right &&
            targetPos.right <= (nextBrick.pos as BrickPos).left) ||
          (targetPos.left + SAFE_MARGIN >= brickPos.right &&
            targetPos.right <= (nextBrick.pos as BrickPos).left) ||
          (targetPos.left >= brickPos.right &&
            targetPos.right - SAFE_MARGIN <= (nextBrick.pos as BrickPos).left)
        ) {
          isClear = true;
        }
      } else if (prevBrick && !nextBrick) {
        // as this means the last brick on the under row, we only need
        // target to find space between previous and current bricks
        // or find enough space between current brick and right border

        if (targetPos.left >= brickPos.right - SAFE_MARGIN) {
          isClear = true;
        } else if (
          (targetPos.left >= (prevBrick.pos as BrickPos).right &&
            targetPos.right <= brickPos.left) ||
          (targetPos.left + SAFE_MARGIN >= (prevBrick.pos as BrickPos).right &&
            targetPos.right <= brickPos.left + SAFE_MARGIN)
        ) {
          isClear = true;
        }
      } else if (
        !prevBrick &&
        !nextBrick &&
        targetPos.left !== 0 &&
        targetPos.right !== BOARD_WIDTH
      ) {
        // only one brick on the under row
        if (
          targetPos.right <= brickPos.left ||
          targetPos.right + SAFE_MARGIN <= brickPos.left ||
          targetPos.right - SAFE_MARGIN <= brickPos.left
        ) {
          isClear = true;
        } else if (
          targetPos.left >= brickPos.right ||
          targetPos.left + SAFE_MARGIN >= brickPos.right
        ) {
          isClear = true;
        }
      } else if (prevBrick && nextBrick) {
        // at least 3 bricks on under row
        if (
          targetPos.left + SAFE_MARGIN >= (prevBrick.pos as BrickPos).right &&
          targetPos.right - SAFE_MARGIN <= brickPos.left
        ) {
          isClear = true;
        }
      }
    }
  }

  if (targetPos.left === 0) {
    isClear = !!leftClears.length && leftClears.every(clear => !!clear);
  } else if (targetPos.right === BOARD_WIDTH) {
    isClear = !!rightClears.length && rightClears.every(clear => !!clear);
  }

  return isClear;
}

function getBrickPosition(target: BrickObj, currentRow: RowObj) {
  const brickIndex = currentRow.row.findIndex(
    rowItem => rowItem.id === target.id,
  );
  let left: number = 0;
  let right: number = 0;
  if (brickIndex === 0) {
    left = 0;
  } else {
    for (let i = 0; i < currentRow.row.length; i++) {
      if (i === brickIndex) {
        break;
      }

      left += currentRow.row[i].width;
    }
  }

  if (brickIndex === currentRow.row.length - 1) {
    right = BOARD_WIDTH;
  } else {
    right = left + target.width;
  }

  return { left, right };
}

export function moveBrick(
  brick: BrickObj,
  rowIndex: number,
  brickIndex: number,
  board: RowObj[],
) {
  const dropRowIndex = rowIndex - 1;
  let dropRow = board[dropRowIndex];
  let duplicateBoard: RowObj[] = JSON.parse(JSON.stringify(board));

  function dropAtStart() {
    duplicateBoard[dropRowIndex].row.unshift(brick);
    duplicateBoard[rowIndex].row.splice(brickIndex, 1);
  }

  function dropAtEnd() {
    duplicateBoard[dropRowIndex].row.push(brick);
    duplicateBoard[rowIndex].row.splice(brickIndex, 1);
  }

  if (brick.pos?.left === 0) {
    // case 1: lapping left border
    dropAtStart();
  } else if (brick.pos?.right === BOARD_WIDTH) {
    // case 2: brick lapping right border
    dropAtEnd();
  } else {
    // case 3: brick lapping neither border
    if (dropRow.row.length === 1) {
      // case 3.1: drop row only has 1 item
      if ((dropRow.row[0].pos as BrickPos).left >= brick.width) {
        // case 3.1.a: item can fit between left border and item in drop row
        dropAtStart();
      } else if (
        BOARD_WIDTH - (dropRow.row[0].pos as BrickPos).right >=
        brick.width
      ) {
        // case 3.1.b: item can fit between right border and item in drop row
        dropAtEnd();
      }
    } else {
      // case 3.2: drop row has more than one item
      for (let i = 0; i < dropRow.row.length; i++) {
        const iterBrick = dropRow.row[i];
        const nextIterBrick = dropRow.row[i + 1];
        if (i === 0 && (iterBrick.pos as BrickPos).left >= brick.width) {
          // case 3.2.a: space between left and droprow's first brick can fit brick
          dropAtStart();
          break;
        } else if (
          i === dropRow.row.length - 1 &&
          BOARD_WIDTH - (iterBrick.pos as BrickPos).right >= brick.width
        ) {
          // case 3.2.b: space between right and droprow's last brick can fit brick
          dropAtEnd();
          break;
        } else if (nextIterBrick) {
          if (
            (nextIterBrick.pos as BrickPos).left -
              (iterBrick.pos as BrickPos).right >=
            brick.width - SAFE_MARGIN
          ) {
            // case 3.2.c: space between currently iteirated brick and the next one can fit moved brick
            // case 4: flush to left or right adjacent bricks
            let newBrick = { ...brick };
            if (
              (newBrick.pos as BrickPos).left <
              (iterBrick.pos as BrickPos).right
            ) {
              // case 4.1: brick's left pos is greater than lefthand's brick right pos. Adjust brick's left pos
              (newBrick.pos as BrickPos).left = (
                iterBrick.pos as BrickPos
              ).right;
            }

            if (
              (newBrick.pos as BrickPos).right >
              (nextIterBrick.pos as BrickPos).left
            ) {
              // case 4.2: brick's right pos is greater than righthand's brick right pos. Adjust brick's right pos
              (newBrick.pos as BrickPos).right = (
                nextIterBrick.pos as BrickPos
              ).left;
            }

            // since [dropRowIndex].row[i] represents the brick to the left
            // and we have ascertained that there is space between left and right
            // to drop our brick,
            // we drop our brick (with modified position values above) in the index after i,
            // and move all the bricks after our dropped brick downward by one index

            duplicateBoard[dropRowIndex].row[i + 1] = newBrick;
            let indexShifted = i + 2;
            while (indexShifted <= dropRow.row.length) {
              duplicateBoard[dropRowIndex].row[indexShifted] =
                dropRow.row[indexShifted - 1];

              indexShifted += 1;
            }

            duplicateBoard[rowIndex].row.splice(brickIndex, 1);
            break;
          }
        }
      }
    }
  }

  return duplicateBoard;
}

export function updateMovedBrickPosition() {}
