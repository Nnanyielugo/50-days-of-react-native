import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import SwipeCard from './components/SwipeCard';
class TinderSwipe extends Component {
  render() {
    return (
      <View style={styles.container}>
        <SwipeCard />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    // alignItems: 'center',
    backgroundColor: 'whitesmoke',
  },
});

export default TinderSwipe;
