import React from 'react';
import { StyleSheet, ScrollView, Dimensions } from 'react-native';

import Place from './Place';

import type { NativeSyntheticEvent, NativeScrollEvent } from 'react-native';
import type { FunctionComponent } from 'react';
import type { IPlace, Coords } from '../types';

interface PlaceProps {
  places: IPlace[];
  setCoords: (value: Coords) => void;
}

const Places: FunctionComponent<PlaceProps> = ({ places, setCoords }) => {
  let [layoutIndex, setLayoutIndex] = React.useState<number>(0);

  React.useEffect(() => {
    if (places.length) {
      setCoords({
        longitude: places[layoutIndex]?.location.lng,
        latitude: places[layoutIndex]?.location.lat,
        latitudeDelta: 0.0421,
        longitudeDelta: 0.0621,
      });
    }
  }, [layoutIndex]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleScroll = ({
    nativeEvent: { contentOffset, layoutMeasurement },
  }: NativeSyntheticEvent<NativeScrollEvent>) => {
    const widthForFullSwipe = layoutMeasurement.width;
    let focusedIndex = contentOffset.x / (widthForFullSwipe * 0.85);

    setLayoutIndex(Math.ceil(focusedIndex));
  };

  return (
    <ScrollView
      style={styles.container}
      pagingEnabled
      onScroll={handleScroll}
      horizontal
      decelerationRate={'fast'}
      snapToInterval={Dimensions.get('window').width * 0.85}
      snapToAlignment="center">
      {places.map((place, index) => {
        return (
          <Place
            key={place.id}
            index={index}
            layoutIndex={layoutIndex}
            place={place}
          />
        );
      })}
    </ScrollView>
  );
};

const DEVICE_HEIGHT = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: DEVICE_HEIGHT * 0.65,
    width: '100%',
    height: 200,
    zIndex: 900,
    backgroundColor: 'rgba(245, 245, 245, 0)',
  },
});

export default Places;
