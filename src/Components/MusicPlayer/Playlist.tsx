/**
 * This solution (which I am quite proud of :), happens in a few steps annd
 * is necessitated by a few realities.
 *
 * Realities:
 * 1. Animated (here as 'pan') annd gestureState Y values reset to 0 after each completes
 *    move event.
 * 2. We need to be able to snap the Playlist comp to y0 bbased on certain conditions
 * 3. Trying to solve for 2 and bearing in mind the implications of 1, we need to keep a somewhat
 *    accurate absolute tracker value for Y, otherwise a touch triggers one of the snapbback conditions
 *    to return to y0.
 * 4. This tracker value now serves as the marker we use to calculate all our snapback conditions.
 * 5. Even solving for that, we are now faced with an 'animation glitch'.
 *    This occurs when animating from the AnimatedValueY to a defined AutoHeight value.
 *    This happens because AnimatedValueY which has reset to 0 since the last touch, is
 *    often very differennt from the position the touch drag ended, so the View snaps bback
 *    to AnimatedValueY and animates to AutoHeight, instead from a rough estimate of
 *    finger drag state.
 *
 * Solutions:
 * 1. Initialize a vertical axis tracker to keep track of absolute Y position as best as we can.
 * 2. Increment Y tracker by current drag diff in onPanResponderRelease callback
 * 3. Manipulate animated value Y by setting its value to the value of the Y tracker because in keepUp(),
 *    pan.y will animate from this value to SWIPE_AUTO_HEIGHT.
 *    This fixes the 'animation glitch' problem.
 * 4.
 *   a. if snap to 0, reset the Y tracker to 0 in Animated animation.start() callback in resetPosition()
 *   b. if snap to SWIPE_AUTO_HEIGHT, reset the Y tracker to SWIPE_AUTO_HEIGHT in Animated animation.start() callback in keepUp()
 *  - this keeps the Y tracker ready for the next drag - regardless of which snap back was triggered.
 */

import * as React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Animated,
  PanResponder,
} from 'react-native';

import type {
  GestureResponderEvent,
  PanResponderGestureState,
} from 'react-native';
import type { FunctionComponent } from 'react';
import type { BackgroundColor } from '../../utils/interfaces';

interface AppProps {
  background: BackgroundColor;
}

const SCREEN_HEIGHT = Dimensions.get('window').height;
const SWIPE_AUTO_HEIGHT = -(SCREEN_HEIGHT * 0.8);
const SWIPE_THRESHOLD = -(SCREEN_HEIGHT * 0.45);

const Playlist: FunctionComponent<AppProps> = ({ background }) => {
  // Solution step 1
  let posY: number = 0;
  const pan = React.useRef(new Animated.ValueXY()).current;
  const panResponder = React.useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        pan.setOffset({
          x: (pan.x as any)._value,
          y: (pan.y as any)._value,
        });
      },
      onPanResponderMove: (_event, gesture) => {
        pan.setValue({
          x: gesture.dx,
          y: gesture.dy,
        });
      },
      onPanResponderRelease: (
        _event: GestureResponderEvent,
        gesture: PanResponderGestureState,
      ) => {
        // Solution step 2
        posY += gesture.dy;
        // Solution step 3
        (pan.y as any)._value = posY;
        if (posY > 0) {
          resetPosition();
        } else if (posY < SWIPE_THRESHOLD) {
          keepUp();
        } else if (posY > SWIPE_THRESHOLD) {
          resetPosition();
        }
        pan.flattenOffset();
      },
    }),
  ).current;

  const resetPosition = () => {
    Animated.timing(pan, {
      toValue: { x: 0, y: 0 },
      useNativeDriver: false,
    }).start(() => {
      // Solution 4.a
      posY = 0;
    });
  };

  const keepUp = () => {
    Animated.timing(pan, {
      toValue: { x: 0, y: SWIPE_AUTO_HEIGHT },
      useNativeDriver: false,
    }).start(() => {
      // Solution 4.b
      posY = SWIPE_AUTO_HEIGHT;
    });
  };
  return (
    <Animated.View
      style={{
        transform: [
          {
            translateY: pan.y,
          },
        ],
      }}
      {...panResponder.panHandlers}>
      <View
        style={[
          styles.playlistContainner,
          { backgroundColor: background.dark },
        ]}>
        <Text>Playlist</Text>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  playlistContainner: {
    width: Dimensions.get('window').width,
    height: SCREEN_HEIGHT * 2,
    elevation: 10,
    zIndex: 999,
    opacity: 0.8,
  },
});

export default Playlist;
