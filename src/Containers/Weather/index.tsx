import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Platform,
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Geolocation from 'react-native-geolocation-service';
import Config from 'react-native-config';
import Icon from 'react-native-vector-icons/Ionicons';

import WeatherInformation from './components/WeatherInformation';
import History from './components/History';
import Map from './components/Map';
import SwitchLocationModal from './components/SwitchLocationModal';
import { composeWeatherResults } from './utils';

import coverImage from './assets/weather.jpeg';
import coverImage2 from './assets/weather2.jpeg';
import coverImage3 from './assets/weather3.jpeg';
import coverImage4 from './assets/weather4.jpeg';
import coverImage5 from './assets/weather5.jpeg';

import type { Coords, Current, Hourly, Daily, Address } from './interface';

async function fetchWeatherData(coords?: Coords) {
  if (coords) {
    const uri = `https://api.openweathermap.org/data/2.5/onecall?lat=${coords.latitude}&lon=${coords.longitude}&exclude={part}&units=metric&appid=${Config.OPEN_WEATHER_API_KEY}`;
    return await fetch(uri).then(resp => resp.json());
  }
}

async function geocode(address: string) {
  const uri = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
    address,
  )}&key=${Config.GOOGLE_MAPS_API_KEY}`;
  return await fetch(uri).then(resp => resp.json());
}

async function reverseGeocode(coords?: Coords) {
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

interface Background {
  module: any;
}

const BackgroundImages: Background[] = [
  {
    module: coverImage,
  },
  {
    module: coverImage2,
  },
  {
    module: coverImage3,
  },
  {
    module: coverImage4,
  },
  {
    module: coverImage5,
  },
];

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
  backgroundImage: Background;
  modalIsVisible: boolean;
}

class Weather extends Component<ComponentProps, ComponentState> {
  constructor(props: ComponentProps) {
    super(props);
    const options = {
      enableHighAccuracy: true,
      timeout: 15000,
      maximumAge: 10000,
    };

    const randomIndex = Math.floor(Math.random() * BackgroundImages.length);

    this.state = {
      loaded: false,
      backgroundImage: BackgroundImages[randomIndex],
      modalIsVisible: false,
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

  toggleModal() {
    this.setState(state => ({
      ...state,
      modalIsVisible: !state.modalIsVisible,
    }));
  }

  componentDidUpdate() {
    if (this.state.coords && !this.state.loaded) {
      this.makeRequest(this.state.coords);
    }
  }

  handleGeocode = async (address: string) => {
    const response = await geocode(address);
    const { location } = response.results[0].geometry;
    const coords: Coords = {
      latitude: location.lat,
      longitude: location.lng,
    };
    this.setState(
      state => ({
        ...state,
        loaded: false,
        coords,
      }),
      () => this.makeRequest(coords),
    );
    this.setState(state => ({
      ...state,
      modalIsVisible: false,
    }));
  };

  makeRequest(coords?: Coords) {
    Promise.all([
      fetchWeatherData(coords),
      reverseGeocode(coords),
      getYesterday(coords),
    ]).then(([weatherData, geoResults, yesterday]) => {
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
    return (
      <ImageBackground
        style={styles.backgroundImage}
        imageStyle={{ opacity: 1 }}
        source={this.state.backgroundImage.module}
        resizeMode="cover">
        <SwitchLocationModal
          closeModal={() => this.toggleModal()}
          isVisible={this.state.modalIsVisible}
          geocode={this.handleGeocode}
        />
        <ScrollView
          style={[styles.scroll, Platform.OS === 'ios' && { marginTop: 30 }]}>
          <View style={styles.menu}>
            <Icon name="menu-outline" color="#FFF" size={40} />
            <Icon
              name="add-outline"
              color="#FFF"
              size={40}
              onPress={() => this.toggleModal()}
            />
          </View>
          <View style={styles.headerContainer}>
            <Text style={styles.headerText}>Weather</Text>
          </View>
          <WeatherInformation
            current={this.state?.current}
            hourly={this.state?.hourly}
            address={this.state?.address}
            loaded={this.state.loaded}
          />
          <History
            yesterday={this.state.yesterday}
            loaded={this.state.loaded}
            daily={this.state.daily}
          />
          {this.state.coords && (
            <>
              <Map coords={this.state.coords} />
            </>
          )}
        </ScrollView>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#36454F',
    opacity: 1,
  },
  backgroundImage: {
    flex: 1,
    opacity: 0.85,
    zIndex: 0,
  },
  scroll: {
    marginBottom: 20,
    zIndex: 999,
    marginTop: 10,
  },
  headerContainer: {
    marginTop: 20,
    marginBottom: 30,
    opacity: 0.8,
  },
  headerText: {
    fontSize: 34,
    color: 'whitesmoke',
    alignSelf: 'center',
  },
  menu: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    marginTop: 10,
  },
});

export default Weather;
