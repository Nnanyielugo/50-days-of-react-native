import React from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  GestureResponderEvent,
  PanResponder,
  PanResponderGestureState,
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
} from 'react-native-reanimated';

import type { FunctionComponent } from 'react';
import type { ViewStyle } from 'react-native';

interface MusicProgressProps {
  containerStyle?: ViewStyle;
  minimumValue: number;
  maximumValue: number;
  value: number;
  onChangeValue: (value: number) => any;
}

const MusicProgress: FunctionComponent<MusicProgressProps> = ({
  containerStyle,
  maximumValue,
  value,
  onChangeValue,
}) => {
  const sharedProgress = useSharedValue(0);
  let max = React.useRef(0);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      width: `${sharedProgress.value}%`,
    };
  });

  const sharedPosition = useSharedValue(sharedProgress.value);

  const animatedPosition = useAnimatedStyle(() => {
    return {
      left: `${sharedPosition.value}%`,
    };
  });

  const panResponder = React.useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: (
        e: GestureResponderEvent,
        gesture: PanResponderGestureState,
      ) => {
        const SLIDER_WIDTH = Dimensions.get('window').width * 0.9;
        const movePer = (gesture.moveX / SLIDER_WIDTH) * 100;
        if (gesture.moveX <= 0) {
          // do nothing if knob moves below zero
        } else if (gesture.moveX >= SLIDER_WIDTH) {
          // also do nothing if knob moves above slider width
        } else {
          // update progress and knob positions
          sharedPosition.value = movePer;
          sharedProgress.value = movePer;
        }
      },
      onPanResponderRelease: (
        e: GestureResponderEvent,
        gesture: PanResponderGestureState,
      ) => {
        const SLIDER_WIDTH = Dimensions.get('window').width * 0.9;
        const val = (gesture.moveX / SLIDER_WIDTH) * max.current;
        onChangeValue(val);
      },
    }),
  ).current;

  React.useEffect(() => {
    const percentageProgress = (value / maximumValue) * 100;
    max.current = maximumValue;

    sharedProgress.value = withTiming(percentageProgress, {
      duration: 1000,
      easing: Easing.linear,
    });

    sharedPosition.value = withTiming(percentageProgress, {
      duration: 1000,
      easing: Easing.linear,
    });
  }, [value, maximumValue, sharedProgress, sharedPosition]);

  return (
    <View style={[styles.container, containerStyle]}>
      <View style={styles.duration} />
      <Animated.View style={[styles.progress, animatedStyle]} />
      <Animated.View
        style={[styles.knob, animatedPosition]}
        {...panResponder.panHandlers}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get('window').width * 0.9,
    marginBottom: 5,
    justifyContent: 'center',
  },
  duration: {
    height: 4,
    backgroundColor: '#BBB',
    width: '100%',
    borderRadius: 5,
  },
  progress: {
    backgroundColor: '#000',
    position: 'absolute',
    height: 4,
    borderRadius: 5,
  },
  knob: {
    width: 20,
    height: 20,
    position: 'absolute',
    borderRadius: 10,
    backgroundColor: '#000',
  },
});

export default MusicProgress;
