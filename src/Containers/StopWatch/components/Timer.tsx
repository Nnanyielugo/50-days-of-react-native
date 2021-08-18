import * as React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import type { FunctionComponent } from 'react';

interface ComponentProps {
  time: string;
  lastLap: string;
  lastLapColor: string;
}

const Timer: FunctionComponent<ComponentProps> = props => {
  return (
    <View style={styles.container}>
      <Text style={[styles.lastLap, { color: props.lastLapColor }]}>
        {props.lastLap}
      </Text>
      <Text style={styles.timer}>{props.time}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 20,
  },
  timer: {
    fontSize: 56,
    fontWeight: '800',
  },
  lastLap: {
    fontSize: 16,
    fontStyle: 'italic',
    alignSelf: 'flex-end',
    marginRight: 70,
  },
});

export default Timer;
