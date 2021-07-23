import * as React from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import format from 'date-fns/format';
import Card from '../utils/Card';
import Hour from './Hourly';

import type { FunctionComponent } from 'react';
import type { Address, Current, Hourly } from '../../utils/interfaces';

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
        <ActivityIndicator size="large" color="#36454F" />
      </Card>
    );
  }

  return (
    <Card style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>
          {(address && address.locality) || 'Location'}
        </Text>
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
            <Text>{current.desc}</Text>
            <Text>{Math.round(current.temp)}°</Text>
            <Text>{`Feels like ${Math.round(current.feels_like)}`}°</Text>
          </View>
        </View>
      )}

      {hourly && (
        <View style={styles.hourlyContainer}>
          {hourly.map((hour: Hourly) => (
            <Hour key={hour.date} hour={hour} />
          ))}
        </View>
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
  headerText: {
    fontSize: 24,
  },
  date: {
    fontSize: 11,
  },
  weather: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginBottom: 10,
  },
  temperature: {
    fontSize: 40,
  },
  hourlyContainer: {
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
});

export default WeatherInformation;
