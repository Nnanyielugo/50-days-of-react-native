import * as React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  PanResponder,
  Dimensions,
} from 'react-native';
import { Card } from '../../../components';
import {
  SCREEN_WIDTH,
  SWIPE_THRESHOLD,
  SWIPE_OUT_DURATION,
} from '../constants';

import type {
  GestureResponderEvent,
  PanResponderGestureState,
} from 'react-native';

const SwipeCard = () => {
  const pan = React.useRef(new Animated.ValueXY()).current;
  const panResponder = React.useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: (
        _event: GestureResponderEvent,
        gesture: PanResponderGestureState,
      ) => {
        pan.setValue({
          x: gesture.dx,
          y: gesture.dy,
        });
      },
      onPanResponderRelease: (
        _event: GestureResponderEvent,
        gesture: PanResponderGestureState,
      ) => {
        if (gesture.dx > SWIPE_THRESHOLD) {
          swipe('right');
        } else if (gesture.dx < -SWIPE_THRESHOLD) {
          swipe('left');
        } else {
          resetPos();
        }
        pan.flattenOffset();
      },
    }),
  ).current;

  const resetPos = () => {
    Animated.timing(pan, {
      toValue: { x: 0, y: 0 },
      useNativeDriver: false,
    }).start();
  };

  const swipe = (direction: string) => {
    Animated.timing(pan, {
      toValue: {
        x: direction === 'right' ? SCREEN_WIDTH : -SCREEN_WIDTH,
        y: 0,
      },
      useNativeDriver: false,
      duration: SWIPE_OUT_DURATION,
    }).start();
  };

  const getCardStyle = () => {
    const rotate = pan.x.interpolate({
      inputRange: [-SCREEN_WIDTH * 1.5, SCREEN_WIDTH * 1.5],
      outputRange: ['-120deg', '120deg'],
    });
    return {
      ...pan.getLayout(),
      transform: [{ rotate }],
    };
  };

  return (
    <Animated.View
      style={(styles.container, { ...getCardStyle() })}
      {...panResponder.panHandlers}>
      <Card style={styles.card}>
        <Text style={styles.text}>SwipeCard</Text>
      </Card>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {},
  card: {
    height: 350,
    width: Dimensions.get('window').width * 0.88,
    alignSelf: 'center',
    backgroundColor: 'whitesmoke',
    marginHorizontal: 10,
    borderRadius: 7,
    elevation: 5,
  },
  text: {
    textAlign: 'center',
  },
});

export default SwipeCard;
