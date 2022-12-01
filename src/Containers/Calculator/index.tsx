import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

class Calculator extends Component {
  render() {
    return <View style={styles.container}></View>;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1C1C1C',
  },
});

export default Calculator;
