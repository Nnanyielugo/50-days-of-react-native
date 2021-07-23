import * as React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import format from 'date-fns/format';
import Icon from 'react-native-vector-icons/Ionicons';

import { getDisplayIcon } from '../../utils/functions';
import { TEXT_COLOR_WHITE } from '../../utils/constants';

import type { Hourly } from '../../utils/interfaces';
import type { FunctionComponent } from 'react';

interface ComponentProps {
  hour: Hourly;
}

const Hour: FunctionComponent<ComponentProps> = ({ hour }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{format(hour.date * 1000, 'h bbb')}</Text>
      <Icon color="grey" size={20} name={getDisplayIcon(hour.desc)} />
      <Text style={styles.text}>{Math.round(hour.temp)}°</Text>
      <Text style={styles.text}>{hour.pop * 100}%</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // marginHorizontal: 5,
  },
  text: {
    color: TEXT_COLOR_WHITE,
    marginBottom: 5,
  },
});

export default Hour;
