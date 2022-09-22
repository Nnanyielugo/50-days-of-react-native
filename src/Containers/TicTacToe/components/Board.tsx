import React from 'react';
import { View, StyleSheet, Animated } from 'react-native';

import Square from './Square';

import type { FunctionComponent } from 'react';

interface BoardProps {
  tapSquare: (index: number) => void;
  xIsNext: boolean;
  squares: string[] | null[];
  isGameOver: boolean;
}

const Board: FunctionComponent<BoardProps> = ({
  tapSquare,
  xIsNext,
  squares,
  isGameOver,
}) => {
  const fadeAnim = React.useRef(new Animated.Value(0)).current;
  const sizeAnim = React.useRef(new Animated.Value(0)).current;
  const marginAnim = React.useRef(new Animated.Value(300)).current;
  const fadeIn = () => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1500,
      useNativeDriver: false,
    }).start();
  };
  const growOut = () => {
    Animated.parallel([
      Animated.timing(sizeAnim, {
        toValue: 18,
        duration: 1500,
        useNativeDriver: false,
      }),
      Animated.timing(marginAnim, {
        toValue: 100,
        duration: 1500,
        useNativeDriver: false,
      }),
    ]).start(fadeIn);
  };

  React.useEffect(() => {
    growOut();
  }, []); //eslint-disable-line react-hooks/exhaustive-deps

  const renderSquare = (index: number) => {
    return (
      <Square
        key={index}
        value={squares[index]}
        tapSquare={() => tapSquare(index)}
        xIsNext={xIsNext}
      />
    );
  };

  const renderRows = () => {
    return (
      <View style={styles.rowsContainer}>
        <View style={styles.row}>
          {[0, 1, 2].map((row: number) => {
            return renderSquare(row);
          })}
        </View>

        <View style={styles.row}>
          {[3, 4, 5].map((row: number) => {
            return renderSquare(row);
          })}
        </View>

        <View style={styles.row}>
          {[6, 7, 8].map((row: number) => {
            return renderSquare(row);
          })}
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.instructionsContainer,
          { opacity: fadeAnim, marginTop: marginAnim },
        ]}>
        <Animated.Text style={[styles.instructions, { fontSize: sizeAnim }]}>
          {isGameOver ? 'Game Over' : ` Next Player: ${xIsNext ? 'X' : 'O'}`}
        </Animated.Text>
      </Animated.View>
      {renderRows()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#2c3e50',
    paddingTop: 50,
  },
  row: {
    flexDirection: 'row',
  },
  rowsContainer: {
    marginTop: 30,
  },
  instructionsContainer: {},
  instructions: {
    color: 'white',
    fontSize: 16,
    fontWeight: '700',
  },
});

export default Board;
