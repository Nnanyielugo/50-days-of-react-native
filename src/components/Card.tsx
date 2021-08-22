import * as React from 'react';
import { View, StyleSheet } from 'react-native';

import type { FunctionComponent } from 'react';
import type { NamedStyles } from '../utils/interfaces';

interface Raised {
  status: boolean;
  height: number;
}
interface ComponentProps {
  style?: NamedStyles;
  raised?: Raised;
}

export const Card: FunctionComponent<ComponentProps> = ({
  style,
  raised,
  children,
}) => {
  return (
    <View
      style={[
        styles.container,
        style,
        raised?.status && { elevation: raised.height },
      ]}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 250,
    backgroundColor: '#36454F',
    marginHorizontal: 10,
    borderRadius: 7,
  },
});

export default Card;
