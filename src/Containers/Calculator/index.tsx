import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import Container from './components';

class Calculator extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Container />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    backgroundColor: '#1C1C1C',
  },
});

export default Calculator;
