import React from 'react';
import { StyleSheet, Animated, Pressable } from 'react-native';

import type { FunctionComponent } from 'react';

interface SquareProps {
  value: string | null;
  tapSquare: () => void;
  xIsNext: boolean;
}

const Square: FunctionComponent<SquareProps> = ({ value, tapSquare }) => {
  const fadeAnim = React.useRef(new Animated.Value(0.5)).current;
  const sizeAnim = React.useRef(new Animated.Value(20)).current;
  const textSizeAnim = React.useRef(new Animated.Value(20)).current;
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

  const growOutText = () => {
    Animated.timing(textSizeAnim, {
      toValue: 40,
      duration: 500,
      useNativeDriver: false,
    }).start();
  };

  const handlePress = () => {
    growOutText();
    tapSquare();
  };

  React.useEffect(() => {
    growOut();
  }, []); //eslint-disable-line react-hooks/exhaustive-deps
  return (
    <Pressable onPress={handlePress}>
      <Animated.View
        style={[
          styles.container,
          { opacity: fadeAnim, width: sizeAnim, height: sizeAnim },
        ]}>
        <Animated.Text style={[styles.text, { fontSize: textSizeAnim }]}>
          {value}
        </Animated.Text>
      </Animated.View>
    </Pressable>
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
