import React from 'react';
import { View, StyleSheet, Animated } from 'react-native';

import Square from './Square';
import { Button } from '../../../components';
import HistoryContainer from './history/Container';

import type { FunctionComponent } from 'react';
import type { History } from '../index';

interface BoardProps {
  tapSquare: (index: number) => void;
  xIsNext: boolean;
  squares: string[] | null[];
  isGameOver: boolean;
  winner: string;
  resetState: () => void;
  winningTiles: number[] | null;
  currentSelection: number | null;
  isFreshgame: boolean;
  history: History[];
  jumpTo: (step: number) => void;
}

const Board: FunctionComponent<BoardProps> = ({
  tapSquare,
  xIsNext,
  squares,
  isGameOver,
  winner,
  resetState,
  winningTiles,
  currentSelection,
  isFreshgame,
  history,
  jumpTo,
}) => {
  const fadeAnim = React.useRef(new Animated.Value(0)).current;
  const sizeAnim = React.useRef(new Animated.Value(0)).current;
  const marginAnim = React.useRef(new Animated.Value(300)).current;
  const buttonMarginAnim = React.useRef(new Animated.Value(50)).current;
  const buttonFadeAnim = React.useRef(new Animated.Value(0)).current;

  const growOut = () => {
    Animated.parallel([
      Animated.timing(sizeAnim, {
        toValue: 18,
        duration: 500,
        useNativeDriver: false,
      }),
      Animated.timing(marginAnim, {
        toValue: 50,
        duration: 500,
        useNativeDriver: false,
      }),
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: false,
      }),
    ]).start();
  };

  React.useEffect(() => {
    growOut();
  }, []); //eslint-disable-line react-hooks/exhaustive-deps

  const showResetButton = () => {
    Animated.parallel([
      Animated.timing(buttonFadeAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: false,
      }),
      Animated.timing(buttonMarginAnim, {
        toValue: 20,
        duration: 500,
        useNativeDriver: false,
      }),
    ]).start();
  };

  const hideResetButton = () => {
    Animated.parallel([
      Animated.timing(buttonFadeAnim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: false,
      }),
      Animated.timing(buttonMarginAnim, {
        toValue: 50,
        duration: 200,
        useNativeDriver: false,
      }),
    ]).start();
  };

  React.useEffect(() => {
    if (isGameOver) {
      showResetButton();
    } else {
      hideResetButton();
    }
  }, [isGameOver]); //eslint-disable-line react-hooks/exhaustive-deps

  const renderSquare = (index: number) => {
    return (
      <Square
        key={index}
        value={squares[index]}
        tapSquare={() => tapSquare(index)}
        index={index}
        winningTiles={winningTiles}
        currentSelection={currentSelection}
        isFreshgame={isFreshgame}
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
          {isGameOver
            ? winner
              ? `Game Over: ${winner} wins`
              : 'Game Over: Stalemate'
            : ` Next Player: ${xIsNext ? 'X' : 'O'}`}
        </Animated.Text>
      </Animated.View>
      {renderRows()}
      {isGameOver && (
        <Animated.View
          style={{
            opacity: buttonFadeAnim,
            marginTop: buttonMarginAnim,
          }}>
          <Button
            onPress={resetState}
            style={{
              container: styles.buttonContainer,
              text: styles.buttonText,
            }}>
            Reset
          </Button>
        </Animated.View>
      )}
      {!isGameOver && <View style={{ marginBottom: 20 }} />}
      <HistoryContainer history={history} jumpTo={jumpTo} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#333',
    paddingTop: 50,
    marginBottom: 20,
  },
  row: {
    flexDirection: 'row',
  },
  rowsContainer: {
    marginTop: 30,
    alignItems: 'center',
  },
  instructionsContainer: {
    alignItems: 'center',
  },
  instructions: {
    color: 'white',
    fontSize: 16,
    fontWeight: '700',
  },
  buttonContainer: {
    width: 300,
    height: 50,
    justifyContent: 'center',
    borderRadius: 5,
    backgroundColor: 'white',
  },
  buttonText: {
    fontSize: 17,
    fontWeight: '500',
    color: '#2c3e50',
  },
});

export default Board;
