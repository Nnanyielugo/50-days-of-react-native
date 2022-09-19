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
 *
 *
 * Problem 2:
 * Panresponder refuses to grant scroll captures to the child scroll view. This means that
 * the playlist drags open quite alright, but the contents do not scroll.
 * Solution:
 * 1. determine logical drag points for dragging open and closing the playlist View.
 * 2. in onMoveShouldSetPanResponder, tell the callback to make the parent the responder
 *    only on touch and move events that fit the logical drag points criteria.
 * 3. set different dragUpbands depending on whether the playlist is dragged or not
 *    a. initialize
 *    b. mutate on dragUp
 *    c. reset back to initial on dragDown
 *
 * Problem 3:
 * When PanContainer is up (and ScrollView View container height is reset to window height * .89 to show all scroll items),
 * Dragging the pan up results in moving the entire panContainer up and the bottom of the now shorter View
 * moves above the bottom of the screen. Basically, the PanCOntainer moves up and its bottom does not lap with screen bottom anymore
 *
 * Action:
 * We want to:
 * 1. Prevent dragging the PanContainer upwards above SWIPE_AUTO_HEIGHT when it is already up
 * 2. Allow dragging the PanContainer above SWIPE_AUTO_HEIGHT when dragging from closed to open (down to up)
 *
 * Solutions:
 * 1. allow PanResponderMove only when gesture.moveY is greater than MoveYLimit or
 *    gesture.y0 is greater than GestureYLimit.
 * 2. Set posY (and by extension, pan.y) to equal current value + 0 when gesture.moveY is above MoveYLimit and posY is greater than 0,
 *    else, increment posY by the value of gesture.dy
 */

import * as React from 'react';
import {
  View,
  StyleSheet,
  Animated,
  PanResponder,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import type {
  GestureResponderEvent,
  PanResponderGestureState,
} from 'react-native';
import PlayListItem from './PlaylistItem';
import type { FunctionComponent } from 'react';
import type { BackgroundColor, Track } from '../interface';
import {
  SCREEN_HEIGHT,
  SCREEN_WIDTH,
  SWIPE_AUTO_HEIGHT,
  UP_SWIPE_THRESHOLD,
  DOWN_SWIPE_THRESHOLD,
  SWIPE_THRESHOLD,
  MOVE_Y_LIMIT,
  GESTURE_Y_LIMIT,
} from '../constants';

interface ComponentProps {
  background: BackgroundColor;
  tracks: Track[];
  currentTrack?: Track;
}

const Playlist: FunctionComponent<ComponentProps> = ({
  background,
  tracks,
  currentTrack,
}) => {
  let posY: number = 0;
  const pan = React.useRef(new Animated.ValueXY()).current;
  const fadeAnim = React.useRef(new Animated.Value(0)).current;
  const scrollViewContainerHeight = React.useRef(
    new Animated.Value(SCREEN_HEIGHT * 1.89),
  ).current;
  // problem 2 solution 3.a
  let upBand = 580;

  const panResponder = React.useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (_evt, gesture) => {
        // problem 2.solution
        const dragUpBand = gesture.moveY > upBand;
        const dragDownBand = gesture.moveY > 50 && gesture.moveY < 78;
        const yExtremes = dragUpBand || dragDownBand;
        return yExtremes;
      },
      onPanResponderGrant: () => {
        pan.setOffset({
          x: (pan.x as any)._value,
          y: (pan.y as any)._value,
        });
      },
      onPanResponderMove: (_event, gesture) => {
        let faded = false;
        if (gesture.moveY < 600 && !faded) {
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          faded = true;
          fadeIn();
        }

        // Problem 3, Solution 1.
        if (gesture.moveY > MOVE_Y_LIMIT || gesture.y0 > GESTURE_Y_LIMIT) {
          pan.setValue({
            x: gesture.dx,
            y: gesture.dy,
          });
        }
      },
      onPanResponderRelease: (
        _event: GestureResponderEvent,
        gesture: PanResponderGestureState,
      ) => {
        // Problem 3, Solution 2.
        if (gesture.moveY < MOVE_Y_LIMIT && posY) {
          posY += 0;
        } else {
          // Solution step 2
          posY += gesture.dy;
        }
        // Solution step 3
        (pan.y as any)._value = posY;
        // adjust auto up/down thresholds according to gesture.y0 value
        // and as fall back, leave previous simple posY vs threshold conditionals
        if (posY > 0) {
          resetPosition();
        } else if (gesture.y0 > GESTURE_Y_LIMIT && posY < UP_SWIPE_THRESHOLD) {
          keepUp();
        } else if (
          gesture.y0 < GESTURE_Y_LIMIT &&
          posY > DOWN_SWIPE_THRESHOLD
        ) {
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
      fadeOut();
      Animated.timing(scrollViewContainerHeight, {
        toValue: SCREEN_HEIGHT * 1.89,
        useNativeDriver: false,
      }).start();
    });
  };

  const keepUp = () => {
    Animated.timing(pan, {
      toValue: { x: 0, y: SWIPE_AUTO_HEIGHT },
      useNativeDriver: false,
    }).start(() => {
      // Solution 4.b
      posY = SWIPE_AUTO_HEIGHT;
      // problem 2 solution 3.b
      upBand = 1200;
      Animated.timing(scrollViewContainerHeight, {
        toValue: SCREEN_HEIGHT * 0.95,
        useNativeDriver: false,
      }).start();
    });
  };

  const fadeIn = () => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: false,
    }).start(() => {});
  };

  const fadeOut = () => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 100,
      useNativeDriver: false,
    }).start(() => {
      // problem 2 solution 3.c
      upBand = 580;
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
      <Animated.View
        style={{
          height: scrollViewContainerHeight,
          backgroundColor: background.dark,
        }}>
        <View style={styles.iconContainer}>
          <Icon name={'filter-outline'} size={30} style={styles.icon} />
        </View>
        <ScrollView
          style={[
            styles.playlistContainer,
            {
              backgroundColor: background.dark,
            },
          ]}>
          <Animated.View style={{ opacity: fadeAnim }}>
            {tracks.map((track: Track, index: number) => (
              <PlayListItem
                currentTrack={currentTrack}
                key={track.id}
                track={track}
                index={index}
              />
            ))}
          </Animated.View>
        </ScrollView>
      </Animated.View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  playlistContainer: {
    width: SCREEN_WIDTH,
    zIndex: 1,
    opacity: 0.9,
  },
  icon: {
    alignSelf: 'center',
  },
  iconContainer: {
    zIndex: 1,
    opacity: 0.9,
  },
});

export default Playlist;
