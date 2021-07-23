import * as React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import format from 'date-fns/format';
import Icon from 'react-native-vector-icons/Ionicons';

import { getDisplayIcon } from '../../utils/functions';
import { TEXT_COLOR_WHITE } from '../../utils/constants';

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
      <Icon color="grey" name={getDisplayIcon(day.desc)} size={20} />
      <Text style={styles.DN}>{`${Math.round(day.day)}°/${Math.round(
        day.night,
      )}°`}</Text>
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
    color: TEXT_COLOR_WHITE,
  },
  pop: {
    width: 35,
    color: TEXT_COLOR_WHITE,
  },
  DN: {
    color: TEXT_COLOR_WHITE,
  },
});

export default Days;
