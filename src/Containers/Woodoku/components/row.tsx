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
  const rowOpacity = React.useRef(new Animated.Value(1)).current;

  const show = () => {
    Animated.timing(rowOpacity, {
      toValue: 1,
      duration: 2000,
      useNativeDriver: false,
    }).start();
  };

  const hide = () => {
    Animated.timing(rowOpacity, {
      toValue: 0,
      duration: 1000,
      useNativeDriver: false,
    }).start();
  };

  // React.useEffect(() => {
  //   show();
  //   return () => {
  //     hide();
  //   };
  // });
  return (
    <Animated.View style={[styles.container, { opacity: rowOpacity }]}>
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
