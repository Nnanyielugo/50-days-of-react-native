import React, { Fragment } from 'react';
import { View, StyleSheet, Animated } from 'react-native';

import { INDICATOR_WIDTH } from '../utils';

import type { FunctionComponent } from 'react';

interface IndicatorProps {
  itemIndex: number;
  layoutIndex: number;
  timerAnim: React.MutableRefObject<Animated.Value>;
  timerDuration: number;
  timeout: number;
}

const Indicator: FunctionComponent<IndicatorProps> = ({
  itemIndex,
  layoutIndex,
  timerAnim,
  timerDuration,
  timeout,
}) => {
  const calculateProgress = () => {
    return (timerDuration / timeout) * INDICATOR_WIDTH;
  };

  const fillDuration = () => {
    Animated.timing(timerAnim.current, {
      toValue: calculateProgress(),
      duration: 100,
      useNativeDriver: false,
    }).start();
  };

  React.useEffect(() => {
    fillDuration();
  });

  return (
    <Fragment key={itemIndex}>
      {itemIndex === layoutIndex - 1 && (
        <Animated.View
          style={[
            styles.progress,
            {
              width: timerAnim.current,
              left:
                itemIndex === 0
                  ? 0
                  : itemIndex * INDICATOR_WIDTH + itemIndex * 3, // take horizontal margins into account
            },
          ]}
        />
      )}

      <View style={styles.indicatorItem} />
    </Fragment>
  );
};

const styles = StyleSheet.create({
  indicatorItem: {
    height: 3,
    backgroundColor: 'grey',
    width: INDICATOR_WIDTH,
    marginHorizontal: 1.5,
    borderRadius: 2,
  },
  progress: {
    height: 3,
    backgroundColor: 'whitesmoke',
    marginHorizontal: 1.5,
    borderRadius: 2,
    zIndex: 999,
    position: 'absolute',
  },
});

export default Indicator;
