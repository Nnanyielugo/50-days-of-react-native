import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';

import type { FunctionComponent } from 'react';
import type { ViewStyle, TextStyle } from 'react-native';

import { size } from '../utils';

interface CalcultorButtonProps {
  containerStyle?: ViewStyle;
  textStyle?: TextStyle;
}

const CalcultorButton: FunctionComponent<CalcultorButtonProps> = ({
  containerStyle,
  textStyle,
  children,
}) => {
  return (
    <View style={[styles.container, containerStyle]}>
      <Text style={[styles.text, textStyle]}>{children}</Text>
    </View>
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
