import * as React from 'react';
import { View, StyleSheet } from 'react-native';

import type { FunctionComponent } from 'react';
import type { NamedStyles } from '../../utils/interfaces';

interface ComponentProps {
  style?: NamedStyles;
}
const Card: FunctionComponent<ComponentProps> = props => {
  return <View style={[styles.container, props.style]}>{props.children}</View>;
};

const styles = StyleSheet.create({
  container: {
    height: 250,
    backgroundColor: 'whitesmoke',
    marginHorizontal: 10,
    borderRadius: 7,
    elevation: 5,
  },
});

export default Card;
