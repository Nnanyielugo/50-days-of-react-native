import React from 'react';
import { StyleSheet, Animated, Pressable } from 'react-native';

import type { FunctionComponent } from 'react';

interface SquareProps {
  value: string | null;
  tapSquare: () => void;
  index: number;
  winningTiles: number[] | null;
  currentSelection: number | null;
  isFreshgame: boolean;
}

const Square: FunctionComponent<SquareProps> = ({
  value,
  tapSquare,
  index,
  winningTiles,
  currentSelection,
  isFreshgame,
}) => {
  const fadeAnim = React.useRef(new Animated.Value(0.5)).current;
  const sizeAnim = React.useRef(new Animated.Value(20)).current;
  const textSizeAnim = React.useRef(new Animated.Value(20)).current;
  const isWinningTile =
    winningTiles && winningTiles.some(tile => tile === index);
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
      toValue: 50,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  const growInText = () => {
    Animated.timing(textSizeAnim, {
      toValue: 20,
      duration: 200,
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

  React.useEffect(() => {
    if (isFreshgame) {
      growInText();
    }
  }, [isFreshgame]); //eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Pressable onPress={handlePress}>
      <Animated.View
        style={[
          styles.container,
          {
            opacity: fadeAnim,
            width: sizeAnim,
            height: sizeAnim,
            borderColor: isWinningTile
              ? 'red'
              : currentSelection === index
              ? 'whitesmoke'
              : 'grey',
            borderWidth:
              currentSelection === index
                ? StyleSheet.hairlineWidth * 2
                : StyleSheet.hairlineWidth,
          },
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
    borderStyle: 'solid',
  },
  text: {
    color: 'white',
  },
});

export default Square;
