import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import type { FunctionComponent } from 'react';
import type { History } from '../../index';
import HistorySquare from './Square';

interface ComponentProps {
  historyItem: History;
  historyNumber: number;
  iconOpen: boolean;
  iconIndex: number;
  setIconIndex: (index: number) => void;
  toggleIconOpen: (toggleAction: boolean) => void;
  jumpTo: (step: number) => void;
  history: History[];
}

const HistoryItem: FunctionComponent<ComponentProps> = ({
  historyItem,
  historyNumber,
  iconIndex,
  setIconIndex,
  toggleIconOpen,
  iconOpen,
  jumpTo,
  history,
}) => {
  const handleIconToggle = () => {
    if (iconOpen && iconIndex === historyNumber) {
      setIconIndex(0);
      toggleIconOpen(false);
    } else {
      setIconIndex(historyNumber);
      toggleIconOpen(true);
    }
  };

  React.useEffect(() => {
    if (iconOpen && iconIndex === historyNumber) {
      if (history.length - 1 <= historyNumber + 1) {
        setIconIndex(0);
        toggleIconOpen(false);
      }
    }
  }, [history, historyNumber]); //eslint-disable-line react-hooks/exhaustive-deps

  const renderSquare = (indexNum: number) => {
    return (
      <HistorySquare
        key={`history-item-${indexNum}`}
        item={historyItem.squares[indexNum]}
        currentSelection={historyItem.currentSelection}
        index={indexNum}
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

  const setJumpTo = () => {
    jumpTo(historyNumber);
  };

  return (
    <View style={styles.container}>
      {historyNumber === 0 ? (
        <View>
          <Pressable
            style={props => ({
              opacity: props.pressed ? 0.7 : 1,
            })}
            onPress={setJumpTo}>
            <Text style={styles.moveText}>Game Start</Text>
          </Pressable>
        </View>
      ) : (
        <View>
          <View style={styles.textIconContainer}>
            <Pressable
              style={props => ({
                opacity: props.pressed ? 0.7 : 1,
              })}
              onPress={setJumpTo}>
              <Text style={styles.moveText}>Move #{historyNumber}</Text>
            </Pressable>
            <Icon
              style={styles.icon}
              name={
                iconOpen && iconIndex === historyNumber
                  ? 'chevron-down'
                  : 'chevron-right'
              }
              size={20}
              color="white"
              onPress={handleIconToggle}
            />
          </View>
          {iconOpen && iconIndex === historyNumber && renderRows()}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 300,
  },
  moveText: {
    color: '#829FBB',
    fontSize: 17,
    marginBottom: 5,
  },
  textIconContainer: {
    flexDirection: 'row',
  },
  icon: {
    marginLeft: 2,
  },
  row: {
    flexDirection: 'row',
  },
  rowsContainer: {
    marginVertical: 10,
    alignSelf: 'center',
  },
});

export default HistoryItem;
