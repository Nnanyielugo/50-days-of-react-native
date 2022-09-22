import React from 'react';
import { Text, StyleSheet, Animated } from 'react-native';

import type { FunctionComponent } from 'react';

interface SquareProps {
  index: number;
}

const Square: FunctionComponent<SquareProps> = ({ index }) => {
  const fadeAnim = React.useRef(new Animated.Value(0.5)).current;
  const sizeAnim = React.useRef(new Animated.Value(50)).current;
  const fadeIn = () => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1500,
      useNativeDriver: false,
    }).start();
  };
  const growOut = () => {
    Animated.timing(sizeAnim, {
      toValue: 100,
      duration: 1500,
      useNativeDriver: false,
    }).start(fadeIn);
  };

  React.useEffect(() => {
    growOut();
  }, []); //eslint-disable-line react-hooks/exhaustive-deps
  return (
    <Animated.View
      style={[
        styles.container,
        { opacity: fadeAnim, width: sizeAnim, height: sizeAnim },
      ]}>
      <Text style={styles.text}>{index}</Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2c3e50',
    borderColor: 'grey',
    borderWidth: StyleSheet.hairlineWidth,
    borderStyle: 'solid',
  },
  text: {
    color: 'white',
  },
});

export default Square;
