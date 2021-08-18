import * as React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import format from 'date-fns/format';
import { Card } from '../../../components';
import Hour from './Hourly';

import type { FunctionComponent } from 'react';
import type { Address, Current, Hourly } from '../interface';
import { CARD_COLOR_WHITE, TEXT_COLOR_WHITE } from '../constants';

interface ComponentProps {
  address?: Address;
  hourly?: Hourly[];
  current?: Current;
  loaded: boolean;
}

const WeatherInformation: FunctionComponent<ComponentProps> = ({
  address,
  hourly,
  current,
  loaded,
}) => {
  if (!loaded) {
    return (
      <Card style={{ justifyContent: 'center' }}>
        <ActivityIndicator size="large" color={CARD_COLOR_WHITE} />
      </Card>
    );
  }

  return (
    <Card style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>{address && address.locality}</Text>
        {current && (
          <Text style={styles.date}>
            {format(current.date * 1000, 'E dd LLLL, h:ss bbb')}
          </Text>
        )}
      </View>

      {current && (
        <View style={styles.weather}>
          <View>
            <Text style={styles.temperature}>{Math.round(current.temp)}°</Text>
          </View>
          <View>
            <Text style={styles.desc}>{current.desc}</Text>
            <Text style={styles.temp}>{Math.round(current.temp)}°</Text>
            <Text style={styles.feel}>
              {`Feels like ${Math.round(current.feels_like)}`}°
            </Text>
          </View>
        </View>
      )}

      {hourly && (
        <ScrollView horizontal contentContainerStyle={styles.hourlyContainer}>
          {hourly.map((hour: Hourly) => (
            <Hour key={hour.date} hour={hour} />
          ))}
        </ScrollView>
      )}
    </Card>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  header: {
    marginBottom: 10,
  },
  desc: {
    color: TEXT_COLOR_WHITE,
  },
  temp: {
    color: TEXT_COLOR_WHITE,
  },
  feel: {
    color: TEXT_COLOR_WHITE,
  },
  headerText: {
    fontSize: 24,
    color: TEXT_COLOR_WHITE,
  },
  date: {
    fontSize: 11,
    color: TEXT_COLOR_WHITE,
  },
  weather: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginBottom: 10,
  },
  temperature: {
    fontSize: 40,
    color: TEXT_COLOR_WHITE,
  },
  hourlyContainer: {
    // justifyContent: 'space-between',
    // flexDirection: 'row',
  },
});

export default WeatherInformation;
