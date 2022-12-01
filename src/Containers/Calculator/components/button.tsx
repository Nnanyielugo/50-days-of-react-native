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
}

const CalcultorButton: FunctionComponent<CalcultorButtonProps> = ({
  containerStyle,
  textStyle,
  children,
  item,
  onPressItem,
}) => {
  return (
    <Pressable
      onPress={() => onPressItem(item)}
      style={state => ({
        opacity: state.pressed ? 0.6 : 1,
      })}>
      <View style={[styles.container, containerStyle]}>
        <Text style={[styles.text, textStyle]}>{children}</Text>
      </View>
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
