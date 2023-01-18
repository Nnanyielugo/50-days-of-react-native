import { BOARD_WIDTH, getBoards } from './constants';
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
  let boardNum = Math.floor(Math.random() * 8);

  board = getBoards(boardNum);
  // console.log('boardNum', boardNum, board);

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

// function rearrangeRowSpacing(row: RowObj): RowObj {
//   const emptyRow = row.row.find(
//     (item, index) =>
//       (item.transparent && item.width >= BOARD_WIDTH / 2) ||
//       (item.transparent && (index === 0 || index === row.row.length - 1)),
//   );

//   if (emptyRow) {
//     const duplicateRow: RowObj = {
//       id: row.id,
//       row: row.row.filter(item => !item.transparent),
//     };

//     duplicateRow.row.unshift({
//       id: generateId(),
//       width: emptyRow.width / 2,
//       transparent: true,
//     });

//     duplicateRow.row.push({
//       id: generateId(),
//       width: emptyRow.width / 2,
//       transparent: true,
//     });

//     return duplicateRow;
//   }

//   return row;
// }

export function canDropDown(
  target: BrickObj,
  targetIndex: number,
  rowUnder: RowObj,
) {
  let targetPos = target.pos as BrickPos;
  const leftClears: boolean[] = [];
  const rightClears: boolean[] = [];
  let isClear = false;
  // console.log('target pos', targetBrickPosition, currentRow, rowUnder);
  for (let i = 0; i < rowUnder.row.length; i++) {
    const SAFE_MARGIN = 5;

    let brickPos = rowUnder.row[i].pos as BrickPos;
    let nextBrick = rowUnder.row[i + 1];
    let prevBrick = rowUnder.row[i - 1];

    if (targetPos.left === 0) {
      if (targetPos.right <= brickPos.left) {
        leftClears.push(true);
      } else if (targetPos.right + SAFE_MARGIN <= brickPos.left) {
        leftClears.push(true);
      } else if (targetPos.right - SAFE_MARGIN <= brickPos.left) {
        leftClears.push(true);
      } else {
        leftClears.push(false);
      }
      // leftClears.push(Boolean(targetPos.right <= brickPos.left));
    } else if (targetPos.right === BOARD_WIDTH) {
      if (targetPos.left >= brickPos.right) {
        rightClears.push(true);
      } else if (targetPos.left + SAFE_MARGIN >= brickPos.right) {
        rightClears.push(true);
      } else if (targetPos.left - SAFE_MARGIN >= brickPos.right) {
        rightClears.push(true);
      } else {
        rightClears.push(false);
      }
      // rightClears.push(Boolean(targetPos.left >= brickPos.right));
    } else {
      if (prevBrick && nextBrick) {
        // console.log('there is next brick', targetIndex);
        // console.log(targetPos, brickPos, nextBrick.pos);
        // give a margin of 5px
        if (
          targetPos.left >= brickPos.right &&
          targetPos.right <= (rowUnder.row[i + 1].pos as BrickPos).left
        ) {
          // console.log('here');
          isClear = true;
        } else if (
          targetPos.left + SAFE_MARGIN >= brickPos.right &&
          targetPos.right - SAFE_MARGIN <=
            (rowUnder.row[i + 1].pos as BrickPos).left
        ) {
          isClear = true;
        } else if (
          targetPos.left - SAFE_MARGIN >= brickPos.right &&
          targetPos.right + SAFE_MARGIN <=
            (rowUnder.row[i + 1].pos as BrickPos).left
        ) {
          isClear = true;
        }
      } else if (
        !prevBrick &&
        !nextBrick &&
        targetPos.left !== 0 &&
        targetPos.right !== BOARD_WIDTH
      ) {
        // console.log('edge 3');
        // console.log(targetPos, brickPos);
        if (targetPos.right <= brickPos.left) {
          isClear = true;
        } else if (
          targetPos.right + SAFE_MARGIN <= brickPos.left ||
          targetPos.right - SAFE_MARGIN <= brickPos.left
        ) {
          isClear = true;
        } else if (targetPos.left >= brickPos.right) {
          isClear = true;
        } else if (targetPos.left + SAFE_MARGIN >= brickPos.right) {
          isClear = true;
        }
      }
      if (!prevBrick && nextBrick) {
        // console.log('edge 2');
        if (targetPos.right <= brickPos.left) {
          isClear = true;
        } else if (targetPos.right + SAFE_MARGIN <= brickPos.left) {
          isClear = true;
        }
      } else if (prevBrick && !nextBrick) {
        // console.log('edge 1');
        // console.log(target, rowUnder.row[i]);
        // handle case where current brick is last on underRow
        // compare only left of target with right of current brick
        if (
          targetPos.left >= (prevBrick.pos as BrickPos).right &&
          targetPos.right <= brickPos.left
        ) {
          isClear = true;
        } else if (
          targetPos.left + SAFE_MARGIN >= (prevBrick.pos as BrickPos).right &&
          targetPos.right <= brickPos.left + SAFE_MARGIN
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

  // console.log('is clear', isClear, targetIndex);

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

export function updateMovedBrickPosition() {}
