import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

class Timer extends Component {
	render() {
    const { time, lastLap, lastLapColor } = this.props;
		return (
			<View style={styles.container}>
        <Text style={[styles.lastLap, { color: lastLapColor }]}>{lastLap}</Text>
				<Text style={styles.timer}>{time}</Text>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 20
  },
  timer: {
    fontSize: 56,
    fontWeight: '800'
  },
  lastLap: {
    fontSize: 16,
    fontStyle: 'italic',
    alignSelf: 'flex-end',
    marginRight: 70
  }
});

export default Timer;
