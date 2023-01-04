import * as uuid from 'uuid';

import {
  getWidthsForTwos,
  getWidthsForThrees,
  getWidthsForFours,
  BOARD_WIDTH,
} from './constants';
import type { RowObj, BrickObj } from './types';

export function generateId(): string {
  let id =
    uuid.v4() +
    '-' +
    Math.random() * new Date().getTime() +
    new Date().getTime().toString() +
    '-' +
    uuid.v1() +
    uuid.v4();

  return id;
}

function generateBrickNum() {
  let numBricks = Math.floor((Math.random() * 10) / 2);
  while (numBricks < 2) {
    numBricks = Math.floor((Math.random() * 10) / 2);
  }

  return numBricks;
}

function pickWidthForTwos() {
  const widths = getWidthsForTwos();

  let brickNum = Math.floor(Math.random() * widths.length);
  return widths[brickNum];
}
function pickWidthForThrees() {
  const widths = getWidthsForThrees();

  let brickNum = Math.floor(Math.random() * widths.length);
  return widths[brickNum];
}
function pickWidthForFours() {
  const widths = getWidthsForFours();
  let brickNum = Math.floor(Math.random() * widths.length);
  return widths[brickNum];
}

export function generateRow(): RowObj {
  let output: RowObj;
  let numBricks = generateBrickNum();
  pickWidthForFours();

  if (numBricks === 2) {
    output = pickWidthForTwos();
  } else if (numBricks === 3) {
    output = pickWidthForThrees();
  } else {
    output = pickWidthForFours();
  }

  return output;
}

export function generateRows(rowNum: number): RowObj[] {
  const rows: RowObj[] = [];

  for (let i = 0; i < rowNum; i++) {
    let row = rearrangeRowSpacing(generateRow());
    rows.push(row);
  }

  return rows;
}

function rearrangeRowSpacing(row: RowObj): RowObj {
  const emptyRow = row.row.find(
    item => item.transparent && item.width >= BOARD_WIDTH / 2,
  );

  if (emptyRow) {
    const duplicateRow: RowObj = {
      id: row.id,
      row: row.row.filter(item => !item.transparent),
    };

    duplicateRow.row.unshift({
      id: generateId(),
      width: emptyRow.width / 2,
      transparent: true,
    });

    duplicateRow.row.push({
      id: generateId(),
      width: emptyRow.width / 2,
      transparent: true,
    });

    return duplicateRow;
  }

  return row;
}

// export function fillDropRows(rows: RowObj[]): RowObj[] {}
