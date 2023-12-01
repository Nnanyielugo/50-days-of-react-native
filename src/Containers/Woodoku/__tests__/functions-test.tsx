import 'react-native';
import { describe, expect, test } from '@jest/globals';

import { canDropDown } from '../functions';
import { BrickObj, RowObj } from '../types';

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

    describe('case 3: first brick on under row', () => {
      let target1: BrickObj = {
        id: '1',
        width: 105,
        transparent: false,
        pos: { left: 25, right: 125 },
      };

      let target2: BrickObj = {
        id: '1',
        width: 245.7,
        transparent: false,
        pos: { left: 25, right: 265.7 },
      };

      let rowUnder: RowObj = {
        id: '2',
        row: [
          {
            id: '3',
            width: 105.3,
            transparent: false,
            pos: { left: 140.4, right: 245.7 },
          },
          {
            id: '4',
            width: 105.3,
            transparent: false,
            pos: { left: 245.7, right: 351 },
          },
        ],
      };

      test("can drop down when there's enough space", () => {
        expect(canDropDown(target1, rowUnder)).toBe(true);
      });

      test("can't drop down when there's not enough space", () => {
        expect(canDropDown(target2, rowUnder)).toBe(false);
      });
    });

    describe('case 4: last brick on under row', () => {
      let target1: BrickObj = {
        id: '1',
        width: 87.75,
        transparent: false,
        pos: { left: 175.5, right: 263.25 },
      };

      let target2: BrickObj = {
        id: '5',
        width: 175.5,
        transparent: false,
        pos: { left: 87.75, right: 263.25 },
      };

      let target3: BrickObj = {
        id: '6',
        width: 87.75,
        transparent: false,
        pos: { left: 87.75, right: 175.5 },
      };

      let rowUnder: RowObj = {
        id: '2',
        row: [
          {
            id: '3',
            width: 87.75,
            transparent: false,
            pos: { left: 0, right: 87.75 },
          },
          {
            id: '4',
            width: 87.75,
            transparent: false,
            pos: { left: 87.75, right: 175.5 },
          },
        ],
      };

      let rowUnder2: RowObj = {
        id: '2',
        row: [
          {
            id: '3',
            width: 87.75,
            transparent: false,
            pos: { left: 0, right: 87.75 },
          },
          {
            id: '4',
            width: 175.5,
            transparent: false,
            pos: { left: 175.5, right: 351 },
          },
        ],
      };

      test("can drop down when there's enough space between current brick and right border ", () => {
        expect(canDropDown(target1, rowUnder)).toBe(true);
      });

      test("can drop down when there's enough space between current brick and previous brick", () => {
        expect(canDropDown(target3, rowUnder2)).toBe(true);
      });

      test("can't drop down when there's not enough space between current brick and right border", () => {
        expect(canDropDown(target2, rowUnder)).toBe(false);
      });

      test("can't drop down when there's not enough space between current brick and previous brick", () => {
        expect(canDropDown(target1, rowUnder2)).toBe(false);
      });
    });

    describe('case 5: only one brick on the under row', () => {
      let target1 = {
        id: '1',
        width: 175.5,
        transparent: false,
        pos: { left: 0, right: 175.5 },
      };

      let target2 = {
        id: '2',
        width: 175.5,
        transparent: false,
        pos: { left: 175.5, right: 351 },
      };

      let target3 = {
        id: '3',
        width: 175.5,
        transparent: false,
        pos: { left: 87.75, right: 263.25 },
      };

      let rowUnder1: RowObj = {
        id: '5',
        row: [
          {
            id: '4',
            width: 175.5,
            transparent: false,
            pos: { left: 0, right: 175.5 },
          },
        ],
      };

      let rowUnder2: RowObj = {
        id: '6',
        row: [
          {
            id: '4',
            width: 175.5,
            transparent: false,
            pos: { left: 175.5, right: 351 },
          },
        ],
      };

      it("can drop down when there's enough space", () => {
        expect(canDropDown(target1, rowUnder2)).toBe(true);
        expect(canDropDown(target2, rowUnder1)).toBe(true);
      });

      it("can't drop down when there's not enough space", () => {
        expect(canDropDown(target1, rowUnder1)).toBe(false);
        expect(canDropDown(target2, rowUnder2)).toBe(false);
        expect(canDropDown(target3, rowUnder1)).toBe(false);
        expect(canDropDown(target3, rowUnder2)).toBe(false);
      });
    });
  });
});
