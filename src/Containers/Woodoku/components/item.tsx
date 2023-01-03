import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import type { FunctionComponent } from 'react';
import type { BrickObj } from '../types';

interface ItemProps {
  item: BrickObj;
}

const Item: FunctionComponent<ItemProps> = ({ item }) => {
  return <View style={[styles.container, { width: item.width }]} />;
};

const styles = StyleSheet.create({
  container: {
    height: 40,
    backgroundColor: '#966f33',
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: 'black',
  },
});

export default Item;
