import * as React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import CardComp from '../utils/Card';

const Card = () => {
  return (
    <CardComp style={styles.container}>
      <Text>Hello There</Text>
    </CardComp>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
  },
});

export default Card;
