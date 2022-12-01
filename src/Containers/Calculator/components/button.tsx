import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';

import type { FunctionComponent } from 'react';
import type { ViewStyle, TextStyle } from 'react-native';

import { size, CalculatorButtonType } from '../utils';

interface CalcultorButtonProps {
  containerStyle?: ViewStyle;
  textStyle?: TextStyle;
  item: CalculatorButtonType;
  onPressItem: (item: CalculatorButtonType) => void;
  active: boolean;
  invalid: boolean;
}

const CalcultorButton: FunctionComponent<CalcultorButtonProps> = ({
  containerStyle,
  textStyle,
  children,
  item,
  onPressItem,
  active,
  invalid,
}) => {
  const content = (
    <View
      style={[
        styles.container,
        containerStyle,
        active && { backgroundColor: item.color },
        invalid && { opacity: 0.5 },
      ]}>
      <Text
        style={[styles.text, textStyle, active && { color: item.background }]}>
        {children}
      </Text>
    </View>
  );

  if (invalid) return content;

  return (
    <Pressable
      onPress={() => onPressItem(item)}
      style={state => ({
        opacity: state.pressed ? 0.6 : 1,
      })}>
      {content}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    width: size,
    height: size,
    borderRadius: size / 2,
    justifyContent: 'center',
    margin: 5,
  },
  text: {
    fontSize: 40,
    color: '#fff',
    textAlign: 'center',
  },
});

export default CalcultorButton;
