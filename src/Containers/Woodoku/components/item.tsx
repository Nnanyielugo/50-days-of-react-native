import React from 'react';
import {
  StyleSheet,
  Image,
  PanResponder,
  Animated,
  Dimensions,
} from 'react-native';

import Brick from '../assets/brick.jpeg';

import type { PanResponderGestureState } from 'react-native';
import type { FunctionComponent } from 'react';
import type { BrickObj, RowObj, BrickPos } from '../types';
import { BOARD_WIDTH } from '../constants';

interface ItemProps {
  item: BrickObj;
  rowIndex: number;
  itemIndex: number;
  row: RowObj;
  updateBrickPos: (
    brick: BrickObj,
    left: number,
    rowIndex: number,
    brickIndex: number,
  ) => void;
}

const Item: FunctionComponent<ItemProps> = ({
  item,
  rowIndex,
  itemIndex,
  row,
  updateBrickPos,
}) => {
  const left = React.useRef(
    new Animated.Value(item.pos?.left as number),
  ).current;
  const rowBottom = 50 * rowIndex + 1;
  const itemLeft = row.row[itemIndex - 1];

  const panResponder = PanResponder.create({
    onMoveShouldSetPanResponder: (_evt, _gesture: PanResponderGestureState) => {
      return true;
    },
    onPanResponderGrant: () => {
      left.setOffset((left as any)._value);
    },
    onPanResponderMove: (_evt, gesture: PanResponderGestureState) => {
      // console.log('ggesture', gesture.x0);
      left.setValue(gesture.dx);
    },
    onPanResponderRelease: (_evt, _gesture: PanResponderGestureState) => {
      left.flattenOffset();

      // updateBrickPos(item, (left as any)._value, rowIndex, itemIndex);

      const right = (left as any)._value + item.width;

      if ((left as any)._value < 60 && !row.row[itemIndex - 1]) {
        // if left is less than 60ps, flush left
        flushToLeft();
        return;
      } else if (right > BOARD_WIDTH && !row.row[itemIndex + 1]) {
        // animate to right limit if right is over limit;
        flushToRight();
        return;
      } else if (right > BOARD_WIDTH - 60 && !row.row[itemIndex + 1]) {
        // animate to right limit if difference between right and limit is less tha 60px
        flushToRight();
        return;
      }

      if (
        row.row[itemIndex - 1] &&
        (row.row[itemIndex - 1].pos as BrickPos).right + 60 >=
          (left as any)._value
      ) {
        // lap to left brick if distance between brick and left brick is 60px and below
        lapToLeftItem();
      } else if (
        row.row[itemIndex + 1] &&
        (row.row[itemIndex + 1].pos as BrickPos).left - 60 <= right
      ) {
        // lap to right brick if distance between brick and right brick is 60px and below
        lapToRightItem();
      } else {
        updateBrickPos(item, (left as any)._value, rowIndex, itemIndex);
      }
    },
  });

  const flushToLeft = () => {
    Animated.timing(left, {
      toValue: 0,
      duration: 500,
      useNativeDriver: false,
    }).start(() => {
      updateBrickPos(item, (left as any)._value, rowIndex, itemIndex);
    });
  };
  const flushToRight = () => {
    Animated.timing(left, {
      toValue: BOARD_WIDTH - item.width,
      duration: 500,
      useNativeDriver: false,
    }).start(() => {
      updateBrickPos(item, (left as any)._value, rowIndex, itemIndex);
    });
  };

  const lapToLeftItem = () => {
    Animated.timing(left, {
      toValue: (row.row[itemIndex - 1].pos as BrickPos).right,
      duration: 500,
      useNativeDriver: false,
    }).start(() => {
      updateBrickPos(item, (left as any)._value, rowIndex, itemIndex);
    });
  };
  const lapToRightItem = () => {
    Animated.timing(left, {
      toValue: (row.row[itemIndex + 1].pos as BrickPos).left - item.width,
      duration: 500,
      useNativeDriver: false,
    }).start(() => {
      updateBrickPos(item, (left as any)._value, rowIndex, itemIndex);
    });
  };

  return (
    <Animated.Image
      source={Brick}
      style={[
        styles.image,
        { width: item.width, left: left, bottom: rowBottom },
      ]}
      {...panResponder.panHandlers}
    />
  );
};

const styles = StyleSheet.create({
  image: {
    height: 50,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#2c3e50',
    position: 'absolute',
  },
});

export default Item;
