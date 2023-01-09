import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import type { FunctionComponent } from 'react';
import Item from './item';

import type { RowObj } from '../types';

interface RowProps {
  row: RowObj;
  rowIndex: number;
}

const Row: FunctionComponent<RowProps> = ({ row, rowIndex }) => {
  return (
    <View style={styles.container}>
      {row.row.map((item, index) => (
        <Item
          item={item}
          key={item.id}
          itemIndex={index}
          rowIndex={rowIndex}
          row={row}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
});

export default Row;
