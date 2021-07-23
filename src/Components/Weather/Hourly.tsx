import * as React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import format from 'date-fns/format';
import Icon from 'react-native-vector-icons/Ionicons';

import { getDisplayIcon } from '../../utils/functions';

import type { Hourly } from '../../utils/interfaces';
import type { FunctionComponent } from 'react';

interface ComponentProps {
  hour: Hourly;
}

const Hour: FunctionComponent<ComponentProps> = ({ hour }) => {
  console.log('HOUR', new Date(hour.date * 1000).toUTCString());

  return (
    <View style={styles.container}>
      <Text>{format(hour.date * 1000, 'h bbb')}</Text>
      <Icon color="grey" size={20} name={getDisplayIcon(hour.desc)} />
      <Text>{Math.round(hour.temp)}°</Text>
      <Text>{hour.pop * 100}%</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // marginHorizontal: 5,
  },
});

export default Hour;
