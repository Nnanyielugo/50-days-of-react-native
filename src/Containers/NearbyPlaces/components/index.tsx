import React from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  Pressable,
  Platform,
} from 'react-native';
import MapView, { Marker, AnimatedRegion } from 'react-native-maps';
import { request, check, PERMISSIONS, RESULTS } from 'react-native-permissions';
import Geolocation from 'react-native-geolocation-service';
import Config from 'react-native-config';
import Icon from 'react-native-vector-icons/Ionicons';

import Places from './Places';

import type { FunctionComponent } from 'react';

import type { Coords, IPlace } from '../types';

interface ContainerProps {
  goBack: () => void;
}

const Container: FunctionComponent<ContainerProps> = ({ goBack }) => {
  const [coords, setCoords] = React.useState<Coords>();
  const [places, setPlaces] = React.useState<IPlace[]>([]);
  const [userLocationSet, setUserLocationStatus] = React.useState(false);

  React.useEffect(() => {
    handleCheckLocationPermissions();
  }, []);

  const checkPlaces = async (coords: any) => {
    const uri = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?type=restaurant&radius=1500&location=${coords.latitude}%2C${coords.longitude}&key=${Config.GOOGLE_MAPS_API_KEY}`;
    return await fetch(uri).then(resp => resp.json());
  };

  const handleCheckLocationPermissions = async () => {
    const options = {
      enableHighAccuracy: true,
      timeout: 15000,
      maximumAge: 10000,
    };
    if (Platform.OS === 'android') {
      const result = await check(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);

      if (result === RESULTS.GRANTED) {
        Geolocation.getCurrentPosition(
          pos => {
            setCoords({
              latitude: pos.coords.latitude,
              longitude: pos.coords.longitude,
              latitudeDelta: 0.0421,
              longitudeDelta: 0.0621,
            });
          },
          err => {
            console.log('err', err);
          },
          options,
        );
      } else {
        const permission = await request(
          PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
        );
        if (permission === RESULTS.GRANTED) {
          Geolocation.getCurrentPosition(
            pos => {
              setCoords({
                latitude: pos.coords.latitude,
                longitude: pos.coords.longitude,
                latitudeDelta: 0.0421,
                longitudeDelta: 0.0621,
              });
            },
            err => {
              console.log('err', err);
            },
            options,
          );
        }
      }
    } else {
      const result = await check(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);

      if (result === RESULTS.GRANTED) {
        Geolocation.getCurrentPosition(
          pos => {
            setCoords({
              latitude: pos.coords.latitude,
              longitude: pos.coords.longitude,
              latitudeDelta: 0.0421,
              longitudeDelta: 0.0621,
            });
          },
          err => {
            console.log('err', err);
          },
          options,
        );
      } else {
        const permission = await request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
        if (permission === RESULTS.GRANTED) {
          Geolocation.getCurrentPosition(
            pos => {
              setCoords({
                latitude: pos.coords.latitude,
                longitude: pos.coords.longitude,
                latitudeDelta: 0.0421,
                longitudeDelta: 0.0621,
              });
            },
            err => {
              console.log('err', err);
            },
            options,
          );
        }
      }
    }
  };

  React.useEffect(() => {
    if (coords && !userLocationSet) {
      checkPlaces(coords).then(res => {
        const results: IPlace[] = [];
        res.results.forEach((item: any) => {
          results.push({
            name: item.name,
            address: item.vicinity,
            rating: item.rating,
            location: item.geometry.location,
            background: item.icon_background_color,
            id: item.place_id,
          });
        });
        setPlaces(results);
        setUserLocationStatus(true);
      });
    }
  }, [coords, userLocationSet]);

  if (!coords) return null;

  return (
    <>
      <View style={styles.backIcon}>
        <Pressable
          onPress={goBack}
          style={state => ({
            opacity: state.pressed ? 0.5 : 1,
          })}>
          <Icon name="chevron-back-outline" size={30} color="black" />
        </Pressable>
      </View>
      <MapView.Animated
        provider="google"
        style={styles.map}
        initialRegion={new AnimatedRegion({ ...coords })}
        region={new AnimatedRegion({ ...coords })}
        scrollEnabled={false}
        loadingEnabled>
        <Marker.Animated
          coordinate={{
            latitude: (coords as Coords).latitude,
            longitude: (coords as Coords).longitude,
          }}
        />
      </MapView.Animated>
      <Places setCoords={setCoords} places={places} />
    </>
  );
};

const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;

const styles = StyleSheet.create({
  map: {
    flex: 1,
    width: DEVICE_WIDTH,
    height: DEVICE_HEIGHT,
    ...StyleSheet.absoluteFillObject,
  },
  backIcon: {
    position: 'absolute',
    top: Platform.OS === 'android' ? 20 : 50,
    left: 10,
    zIndex: 999,
    backgroundColor: 'whitesmoke',
    padding: 2,
    borderRadius: 5,
  },
});

export default Container;
