import React, { Component } from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Geolocation from 'react-native-geolocation-service';
import Config from 'react-native-config';

import Card from '../Components/Weather/Card';
import Button from '../Components/utils/Button';

interface Coords {
  longitude: number;
  latitude: number;
  // longitudeDelta: number;
  // latitudeDelta: number;
}

async function makeRequest(coords: Coords) {
  // const uri = `https://api.openweathermap.org/data/2.5/weather?q=London&appid=${Config.OPEN_WEATHER_API_KEY}`;
  const uri = `https://api.openweathermap.org/data/2.5/onecall?lat=${coords.latitude}&lon=${coords.longitude}&exclude={part}&appid=${Config.OPEN_WEATHER_API_KEY}`;
  const response = await fetch(uri).then(resp => resp.json());
  console.log('data', response);
}

interface Coords {
  longitude: number;
  latitude: number;
  // longitudeDelta: number;
  // latitudeDelta: number;
}

interface ComponentProps {}
interface ComponentState {
  coords: Coords;
}

class Weather extends Component<ComponentProps, ComponentState> {
  constructor(props: ComponentProps) {
    super(props);
    const options = {
      enableHighAccuracy: true,
      timeout: 15000,
      maximumAge: 10000,
    };

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const position = Geolocation.getCurrentPosition(
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
  render() {
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView style={styles.scroll}>
          <View style={styles.headerContainer}>
            <Text style={styles.headerText}>Weather</Text>
          </View>
          <Card />
          <Card />
          <Card />
          <Button onPress={() => makeRequest(this.state.coords)} style={{}}>
            Click Here
          </Button>
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
