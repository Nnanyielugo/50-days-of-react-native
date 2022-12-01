import React, { Fragment } from 'react';
import { View, StyleSheet, Animated } from 'react-native';

import { INDICATOR_WIDTH } from '../utils';

import type { FunctionComponent } from 'react';

interface IndicatorProps {
  timeout: number;
  timerDuration: number;
  itemIndex: number;
  layoutIndex: number;
}

const Indicator: FunctionComponent<IndicatorProps> = ({
  timerDuration,
  timeout,
  itemIndex,
  layoutIndex,
}) => {
  let timerAnim = React.useRef(new Animated.Value(10)).current;

  const calculateProgress = () => {
    return (timerDuration / timeout) * INDICATOR_WIDTH;
  };

  const fillDuration = () => {
    Animated.timing(timerAnim, {
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
              width: timerAnim,
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
