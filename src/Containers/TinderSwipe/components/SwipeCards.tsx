import * as React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  PanResponder,
  Dimensions,
} from 'react-native';
import {
  SCREEN_WIDTH,
  SWIPE_THRESHOLD,
  SWIPE_OUT_DURATION,
} from '../constants';
import { Profile } from '../interfaces';
import SwipeCard from './SwipeCard';

import type {
  GestureResponderEvent,
  PanResponderGestureState,
} from 'react-native';
import type { FunctionComponent } from 'react';

interface ComponentProps {
  profiles: Profile[];
  loaded: boolean;
  error: string | null;
}

const SwipeCards: FunctionComponent<ComponentProps> = ({
  profiles,
  loaded,
  error,
}) => {
  const [cardIndex, setCardIndex] = React.useState(0);
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
        x: direction === 'right' ? SCREEN_WIDTH * 2 : -SCREEN_WIDTH * 2,
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

  const renderCards = () => {
    return profiles
      .map((profile, index) => {
        // if (index < cardIndex) {
        //   return null;
        // }
        if (index === 0) {
          return (
            <Animated.View
              key={profile.id}
              style={[{ ...getCardStyle() }, styles.card]}
              {...panResponder.panHandlers}>
              <SwipeCard profile={profile} active />
            </Animated.View>
          );
        }

        return (
          <Animated.View
            key={profile.id}
            style={[styles.card, { zIndex: 0, top: 5 * (index - 0) }]}>
            <SwipeCard profile={profile} />
          </Animated.View>
        );
      })
      .reverse();
  };

  return <View style={styles.container}>{renderCards()}</View>;
};

const styles = StyleSheet.create({
  container: {
    marginTop: 100,
  },
  card: {
    position: 'absolute',
    alignItems: 'center',
  },
});

export default SwipeCards;
