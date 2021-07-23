import * as React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import format from 'date-fns/format';
import Icon from 'react-native-vector-icons/Ionicons';

import { getDisplayIcon } from '../../utils/functions';

import type { FunctionComponent } from 'react';
import type { Daily } from '../../utils/interfaces';

interface ComponentProps {
  day: Daily;
}

const Days: FunctionComponent<ComponentProps> = ({ day }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.day}>{format(day.date * 1000, 'eeee')}</Text>
      <Text style={styles.pop}>{day.pop * 100}%</Text>
      <Icon name={getDisplayIcon(day.desc)} size={20} />
      <Text>{`${Math.round(day.day)}°/${Math.round(day.night)}°`}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 3,
  },
  day: {
    width: 70,
    fontSize: 12,
    fontWeight: '700',
  },
  pop: {
    width: 35,
  },
});

export default Days;
