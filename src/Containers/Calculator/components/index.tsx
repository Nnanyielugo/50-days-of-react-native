import React from 'react';
import { View, StyleSheet } from 'react-native';
import Results from './results';
import WorkArea from './workarea';

const Container = () => {
  return (
    <View style={styles.container}>
      <Results />
      <WorkArea />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    // backgroundColor: '#2c3e50',
  },
});

export default Container;
