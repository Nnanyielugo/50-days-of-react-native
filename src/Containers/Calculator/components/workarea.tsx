import React from 'react';
import { View, StyleSheet, Dimensions, FlatList } from 'react-native';
import CalculatorButton from './button';

import { CalculatorButtonType, buttons } from '../utils';

import type { FunctionComponent } from 'react';

interface WorkAreaProps {
  handleItemPress: (item: CalculatorButtonType) => void;
}
const WorkArea: FunctionComponent<WorkAreaProps> = ({ handleItemPress }) => {
  const renderItem = ({ item }: { item: CalculatorButtonType }) => (
    <CalculatorButton
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
