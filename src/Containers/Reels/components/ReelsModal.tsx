/**
 * Docu for the tricky part ie: pausing and restarting progresses
 * 1. in the touch start handler, save press in time.
 * 2. on long press, clear all timers
 * 3. in the touch end handler, differentiate b/w taps release and long press release
 *  by getting checking the difference from when the touch started.
 *  if long press release;
 *  b. resume indicator timer.
 *  c. create a remainder duration as the diff b/w timerDuration and timeout value
 *  d. continue upper (scrollView) timer but set duration to remainder duration
 *  e. if on last item, resume (more like restart) closing timer and set duration to remainder duration
 */

import React from 'react';
import {
  StyleSheet,
  Modal,
  ScrollView,
  Dimensions,
  SafeAreaView,
  Platform,
  Animated,
} from 'react-native';

import { data } from '../utils';

import type { FunctionComponent } from 'react';
import type {
  NativeSyntheticEvent,
  NativeScrollEvent,
  GestureResponderEvent,
} from 'react-native';
import Indicator from './indicator';
import Reel from './Reel';

interface ReelsModalProps {
  isVisible: boolean;
  closeModal: () => void;
}

const ReelsModal: FunctionComponent<ReelsModalProps> = ({
  isVisible,
  closeModal,
}) => {
  let scrollViewRef = React.useRef<ScrollView | null>(null);
  let [layoutIndex, setLayoutIndex] = React.useState<number>(1);
  let [timerDuration, setTimerDuration] = React.useState(
    React.useRef(100).current,
  );
  // animation that controls the indicator progress
  let timerAnim = React.useRef(new Animated.Value(0));
  const timeout = 4000; // in ms

  let upperTimer = React.useRef<NodeJS.Timer | number>(0);
  let closingTimer = React.useRef<NodeJS.Timeout | number>(0);
  let indicatorTimer = React.useRef<NodeJS.Timeout | number>(0);

  const [clickInTime, setClickInTime] = React.useState(0);

  React.useEffect(() => {
    indicatorTimer.current = setInterval(() => {
      setTimerDuration((timerDuration += 100)); // eslint-disable-line react-hooks/exhaustive-deps
    }, 95); //hack: make interval duration a little less than 100 so that indicator line completes each time, accumulatively

    return () => {
      clearInterval(indicatorTimer.current as NodeJS.Timer);
    };
  });

  React.useEffect(() => {
    setTimerDuration(100);
    upperTimer.current = setInterval(scrollToNext, timeout);
    // reset timer indicator early and fix the flashing bug
    timerAnim.current = new Animated.Value(0);
    return () => {
      clearInterval(upperTimer.current as NodeJS.Timer);
    };
  }, [layoutIndex]); // eslint-disable-line react-hooks/exhaustive-deps

  const scrollToNext = () => {
    if (data.length === 1) {
      // since this method is called at the end of the timer duration
      // close immediately if only one item in the list
      closeModal();
    }
    const width = Dimensions.get('window').width;
    scrollViewRef.current?.scrollTo({
      x: width * layoutIndex,
      animated: true,
    });
  };

  const scrollToPrev = () => {
    const width = Dimensions.get('window').width;
    scrollViewRef.current?.scrollTo({
      x: width * (layoutIndex - 2), // *layout to next, -1 to same page, -2 to prev
      animated: true,
    });
  };

  const beginModalClosing = () => {
    closingTimer.current = setTimeout(() => {
      closeModal();
    }, timeout);
  };

  const handleScroll = ({
    nativeEvent: { contentOffset, layoutMeasurement },
  }: NativeSyntheticEvent<NativeScrollEvent>) => {
    const widthForFullSwipe = layoutMeasurement.width;
    let focusedIndex = contentOffset.x / widthForFullSwipe;

    if (!Number.isInteger(focusedIndex)) {
      return;
    }

    setLayoutIndex(focusedIndex + 1);

    if (contentOffset.x >= layoutMeasurement.width * (data.length - 1)) {
      beginModalClosing();
    }
  };

  const handleTouchStart = ({ nativeEvent }: GestureResponderEvent) => {
    setClickInTime(nativeEvent.timestamp);
  };

  const handleTouchEnd = ({ nativeEvent }: GestureResponderEvent) => {
    const screenWidth = Dimensions.get('screen').width;
    const xPoint = nativeEvent.pageX;
    const errorMargin = 50;
    if (nativeEvent.timestamp - clickInTime >= 1000) {
      // long press release, continue timer
      indicatorTimer.current = setInterval(() => {
        setTimerDuration((timerDuration += 100));
      }, 100);

      const remainderDuration = timeout - timerDuration;

      upperTimer.current = setInterval(scrollToNext, remainderDuration);

      if (layoutIndex === data.length) {
        closingTimer.current = setTimeout(() => {
          closeModal();
        }, remainderDuration);
      }
    } else {
      // handle prev/next taps
      if (xPoint <= screenWidth / 2 - errorMargin) {
        // scroll back
        if (layoutIndex <= 1) {
          // if on first item
          // do nothing
        } else {
          if (layoutIndex === data.length) {
            clearTimeout(closingTimer.current as NodeJS.Timeout);
          }
          scrollToPrev();
        }
      }

      if (xPoint >= screenWidth / 2 + errorMargin) {
        if (layoutIndex === data.length) {
          closeModal();
          setLayoutIndex(1);
          // clear modal closing timer that triggers
          // when the last item is reached
          clearTimeout(closingTimer.current as NodeJS.Timeout);
        } else {
          scrollToNext();
        }
      }
    }
  };

  const handleLongPress = () => {
    clearInterval(upperTimer.current as NodeJS.Timer);
    clearInterval(indicatorTimer.current as NodeJS.Timer);
    if (layoutIndex === data.length) {
      // clear modal closing timer that triggers
      // when the last item is reached
      clearTimeout(closingTimer.current as NodeJS.Timeout);
    }
  };

  return (
    <SafeAreaView>
      <Modal
        visible={isVisible}
        onRequestClose={closeModal}
        animationType="slide"
        style={styles.container}>
        <ScrollView contentContainerStyle={styles.indicator}>
          {data.map((_, index) => {
            return (
              <Indicator
                key={index}
                itemIndex={index}
                layoutIndex={layoutIndex}
                timerAnim={timerAnim}
                timerDuration={timerDuration}
                timeout={timeout}
              />
            );
          })}
        </ScrollView>
        <ScrollView
          ref={scrollViewRef}
          onScroll={handleScroll}
          horizontal
          showsHorizontalScrollIndicator={false}
          pagingEnabled>
          {data.map((item, index) => {
            return (
              <Reel
                key={index}
                onTouchStart={handleTouchStart}
                onTouchEnd={handleTouchEnd}
                onLongPress={handleLongPress}
                item={item}
              />
            );
          })}
        </ScrollView>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexgrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'whitesmoke',
  },
  indicator: {
    height: 8,
    marginTop: Platform.OS === 'ios' ? 50 : 20,
    flexDirection: 'row',
    marginHorizontal: 5,
  },
});

export default ReelsModal;
