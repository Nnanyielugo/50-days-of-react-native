import React, { Component } from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Geolocation from 'react-native-geolocation-service';
import Config from 'react-native-config';

import WeatherInformation from '../Components/Weather/WeatherInformation';
import History from '../Components/Weather/History';
import Map from '../Components/Weather/Map';
import Button from '../Components/utils/Button';
import { composeWeatherResults } from '../utils/functions';

import type {
  Coords,
  Current,
  Hourly,
  Daily,
  Address,
} from '../utils/interfaces';

async function fetchWeatherData(coords?: Coords) {
  if (coords) {
    const uri = `https://api.openweathermap.org/data/2.5/onecall?lat=${coords.latitude}&lon=${coords.longitude}&exclude={part}&units=metric&appid=${Config.OPEN_WEATHER_API_KEY}`;
    return await fetch(uri).then(resp => resp.json());
  }
}

async function geocode(coords?: Coords) {
  if (coords) {
    const uri = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${coords.latitude},${coords.longitude}&result_type=locality&key=${Config.GOOGLE_MAPS_API_KEY}`;
    return await fetch(uri).then(resp => resp.json());
  }
}

async function getYesterday(coords?: Coords) {
  const timeOffset = 86400;
  const sub = String(Date.now()).substr(0, 10);
  const yesterday = Number(sub) - timeOffset;
  if (coords) {
    const uri = `https://api.openweathermap.org/data/2.5/onecall/timemachine?lat=${coords.latitude}&lon=${coords.longitude}&dt=${yesterday}&units=metric&appid=${Config.OPEN_WEATHER_API_KEY}`;
    return await fetch(uri).then(resp => resp.json());
  }
}

interface ComponentProps {}
interface ComponentState {
  coords?: Coords;
  address?: Address;
  current?: Current;
  hourly?: Hourly[];
  daily?: Daily[];
  yesterday?: {
    temp: number;
  };
  loaded: boolean;
}

class Weather extends Component<ComponentProps, ComponentState> {
  constructor(props: ComponentProps) {
    super(props);
    const options = {
      enableHighAccuracy: true,
      timeout: 15000,
      maximumAge: 10000,
    };

    this.state = {
      loaded: false,
    };

    Geolocation.getCurrentPosition(
      pos => {
        this.setState({
          coords: {
            latitude: pos.coords.latitude,
            longitude: pos.coords.longitude,
          },
        });
      },
      () => {},
      options,
    );
  }

  componentDidUpdate() {
    if (this.state.coords && !this.state.loaded) {
      this.makeRequest(this.state.coords);
    }
  }

  makeRequest(coords?: Coords) {
    Promise.all([
      fetchWeatherData(coords),
      geocode(coords),
      getYesterday(coords),
    ]).then(([weatherData, geoResults, yesterday]) => {
      console.log('data', weatherData);
      console.log('geo data', geoResults);
      console.log('yesterday', yesterday);
      const formattedresults = composeWeatherResults(weatherData);
      this.setState(state => ({
        ...state,
        address: {
          ...state.address,
          locality: geoResults.results[0].formatted_address,
        },
        current: formattedresults.current,
        hourly: formattedresults.hours,
        daily: formattedresults.days,
        loaded: true,
        yesterday: {
          temp: yesterday.current.temp,
        },
      }));
    });
  }

  render() {
    console.log('state', this.state);
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView style={styles.scroll}>
          <View style={styles.headerContainer}>
            <Text style={styles.headerText}>Weather</Text>
          </View>
          <WeatherInformation
            current={this.state?.current}
            hourly={this.state?.hourly}
            address={this.state?.address}
            loaded={this.state.loaded}
          />
          <History loaded={this.state.loaded} daily={this.state.daily} />
          {this.state.coords && (
            <>
              <Map coords={this.state.coords} />
            </>
          )}
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    backgroundColor: '#36454F',
  },
  scroll: {
    marginBottom: 20,
  },
  headerContainer: {
    marginTop: 20,
    marginBottom: 30,
  },
  headerText: {
    fontSize: 34,
    color: 'whitesmoke',
    alignSelf: 'center',
  },
});

export default Weather;
