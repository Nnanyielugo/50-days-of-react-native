import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import MapView from 'react-native-maps';

const Container = () => {
  const coords = {
    longitude: 9.000806,
    latitude: 7.500694,
    latitudeDelta: 0.0421,
    longitudeDelta: 0.6922,
  };
  return (
    <MapView
      provider="google"
      style={styles.map}
      initialRegion={coords}
      region={coords}
      liteMode
      cacheEnabled></MapView>
  );
};

const styles = StyleSheet.create({
  map: {
    flex: 1,
    margin: 5,
    // justifyContent: 'center',
    // alignItems: 'center',
    // backgroundColor: '#2c3e50',
  },
});

export default Container;
