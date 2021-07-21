import * as React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';

import type { ViewStyle, TextStyle, ImageStyle } from 'react-native';
import type { FunctionComponent } from 'react';

type NamedStyles = ViewStyle | TextStyle | ImageStyle;

type Disabled = {
  status: boolean;
  inactiveColor: string;
};

interface ButtonProps {
  onPress?: () => any;
  style?: {
    container?: NamedStyles;
    text?: NamedStyles;
  };
  disabled?: boolean;
  inactiveColor?: string;
}

const Button: FunctionComponent<ButtonProps> = (props): JSX.Element => {
  const button = (
    <View
      style={[
        styles.container,
        props.style?.container,
        props.disabled && {
          backgroundColor: props.inactiveColor || '#F4F4F4',
          elevation: 1,
        },
      ]}>
      <Text
        style={[
          styles.text,
          props.style?.text,
          props.disabled && {
            color: 'grey',
          },
        ]}>
        {props.children}
      </Text>
    </View>
  );

  if (props.disabled) return button;
  return <TouchableOpacity onPress={props.onPress}>{button}</TouchableOpacity>;
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    marginHorizontal: 10,
    padding: 10,
    elevation: 3,
    borderRadius: 3,
    backgroundColor: '#F4F4F4',
  },
  text: {
    color: '#FFF',
  },
});

export default Button;
