import 'react-native';
import React from 'react';
import { expect, jest, test } from '@jest/globals';

import { canDropDown } from '../src/Containers/Woodoku/functions';
import { BrickObj, RowObj } from '../src/Containers/Woodoku/types';

describe('woodoku tests', () => {
  describe('canDropDown', () => {
    describe('case 1: target at left edge', () => {
      let target: BrickObj = {
        id: '1',
        width: 140.4,
        transparent: false,
        pos: { left: 0, right: 140.4 },
      };

      let rowUnder1: RowObj = {
        id: '2',
        row: [
          {
            id: '3',
            width: 140.4,
            transparent: false,
            pos: { left: 210.6, right: 351 },
          },
        ],
      };

      let rowUnder2: RowObj = {
        id: '2',
        row: [
          {
            id: '3',
            width: 105.3,
            transparent: false,
            pos: { left: 0, right: 105.3 },
          },
          {
            id: '4',
            width: 140.4,
            transparent: false,
            pos: { left: 210.6, right: 351 },
          },
        ],
      };

      test("can drop down when there's enough space on left edge", () => {
        expect(canDropDown(target, rowUnder1)).toBe(true);
      });

      test("can't drop down when there's not enough space on left edge", () => {
        expect(canDropDown(target, rowUnder2)).toBe(false);
      });
    });

    describe('case 2: target at right edge', () => {
      let target: BrickObj = {
        id: '1',
        width: 140.4,
        transparent: false,
        pos: { left: 210.6, right: 351 },
      };

      let rowUnder1: RowObj = {
        id: '2',
        row: [
          {
            id: '3',
            width: 175.5,
            transparent: false,
            pos: { left: 0, right: 175.5 },
          },
        ],
      };

      let rowUnder2: RowObj = {
        id: '2',
        row: [
          {
            id: '3',
            width: 175.5,
            transparent: false,
            pos: { left: 0, right: 175.5 },
          },
          {
            id: '4',
            width: 87.75,
            transparent: false,
            pos: { left: 263.25, right: 351 },
          },
        ],
      };

      test("can drop down when there's enough space on right edge", () => {
        expect(canDropDown(target, rowUnder1)).toBe(true);
      });

      test("can't drop down when there's not enough space on right edge", () => {
        expect(canDropDown(target, rowUnder2)).toBe(false);
      });
    });
  });
});
