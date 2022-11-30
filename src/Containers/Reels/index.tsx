import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import ControlsContainer from './components/container';

class Reels extends Component {
  render() {
    return (
      <View style={styles.container}>
        <ControlsContainer />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    backgroundColor: '#fff',
  },
});

export default Reels;
