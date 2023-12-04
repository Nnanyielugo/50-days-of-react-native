import React from 'react';
import { StyleSheet, Animated } from 'react-native';

import type { FunctionComponent } from 'react';
import Item from './item';

import type { RowObj, BrickObj } from '../types';

interface RowProps {
  row: RowObj;
  rowIndex: number;
  updateBrickPos: (
    brick: BrickObj,
    left: number,
    rowIndex: number,
    brickIndex: number,
  ) => void;
}

const Row: FunctionComponent<RowProps> = ({
  row,
  rowIndex,
  updateBrickPos,
}) => {
  return (
    <Animated.View style={styles.container}>
      {row.row.map((item, index) => (
        <Item
          item={item}
          key={item.id}
          itemIndex={index}
          rowIndex={rowIndex}
          row={row}
          updateBrickPos={updateBrickPos}
        />
      ))}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
});

export default Row;
