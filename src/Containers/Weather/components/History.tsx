import * as React from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';

import type { FunctionComponent } from 'react';
import type { Daily } from '../interface';

import { Card } from '../../../components';
import Day from './Days';

interface YesterdayProps {
  day: {
    temp: number;
  };
}

const Yesterday: FunctionComponent<YesterdayProps> = ({ day }) => {
  return (
    <View style={styles.yesterday}>
      <Text style={styles.day}>Yesterday</Text>
      <Text style={styles.DN}>{`${Math.round(day.temp)}°`}</Text>
    </View>
  );
};

interface ComponentProps {
  daily?: Daily[];
  loaded: boolean;
  yesterday?: {
    temp: number;
  };
}

const History: FunctionComponent<ComponentProps> = ({
  daily,
  loaded,
  yesterday,
}) => {
  if (!loaded) {
    return (
      <Card style={styles.container}>
        <ActivityIndicator size="large" color="whitesmoke" />
      </Card>
    );
  }
  return (
    <Card style={styles.container}>
      {yesterday && <Yesterday day={yesterday} />}
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
  yesterday: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 3,
  },
  day: {
    width: 70,
    fontSize: 12,
    fontWeight: '700',
    color: '#636E71',
  },
  DN: {
    color: '#636E71',
  },
});

export default History;
