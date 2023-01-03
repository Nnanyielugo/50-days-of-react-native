import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import type { FunctionComponent } from 'react';
import Item from './item';

import type { BrickObj } from '../types';

interface RowProps {
  row: BrickObj[];
}

const Row: FunctionComponent<RowProps> = ({ row }) => {
  return (
    <View style={styles.container}>
      {row.map(item => (
        <Item item={item} key={item.id} />
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
