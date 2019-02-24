import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

import Button from './Buttons';

class Controls extends Component {
  render() {
    const { start, stop, split, running, startColor } = this.props;
    return (
      <View style={styles.container}>
        <Button
          text="Lap"
          onPress={split}
          disable={!running}
        />

        <Button 
          text={!running ? "Start" : "Stop"}
          onPress={!running ? start : stop}
          textColor={startColor}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    flexDirection: 'row'
  },
});

export default Controls;
