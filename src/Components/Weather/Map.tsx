import * as React from 'react';
import { StyleSheet } from 'react-native';
import Mapview from 'react-native-maps';

import Card from '../utils/Card';

import type { Coords } from '../../utils/interfaces';
import type { FunctionComponent } from 'react';

interface ComponentProps {
  coords: Coords;
}

const Map: FunctionComponent<ComponentProps> = ({ coords }) => {
  const region = {
    ...coords,
    longitudeDelta: 0.0421,
    latitudeDelta: 0.0922,
  };
  return (
    <Card style={styles.container}>
      <Mapview
        style={styles.map}
        minZoomLevel={5}
        initialRegion={region}
        cacheEnabled={true}
        scrollEnabled={false}
        showsUserLocation={true}
      />
    </Card>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    height: 200,
    backgroundColor: 'whitesmoke',
  },
  map: {
    flex: 1,
    margin: 5, // enabbles the parent Card's border-radius styling to take effect
  },
});

export default Map;
