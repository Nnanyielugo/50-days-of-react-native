import React from 'react';
import { StyleSheet, Animated } from 'react-native';

import type { FunctionComponent } from 'react';

interface ComponentProps {
  item: string;
  currentSelection: number | null;
  index: number;
}
const HistorySquare: FunctionComponent<ComponentProps> = ({
  item,
  currentSelection,
  index,
}) => {
  const fadeAnim = React.useRef(new Animated.Value(0.5)).current;
  const textSizeAnim = React.useRef(new Animated.Value(8)).current;
  const sizeAnim = React.useRef(new Animated.Value(10)).current;

  React.useEffect(() => {
    entrance();
  }, []); //eslint-disable-line react-hooks/exhaustive-deps

  const entrance = () => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 200,
        useNativeDriver: false,
      }),
      Animated.timing(textSizeAnim, {
        toValue: 12,
        duration: 200,
        useNativeDriver: false,
      }),
      Animated.timing(sizeAnim, {
        toValue: 20,
        duration: 200,
        useNativeDriver: false,
      }),
    ]).start();
  };

  return (
    <Animated.View
      style={[
        styles.container,
        {
          borderColor: currentSelection === index ? 'whitesmoke' : '#8C9095',
          borderWidth:
            currentSelection === index
              ? StyleSheet.hairlineWidth * 1.5
              : StyleSheet.hairlineWidth,
          width: sizeAnim,
          height: sizeAnim,
        },
      ]}>
      <Animated.Text style={[styles.text, { fontSize: textSizeAnim }]}>
        {item}
      </Animated.Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#505458',
    borderStyle: 'solid',
  },
  text: {
    color: '#9A9FA4',
  },
});

export default HistorySquare;
