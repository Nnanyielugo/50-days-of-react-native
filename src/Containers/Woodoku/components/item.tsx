import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

import Brick from '../assets/brick.jpeg';
import type { FunctionComponent } from 'react';
import type { BrickObj } from '../types';

interface ItemProps {
  item: BrickObj;
}

const Item: FunctionComponent<ItemProps> = ({ item }) => {
  if (item.transparent) {
    return (
      <View
        style={[
          styles.container,
          {
            width: item.width,
          },
        ]}
      />
    );
  }
  return <Image source={Brick} style={[styles.image, { width: item.width }]} />;
};

const styles = StyleSheet.create({
  container: {
    height: 40,
    backgroundColor: 'transparent',
  },
  image: {
    height: 50,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#2c3e50',
  },
});

export default Item;
