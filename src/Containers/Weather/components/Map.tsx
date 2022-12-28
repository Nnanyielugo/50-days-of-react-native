import * as React from 'react';
import { StyleSheet, Platform } from 'react-native';
import Mapview from 'react-native-maps';

import { Card } from '../../../components';

import type { Coords } from '../interface';
import type { FunctionComponent } from 'react';

interface ComponentProps {
  coords: Coords;
}

const Map: FunctionComponent<ComponentProps> = ({ coords }) => {
  return (
    <Card style={styles.container} raised={{ height: 5 }}>
      {Platform.OS === 'android' ? (
        <Mapview
          provider="google"
          style={styles.map}
          region={coords}
          initialRegion={coords}
          scrollEnabled={false}
          cacheEnabled={true}
        />
      ) : (
        <Mapview
          // provider="google"
          style={styles.map}
          region={coords}
          initialRegion={coords}
          scrollEnabled={false}
          cacheEnabled={true}
        />
      )}
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
    margin: 5, // enables the parent Card's border-radius styling to take effect
    ...StyleSheet.absoluteFillObject,
  },
});

export default Map;
