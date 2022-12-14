import React from 'react';
import { View, StyleSheet, Dimensions, Pressable } from 'react-native';
import MapView from 'react-native-maps';

import type { FunctionComponent } from 'react';

import Icon from 'react-native-vector-icons/Ionicons';

interface ContainerProps {
  goBack: () => void;
}

const Container: FunctionComponent<ContainerProps> = ({ goBack }) => {
  const coords = {
    longitude: 9.000708,
    latitude: 7.500694,
    // latitude: -8.409518,
    // longitude: 115.188919,
    latitudeDelta: 0.0421,
    longitudeDelta: 0.0621,
  };
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
      <MapView
        provider="google"
        style={styles.map}
        initialRegion={coords}
        region={coords}></MapView>
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
    // justifyContent: 'center',
    // alignItems: 'center',
    // backgroundColor: '#2c3e50',
  },
  backIcon: {
    position: 'absolute',
    top: 50,
    left: 10,
    zIndex: 999,
    backgroundColor: 'whitesmoke',
    padding: 2,
    borderRadius: 5,
  },
});

export default Container;
