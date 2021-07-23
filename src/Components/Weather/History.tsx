import * as React from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';

import type { FunctionComponent } from 'react';
import type { Daily } from '../../utils/interfaces';

import Card from '../utils/Card';
import Day from './Days';

interface ComponentProps {
  daily?: Daily[];
  loaded: boolean;
}

const History: FunctionComponent<ComponentProps> = ({ daily, loaded }) => {
  if (!loaded) {
    return (
      <Card style={styles.container}>
        <ActivityIndicator size="large" color="#36454F" />
      </Card>
    );
  }
  return (
    <Card style={styles.container}>
      {/* <Day /> */}
      {daily && daily.map((day: Daily) => <Day day={day} key={day.date} />)}
    </Card>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    paddingTop: 10,
    justifyContent: 'center',
  },
});

export default History;
