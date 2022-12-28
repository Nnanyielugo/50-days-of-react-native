import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';

import type { FunctionComponent } from 'react';

import type { IPlace } from '../types';

type Place = {
  index: number;
  place: IPlace;
};

const Place: FunctionComponent<Place> = ({ index, place }) => {
  return (
    <View style={styles.container}>
      <View style={styles.subContainer}>
        <View style={styles.nameContainer}>
          <Text style={styles.name}>{place.name}</Text>
        </View>
        <View style={styles.addressRatingContainer}>
          <View>
            <Text style={styles.address}>{place.address}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const DEVICE_HEIGHT = Dimensions.get('window').height;
const DEVICE_WIDTH = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: {
    width: DEVICE_WIDTH * 0.85,
    zIndex: 999,
    height: 200,
    alignItems: 'center',
    justifyContent: 'center',
  },
  subContainer: {
    width: Dimensions.get('window').width * 0.8,
    backgroundColor: 'whitesmoke',
    height: 200,
    alignItems: 'center',
  },
  nameContainer: {
    marginTop: 20,
    marginHorizontal: 20,
  },
  name: {
    fontWeight: '700',
    fontSize: 20,
  },
  addressRatingContainer: {
    marginRight: 20,
    marginHorizontal: 20,
    marginTop: 20,
  },
  address: {
    fontSize: 17,
  },
  rating: {},
});

export default Place;
