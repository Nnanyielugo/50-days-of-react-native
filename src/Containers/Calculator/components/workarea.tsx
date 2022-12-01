import React from 'react';
import { View, StyleSheet, Dimensions, FlatList } from 'react-native';
import CalculatorButton from './button';

import { CalculatorButtonType, buttons, Operands } from '../utils';

import type { FunctionComponent } from 'react';

interface WorkAreaProps {
  handleItemPress: (item: CalculatorButtonType) => void;
  selectedOperand: Operands | null;
  resultActive: boolean;
  input: string | null;
  total: string | null;
  invalidDel: boolean;
}
const WorkArea: FunctionComponent<WorkAreaProps> = ({
  handleItemPress,
  selectedOperand,
  resultActive,
  input,
  total,
  invalidDel,
}) => {
  const renderItem = ({ item }: { item: CalculatorButtonType }) => {
    let active = false;
    if (item.mode === 'operand' && item.function === selectedOperand) {
      active = true;
    }

    let invalid = false;

    // handle result button invalid status
    if (item.mode === 'operand' && item.function === 'equal') {
      invalid = !resultActive;
    }

    // handle equal button invalid status
    if (item.mode === 'operand' && item.function !== 'equal' && !input) {
      invalid = !resultActive;
    }

    // handle delete button invalid status
    if (item.mode === 'misc' && item.function === 'delete' && invalidDel) {
      invalid = true;
    }

    // handle remaining buttons invalid status
    if (total && item.value !== 'AC') {
      invalid = true;
    }

    return (
      <CalculatorButton
        active={active}
        invalid={invalid}
        onPressItem={handleItemPress}
        item={item}
        textStyle={{
          fontSize: item.size,
          color: item.color,
        }}
        containerStyle={{
          backgroundColor: item.background,
        }}>
        {item.value}
      </CalculatorButton>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={buttons}
        numColumns={4}
        renderItem={renderItem}
        keyExtractor={item =>
          typeof item.value === 'string' ? item.value : item.value.toString()
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: Dimensions.get('window').height * 0.7,
    paddingTop: 50,
    paddingHorizontal: 10,
    backgroundColor: '#1C1C1C',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default WorkArea;
