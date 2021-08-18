import * as React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import format from 'date-fns/format';
import Icon from 'react-native-vector-icons/Ionicons';

import { getDisplayIcon } from '../utils';
import { TEXT_COLOR_WHITE } from '../constants';

import type { Hourly } from '../interface';
import type { FunctionComponent } from 'react';

interface ComponentProps {
  hour: Hourly;
}

const Hour: FunctionComponent<ComponentProps> = ({ hour }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{format(hour.date * 1000, 'h aaa')}</Text>
      <View style={styles.subContainer}>
        <Icon color="grey" size={20} name={getDisplayIcon(hour.desc)} />
        <Text style={styles.text}>{Math.round(hour.temp)}°</Text>
        <View style={styles.popContainer}>
          <Icon color="aqua" size={8} name="water-outline" />
          <Text style={styles.pop}>{Math.round(hour.pop * 100)}%</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get('window').width * 0.18,
  },
  text: {
    color: TEXT_COLOR_WHITE,
    marginBottom: 5,
  },
  subContainer: { paddingLeft: 5 },
  popContainer: {
    flexDirection: 'row',
  },
  pop: {
    fontSize: 9,
    marginLeft: 2,
  },
});

export default Hour;
